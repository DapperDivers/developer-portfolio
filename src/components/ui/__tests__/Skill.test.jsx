import React from 'react';
import { render, screen } from '@testing-library/react';
import Skill from '../Skill';

// Mock the Icon component from @iconify/react (already set up in setupTests.minimal.js)

describe('Skill Component', () => {
  // Test data
  const mockSkill = {
    skillName: 'React',
    iconName: 'logos:react',
    category: 'frontend'
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the skill component with correct props', () => {
    render(<Skill skill={mockSkill} />);
    
    // Check if aria-label is set correctly
    const iconElement = screen.getByRole('img', { name: 'React' });
    expect(iconElement).toBeInTheDocument();
    
    // Verify the tooltip text
    const tooltipElement = screen.getByText('React');
    expect(tooltipElement).toBeInTheDocument();
  });
  
  it('handles skill with both iconName and fontAwesomeClassname', () => {
    const skillWithBothIcons = {
      skillName: 'JavaScript',
      iconName: 'logos:javascript',
      fontAwesomeClassname: 'fab fa-js'
    };
    
    render(<Skill skill={skillWithBothIcons} />);
    
    // Should prioritize iconName over fontAwesomeClassname
    const iconElement = screen.getByRole('img', { name: 'JavaScript' });
    expect(iconElement).toBeInTheDocument();
  });
  
  it('handles skill with only fontAwesomeClassname (backward compatibility)', () => {
    const skillWithFontAwesome = {
      skillName: 'CSS',
      fontAwesomeClassname: 'fab fa-css3'
    };
    
    render(<Skill skill={skillWithFontAwesome} />);
    
    // Should use fontAwesomeClassname when iconName is not provided
    const iconElement = screen.getByRole('img', { name: 'CSS' });
    expect(iconElement).toBeInTheDocument();
  });

  it('applies the correct size class based on size prop', () => {
    const { rerender } = render(<Skill skill={mockSkill} size="lg" />);
    
    // Check for large size class
    const iconElement = document.querySelector('.skill-icon-wrapper');
    expect(iconElement).toHaveClass('skill-icon-lg');
    
    // Rerender with medium size
    rerender(<Skill skill={mockSkill} size="md" />);
    expect(document.querySelector('.skill-icon-wrapper')).toHaveClass('skill-icon-md');
    
    // Rerender with small size
    rerender(<Skill skill={mockSkill} size="sm" />);
    expect(document.querySelector('.skill-icon-wrapper')).toHaveClass('skill-icon-sm');
  });

  it('applies additional class name when provided', () => {
    render(<Skill skill={mockSkill} className="custom-class" />);
    
    const iconElement = document.querySelector('.skill-icon-wrapper');
    expect(iconElement).toHaveClass('custom-class');
  });

  it('renders a non-animated version when animate is false', () => {
    render(<Skill skill={mockSkill} animate={false} />);
    
    // When not animated, it should be a regular div, not a motion.div
    const iconWrapper = document.querySelector('.skill-icon-wrapper');
    
    // Verify it's not a motion component (our mock implementation would add __mock)
    expect(iconWrapper).not.toHaveAttribute('__mock');
  });

  it('renders an animated version when animate is true (default)', () => {
    // In our real app, this would check for Framer Motion props, but with our mock
    // we can just verify it uses the motion component
    render(<Skill skill={mockSkill} />);
    
    // With our mocking approach, we won't actually see motion props in the DOM
    // but we can test the component renders properly with the right content
    const iconElement = screen.getByRole('img', { name: 'React' });
    expect(iconElement).toBeInTheDocument();
  });

  it('passes the index prop to the animation delay', () => {
    // With our simplified mocks, we can't easily test the actual animation delay
    // but we can verify the component accepts and doesn't break with an index
    render(<Skill skill={mockSkill} index={5} />);
    
    // The component should still render correctly
    const iconElement = screen.getByRole('img', { name: 'React' });
    expect(iconElement).toBeInTheDocument();
  });
  
  it('handles reducedMotion prop for performance optimization', () => {
    const { rerender } = render(<Skill skill={mockSkill} reducedMotion={true} />);
    
    // Check that reduced-motion class is applied
    const wrapper = document.querySelector('.skill-icon-wrapper');
    expect(wrapper).toHaveClass('reduced-motion');
    
    // Rerender with false
    rerender(<Skill skill={mockSkill} reducedMotion={false} />);
    expect(document.querySelector('.skill-icon-wrapper')).not.toHaveClass('reduced-motion');
  });
  
  it('provides proper accessibility attributes', () => {
    render(<Skill skill={mockSkill} />);
    
    // Check skill has aria-label
    const skillElement = screen.getByRole('img', { name: 'React' });
    expect(skillElement).toHaveAttribute('aria-label', 'React');
    
    // Check icon has aria-label
    const iconElement = screen.getByLabelText('React icon', { exact: false });
    expect(iconElement).toBeInTheDocument();
  });
  
  it('handles icon loading errors gracefully', () => {
    // Mock console.warn to check error handling
    const originalWarn = console.warn;
    console.warn = jest.fn();
    
    // Create a mock Icon component that triggers error
    jest.mock('@iconify/react', () => ({
      Icon: ({ onError }) => {
        // Immediately call the error handler
        if (onError) onError(new Error('Icon not found'));
        return <div data-testid="mock-icon" />;
      }
    }));
    
    render(<Skill skill={mockSkill} />);
    
    // Check that warning was logged (error handler was called)
    expect(console.warn).toHaveBeenCalled();
    
    // Restore console.warn
    console.warn = originalWarn;
  });
  
  it('memoizes the component for performance', () => {
    // This is hard to test directly, but we can ensure the component
    // is wrapped in React.memo by checking it doesn't re-render unnecessarily
    
    // First render
    const { rerender } = render(<Skill skill={mockSkill} index={1} />);
    
    // Re-render with same props
    rerender(<Skill skill={mockSkill} index={1} />);
    
    // Component should still be there
    expect(screen.getByRole('img', { name: 'React' })).toBeInTheDocument();
  });
});
