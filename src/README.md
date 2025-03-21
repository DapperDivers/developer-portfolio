# Developer Portfolio Project Source Structure

## Project Organization

This project follows the Atomic Design methodology for organizing components. The structure is as follows:

```
src/
   assets/           # Static assets (images, CSS, fonts, animations)
   components/       # UI components organized by atomic design
      atoms/        # Basic building blocks (Button, Card, Input)
      molecules/    # Combinations of atoms (Cards, Form groups)
      organisms/    # Full sections of the page
      layout/       # Layout components (Section, Container)
   context/          # React Context providers
   hooks/            # Custom React hooks
   types/            # TypeScript type definitions
   utils/            # Utility functions
```

## Path Aliases

To simplify imports, this project uses path aliases. Instead of relative imports like `../../components/atoms/Button`, you can use:

```javascript
import Button from "@atoms/Button";
```

Available path aliases:

- `@/*` - Points to the `src/` directory
- `@components/*` - Points to `src/components/`
- `@atoms/*` - Points to `src/components/atoms/`
- `@molecules/*` - Points to `src/components/molecules/`
- `@organisms/*` - Points to `src/components/organisms/`
- `@layout/*` - Points to `src/components/layout/`
- `@assets/*` - Points to `src/assets/`
- `@utils/*` - Points to `src/utils/`
- `@hooks/*` - Points to `src/hooks/`
- `@context/*` - Points to `src/context/`

## Component Guidelines

1. Use atomic design principles to determine component placement
2. Import components using path aliases instead of relative paths
3. Use JSDoc comments for component documentation
4. Place tests in corresponding `__tests__` folders within each component category
5. Use memoization for optimized rendering when appropriate

## Example Usage

```jsx
// Using path aliases for imports
import React from 'react';
import Card from '@atoms/Card';
import ProjectsCard from '@molecules/ProjectsCard';
import { usePortfolio } from '@context/PortfolioContext';
import { formatDate } from '@utils/formatters';

const MyComponent = () => {
  const { data } = usePortfolio();
  return (
    <Card>
      <ProjectsCard data={data} />
    </Card>
  );
};

export default MyComponent;
```