# shadcn/ui Component Rule

When working on this portfolio project, ALL UI components must use shadcn/ui components exclusively.

## Required Components
Use these shadcn/ui components for the specified purposes:

- **Button** - All clickable actions, CTAs, navigation links
- **Card** - Project cards, content sections, containers
- **Badge** - Technology tags, category labels
- **Sheet** - Mobile navigation drawer
- **NavigationMenu** - Desktop navigation
- **Dialog** - Image lightbox, modals
- **AspectRatio** - Consistent image/video ratios
- **Separator** - Section dividers

## Prohibited
- Do NOT use raw HTML elements for interactive UI (use shadcn Button instead of plain button)
- Do NOT install other UI libraries (no MUI, Chakra, Ant Design, etc.)
- Do NOT create custom styled components when a shadcn component exists

## Styling
- Use Tailwind CSS classes for custom styling
- Follow the established dark/light mode CSS variables
- Maintain consistent spacing using Tailwind utilities
