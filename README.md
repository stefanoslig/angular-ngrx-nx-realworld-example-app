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

### Overview

This application is built as a monorepo using Nx tools, with a modern Angular architecture leveraging standalone components, zoneless change detection, and NgRx Signals for state management. The project structure follows domain-driven design principles with clear separation of concerns through feature libraries, data-access libraries, and UI component libraries.

### Folders/Libs structure

For this project I created a monorepo. There is one app for the moment (conduit) which consumes the libraries under the libs folder.

The folder structure is:

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

I used two classifiers to name my libraries. The first classifier is the `scope` and the second the `type`. The main reason is that I want every developer when he looks a library to understand where this library can be used and which kind of services/components/etc contains.

The `scope` is the section (domain) of the app the library can be used. It gives a clear indication that a feature belongs to a specific domain. For example the libraries under `users` scope, are used in the users and favourite users pages. The ibraries under the `core` scope can be reused between all the sections of the app. **_The `core` scope will be rename soon to `shared`_**.

The `type` indicates the purpose of a library. I have used a number of different types (feature, data-access, ui, api-types) The `feature-...` type contains smart components. These are components which enable the communication with the data-sources (most likely they inject api services). The `data-access` type contains code for interacting with the server. The `ui` type contains dumb (presentational) components. These components are reusable in the scope of this library

### Detailed Architecture Explanation

#### Application Structure

The application follows a modern Angular application structure with clear separation between domains and technical concerns:

1. **Domain-driven Structure**:
   - Each domain (articles, auth, profile, etc.) has its own dedicated space in the libs folder
   - Domain libraries encapsulate all related functionality, making navigation and maintenance easier
   - This organization allows for better understanding of the business domains

2. **Library Types**:
   - **data-access**: Contains services, interfaces and state management related to domain data
   - **feature-***: Smart components that compose UI components and data-access elements
   - **ui**: Presentational components that are reusable and focused on UI without business logic
   - **api-types**: TypeScript interfaces for API models

3. **Core Infrastructure**:
   - Shared utilities, interceptors, and services live in the core libraries
   - Error handling, HTTP client configuration, and form utilities are centralized

#### Standalone Components

The application exclusively uses standalone components, which offers several benefits:

- No NgModules required for component declaration
- Better code splitting and tree-shaking
- Clearer component dependencies through imports
- Simplified testing with fewer dependencies to mock

#### State Management

The application uses NgRx Signals Store for state management, which is a more modern approach compared to the classic NgRx/Redux pattern:

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
      login: rxMethod<LoginUser>(/* implementation */),
      register: rxMethod<NewUser>(/* implementation */),
      updateUser: rxMethod<User>(/* implementation */),
      logout: rxMethod<void>(/* implementation */),
    }),
  ),
  withCallState({ collection: 'getUser' }),
);
```

Key aspects of this state management approach:

1. **Signal-based Reactivity**:
   - Leverages Angular's new reactivity model with signals
   - Provides better performance compared to traditional Observable-based state
   - Smaller bundle size than classic NgRx solutions

2. **Simplified State Operations**:
   - Direct state manipulation with `patchState`
   - No need for separate actions, reducers, selectors, and effects
   - Clean integration with RxJS for handling async operations with `rxMethod`

3. **Type Safety**:
   - Full TypeScript support with strongly-typed state and operations
   - Compile-time errors for state manipulation mistakes

4. **Loading State Management**:
   - Built-in call state tracking with `withCallState`
   - Standardized loading, error, and success states

#### Routing and Lazy Loading

The application employs modern Angular routing features for performance and scalability:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      [
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full',
        },
        {
          path: 'home',
          loadComponent: () => import('@realworld/home/feature-home').then((m) => m.HomeComponent),
        },
        // Additional routes...
      ],
      withViewTransitions(),
      withComponentInputBinding(),
    ),
    // Other providers...
  ],
};
```

The routing architecture includes:

1. **Lazy Loading**:
   - Components and routes are loaded on-demand using dynamic imports
   - Smaller initial bundle size for faster startup
   - Page-specific code is only loaded when required

2. **View Transitions**:
   - Modern transitions between route changes with `withViewTransitions`
   - Smoother user experience during navigation

3. **Input Binding**:
   - Route parameters are automatically bound to component inputs with `withComponentInputBinding`
   - Simplified data passing from routes to components

4. **Functional Guards and Resolvers**:
   - Modern functional approach for route guards and resolvers
   - Lighter-weight compared to class-based implementations
   - Directly injectable with dependency injection

#### Smart-Dumb Component Pattern

The application follows the smart-dumb component pattern (also known as container-presentation pattern):

1. **Smart Components**:
   - Located in feature libraries
   - Connect to state management
   - Handle data fetching and processing
   - Coordinate user interactions
   - Pass data to dumb components via inputs

2. **Dumb Components**:
   - Located in UI libraries
   - Focused on rendering UI and capturing user events
   - No direct dependencies on services, state, or data-access
   - Emit events to smart components when interactions occur
   - Highly reusable and easier to test

This pattern provides several benefits:
- Clear separation of concerns
- Improved testability
- Better reusability of UI components
- Clear component responsibilities

#### Modern Angular Features

The application showcases modern Angular capabilities:

1. **Zoneless Change Detection**:
   - Performance improvements through signal-based change detection
   - Reduced memory usage and fewer change detection cycles

2. **Signal Inputs and Outputs**:
   - Using signals for component communication
   - More efficient than traditional @Input/@Output decorators

3. **Dependency Injection with inject()**:
   - Modern DI with the inject function
   - Reduced boilerplate compared to constructor injection

4. **Functional Approach**:
   - Functional guards and resolvers
   - Modern function-based APIs for routing and DI

#### Testing Strategy

The application includes comprehensive testing patterns for different architectural layers:

1. **Unit Tests**:
   - Testing individual components and services in isolation
   - Using NgRx's MockStore for state testing
   - Focused on business logic verification

2. **Component Tests**:
   - Testing components with their templates
   - Verifying component interactions and rendering
   - Using harnesses for component testing

### Avoiding External Dependencies

This project intentionally avoids external UI libraries and dependencies to:
- Maintain full control over the code
- Avoid compatibility issues with Angular updates
- Eliminate opinionated styles
- Provide a cleaner learning experience
- Focus on Angular's built-in capabilities

#### Advantages of this Architecture

1. **Scalability**: The domain-driven approach with library scopes allows the application to grow without becoming unwieldy
2. **Maintainability**: Clear boundaries between components, state, and UI make maintenance simpler
3. **Performance**: Lazy loading, standalone components, and signal-based state improve runtime performance
4. **Developer Experience**: Intuitive structure makes it easier for developers to locate code and understand relationships
5. **Testing**: Clean separation makes unit testing and component testing more straightforward

This architecture leverages the latest Angular features and best practices to create a robust, maintainable, and efficient application that demonstrates real-world patterns for enterprise Angular development.

#### Testing

**TBD**
