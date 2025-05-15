# Service Directory Component

A clean, responsive, and accessible component for displaying a directory of services in a Next.js application. This component follows Vercel-style UI guidelines and is built with TypeScript, Tailwind CSS v4, and shadcn/ui components.

## Features

- **Clean, Minimalist Design**: Following Vercel's design aesthetic with careful attention to typography and spacing
- **Fully Responsive**: Optimized for all screen sizes from mobile to desktop
- **Dark/Light Mode Support**: Seamless theme switching with consistent design in both modes
- **Accessible**: Semantic HTML, proper ARIA attributes, and keyboard navigation
- **TypeScript**: Strong typing for better developer experience
- **Modular Architecture**: Can be used independently or combined with other components

## Installation

1. Ensure you have the required dependencies:
   - Next.js 14+
   - TypeScript
   - Tailwind CSS v4
   - shadcn/ui components

2. Copy the `service-directory.tsx` file to your components directory.

## Usage

```tsx
import { Service, ServiceDirectory } from "@/components/service-directory";

// Define your services
const services: Service[] = [
  {
    id: "pricing",
    name: "Real-Time Pricing",
    description: "Get live market prices for any VIN in seconds.",
    iconSrc: "/icons/pricing.svg",
    tags: ["Pricing", "Valuation"],
    docsUrl: "/docs/pricing",
  },
  // Add more services...
];

// Use the component in your page
export default function Page() {
  return <ServiceDirectory services={services} />;
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `services` | `Service[]` | Yes | Array of service objects to display |
| `title` | `string` | No | Custom title for the directory (defaults to "AI Services Marketplace") |

### Service Interface

```tsx
interface Service {
  id: string;         // Unique identifier for the service
  name: string;       // Display name of the service
  description: string; // Brief description of what the service does
  iconSrc: string;    // Path to the service icon
  tags: string[];     // Array of tags/categories for the service
  docsUrl: string;    // URL to the service documentation
}
```

## Styling

The component uses Tailwind CSS for styling and is designed to work with both light and dark modes. It follows these design principles:

- **Typography**: Clean, readable text with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Colors**: Uses theme colors from your Tailwind configuration
- **Shadows**: Subtle shadows for depth and hierarchy
- **Transitions**: Smooth transitions for interactive elements

## Accessibility

The component implements accessibility best practices:

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigable links
- Appropriate ARIA attributes

## Customization

You can customize the appearance by:

1. Modifying the Tailwind classes in the component
2. Adjusting your Tailwind theme configuration
3. Extending the component with additional props as needed

## Integration with Next.js and Vercel

This component is designed to work seamlessly with Next.js and can be deployed on Vercel. It uses Next.js's `Image` component for optimized image loading and follows the App Router pattern.
