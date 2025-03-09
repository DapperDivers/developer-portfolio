import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * Configuration for PerformanceMonitor
 * @typedef {Object} PerformanceMonitorConfig
 * @property {number} longTaskThreshold - Threshold in ms to consider a task "long" (default: 50ms)
 * @property {number} fpsWarningThreshold - FPS threshold below which to show warnings (default: 30)
 * @property {boolean} showComponentTimings - Whether to show component render timings (default: true)
 * @property {boolean} showStackTraces - Whether to include stack traces in long task logs (default: true)
 * @property {boolean} logToConsole - Whether to log performance issues to console (default: true)
 * @property {string[]} componentFilter - Only track these components (empty array = track all)
 * @property {boolean} monitorScriptExecution - Whether to monitor script execution (default: true)
 * @property {boolean} monitorNetworkActivity - Whether to monitor network activity (default: true)
 */

/**
 * Enhanced performance monitor component
 * Tracks FPS, component renders, layout thrashing, memory usage, and long tasks
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.enabled - Whether the monitor is initially enabled
 * @param {PerformanceMonitorConfig} props.config - Monitor configuration options
 * @param {Object} props.positionStyle - Optional custom positioning styles
 * @param {boolean} props.initialExpanded - Whether to start in expanded mode
 */
const PerformanceMonitor = ({ 
  enabled = false,
  config = {},
  positionStyle = {},
  initialExpanded = false
}) => {
  const [visible, setVisible] = useState(enabled);
  const [expanded, setExpanded] = useState(initialExpanded);
  
  // Add state for monitor config
  const [monitorConfig, setConfig] = useState({
    longTaskThreshold: 50, // ms
    fpsWarningThreshold: 30,
    showComponentTimings: true,
    showStackTraces: true,
    logToConsole: true,
    componentFilter: [],
    monitorScriptExecution: true,
    monitorNetworkActivity: true,
    ...config
  });
  
  const [performanceData, setPerformanceData] = useState({
    fps: 0,
    memory: 0,
    renderCount: 0,
    layoutTime: 0,
    paintTime: 0,
    scriptTime: 0,
    longTasks: [],
    eventHandlers: 0,
    lastUpdate: Date.now(),
  });
  
  const frameCounter = useRef(0);
  const lastFrameTime = useRef(performance.now());
  const renderTimings = useRef({});
  const rafId = useRef(null);
  const performanceEntries = useRef([]);
  const longTasksRef = useRef([]);
  const eventListenersRef = useRef(new Map());
  const domMutationsRef = useRef([]);
  const networkRequestsRef = useRef([]);
  const scriptExecutionsRef = useRef([]);
  const lastOperationsRef = useRef([]);
  const monitorContainerRef = useRef(null);
  
  // Add refs for storing original function references
  const originalFetchRef = useRef(null);
  const originalSetTimeoutRef = useRef(null);
  const originalSetIntervalRef = useRef(null);
  const originalRequestAnimationFrameRef = useRef(null);
  const originalAddEventListenerRef = useRef(null);
  const originalOnCommitFiberRootRef = useRef(null);
  const originalOnCommitFiberUnmountRef = useRef(null);
  
  // Update config when props change
  useEffect(() => {
    setConfig(prevConfig => ({
      ...prevConfig,
      ...config
    }));
  }, [config]);
  
  // Update visibility when enabled prop changes
  useEffect(() => {
    setVisible(enabled);
  }, [enabled]);
  
  // Track long tasks with PerformanceObserver
  useEffect(() => {
    if (!visible || !window.PerformanceObserver) return;
    
    // Use configured threshold for long tasks
    const longTaskThreshold = monitorConfig.longTaskThreshold;
    
    // Observer for long tasks (tasks that block the main thread)
    const longTaskObserver = new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        // Skip if duration doesn't exceed our custom threshold
        if (entry.duration < longTaskThreshold) return;
        
        // Get additional context about what's happening
        const renderingComponents = monitorConfig.showComponentTimings ? 
          Object.keys(renderTimings.current)
            .filter(key => {
              // Apply component filter if specified
              if (monitorConfig.componentFilter.length > 0 && 
                  !monitorConfig.componentFilter.includes(key)) {
                return false;
              }
              
              const timing = renderTimings.current[key];
              const timeDiff = Date.now() - timing.timestamp;
              // Only include components that rendered in the last 100ms
              return timeDiff < 100;
            })
            .map(name => ({ name, time: renderTimings.current[name].duration })) 
          : [];
        
        // Get stack trace if configured to do so
        let stack = '';
        if (monitorConfig.showStackTraces) {
          try {
            throw new Error('Long task trace');
          } catch (e) {
            stack = e.stack?.split('\n').slice(2, 8).join('\n') || '';
          }
        }
        
        // Get the recent operations that might have caused this long task
        const recentOperations = [...lastOperationsRef.current];
        const relevantOperations = recentOperations.filter(op => {
          return Date.now() - op.timestamp < 300; // Last 300ms
        });
        
        // Store only the 10 most recent long tasks with more details
        const newTask = {
          duration: Math.round(entry.duration),
          timestamp: Date.now(),
          location: entry.name || 'unknown',
          attribution: entry.attribution ? [...entry.attribution] : [],
          activeComponents: renderingComponents,
          operations: relevantOperations,
          stackTrace: stack
        };
        
        longTasksRef.current = [
          ...longTasksRef.current.slice(-9),
          newTask
        ];
        
        // Update state with new long tasks
        setPerformanceData(prev => ({
          ...prev,
          longTasks: longTasksRef.current
        }));
        
        // Log detailed information if configured to do so
        if (monitorConfig.logToConsole) {
          console.group(`[PERFORMANCE] Long task detected: ${Math.round(entry.duration)}ms`);
          console.log(`Time: ${new Date().toLocaleTimeString()}`);
          console.log(`Duration: ${Math.round(entry.duration)}ms (threshold: ${longTaskThreshold}ms)`);
          
          if (relevantOperations.length > 0) {
            console.group('Recent operations (may have caused the long task):');
            relevantOperations.forEach(op => {
              console.log(`${new Date(op.timestamp).toLocaleTimeString()} - ${op.type}:`, op.details);
            });
            console.groupEnd();
          }
          
          if (renderingComponents.length > 0) {
            console.group('Recently rendered components:');
            renderingComponents.forEach(comp => {
              console.log(`  - ${comp.name}: ${comp.time}ms`);
            });
            console.groupEnd();
          }
          
          if (stack) {
            console.log('Stack trace:');
            console.log(stack);
          }
          
          // Add detailed analysis and actionable advice
          console.group('Analysis:');
          if (renderingComponents.length > 3) {
            console.warn('Too many components rendering at once. Consider staggering renders.');
          }
          
          if (relevantOperations.some(op => op.type === 'dom-mutation' && op.details.count > 50)) {
            console.warn('Large DOM mutations detected. Consider virtualizing lists or optimizing DOM updates.');
          }
          
          if (relevantOperations.some(op => op.type === 'user-interaction' && 
              ['scroll', 'resize', 'mousemove'].includes(op.details.type))) {
            console.warn('Performance issue during user interaction. Consider debouncing/throttling event handlers.');
          }
          
          if (relevantOperations.some(op => op.type === 'network')) {
            console.warn('Network operations during UI updates. Consider moving data fetching to separate workers or earlier in the component lifecycle.');
          }
          
          // Add React-specific analysis
          if (relevantOperations.some(op => op.type === 'react-commit')) {
            const reactCommits = relevantOperations.filter(op => op.type === 'react-commit');
            console.warn(`React rendering batches detected (${reactCommits.length}). Consider using React.memo, useMemo, or useCallback to prevent unnecessary renders.`);
            
            // Log the components that were part of this commit
            reactCommits.forEach(commit => {
              if (commit.details.components && commit.details.components.length > 0) {
                console.log(`  Components in batch: ${commit.details.components.join(', ')}${commit.details.componentCount > 5 ? ` (and ${commit.details.componentCount - 5} more)` : ''}`);
              }
            });
          }
          
          if (relevantOperations.some(op => op.type === 'react-event-end' && op.details.duration > 16)) {
            console.warn('Slow React event handlers detected. Consider optimizing or debouncing event callbacks.');
          }
          
          if (entry.duration > 100) {
            console.warn('SUGGESTION: Consider breaking down this operation or moving it to a web worker');
          }
          console.groupEnd();
          
          console.groupEnd();
        }
      });
    });
    
    try {
      // Register observer for long tasks
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('Long task observer not supported', e);
    }
    
    return () => {
      longTaskObserver.disconnect();
    };
  }, [visible, monitorConfig]);
  
  // Toggle visibility with Ctrl+Shift+P
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setVisible(prev => !prev);
      }
      
      // Expand/collapse with Alt+P
      if (e.altKey && e.key === 'P' && visible) {
        setExpanded(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible]);
  
  // Count event handlers in DOM (potential memory leaks and perf issues)
  const countEventHandlers = useCallback(() => {
    if (!visible) return 0;
    
    try {
      let count = 0;
      const events = [
        'click', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 
        'keydown', 'keyup', 'keypress', 'scroll', 'resize', 'focus', 'blur'
      ];
      
      events.forEach(eventType => {
        // Use internal Chrome API if available (more accurate)
        if (window.getEventListeners) {
          try {
            count += window.getEventListeners(document).length || 0;
            count += window.getEventListeners(window).length || 0;
          } catch (e) {
            // API not available in this browser
          }
        }
      });
      
      return count;
    } catch (e) {
      return 0;
    }
  }, [visible]);
  
  // Track frame rate and other performance metrics
  const calculateFPS = useCallback(() => {
    const now = performance.now();
    const delta = now - lastFrameTime.current;
    frameCounter.current++;
    
    // Update FPS counter once per second
    if (delta >= 1000) {
      const fps = Math.round((frameCounter.current * 1000) / delta);
      const memory = performance?.memory?.usedJSHeapSize ? 
        Math.round(performance.memory.usedJSHeapSize / (1024 * 1024)) : 0;
      
      // Count event handlers (potential leaks)
      const eventHandlers = countEventHandlers();
      
      setPerformanceData(prev => ({
        ...prev,
        fps,
        memory,
        eventHandlers,
        lastUpdate: Date.now(),
      }));
      
      // Reset counters
      frameCounter.current = 0;
      lastFrameTime.current = now;
      
      // Clear old performance entries
      performanceEntries.current = [];
    }
    
    // Process performance entries
    if (performance && performance.getEntriesByType) {
      const entries = performance.getEntriesByType('measure');
      if (entries.length > 0) {
        performanceEntries.current = performanceEntries.current.concat(entries);
        
        // Analyze performance categories
        const layoutEntries = entries.filter(e => e.name.includes('layout'));
        const paintEntries = entries.filter(e => e.name.includes('paint'));
        const scriptEntries = entries.filter(e => e.name.includes('script') || e.name.includes('evaluation'));
        
        if (layoutEntries.length > 0) {
          const avgLayoutTime = layoutEntries.reduce((sum, entry) => sum + entry.duration, 0) / layoutEntries.length;
          setPerformanceData(prev => ({ ...prev, layoutTime: Math.round(avgLayoutTime) }));
        }
        
        if (paintEntries.length > 0) {
          const avgPaintTime = paintEntries.reduce((sum, entry) => sum + entry.duration, 0) / paintEntries.length;
          setPerformanceData(prev => ({ ...prev, paintTime: Math.round(avgPaintTime) }));
        }
        
        if (scriptEntries.length > 0) {
          const avgScriptTime = scriptEntries.reduce((sum, entry) => sum + entry.duration, 0) / scriptEntries.length;
          setPerformanceData(prev => ({ ...prev, scriptTime: Math.round(avgScriptTime) }));
        }
        
        // Clear processed entries
        performance.clearMeasures();
      }
    }
    
    // Request next frame
    rafId.current = requestAnimationFrame(calculateFPS);
  }, [countEventHandlers]);
  
  // Start monitoring
  useEffect(() => {
    if (visible) {
      // Start FPS monitoring
      rafId.current = requestAnimationFrame(calculateFPS);
      
      // Set up performance observer if available
      let observer;
      if (window.PerformanceObserver) {
        observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          performanceEntries.current = performanceEntries.current.concat(entries);
        });
        
        observer.observe({ entryTypes: ['measure', 'paint', 'layout'] });
      }
      
      // Track render count
      const originalRender = React.Component.prototype.render;
      React.Component.prototype.render = function() {
        setPerformanceData(prev => ({ ...prev, renderCount: prev.renderCount + 1 }));
        return originalRender.apply(this, arguments);
      };
      
      return () => {
        cancelAnimationFrame(rafId.current);
        observer?.disconnect();
        React.Component.prototype.render = originalRender;
      };
    }
  }, [visible, calculateFPS]);
  
  // Determine color based on FPS
  const getFpsColor = (fps) => {
    if (fps < monitorConfig.fpsWarningThreshold) return '#ff5555';
    if (fps < 50) return '#ffaa00';
    return '#55ff55';
  };
  
  // Add some diagnostic tests
  const runDiagnostics = useCallback(() => {
    // Frame rate test
    console.log(`[DIAGNOSTICS] Current frame rate: ${performanceData.fps} FPS`);
    
    // Long task test
    let longTaskCount = 0;
    let testStart = performance.now();
    
    // Simulate expensive operation (should trigger long task)
    const arr = new Array(1000000).fill(0);
    arr.forEach((_, i) => {
      arr[i] = Math.sqrt(i) * Math.sin(i);
    });
    
    let testDuration = performance.now() - testStart;
    console.log(`[DIAGNOSTICS] Expensive operation test: ${Math.round(testDuration)}ms`);
    
    // Check if Background component is causing any slowdown
    console.log('[DIAGNOSTICS] Try toggling background with Ctrl+Shift+B to test performance impact');
    
    // Check memory usage
    if (performanceData.memory > 0) {
      console.log(`[DIAGNOSTICS] Memory usage: ${performanceData.memory}MB`);
    }
    
    // Animation impact test
    console.log('[DIAGNOSTICS] Starting animation impact test...');
    let framesBefore = 0;
    let testAnimationTimer = null;
    let startTime = performance.now();
    
    const checkFrames = () => {
      if (performance.now() - startTime >= 1000) {
        let framesAfter = frameCounter.current;
        console.log(`[DIAGNOSTICS] Animation impact: ${framesAfter - framesBefore} frames in 1 second`);
        clearTimeout(testAnimationTimer);
      } else {
        testAnimationTimer = setTimeout(checkFrames, 100);
      }
    };
    
    // Start checking frames
    checkFrames();
    
  }, [performanceData]);
  
  // Component tracking
  const trackRender = (componentName) => {
    renderTimings.current[componentName] = renderTimings.current[componentName] || 0;
    renderTimings.current[componentName]++;
    
    console.log(`[RENDER] ${componentName}: ${renderTimings.current[componentName]} renders`);
  };
  
  // Memoize these functions to prevent recreating them on each render
  const trackOperation = useCallback((type, details) => {
    // Keep only recent operations (last 20)
    lastOperationsRef.current = [
      ...lastOperationsRef.current.slice(-19),
      { type, details, timestamp: Date.now() }
    ];
  }, []);
  
  // Track component renders more comprehensively
  const trackComponentRender = useCallback((componentName, phase = 'render') => {
    const timestamp = Date.now();
    const startTime = performance.now();
    
    const existingTiming = renderTimings.current[componentName] || {
      renderCount: 0,
      duration: 0,
      lastRenderTime: 0,
      phases: {}
    };
    
    renderTimings.current[componentName] = {
      ...existingTiming,
      renderCount: existingTiming.renderCount + 1,
      lastRenderTime: timestamp,
      phases: {
        ...existingTiming.phases,
        [phase]: startTime
      }
    };

    // Track detailed information about this render
    trackOperation('component-render-start', {
      component: componentName,
      phase,
      timestamp
    });
    
    // Return a function to mark the end of the render
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (renderTimings.current[componentName]) {
        renderTimings.current[componentName].duration = duration;
        renderTimings.current[componentName].phases[`${phase}-end`] = endTime;
      }
      
      // Track operation for end of render
      trackOperation('component-render-end', {
        component: componentName,
        phase,
        duration,
        timestamp: Date.now()
      });
      
      // Log slow component renders
      if (duration > 16) { // Anything taking more than 1 frame
        console.warn(`[SLOW RENDER] ${componentName} took ${duration.toFixed(2)}ms to ${phase}`);
      }
    };
  }, [trackOperation]);

  // Add script execution tracking
  useEffect(() => {
    if (!visible || !monitorConfig.monitorScriptExecution) return;
    
    // Function to track function execution time
    const trackFunctionExecution = (original, name, context) => {
      return function(...args) {
        const startTime = performance.now();
        const functionName = name || (original.name || 'anonymous');
        
        trackOperation('script-execution-start', {
          name: functionName,
          context,
          timestamp: Date.now()
        });
        
        try {
          const result = original.apply(this, args);
          
          // Handle promises
          if (result && typeof result.then === 'function') {
            return result.then(value => {
              const duration = performance.now() - startTime;
              trackOperation('script-execution-end', {
                name: functionName,
                context,
                duration,
                async: true,
                timestamp: Date.now()
              });
              
              if (duration > 16) {
                console.warn(`[SLOW ASYNC FUNCTION] ${functionName} took ${duration.toFixed(2)}ms`);
              }
              
              return value;
            }).catch(error => {
              trackOperation('script-execution-error', {
                name: functionName,
                context,
                error: error.message,
                timestamp: Date.now()
              });
              throw error;
            });
          } 
          
          // Handle synchronous functions
          const duration = performance.now() - startTime;
          trackOperation('script-execution-end', {
            name: functionName,
            context,
            duration,
            timestamp: Date.now()
          });
          
          if (duration > 16) {
            console.warn(`[SLOW FUNCTION] ${functionName} took ${duration.toFixed(2)}ms`);
          }
          
          return result;
        } catch (error) {
          trackOperation('script-execution-error', {
            name: functionName,
            context,
            error: error.message,
            timestamp: Date.now()
          });
          throw error;
        }
      };
    };

    // Patch setTimeout and setInterval to track callbacks
    originalSetTimeoutRef.current = window.setTimeout;
    originalSetIntervalRef.current = window.setInterval;
    originalRequestAnimationFrameRef.current = window.requestAnimationFrame;
    
    window.setTimeout = function(callback, delay, ...args) {
      let wrappedCallback = callback;
      
      if (typeof callback === 'function') {
        wrappedCallback = trackFunctionExecution(callback, `setTimeout-${delay}ms`, 'timer');
      }
      
      return originalSetTimeoutRef.current.call(this, wrappedCallback, delay, ...args);
    };
    
    window.setInterval = function(callback, delay, ...args) {
      let wrappedCallback = callback;
      
      if (typeof callback === 'function') {
        wrappedCallback = trackFunctionExecution(callback, `setInterval-${delay}ms`, 'timer');
      }
      
      return originalSetIntervalRef.current.call(this, wrappedCallback, delay, ...args);
    };
    
    window.requestAnimationFrame = function(callback) {
      let wrappedCallback = callback;
      
      if (typeof callback === 'function') {
        wrappedCallback = trackFunctionExecution(callback, 'requestAnimationFrame', 'animation');
      }
      
      return originalRequestAnimationFrameRef.current.call(this, wrappedCallback);
    };
    
    // Cleanup
    return () => {
      window.setTimeout = originalSetTimeoutRef.current;
      window.setInterval = originalSetIntervalRef.current;
      window.requestAnimationFrame = originalRequestAnimationFrameRef.current;
    };
  }, [visible, monitorConfig.monitorScriptExecution]);
  
  // Event listener tracking
  useEffect(() => {
    if (!visible) return;

    // Track user interactions that could lead to long tasks
    const trackInteraction = (e) => {
      const interactionType = e.type;
      const target = e.target;
      const targetInfo = target ? {
        tagName: target.tagName?.toLowerCase() || 'unknown',
        id: target.id || '',
        className: target.className || '',
        type: target.type || '',
      } : 'unknown';

      trackOperation('user-interaction', {
        type: interactionType,
        target: targetInfo,
        timestamp: Date.now()
      });
    };

    // Track common interactions
    const interactionEvents = ['click', 'input', 'change', 'submit', 'keydown', 'scroll', 'resize'];
    
    interactionEvents.forEach(eventType => {
      const handler = (e) => trackInteraction(e);
      window.addEventListener(eventType, handler, { passive: true });
      eventListenersRef.current.set(eventType, handler);
    });

    // Track network activity
    if (window.fetch && monitorConfig.monitorNetworkActivity) {
      // Store the original fetch in the ref
      originalFetchRef.current = window.fetch;
      window.fetch = function(...args) {
        const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || 'unknown';
        const startTime = Date.now();
        
        trackOperation('network', {
          type: 'fetch',
          url: url.split('?')[0], // Remove query params for privacy
          startTime
        });
        
        const promise = originalFetchRef.current.apply(this, args);
        
        promise.then(() => {
          trackOperation('network', {
            type: 'fetch-complete',
            url: url.split('?')[0],
            duration: Date.now() - startTime
          });
        }).catch(error => {
          trackOperation('network', {
            type: 'fetch-error',
            url: url.split('?')[0],
            error: error.message
          });
        });
        
        return promise;
      };
    }

    // Track DOM mutations
    const mutationObserver = new MutationObserver(mutations => {
      if (mutations.length > 10) {
        // Only track significant batches of mutations
        trackOperation('dom-mutation', {
          count: mutations.length,
          types: [...new Set(mutations.map(m => m.type))],
          targets: [...new Set(mutations.map(m => 
            m.target?.tagName?.toLowerCase() || 'unknown'
          ))]
        });
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true
    });

    // Cleanup event listeners and patches
    return () => {
      interactionEvents.forEach(eventType => {
        const handler = eventListenersRef.current.get(eventType);
        if (handler) {
          window.removeEventListener(eventType, handler);
          eventListenersRef.current.delete(eventType);
        }
      });

      // Restore original fetch using the ref
      if (window.fetch && originalFetchRef.current && window.fetch !== originalFetchRef.current) {
        window.fetch = originalFetchRef.current;
      }

      // Disconnect mutation observer
      mutationObserver.disconnect();
    };
  }, [visible, trackOperation, monitorConfig.monitorNetworkActivity]);
  
  // Add React-specific event tracking
  useEffect(() => {
    if (!visible || !window.__REACT_DEVTOOLS_GLOBAL_HOOK__) return;
    
    try {
      // Track React component mounts, updates, and unmounts
      const reactDevToolsHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      
      // Store original React DevTools callbacks in refs
      originalOnCommitFiberRootRef.current = reactDevToolsHook.onCommitFiberRoot;
      originalOnCommitFiberUnmountRef.current = reactDevToolsHook.onCommitFiberUnmount;
      
      // Track commit fiber root (rendering)
      reactDevToolsHook.onCommitFiberRoot = (...args) => {
        const startTime = performance.now();
        const result = originalOnCommitFiberRootRef.current.apply(reactDevToolsHook, args);
        
        const fiberRoot = args[1];
        if (fiberRoot) {
          const componentNames = [];
          const gatherComponentNames = (fiber) => {
            if (!fiber) return;
            
            try {
              if (fiber.type && typeof fiber.type === 'function') {
                // Try to get component name
                const name = fiber.type.displayName || fiber.type.name;
                if (name) componentNames.push(name);
              } else if (fiber.type && typeof fiber.type === 'string') {
                // Track DOM elements
                componentNames.push(fiber.type);
              }
            } catch (e) {
              // Ignore errors in component name extraction
            }
            
            // Process children
            if (fiber.child) gatherComponentNames(fiber.child);
            if (fiber.sibling) gatherComponentNames(fiber.sibling);
          };
          
          try {
            // Process fiber tree
            if (fiberRoot.current) {
              gatherComponentNames(fiberRoot.current);
            }
          } catch (e) {
            // Ignore errors in traversal
          }
          
          // Track React commit (render batch)
          trackOperation('react-commit', {
            duration: performance.now() - startTime,
            componentCount: componentNames.length,
            components: componentNames.slice(0, 5), // Limit to first 5 for brevity
            timestamp: Date.now()
          });
        }
        
        return result;
      };
      
      // Track fiber unmount (cleanup)
      reactDevToolsHook.onCommitFiberUnmount = (...args) => {
        const result = originalOnCommitFiberUnmountRef.current.apply(reactDevToolsHook, args);
        return result;
      };
      
      // Cleanup
      return () => {
        reactDevToolsHook.onCommitFiberRoot = originalOnCommitFiberRootRef.current;
        reactDevToolsHook.onCommitFiberUnmount = originalOnCommitFiberUnmountRef.current;
      };
    } catch (e) {
      console.log('React DevTools hook not available - some React-specific information will be missing');
    }
  }, [visible, trackOperation]);

  // Add synthetic event tracking (for React events)
  useEffect(() => {
    if (!visible) return;
    
    // Track React synthetic events
    originalAddEventListenerRef.current = Element.prototype.addEventListener;
    
    // Patch addEventListener to track synthetic event handlers
    Element.prototype.addEventListener = function(eventType, handler, options) {
      if (handler && handler.name && handler.name.includes('React')) {
        // This is likely a React synthetic event handler
        const wrappedHandler = function(...args) {
          const startTime = performance.now();
          const element = this;
          
          trackOperation('react-event-start', {
            type: eventType,
            target: element.tagName?.toLowerCase(),
            id: element.id,
            className: element.className,
            timestamp: Date.now()
          });
          
          const result = handler.apply(this, args);
          
          const duration = performance.now() - startTime;
          if (duration > 10) { // Only track significant events
            trackOperation('react-event-end', {
              type: eventType,
              target: element.tagName?.toLowerCase(),
              duration: duration,
              timestamp: Date.now()
            });
          }
          
          return result;
        };
        
        return originalAddEventListenerRef.current.call(this, eventType, wrappedHandler, options);
      }
      
      return originalAddEventListenerRef.current.call(this, eventType, handler, options);
    };
    
    // Cleanup
    return () => {
      Element.prototype.addEventListener = originalAddEventListenerRef.current;
    };
  }, [visible, trackOperation]);
  
  // Helper functions for rendering stats
  const renderOperationCounts = (operations) => {
    const counts = {};
    operations.forEach(op => {
      counts[op.type] = (counts[op.type] || 0) + 1;
    });
    
    return (
      <div style={{ fontSize: '10px' }}>
        {Object.entries(counts).map(([type, count]) => (
          <div key={type} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{type}:</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderTopComponents = (timings) => {
    const components = Object.entries(timings)
      .filter(([_, info]) => info.duration > 5) // Only show components that took some time
      .sort((a, b) => b[1].duration - a[1].duration)
      .slice(0, 5); // Show top 5
    
    return (
      <div style={{ fontSize: '10px' }}>
        {components.length === 0 ? (
          <div>No significant renders detected</div>
        ) : (
          components.map(([name, info]) => (
            <div key={name} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{name.length > 20 ? name.substring(0, 18) + '...' : name}:</span>
              <span>{info.duration.toFixed(1)}ms ({info.renderCount}x)</span>
            </div>
          ))
        )}
      </div>
    );
  };

  const renderLongTasks = (tasks) => {
    return (
      <div style={{ fontSize: '10px' }}>
        {tasks.length === 0 ? (
          <div>No long tasks detected yet</div>
        ) : (
          tasks.slice(-3).map((task, index) => (
            <div key={index} style={{ marginBottom: '4px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                color: task.duration > 100 ? '#f55' : (task.duration > 70 ? '#fa5' : '#5af')
              }}>
                <span>{new Date(task.timestamp).toLocaleTimeString()}</span>
                <span>{task.duration}ms</span>
              </div>
              {task.operations && task.operations.length > 0 && (
                <div style={{ marginLeft: '10px', color: '#999' }}>
                  {task.operations[0].type}: {JSON.stringify(task.operations[0].details).substring(0, 40)}...
                </div>
              )}
            </div>
          ))
        )}
      </div>
    );
  };
  
  // Make the trackComponentRender function available to external hooks
  useEffect(() => {
    if (!visible || !monitorContainerRef.current) return;
    
    // Expose monitor functions for external hooks
    monitorContainerRef.current.__monitor = {
      trackComponentRender,
      trackOperation
    };
    
    return () => {
      if (monitorContainerRef.current) {
        delete monitorContainerRef.current.__monitor;
      }
    };
  }, [visible, trackComponentRender, trackOperation]);
  
  // Early return if not visible
  if (!visible) return null;
  
  return createPortal(
    <div 
      id="performance-monitor" 
      ref={monitorContainerRef}
      className={`performance-monitor ${expanded ? 'expanded' : 'collapsed'}`} 
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 9999,
        background: '#111',
        color: '#ffffff',
        padding: expanded ? '10px' : '5px',
        fontSize: '12px',
        fontFamily: 'monospace',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        maxHeight: expanded ? '50vh' : 'auto',
        maxWidth: expanded ? '600px' : 'auto',
        overflowY: expanded ? 'auto' : 'hidden',
        transition: 'all 0.3s ease',
        borderRadius: '4px 0 0 0',
        userSelect: 'none',
        display: visible ? 'block' : 'none',
        opacity: 0.9,
        ...positionStyle
      }}
    >
      {/* Header with controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #333',
        paddingBottom: '5px',
        marginBottom: '5px'
      }}>
        <div style={{ fontWeight: 'bold', color: getFpsColor(performanceData.fps) }}>
          FPS: {performanceData.fps.toFixed(1)}
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button 
            onClick={() => setConfig(prev => ({
              ...prev,
              monitorScriptExecution: !prev.monitorScriptExecution
            }))}
            style={{ 
              background: monitorConfig.monitorScriptExecution ? '#4c4' : '#444',
              border: 'none',
              padding: '2px 4px',
              borderRadius: '2px',
              fontSize: '10px',
              cursor: 'pointer',
              color: '#fff'
            }}
          >
            Script
          </button>
          <button 
            onClick={() => setConfig(prev => ({
              ...prev,
              monitorNetworkActivity: !prev.monitorNetworkActivity
            }))}
            style={{ 
              background: monitorConfig.monitorNetworkActivity ? '#4c4' : '#444',
              border: 'none',
              padding: '2px 4px',
              borderRadius: '2px',
              fontSize: '10px',
              cursor: 'pointer',
              color: '#fff'
            }}
          >
            Network
          </button>
          <button 
            onClick={() => setExpanded(!expanded)}
            style={{ 
              background: '#555', 
              border: 'none',
              padding: '2px 4px',
              borderRadius: '2px',
              fontSize: '10px',
              cursor: 'pointer',
              color: '#fff'
            }}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
      
      {/* Basic stats */}
      <div style={{ marginBottom: '8px' }}>
        <div>Memory: {(performanceData.memory / 1024 / 1024).toFixed(1)} MB</div>
        <div>Long tasks: {performanceData.longTasks.length} detected</div>
        {performanceData.longTasks.length > 0 && (
          <div>
            Latest: {performanceData.longTasks[performanceData.longTasks.length - 1]?.duration}ms
          </div>
        )}
      </div>
      
      {/* Only show detailed report when expanded */}
      {expanded && (
        <>
          {/* Operation counts */}
          <div style={{ marginBottom: '8px', borderTop: '1px solid #333', paddingTop: '5px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Recent Operations:</div>
            {renderOperationCounts(lastOperationsRef.current)}
          </div>
          
          {/* Component render tracking */}
          <div style={{ marginBottom: '8px', borderTop: '1px solid #333', paddingTop: '5px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Top Rendered Components:</div>
            {renderTopComponents(renderTimings.current)}
          </div>
          
          {/* Long tasks list */}
          <div style={{ marginBottom: '8px', borderTop: '1px solid #333', paddingTop: '5px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Recent Long Tasks:</div>
            {renderLongTasks(performanceData.longTasks)}
          </div>
          
          {/* Threshold controls */}
          <div style={{ marginTop: '10px', borderTop: '1px solid #333', paddingTop: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <label style={{ marginRight: '5px', fontSize: '10px' }}>
                Long task threshold (ms):
              </label>
              <input 
                type="number" 
                value={monitorConfig.longTaskThreshold}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  longTaskThreshold: parseInt(e.target.value) || 50
                }))}
                style={{ width: '40px', padding: '2px', fontSize: '10px' }}
              />
            </div>
          </div>
        </>
      )}
    </div>,
    document.body
  );
};

export default PerformanceMonitor;

/**
 * Hook to track render times of components
 * @param {string} componentName - Name of the component
 */
export const useTrackRender = (componentName) => {
  const monitorRef = useRef(null);
  const timeRef = useRef(0);
  
  useEffect(() => {
    // Get a reference to the monitor instance
    monitorRef.current = document.querySelector('#performance-monitor');
    
    if (!monitorRef.current) return;
    
    // Start timing this render
    const endTracking = monitorRef.current.__monitor?.trackComponentRender 
      ? monitorRef.current.__monitor.trackComponentRender(componentName, 'mount')
      : () => {};
    
    // Call the end tracking function when unmounting
    return () => {
      if (typeof endTracking === 'function') {
        endTracking();
      }
    };
  }, [componentName]);
  
  // Track updates
  useEffect(() => {
    if (!monitorRef.current) return;
    
    // Skip the first render (already tracked by mount)
    if (timeRef.current === 0) {
      timeRef.current = Date.now();
      return;
    }
    
    // Start timing this update
    const endTracking = monitorRef.current.__monitor?.trackComponentRender 
      ? monitorRef.current.__monitor.trackComponentRender(componentName, 'update')
      : () => {};
    
    // End tracking immediately since this is for the current render
    if (typeof endTracking === 'function') {
      setTimeout(endTracking, 0);
    }
  });
  
  return null;
};

/**
 * HOC to wrap components with render tracking
 * @param {React.ComponentType} Component - Component to wrap
 * @param {string} componentName - Name of the component (optional)
 */
export const withRenderTracking = (Component, componentName = Component.displayName || Component.name) => {
  const TrackedComponent = (props) => {
    useTrackRender(componentName);
    
    const startTime = performance.now();
    
    useEffect(() => {
      // Log render time
      const renderTime = performance.now() - startTime;
      if (renderTime > 16) {
        console.warn(`[SLOW RENDER] ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    });
    
    return <Component {...props} />;
  };
  
  TrackedComponent.displayName = `Tracked(${componentName})`;
  return TrackedComponent;
};

/**
 * SimplePerformanceMonitor - An easier-to-use version of the performance monitor
 * 
 * @param {Object} props 
 * @param {boolean} props.enabled - Whether the monitor should start enabled
 * @param {string} props.position - Position on screen ('top-right', 'top-left', 'bottom-right', 'bottom-left')
 * @param {boolean} props.expanded - Whether to start in expanded mode
 * @param {string[]} props.trackComponents - Array of component names to track
 * @returns {JSX.Element}
 */
export const SimplePerformanceMonitor = ({ 
  enabled = false,
  position = 'bottom-right',
  expanded = false,
  trackComponents = []
}) => {
  // Derive position styles
  const getPositionStyle = () => {
    switch (position) {
      case 'top-right':
        return { top: 0, right: 0, borderRadius: '0 0 0 4px' };
      case 'top-left':
        return { top: 0, left: 0, borderRadius: '0 0 4px 0' };
      case 'bottom-left':
        return { bottom: 0, left: 0, borderRadius: '0 4px 0 0' };
      case 'bottom-right':
      default:
        return { bottom: 0, right: 0, borderRadius: '4px 0 0 0' };
    }
  };

  // Configure the monitor
  const config = {
    longTaskThreshold: 50,
    fpsWarningThreshold: 30,
    showComponentTimings: true,
    showStackTraces: true,
    logToConsole: true,
    componentFilter: trackComponents,
    monitorScriptExecution: true,
    monitorNetworkActivity: true
  };

  return (
    <PerformanceMonitor 
      enabled={enabled} 
      config={config}
      positionStyle={getPositionStyle()}
      initialExpanded={expanded}
    />
  );
}; 