#!/usr/bin/env node

/**
 * Enhanced Component and Story Generator
 * 
 * This script provides a unified interface for generating React components 
 * and Storybook stories with TypeScript support, following atomic design principles.
 * 
 * Features:
 * - Creates component TSX/JSX files with proper imports and documentation
 * - Organizes components in their own subdirectories (e.g., Button/Button.tsx)
 * - Generates co-located CSS files in the same directory as the component
 * - Creates index.ts files for clean imports (import { Button } from '@/components/atoms/Button')
 * - Uses TypeScript interfaces for type-safety instead of PropTypes
 * - Creates components following atomic design (atom, molecule, organism, layout)
 * - Adds Story file for Storybook documentation with interaction tests
 * - Generates Vitest test files with essential test cases
 * - Supports TypeScript by default
 * 
 * Usage:
 * yarn generate --name=Button --type=atom
 * 
 * Legacy subcommand usage:
 * yarn generate component --name=Button --type=atom
 * yarn generate story --component=Button --type=atom --interactions --context=portfolio
 * 
 * Options:
 * --name: The name of the component (required)
 * --type: Atomic design type (atom, molecule, organism, layout) (default: atom)
 * --dir: Custom component directory (optional, defaults to src/components/[atoms|molecules|organisms|layout]/[ComponentName])
 * --files: Which files to generate (all, tsx, css, story, test, index) (default: all)
 * --js: Generate JavaScript instead of TypeScript (default: false)
 * 
 * Advanced story options:
 * --interactions: Include interaction tests (optional, flag)
 * --context: Add context support (optional, values: portfolio, theme)
 * --detailed: Add detailed documentation templates (optional, flag)
 * --subdir: For components in nested directories (e.g., Experience/Node)
 */

import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Get the current file's directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  // Component generation config
  defaultComponentType: 'atom', // atom, molecule, organism, layout
  defaultComponentDir: 'src/components',
  componentTypes: ['atom', 'molecule', 'organism', 'layout'],
  designTokensPath: 'src/assets/css/design-system/tokens',
  createCss: true,
  createStory: true,
  createTest: true,
  createIndex: true,  // Generate index.ts file for clean imports
  useTypeScript: true,
  importStyles: true,
  memoize: true,
  addPropTypes: false,
  addJsDoc: true,
  
  // Folder mapping for atomic types
  atomicTypesToFolders: {
    atom: 'atoms',
    molecule: 'molecules',
    organism: 'organisms',
    layout: 'layout'
  }
};

// Parse CLI arguments into an object
function parseArgs(args) {
  const result = {};
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const parts = arg.slice(2).split('=');
      // Handle flags (arguments without values)
      if (parts.length === 1) {
        result[parts[0]] = true;
      } else {
        const [key, value] = parts;
        result[key] = value;
      }
    }
  });
  return result;
}

// ---------------------------
// Component Generation Logic
// ---------------------------

// Create a directory if it doesn't exist
async function ensureDirectoryExists(directory) {
  try {
    await fs.mkdir(directory, { recursive: true });
    return true;
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(chalk.red(`Error creating directory ${directory}: ${err.message}`));
      return false;
    }
    return true;
  }
}

// Generate the component file
async function generateComponentFile(componentPath, componentName, componentType, useTypeScript = true) {
  const extension = useTypeScript ? 'tsx' : 'jsx';
  const filename = `${componentName}.${extension}`;
  const filepath = path.join(componentPath, filename);
  
  // CSS import path calculation
  const cssImportPath = config.importStyles
    ? `import './${componentName}.css';`
    : '';
  
  // Template based on component type
  let template = '';
  
  // Atom Component Template
  if (componentType === 'atom') {
    template = `import React${config.memoize ? ', { memo }' : ''} from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
${cssImportPath}

${config.addJsDoc ? `/**
 * ${componentName} atomic component with framer-motion animation support
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */` : ""}
${useTypeScript ? `interface ${componentName}Props {
  /** Component content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  [key: string]: any;
}` : ""}

const ${componentName} = (${useTypeScript ? `props: ${componentName}Props` : 'props'}) => {
  const { children, className = '', ...rest } = props;
  const { animationEnabled, shouldReduceMotion, fadeInVariants } = useAnimation();
  
  // Only animate if animations are enabled and reduced motion is not preferred
  const shouldAnimate = animationEnabled && !shouldReduceMotion;
  
  // Component-specific animation variants
  const ${componentName.toLowerCase()}Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    }
  };
  
  return (
    <motion.div 
      className={\`${componentName.toLowerCase()} \${className}\`}
      variants={${componentName.toLowerCase()}Variants}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      {...rest}
    >
      {children}
    </motion.div>
  );
};

${config.memoize ? `// Apply memoization for performance optimization
export default memo(${componentName});` : `export default ${componentName};`}
`;
  }
  
  // Molecule Component Template
  else if (componentType === 'molecule') {
    template = `import React${config.memoize ? ', { memo }' : ''} from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
${cssImportPath}

${config.addJsDoc ? `/**
 * ${componentName} molecule component with framer-motion animation support
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */` : ""}
${useTypeScript ? `interface ${componentName}Props {
  /** Component content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  [key: string]: any;
}` : ""}

const ${componentName} = (${useTypeScript ? `props: ${componentName}Props` : 'props'}) => {
  const { children, className = '', ...rest } = props;
  const { animationEnabled, shouldReduceMotion, fadeInVariants } = useAnimation();
  
  // Only animate if animations are enabled and reduced motion is not preferred
  const shouldAnimate = animationEnabled && !shouldReduceMotion;
  
  // Component-specific animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    }
  };
  
  return (
    <motion.div 
      className={\`${componentName.toLowerCase()} \${className}\`}
      variants={containerVariants}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      {...rest}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

${config.memoize ? `// Apply memoization for performance optimization
export default memo(${componentName});` : `export default ${componentName};`}
`;
  }
  
  // Organism Component Template
  else if (componentType === 'organism') {
    template = `import React${config.memoize ? ', { memo }' : ''} from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
${cssImportPath}

${config.addJsDoc ? `/**
 * ${componentName} organism component with framer-motion animation support
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */` : ""}
${useTypeScript ? `interface ${componentName}Props {
  /** Optional title for the organism */
  title?: string; 
  /** Component content */
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  [key: string]: any;
}` : ""}

const ${componentName} = (${useTypeScript ? `props: ${componentName}Props` : 'props'}) => {
  const { title, children, className = '', ...rest } = props;
  const { animationEnabled, shouldReduceMotion, slideUpVariants } = useAnimation();
  
  // Only animate if animations are enabled and reduced motion is not preferred
  const shouldAnimate = animationEnabled && !shouldReduceMotion;
  
  // Component-specific animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };
  
  return (
    <motion.section 
      className={\`${componentName.toLowerCase()} \${className}\`}
      variants={containerVariants}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      {...rest}
    >
      {title && (
        <motion.h2 
          className="organism-title"
          variants={titleVariants}
        >
          {title}
        </motion.h2>
      )}
      <motion.div 
        className="organism-content"
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

${config.memoize ? `// Apply memoization for performance optimization
export default memo(${componentName});` : `export default ${componentName};`}
`;
  }
  
  // Layout Component Template
  else if (componentType === 'layout') {
    template = `import React${config.memoize ? ', { memo }' : ''} from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
${cssImportPath}

${config.addJsDoc ? `/**
 * ${componentName} layout component with framer-motion animation support
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */` : ""}
${useTypeScript ? `interface ${componentName}Props {
  /** Component content */
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  [key: string]: any;
}` : ""}

const ${componentName} = (${useTypeScript ? `props: ${componentName}Props` : 'props'}) => {
  const { children, className = '', ...rest } = props;
  const { animationEnabled, shouldReduceMotion } = useAnimation();
  
  // Only animate if animations are enabled and reduced motion is not preferred
  const shouldAnimate = animationEnabled && !shouldReduceMotion;
  
  // Subtle layout animation variant
  const layoutVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };
  
  return (
    <motion.div 
      className={\`${componentName.toLowerCase()} \${className}\`}
      variants={layoutVariants}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      layout // Smooth layout transitions when component dimensions change
      layoutId="${componentName.toLowerCase()}"
      {...rest}
    >
      {children}
    </motion.div>
  );
};

${config.memoize ? `// Apply memoization for performance optimization
export default memo(${componentName});` : `export default ${componentName};`}
`;
  }
  
  try {
    await fs.writeFile(filepath, template);
    console.log(chalk.green(`✓ Created component file: ${filename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating component file: ${err.message}`));
    return false;
  }
}

// Generate the CSS file
async function generateCssFile(componentName, componentType, componentPath) {
  const cssFilename = `${componentName}.css`;
  const cssFilepath = path.join(componentPath, cssFilename);
  
  // CSS template with Tailwind reference and framer-motion comments
  const cssTemplate = `/**
 * ${componentName} Component Styles
 * 
 * Styling for the ${componentName} component
 * This project uses Tailwind CSS. See tailwind.config.js for configuration.
 * For custom styles beyond Tailwind, use the classes defined below.
 * 
 * Note: Animations are managed by framer-motion through the AnimationContext.
 * - Do NOT add CSS animations or transitions (use framer-motion instead)
 * - See AnimationContext.tsx for predefined animation variants
 */

.${componentName.toLowerCase()} {
  /* Add custom styles here that go beyond Tailwind's utilities */
  /* Do not include animations or transitions - use framer-motion instead */
}

/* 
 * For responsive design, use Tailwind's responsive prefixes in your component's JSX:
 * <div className="md:flex lg:p-4 dark:bg-gray-800"></div>
 * 
 * Or add custom responsive styles here:
 */
@media (max-width: 768px) {
  .${componentName.toLowerCase()} {
    /* Add mobile-specific styles if needed (no animations) */
  }
}

/*
 * For users with reduced motion preferences, framer-motion will automatically
 * disable animations via the AnimationContext. No need for CSS media queries.
 */
`;
  
  try {
    await fs.writeFile(cssFilepath, cssTemplate);
    console.log(chalk.green(`✓ Created CSS file: ${cssFilename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating CSS file: ${err.message}`));
    return false;
  }
}

// Generate the story file for a component
async function generateComponentStoryFile(componentPath, componentName, componentType, useTypeScript = true) {
  // Map to storybook format
  const extension = useTypeScript ? 'tsx' : 'jsx';
  const storyFilename = `${componentName}.stories.${extension}`;
  const storyFilepath = path.join(componentPath, storyFilename);
  
  // Generate appropriate import paths
  const relativeImportPath = './';
  
  // Build the story content
  let content = `import type { Meta, StoryObj } from '@storybook/react';
import ${componentName} from '${relativeImportPath}${componentName}';
import { AnimationProvider } from '@context/AnimationContext';

const meta = {
  title: '${capitalizeFirstLetter(componentType)}s/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${componentName} component with framer-motion animations integrated with AnimationContext.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    // Define arg types here
    className: { control: 'text' }
  },
  decorators: [
    (Story) => (
      <AnimationProvider>
        <Story />
      </AnimationProvider>
    )
  ]
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Content goes here',
    className: ''
  }
};

export const CustomStyle: Story = {
  args: {
    children: 'Styled component',
    className: 'custom-style'
  }
};

/**
 * Example showing the component with animations disabled.
 * This is useful for users who prefer reduced motion or for
 * testing how the component renders without animations.
 */
export const WithAnimationsDisabled: Story = {
  args: {
    children: 'No animations',
    className: ''
  },
  decorators: [
    (Story) => (
      <AnimationProvider>
        <div data-testid="animation-disabled-container">
          <Story />
        </div>
      </AnimationProvider>
    )
  ],
  play: async ({ canvasElement }) => {
    // This simulates a user who has animations disabled
    window.__DEBUG_FLAGS = { 
      ...window.__DEBUG_FLAGS,
      disableAnimations: true 
    };
    
    // The component should detect this via AnimationContext
  }
};
`;

  // Add interaction tests if it's an atom or molecule component
  if (componentType === 'atom' || componentType === 'molecule') {
    content += `
/**
 * This example demonstrates interactions with the component.
 * The framer-motion animations should respond appropriately.
 */
export const WithInteractions: Story = {
  args: {
    children: 'Interactive component',
    className: 'interactive-test'
  },
  play: async ({ canvasElement }) => {
    // Add interaction tests here using @storybook/test
    // For example, testing hover animations, click responses, etc.
  }
};
`;
  }

  // Add responsive examples for layout components
  if (componentType === 'layout') {
    content += `
/**
 * This example demonstrates how the component behaves in a responsive layout.
 * The layout animations should adjust appropriately.
 */
export const ResponsiveLayout: Story = {
  args: {
    children: (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <div style={{ padding: '20px', background: '#f0f0f0', marginBottom: '10px' }}>
          Header content
        </div>
        <div style={{ padding: '20px', background: '#e0e0e0' }}>
          Main content that will affect layout animations when resizing
        </div>
      </div>
    )
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
};
`;
  }

  try {
    await fs.writeFile(storyFilepath, content);
    console.log(chalk.green(`✓ Created story file: ${storyFilename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating story file: ${err.message}`));
    return false;
  }
}

// Generate the test file
async function generateTestFile(componentPath, componentName, useTypeScript = true) {
  const extension = useTypeScript ? 'tsx' : 'jsx';
  const testFilename = `${componentName}.test.${extension}`;
  const testFilepath = path.join(componentPath, testFilename);
  
  const testTemplate = `import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ${componentName} from './${componentName}';
import { AnimationProvider } from '@context/AnimationContext';

// Mock the AnimationContext to test animation behavior
vi.mock('@context/AnimationContext', () => ({
  useAnimation: vi.fn().mockReturnValue({
    animationEnabled: true,
    shouldReduceMotion: false,
    fadeInVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideUpVariants: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }
  }),
  AnimationProvider: ({ children }) => <div data-testid="animation-provider">{children}</div>
}));

// Helper function to render with animation context
const renderWithAnimationContext = (ui) => {
  return render(
    <AnimationProvider>
      {ui}
    </AnimationProvider>
  );
};

describe('${componentName} Component', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithAnimationContext(<${componentName}>Test content</${componentName}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    const { container } = renderWithAnimationContext(<${componentName} className="custom-class">Test</${componentName}>);
    const element = container.querySelector('.${componentName.toLowerCase()}');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('${componentName.toLowerCase()}');
  });
  
  it('renders children correctly', () => {
    const testId = 'test-child';
    renderWithAnimationContext(
      <${componentName}>
        <div data-testid={testId}>Child component</div>
      </${componentName}>
    );
    
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveTextContent('Child component');
  });

  it('uses motion component with correct animation props', () => {
    const { container } = renderWithAnimationContext(<${componentName}>Test</${componentName}>);
    const motionElement = container.querySelector('.${componentName.toLowerCase()}');
    
    // Check that it's using framer-motion
    // Note: We can't directly test for motion props in JSDOM, but we can check for data attributes
    expect(motionElement).toBeTruthy();
    
    // The component should have the animation className
    expect(motionElement).toHaveClass('${componentName.toLowerCase()}');
  });
  
  it('respects AnimationContext settings', () => {
    // Mock AnimationContext with animations disabled
    const useAnimationMock = vi.fn().mockReturnValueOnce({
      animationEnabled: false,
      shouldReduceMotion: true,
      fadeInVariants: { 
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }
    });
    
    require('@context/AnimationContext').useAnimation.mockImplementation(useAnimationMock);
    
    renderWithAnimationContext(<${componentName}>Test with animations disabled</${componentName}>);
    
    // Check that useAnimation was called
    expect(useAnimationMock).toHaveBeenCalled();
  });
});
`;
  
  try {
    await fs.writeFile(testFilepath, testTemplate);
    console.log(chalk.green(`✓ Created test file: ${testFilename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating test file: ${err.message}`));
    return false;
  }
}

// Generate an index.ts file for the component
async function generateIndexFile(componentPath, componentName, useTypeScript = true) {
  const extension = useTypeScript ? 'ts' : 'js';
  const indexFilename = `index.${extension}`;
  const indexFilepath = path.join(componentPath, indexFilename);
  
  // Create a simple index file that exports the component
  const indexContent = `/**
 * ${componentName} Component
 * 
 * @module ${componentName}
 */

export { default } from './${componentName}';
export * from './${componentName}';
`;
  
  try {
    await fs.writeFile(indexFilepath, indexContent);
    console.log(chalk.green(`✓ Created index file: ${indexFilename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating index file: ${err.message}`));
    return false;
  }
}

// ---------------------------
// Standalone Story Generation Logic
// ---------------------------

// Generate a standalone story file for an existing component
async function generateStandaloneStoryFile(args) {
  const componentName = args.component;
  const atomicType = args.type;
  const hasInteractions = !!args.interactions;
  const context = args.context;
  const detailed = !!args.detailed;
  const useTypeScript = args.js !== true;
  const subdir = args.subdir || '';
  
  // Validate component type
  if (!config.componentTypes.includes(atomicType)) {
    console.error(chalk.red(`Error: Invalid component type "${atomicType}".`));
    console.log(chalk.yellow(`Valid types: ${config.componentTypes.join(', ')}`));
    return false;
  }
  
  // Determine paths
  const pluralType = config.atomicTypesToFolders[atomicType] || atomicType;
  const baseComponentName = componentName;
  
  // Use the provided path or construct from atomic type with component subdirectory
  const componentBasePath = args.path || 
    path.join(process.cwd(), 'src/components', pluralType);
  const componentPath = path.join(componentBasePath, baseComponentName);
  
  // Check if component exists
  try {
    let componentExists = false;
    const jsxPath = path.join(componentPath, `${baseComponentName}.jsx`);
    const tsxPath = path.join(componentPath, `${baseComponentName}.tsx`);
    
    if (await fileExists(jsxPath) || await fileExists(tsxPath)) {
      componentExists = true;
    }
    
    if (!componentExists) {
      console.error(chalk.red(`Error: Component ${baseComponentName} not found at ${componentPath}`));
      return false;
    }
  } catch (err) {
    console.error(chalk.red(`Error checking component: ${err.message}`));
    return false;
  }
  
  // Also check for CSS file, and if not found, generate it
  const cssPath = path.join(componentPath, `${baseComponentName}.css`);
  if (!(await fileExists(cssPath)) && config.createCss) {
    console.log(chalk.yellow(`CSS file not found for ${baseComponentName}, generating one...`));
    await generateCssFile(baseComponentName, atomicType, componentPath);
  }
  
  // Also check for index file, and if not found, generate it
  const indexTsPath = path.join(componentPath, 'index.ts');
  const indexJsPath = path.join(componentPath, 'index.js');
  if (!(await fileExists(indexTsPath)) && !(await fileExists(indexJsPath)) && config.createIndex) {
    console.log(chalk.yellow(`Index file not found for ${baseComponentName}, generating one...`));
    await generateIndexFile(componentPath, baseComponentName, useTypeScript);
  }
  
  // Determine story path
  const storyExtension = useTypeScript ? 'tsx' : 'jsx';
  const storyBaseName = `${baseComponentName}.stories.${storyExtension}`;
  const storiesPath = args.storiesPath || 'src/components';
  
  // Construct full story path - story goes in the component subdirectory
  const storyPath = args.path ?
    path.join(args.path, storyBaseName) :
    path.join(componentPath, storyBaseName);
  
  // Create imports section
  let imports = `import type { Meta, StoryObj } from '@storybook/react';
import ${baseComponentName} from './${baseComponentName}';`;

  // Add interaction test imports if needed
  if (hasInteractions) {
    imports += `
import { userEvent, within, waitFor } from '@storybook/test';`;
  }

  // Add context imports if needed
  if (context) {
    if (context === 'portfolio') {
      imports += `
import { PortfolioProvider } from '@context/PortfolioContext';`;
    } else if (context === 'theme') {
      imports += `
import { ThemeProvider } from '@context/ThemeContext';`;
    }
  }

  // Create story configuration
  const storyConfig = `
const meta = {
  title: '${capitalizeFirstLetter(atomicType)}/${baseComponentName}',
  component: ${baseComponentName},
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
    docs: {
      description: {
        component: '${baseComponentName} component description goes here'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    // Define your argTypes here
  }
} satisfies Meta<typeof ${baseComponentName}>;

export default meta;
type Story = StoryObj<typeof meta>;`;

  // Create story examples
  let stories = `
export const Default: Story = {
  args: {
    // Default props
  }
};

export const Variant: Story = {
  args: {
    // Variant props
  }
};`;

  // Add interaction tests if requested
  if (hasInteractions) {
    stories += `

export const WithInteractions: Story = {
  args: {
    // Add props for interaction test
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Example interaction test
    await userEvent.click(canvas.getByText('Click me'));
    await waitFor(() => {
      expect(canvas.getByText('Clicked')).toBeInTheDocument();
    });
  }
};`;
  }

  // Add context decorator if requested
  if (context) {
    if (context === 'portfolio') {
      stories += `

// With Portfolio Context
export const WithPortfolioContext: Story = {
  args: {
    // Props for context example
  },
  decorators: [
    (Story) => (
      <PortfolioProvider>
        <Story />
      </PortfolioProvider>
    ),
  ],
};`;
    } else if (context === 'theme') {
      stories += `

// With Theme Context
export const WithThemeContext: Story = {
  args: {
    // Props for theme example
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};`;
    }
  }

  // Add detailed documentation sections if requested
  if (detailed) {
    stories += `

/**
 * ## Component Usage
 * 
 * \`\`\`jsx
 * import { ${baseComponentName} } from 'components/${pluralType}/${baseComponentName}';
 * 
 * function MyComponent() {
 *   return <${baseComponentName} />;
 * }
 * \`\`\`
 * 
 * ## Properties
 * 
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | prop1 | string | undefined | Description of prop1 |
 * | prop2 | number | 0 | Description of prop2 |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Uses semantic HTML
 * - Provides appropriate ARIA attributes
 * - Supports keyboard navigation
 * 
 * ## Edge Cases
 * 
 * The following stories demonstrate edge cases and special scenarios.
 */
export const EdgeCase: Story = {
  args: {
    // Edge case props
  }
};`;
  }

  // Add responsive testing examples if it's a UI component
  if (atomicType === 'atom' || atomicType === 'molecule') {
    stories += `

// Responsive behavior example
export const Responsive: Story = {
  args: {
    // Props for demonstrating responsive behavior
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};`;
  }

  // Combine all content
  const finalStoryContent = imports + '\n\n' + storyConfig + '\n\n' + stories;

  // Create the stories directory if it doesn't exist
  const storyDir = path.dirname(storyPath);
  try {
    await ensureDirectoryExists(storyDir);
  } catch (err) {
    console.error(chalk.red(`Error creating story directory: ${err.message}`));
    return false;
  }

  // Write the story file
  try {
    await fs.writeFile(storyPath, finalStoryContent);
    console.log(chalk.green(`✅ Successfully generated story at ${storyPath}`));
    console.log(chalk.gray(`Options applied: ${Object.keys(args).filter(key => key !== 'component' && key !== 'type' && key !== 'path').join(', ') || 'none'}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error writing story file: ${err.message}`));
    return false;
  }
}

// ---------------------------
// Helper Functions
// ---------------------------

// Check if a file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ---------------------------
// Main Functions
// ---------------------------

// Generate a component with all associated files
async function generateComponent(args) {
  const componentName = args.name;
  const componentType = args.type || config.defaultComponentType;
  const folderName = config.atomicTypesToFolders[componentType] || componentType;
  
  // Use the provided directory or construct the default path with a subdirectory for the component
  const baseDir = args.dir || `${config.defaultComponentDir}/${folderName}`;
  const componentDir = `${baseDir}/${componentName}`;
  
  const createFiles = args.files || 'all'; // all, tsx, css, story, test, index
  const useTypeScript = args.js !== true;
  
  console.log(chalk.blue.bold('Component Generator'));
  console.log(chalk.gray(`Creating ${componentType} component: ${componentName}`));
  
  // Validate component type
  if (!config.componentTypes.includes(componentType)) {
    console.error(chalk.red(`Error: Invalid component type "${componentType}".`));
    console.log(chalk.yellow(`Valid types: ${config.componentTypes.join(', ')}`));
    return false;
  }
  
  // 1. Create component directory
  const componentPath = path.join(process.cwd(), componentDir);
  const dirCreated = await ensureDirectoryExists(componentPath);
  if (!dirCreated) return false;
  
  // 2. Create component files
  let success = true;
  
  if (createFiles === 'all' || createFiles === 'tsx' || createFiles === 'jsx') {
    success = await generateComponentFile(componentPath, componentName, componentType, useTypeScript);
    if (!success) return false;
  }
  
  if (config.createCss && (createFiles === 'all' || createFiles === 'css')) {
    success = await generateCssFile(componentName, componentType, componentPath);
    if (!success) console.log(chalk.yellow('⚠ CSS file creation failed, but continuing...'));
  }
  
  if (config.createStory && (createFiles === 'all' || createFiles === 'story')) {
    success = await generateComponentStoryFile(componentPath, componentName, componentType, useTypeScript);
    if (!success) console.log(chalk.yellow('⚠ Story file creation failed, but continuing...'));
  }
  
  if (config.createTest && (createFiles === 'all' || createFiles === 'test')) {
    success = await generateTestFile(componentPath, componentName, useTypeScript);
    if (!success) console.log(chalk.yellow('⚠ Test file creation failed, but continuing...'));
  }
  
  if (config.createIndex && (createFiles === 'all' || createFiles === 'index')) {
    success = await generateIndexFile(componentPath, componentName, useTypeScript);
    if (!success) console.log(chalk.yellow('⚠ Index file creation failed, but continuing...'));
  }
  
  console.log(chalk.green.bold(`✓ Component ${componentName} created successfully!`));
  console.log(chalk.gray(`Location: ${componentPath}`));
  
  return true;
}

// Main function
async function main() {
  const cmdArgs = process.argv.slice(2);
  const args = parseArgs(cmdArgs);
  
  // Check for command (first arg that doesn't start with --)
  const command = cmdArgs.find(arg => !arg.startsWith('--'));
  const isSimpleMode = !command || (command.startsWith('--'));
  
  if (isSimpleMode) {
    // Simple mode - just generate everything with one command
    if (!args.name && !args.component) {
      console.error(chalk.red('Error: Component name is required.'));
      console.log(chalk.yellow('Usage: yarn generate --name=MyComponent --type=atom'));
      process.exit(1);
    }

    // Use either name or component parameter
    const componentName = args.name || args.component;
    const componentType = args.type || config.defaultComponentType;
    
    // Make sure both args are available for component generation
    args.name = componentName;
    args.type = componentType;
    
    // Generate component first
    await generateComponent(args);
    
    console.log(chalk.blue('\nComponent generation complete!\n'));
    
    return true;
  }
  
  // Legacy mode with subcommands
  if (command === 'component') {
    if (!args.name) {
      console.error(chalk.red('Error: Component name is required.'));
      console.log(chalk.yellow('Usage: yarn generate component --name=MyComponent --type=atom'));
      process.exit(1);
    }
    
    await generateComponent(args);
  } 
  else if (command === 'story') {
    if (!args.component) {
      console.error(chalk.red('Error: Component name is required.'));
      console.log(chalk.yellow('Usage: yarn generate story --component=MyComponent --type=atom'));
      process.exit(1);
    }
    
    if (!args.type) {
      console.error(chalk.red('Error: Component type is required.'));
      console.log(chalk.yellow('Usage: yarn generate story --component=MyComponent --type=atom'));
      process.exit(1);
    }
    
    await generateStandaloneStoryFile(args);
  }
  else {
    console.error(chalk.red(`Error: Unknown command "${command}"`));
    console.log(chalk.yellow('Usage: yarn generate --name=MyComponent --type=atom'));
    console.log(chalk.yellow('Or use subcommands: yarn generate component|story [options]'));
    process.exit(1);
  }
}

// Run the script
main().catch(err => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
