# Landing Page Components

A collection of modern, responsive React components designed to create beautiful landing pages with Vercel's minimalist aesthetic. Built with Next.js, TypeScript, Tailwind CSS v4, and shadcn/ui components.

## Features

- **Design**: Clean, minimalist aesthetic with careful attention to typography and spacing
- **Fully Responsive**: Optimized for all screen sizes from mobile to desktop
- **Dark/Light Mode**: Seamless theme switching with consistent design in both modes
- **Accessible Components**: ARIA attributes, keyboard navigation, and screen reader support
- **TypeScript**: Strong typing for better developer experience and fewer bugs
- **Modular Architecture**: Components can be used independently or combined
- **Syntax Highlighting**: GitHub Dark theme powered by Shiki for beautiful code examples
- **Social Integration**: Modern social icons using react-icons

## Components

1. **NavBar**: Sleek navigation with responsive mobile menu
   - Logo, navigation links, and action buttons
   - Mobile-friendly with slide-out menu
   - Keyboard focus trapping for accessibility

2. **HeroSection**: Impactful hero area with code example
   - Clean typography with careful spacing
   - Optional metric badge
   - Embedded code block with syntax highlighting
   - Primary and secondary call-to-action buttons

3. **CodeBlock**: Syntax-highlighted code display
   - GitHub Dark theme powered by Shiki
   - Language-specific highlighting
   - Optional line numbers
   - Copy-to-clipboard functionality
   - Proper overflow handling for long code snippets

4. **TrustLogos**: Display partner/client logos
   - Grayscale with hover effect
   - Responsive grid layout
   - Customizable spacing and sizing

5. **FeaturesSection**: Showcase product features
   - Large feature card with code example
   - Small feature cards for secondary features
   - Clean typography and spacing
   - Responsive Bento grid layout

6. **PricingSection**: Display pricing plans
   - Monthly/annual billing toggle with proper spacing
   - Highlighted "Most Popular" plan
   - Feature list with included/excluded indicators
   - Call-to-action buttons

7. **WhyChooseUs**: Highlight key benefits
   - Icon, title, and description for each benefit
   - Clean grid layout
   - Subtle background to separate from other sections

8. **Testimonials**: Display customer testimonials
   - Star ratings
   - Quote, author, role, and company
   - Circular avatar images that maintain aspect ratio
   - Card-based layout

9. **FAQSection**: Frequently asked questions
   - Accordion-style expansion
   - Smooth animations
   - Proper ARIA attributes for accessibility

10. **FinalCTA**: Final call-to-action section
    - Headline and description
    - Code example
    - Primary and secondary buttons
    - Subtle gradient background

11. **Footer**: Page footer
    - Copyright information
    - Navigation links
    - Social media icons using react-icons
    - Clean, minimal styling

## Installation

1. Add these components to your Next.js project
2. Ensure you have the required dependencies:
   - Next.js 14+
   - React 18+
   - TypeScript
   - Tailwind CSS v4
   - shadcn/ui components
   - Shiki for syntax highlighting
   - react-icons for social icons

\`\`\`bash
npm install shiki@latest react-icons@latest
# or
yarn add shiki@latest react-icons@latest
# or
pnpm add shiki@latest react-icons@latest
\`\`\`

## Usage

### Basic Example

```tsx
import { NavBar } from '@/components/nav-bar';
import { HeroSection } from '@/components/hero-section';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <HeroSection 
          title="Your Product Name"
          subtitle="A brief description of your amazing product"
        />
        {/* Add more sections as needed */}
      </main>
      <Footer />
    </div>
  );
}
```

### Using the CodeBlock Component with Shiki

The CodeBlock component uses Shiki for syntax highlighting. There are two ways to use it:

1. **Server Component (Recommended)**:

```tsx
import { CodeBlockServer } from '@/components/code-block-server';

export default function Page() {
  return (
    <CodeBlockServer
      code="console.log('Hello, World!');"
      language="javascript"
    />
  );
}
```

2. **Client Component (with pre-rendered HTML)**:

\`\`\`tsx
'use client'
import { CodeBlock } from '@/components/code-block';

export default function Page() {
  return (
    <CodeBlock
      code="console.log('Hello, World!');"
      language="javascript"
      highlightedCode={highlightedHtml} // Pre-rendered HTML from Shiki
    />
  );
}
\`\`\`

## Design System

These components follow Vercel's design principles:

1. **Typography**: Clean, modern sans-serif with careful attention to weight, size, and spacing
2. **Color Palette**: Minimalist black and white with subtle grays and accents
3. **Spacing**: Consistent spacing system for visual harmony
4. **Interactions**: Subtle, purposeful animations and state changes
5. **Accessibility**: High contrast and clear focus states

## Dark Mode Integration

These components are designed to work seamlessly with both light and dark modes. To implement theme switching, use the ThemeProvider from shadcn/ui:

\`\`\`tsx
// In your layout.tsx
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
\`\`\`

## Accessibility

All components are built with accessibility in mind:

- Semantic HTML elements
- Proper heading hierarchy
- ARIA attributes for interactive elements
- Keyboard navigation support
- Screen reader friendly content
- Sufficient color contrast in both light and dark modes

## Troubleshooting

If you encounter issues with Shiki:

1. Make sure you're using the latest version of Shiki (v1.0.0 or later)
2. Check that your Next.js version is compatible (14.0.0 or later recommended)
3. Ensure you have proper error handling and fallbacks in place
4. If syntax highlighting fails, the components will automatically fall back to a non-highlighted version

## Best Practices

1. Maintain consistent spacing between sections (py-16 md:py-24)
2. Use the container class with max-w-7xl for proper content width and padding
3. Keep text content within reasonable max-width constraints for readability
4. Use the provided color variables for theme compatibility
5. Test all components in both light and dark modes
6. Ensure responsive behavior across all screen sizes

## License

MIT
\`\`\`

## 8. Package.json Update

Let's update the package.json to include react-icons:
