# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular RealWorld application built with modern Angular features and NgRx Signal Store for state management. It's organized as an Nx monorepo with a modular architecture following domain-driven design principles.

## Development Commands

### Running the Application
- `npm run start` - Start the development server
- `nx run conduit:serve` - Alternative way to start the app

### Testing
- `nx run-many -t test` - Run all unit tests
- `nx test <project-name>` - Run tests for a specific project
- `nx e2e conduit-e2e` - Run end-to-end tests with Playwright

### Code Quality
- `nx run-many -t lint` - Run linting for all projects
- `nx lint <project-name>` - Lint a specific project
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Build
- `ng build` or `npm run build` - Build the application
- `nx build conduit` - Build the main application
- `nx run-many -t build` - Build all projects

### Nx Utilities
- `nx dep-graph` - View dependency graph
- `nx affected:test` - Test only affected projects
- `nx affected:build` - Build only affected projects
- `nx affected:lint` - Lint only affected projects

## Architecture

### Monorepo Structure
The project uses Nx workspace with libraries organized by:

**Scope (Domain):**
- `auth` - Authentication features
- `articles` - Article management
- `profile` - User profiles  
- `home` - Home page features
- `settings` - Application settings
- `core` - Shared utilities and services
- `ui` - Reusable UI components

**Type:**
- `feature-*` - Smart components with business logic
- `data-access` - Services and state management
- `ui` - Presentational components
- `api-types` - TypeScript interfaces for API models

### Import Paths
Use TypeScript path mappings defined in `tsconfig.base.json`:
- `@realworld/articles/data-access` - Article services and stores
- `@realworld/auth/data-access` - Authentication store and services
- `@realworld/core/forms` - Form utilities and error handling
- `@realworld/core/http-client` - HTTP client services
- `@default/*` - Main app components
- `@env/*` - Environment configurations

### State Management with NgRx Signal Store
The application uses NgRx Signal Store pattern:

```typescript
export const ExampleStore = signalStore(
  { providedIn: 'root' },
  withState<ExampleState>(initialState),
  withMethods((store, service = inject(Service)) => ({
    method: rxMethod<Type>(
      pipe(
        switchMap((param) => service.call(param)),
        tapResponse({
          next: (result) => patchState(store, { data: result }),
          error: (error) => patchState(store, { error })
        })
      )
    )
  })),
  withCallState({ collection: 'method' })
);
```

Key patterns:
- Use `rxMethod` for async operations
- Use `patchState` for state updates
- Use `withCallState` for loading/error states
- Inject dependencies with `inject()` function

### Component Architecture
All components are standalone (no NgModules):

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  private readonly store = inject(ExampleStore);
}
```

### Modern Angular Features
- **Zoneless Change Detection** - Uses `provideZonelessChangeDetection()`
- **New Control Flow** - Uses `@if`, `@for`, `@switch` syntax in templates
- **Signal Inputs/Outputs** - Leverages Angular signals for reactivity
- **Functional Guards/Resolvers** - Uses functions instead of classes
- **Standalone Components** - No NgModules, explicit imports

### Testing
- **Unit Tests**: Jest with `@nx/jest`
- **E2E Tests**: Playwright with authentication setup
- Test files follow `.spec.ts` naming convention
- Each library has its own `jest.config.ts`

### Routing and Lazy Loading
Routes use lazy loading with `loadComponent` and `loadChildren`:

```typescript
{
  path: 'articles',
  loadComponent: () => import('@realworld/articles/feature').then(m => m.ArticlesComponent)
}
```

## Key Files and Patterns

### Entry Points
- `apps/conduit/src/main.ts` - Application bootstrap
- `apps/conduit/src/app/app.config.ts` - Application configuration
- `libs/*/src/index.ts` - Library export barrels

### Store Files
Look for files ending in `.store.ts` for state management logic. These contain:
- State definitions and initial values
- Async methods using `rxMethod`
- State update patterns with `patchState`

### API Integration
- `libs/core/http-client/src/lib/api.service.ts` - Base HTTP service
- API types are defined in `libs/core/api-types/src/lib/`
- Environment-specific API URLs in `apps/conduit/src/environments/`

### Error Handling
- Global error handling via `libs/core/error-handler/`
- Form errors managed by `FormErrorsStore`
- HTTP interceptors for error processing

## Development Guidelines

### Creating New Features
1. Generate libraries using Nx generators: `nx g @nx/angular:library`
2. Follow the scope/type naming convention
3. Use standalone components with explicit imports
4. Implement state management with NgRx Signal Store
5. Create corresponding test files

### Working with State
- Always use `inject()` for dependency injection
- Use `rxMethod` for async operations in stores
- Update state immutably with `patchState`
- Handle loading/error states with `withCallState`

### Testing Approach
- Unit test individual components and services
- Mock dependencies using Jest mocking
- E2E tests cover complete user workflows
- Test authentication flows using Playwright setup files