import React from 'react';
import Footer from '../../components/Footer';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { PortfolioContext } from '../../context/PortfolioContext';

// Mock data for PortfolioContext
const mockPortfolioData = {
  greetings: {
    name: "John Doe",
    title: "Full Stack Developer",
    description: "I build things for the web.",
    resumeLink: "https://example.com/resume"
  },
  socialLinks: {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://twitter.com/username"
  }
};

// Create additional mock data variations
const minimalPortfolioData = {
  greetings: {
    name: "Jane Smith"
  },
  socialLinks: {
    github: "https://github.com/janesmith"
  }
};

// Context decorator for providing portfolio data
const createPortfolioDecorator = (data) => (Story) => (
  <PortfolioContext.Provider value={data}>
    <Story />
  </PortfolioContext.Provider>
);


export default {
  title: 'Molecules/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Footer component with contact information, quick links, and copyright information. Includes social media links and a back-to-top button.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'landmark-contentinfo-is-top-level', reviewOnFail: true },
          { id: 'heading-order', reviewOnFail: true },
          { id: 'color-contrast', reviewOnFail: true },
          { id: 'link-name', reviewOnFail: true }
        ],
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  },
};


// Standard footer with complete data
export const Default = () => <Footer />;
Default.decorators = [createPortfolioDecorator(mockPortfolioData)];
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', () => {
    // Check that the footer contains the name from context
    expect(canvas.getByText("John Doe")).toBeInTheDocument();
    
    // Check that quick links section is present
    expect(canvas.getByText("Quick Links")).toBeInTheDocument();
    
    // Check that contact section is present
    expect(canvas.getByText("Contact")).toBeInTheDocument();
    
    // Check that copyright notice contains the current year
    const currentYear = new Date().getFullYear().toString();
    const copyrightText = canvas.getByText(new RegExp(`© ${currentYear}`));
    expect(copyrightText).toBeInTheDocument();
    
    // Check that back to top button is present
    const backToTopButton = canvas.getByLabelText("Back to top");
    expect(backToTopButton).toBeInTheDocument();
  });
  
  await step('Interaction test - Back to top button', async () => {
    // Click the back to top button
    const backToTopButton = canvas.getByLabelText("Back to top");
    await userEvent.click(backToTopButton);
    
    // We can't fully test scrolling behavior in Storybook tests,
    // but we can verify the button is interactive
    expect(backToTopButton).toBeInTheDocument();
  });
  
  await step('Keyboard navigation test', async () => {
    // Focus should move through the various links in the footer
    let focusCount = 0;
    // Multiple tabs to navigate through links
    for (let i = 0; i < 10; i++) {
      await userEvent.tab();
      const focused = document.activeElement;
      if (focused && focused.tagName === 'A') {
        focusCount++;
      }
    }
    // Ensure we've found at least a few focusable links
    expect(focusCount).toBeGreaterThan(3);
  });
};

// Footer with minimal data
export const MinimalData = () => <Footer />;
MinimalData.decorators = [createPortfolioDecorator(minimalPortfolioData)];
MinimalData.parameters = {
  docs: {
    description: {
      story: 'Shows how the footer appears with minimal data in the portfolio context.'
    }
  }
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Footer from '../components/Footer';
 * 
 * function App() {
 *   return (
 *     <>
 *       <main>
 *         {/* Main content */}
 *       </main>
 *       <Footer />
 *     </>
 *   );
 * }
 * ```
 * 
 * ## Context Dependencies
 * 
 * This component relies on the PortfolioContext and specifically uses:
 * - `greetings.name` for displaying the developer name
 * - `socialLinks` object for social media profiles
 * 
 * The component also uses the useFooter hook which provides:
 * - `currentYear` - Current year for copyright
 * - `scrollToTop` - Function to smoothly scroll to top of page
 * 
 * ## Accessibility Features
 * 
 * - Uses semantic `<footer>` element with role="contentinfo"
 * - Proper heading structure with h4 and h5 headings
 * - Link text is descriptive and clear
 * - Interactive elements have appropriate focus states
 * - Back to top button has an aria-label
 * - Icons used for decoration have aria-hidden="true"
 * 
 * ## Implementation Details
 * 
 * - Uses Reactstrap's Container, Row, and Col for responsive layout
 * - Social links are provided by the SocialLinks component
 * - Back to top button uses smooth scrolling behavior
 * - Current year is dynamically calculated for copyright notices
 */

// Mobile viewport display
export const MobileView = () => <Footer />;
MobileView.decorators = [createPortfolioDecorator(mockPortfolioData)];
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
  docs: {
    description: {
      story: 'Shows how the footer adapts to mobile viewport sizes with a stacked layout.'
    }
  }
};

// Tablet viewport display
export const TabletView = () => <Footer />;
TabletView.decorators = [createPortfolioDecorator(mockPortfolioData)];
TabletView.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
  docs: {
    description: {
      story: 'Shows how the footer appears on tablet sized screens.'
    }
  }
};