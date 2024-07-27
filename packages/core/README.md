# @apiso/core

This package contains the core functionality for the Apiso project, including API base classes, authentication strategies, connectors, and utilities.

## Installation

```bash
yarn add @apiso/core
```

## Usage

Import the required modules from the package:

```typescript
import { BaseAPI, AuthFactory, ConnectorFactory } from '@apiso/core';
```

Refer to the documentation for each module for specific usage instructions.
```json
// core/tsconfig.json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

These files set up the core module, exporting the necessary components and providing the configuration for TypeScript compilation. The `package.json` file includes the required dependencies, and the `README.md` provides basic information about the package.
