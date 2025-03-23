# Angular NgRx NX realworld example app

<img src="logo.png" alt="RealWorld Example App" width="200"/>

### Modern Angular features:
- New Control Flow
- Deferred Loading
- Zoneless
- Signal inputs and outputs
- State management using NgRx Signals Store
- DI using the inject function
- Functional resolvers and guards

> ### Angular, ngrx/platform, nrwl/nx codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://angular-ngrx-nx-realworld-example-app-lyart.vercel.app)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with Angular, ngrx/platform, nrwl/nx including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the Angular community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication.

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU\* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
  - Uses JWT (store the token in localStorage)
  - Authentication can be easily switched to session/cookie based
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
  - Show basic user info
  - List of articles populated from author's created articles or author's favorited articles

## Commands

### Run the application

`npm run start`

### Unit tests

Run all the tests: `nx run-many -t test`

### Lint

`nx run-many -t lint`

## Architecture

The project utilizes a cutting-edge Angular architecture with Nx monorepo workspace and NgRx Signal Store for state management. Here's a comprehensive overview of the key architectural concepts:

### Monorepo Structure with Nx

This project is organized as a monorepo using Nx, which enables a modular, scalable architecture with clear boundaries between different parts of the application. The main benefits include:

- **Scalability**: The codebase can easily grow while maintaining clear separation of concerns
- **Dependency Graph Management**: Nx automatically tracks dependencies between libraries
- **Improved Build Performance**: Nx's powerful caching and affected commands allow for faster builds and tests

### Library Organization

Libraries are classified using two dimensions:

1. **Scope (Domain)**: Defines which section of the app can use the library
   - `auth`: Authentication-related features
   - `articles`: Article-related features
   - `profile`: User profile features
   - `core` (to be renamed to `shared`): Common utilities and components that can be used across the application

2. **Type**: Defines the purpose of the library
   - `feature-*`: Contains smart components that communicate with data sources
   - `data-access`: Contains services and state management for interacting with the server
   - `ui`: Contains presentational (dumb) components that are reusable within their scope
   - `api-types`: Contains TypeScript interfaces for API models
   - `forms`: Contains form-related components and utilities

The folder structure follows this pattern:
```
├── libs
│   ├── articles
│   │   ├── data-access
│   │   ├── feature-article-edit
│   │   ├── feature-article
│   │   ├── feature-articles-list
│   ├── auth
│   │   ├── data-access
│   │   ├── feature-auth
│   ├── core
│   │   ├── api-types
│   │   ├── error-handler
│   │   ├── http-client
│   │   ├── forms
│   ├── profile
│   │   ├── data-access
│   │   ├── feature-profile
│   ├── ui
│   │   ├── components
```

### State Management with NgRx Signal Store

The application uses NgRx Signal Store, a modern state management approach based on Angular's Signals, providing:

- **Reactivity**: Based on Angular's Signal API for efficient change detection
- **TypeScript Integration**: Strong typing throughout the state management system
- **Simplified API**: More concise and intuitive compared to traditional NgRx with reducers and effects
- **Immutability**: Enforces immutable state updates

Here's how the store pattern is implemented:

```typescript
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withMethods(
    (store, formErrorsStore = inject(FormErrorsStore), authService = inject(AuthService), router = inject(Router)) => ({
      getUser: rxMethod<void>(
        pipe(
          switchMap(() => authService.user()),
          tap(({ user }) => patchState(store, { user, loggedIn: true, ...setLoaded('getUser') })),
        ),
      ),
      // Additional methods for login, register, updateUser, logout, etc.
    }),
  ),
  withCallState({ collection: 'getUser' }),
);
```

The store uses:
- `withState`: To define the initial state
- `withMethods`: To define methods that can modify the state
- `rxMethod`: To handle asynchronous operations using RxJS
- `patchState`: To update the state immutably
- `withCallState`: To track loading, error and success states

### Standalone Components

The application exclusively uses standalone components, eliminating the need for NgModules. This results in:

- **Simplified Architecture**: No need for complex module hierarchy
- **Improved Tree-Shaking**: Better optimization of the final bundle
- **Explicit Dependencies**: Each component declares its own dependencies

Example of a standalone component:

```typescript
@Component({
  selector: 'cdt-login',
  templateUrl: './login.component.html',
  imports: [ListErrorsComponent, RouterLink, ReactiveFormsModule, InputErrorsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);
  
  // Component implementation
}
```

### Dependency Injection with inject()

The application uses the modern `inject()` function instead of constructor-based dependency injection:

- **Cleaner Code**: Reduces boilerplate compared to constructor injection
- **Better TypeScript Inference**: TypeScript can better infer types with inject
- **More Flexible**: Can be used within functions, not just classes

### Lazy Loading

The application implements lazy loading for all major routes to improve initial load time:

```typescript
{
  path: 'home',
  loadChildren: () => import('@realworld/home/src/lib/home.routes').then((home) => home.HOME_ROUTES),
},
{
  path: 'login',
  loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.LoginComponent),
},
// Additional routes...
```

This implementation uses:
- `loadComponent`: For lazy loading standalone components
- `loadChildren`: For lazy loading entire route trees

### Smart vs Dumb Components Pattern

The application follows the smart/dumb component pattern:

- **Smart Components**: 
  - Handle data fetching and state management
  - Located in `feature-*` libraries
  - Inject services and stores
  - Pass data to dumb components

- **Dumb Components**:
  - Are purely presentational
  - Located in `ui` libraries
  - Receive data via inputs and emit events via outputs
  - Have no dependencies on services or stores
  - Easily testable and reusable

### Minimal External Dependencies

The project avoids external UI libraries and frameworks to:
- Maintain full control over the codebase
- Avoid opinionated styles
- Simplify migration to newer Angular versions
- Reduce bundle size

### Testing Strategy

The application uses Jest for unit testing and Playwright for end-to-end testing:
- Unit tests focus on testing individual components, services, and stores in isolation
- Integration tests verify that different parts of the application work together correctly
- E2E tests validate the full user experience

### Modern Angular Features

The application leverages the latest Angular features:

- **New Control Flow**: Uses the new `@if`, `@for`, and `@switch` syntax for clearer templates
- **Deferred Loading**: Implements content deferral for better initial load performance
- **Zoneless**: Uses zoneless change detection for improved performance
- **Signal Inputs and Outputs**: Uses the new signals-based inputs/outputs for better reactivity
- **Functional Resolvers and Guards**: Replaces class-based guards and resolvers with more concise functions

### Build and Deployment

The application uses Nx's build system for:
- Fast builds with caching
- Affected-only testing and building
- Consistent environment configurations
