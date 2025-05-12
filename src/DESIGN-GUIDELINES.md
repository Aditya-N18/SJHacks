# RiseUp AI Design Guidelines

This document outlines the design principles, patterns, and standards for the RiseUp AI application to ensure a consistent user experience across all components and pages.

## Table of Contents

1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Components](#components)
6. [Layout Patterns](#layout-patterns)
7. [Dark Mode](#dark-mode)
8. [Animation](#animation)
9. [Best Practices](#best-practices)

## Design Principles

The RiseUp AI application follows these core design principles:

- **Clarity**: UI elements should be intuitive and self-explanatory
- **Consistency**: Similar patterns and components should be used throughout the application
- **Accessibility**: Design should be inclusive and usable by people with diverse abilities
- **Responsiveness**: UI should adapt seamlessly to different screen sizes
- **Purposeful Animation**: Use animation to enhance understanding and draw attention, not to distract

## Color System

Our color system is defined in `src/utils/designSystem.ts` and consists of:

### Primary Colors

- Primary Blue: `#4361EE` (primary-400)
- Used for main actions, links, and highlighted content

### Dark Mode Colors

- Background: `#181C24` (dark-400)
- Cards: `#272C3A` (dark-200)
- Accent:
  - Purple: `#6E56CF` (dark-accent1)
  - Teal: `#1AD1A5` (dark-accent2)
  - Coral: `#F77F6E` (dark-accent3)

### Status Colors

- Success: `#38B000`
- Error: `#E63946`
- Warning: `#FFBE0B`

### Neutral Colors

- A range from light gray (`#F8FAFC`) to dark slate (`#0F172A`)

## Typography

### Font Families

- Primary Font: Inter (UI elements, body text)
- Secondary Font: Roboto (Used sparingly for specific elements)

### Font Weights

- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Font Sizes

- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)
- 5xl: 3rem (48px)

## Spacing

We use a consistent spacing scale:

- 0: 0
- 0.5: 0.125rem (2px)
- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 3: 0.75rem (12px)
- 4: 1rem (16px)
- 5: 1.25rem (20px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)
- 10: 2.5rem (40px)
- 12: 3rem (48px)
- 16: 4rem (64px)
- 20: 5rem (80px)
- 24: 6rem (96px)

## Components

### Standard UI Components

Always use the shared components from `src/components/ui/` instead of creating custom implementations:

- Button
- Card
- Input
- Badge
- ThemeToggle
- ProgressBar

### Component Variants

Most components support variants like:

- `primary`
- `secondary`
- `success`
- `error`
- `outline`
- `ghost`

## Layout Patterns

### Page Container

Use the `PageContainer` component for consistent page layouts:

```tsx
<PageContainer title="Page Title" description="Optional page description">
  {/* Page content */}
</PageContainer>
```

### Card Layout

Use the Card component for content containers:

```tsx
<Card heading="Card Title" description="Optional description" accent="primary">
  {/* Card content */}
</Card>
```

### Grid Layouts

Use the predefined grid classes from the design system:

- `patterns.grid.container`: 3-column responsive grid
- `patterns.grid.twoColumn`: 2-column responsive grid

## Dark Mode

All components should support both light and dark modes:

- Use the `useTheme()` hook to access the current theme
- Apply dark mode classes with the `darkMode ? darkClass : lightClass` pattern
- Ensure sufficient contrast in both modes

## Animation

Use consistent animations defined in the design system:

- `fadeIn`: Fade elements in
- `slideUp`: Slide and fade from bottom
- `pulse`: Subtle pulsing effect
- `gradientFlow`: Moving gradient background

## Best Practices

1. **Import from Design System**: Always import styles, colors, and patterns from the design system file
2. **Use the `cn()` Utility**: For combining classes conditionally
3. **Responsive Design**: Ensure all components work on mobile, tablet, and desktop
4. **Consistent Spacing**: Use the spacing scale for margins and padding
5. **Color Accessibility**: Maintain WCAG 2.1 AA contrast ratio (at minimum)
6. **Semantic HTML**: Use proper HTML elements for their intended purpose
7. **Component Props**: Follow the established props pattern for component variants

## Using the Design System

```tsx
import { colors, componentStyles, patterns } from "../utils/designSystem";
import { useTheme } from "../utils/ThemeContext";
import { cn } from "../utils/cn";

const MyComponent = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={cn(
        darkMode ? componentStyles.card.dark : componentStyles.card.light
      )}
    >
      Content
    </div>
  );
};
```
