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

### Architecture

#### Folders/Libs structure

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

#### Standalone components

I have used only standalone components. You won't see any modules in the app.

#### Lazy loaded components

As you can see from the route configuration, the two main pages in the app are loaded lazily. This will make the initial loading time of the app faster.

```ts
 {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path: 'home',
  loadChildren: () => import('@realworld/home/src/lib/home.routes').then((home) => home.HOME_ROUTES),
},
{
  path: 'login',
  loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.LoginComponent),
},
{
  path: 'register',
  loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.RegisterComponent),
},
{
  path: 'article',
  loadChildren: () => import('@realworld/articles/article').then((m) => m.ARTICLE_ROUTES),
},
{
  path: 'settings',
  loadComponent: () =>
    import('@realworld/settings/feature-settings').then((settings) => settings.SettingsComponent),
},
{
  path: 'editor',
  loadChildren: () => import('@realworld/articles/article-edit').then((article) => article.ARTICLE_EDIT_ROUTES),
  canActivate: [authGuard],
},
{
  path: 'profile',
  loadChildren: () => import('@realworld/profile/feature-profile').then((profile) => profile.PROFILE_ROUTES),
},
```

#### State management

This application uses the NgRx Signals Store (v19.0.0-rc.0) for state management, a modern approach that leverages Angular's signals for reactive, efficient state handling. The implementation follows a domain-driven design pattern where each feature module has its own store to manage state relevant to that specific domain.

##### Key NgRx Signals Store Concepts

1. **Signal Store**: Each domain has a dedicated store created with `signalStore()`, providing a reactive and type-safe state container.

2. **Feature Organization**: State management is structured according to domains (auth, articles, profile, etc.) with separate store implementations for each.

3. **Store Composition Patterns**:
   - `withState`: Defines the initial state structure with TypeScript interfaces
   - `withMethods`: Implements actions and operations that can modify the state
   - `withCallState`: Tracks API call states (loading, loaded, error) for async operations
   - `withComputed`: Creates derived state based on the existing state

4. **RxJS Integration**:
   - Uses `rxMethod` for handling asynchronous operations
   - Leverages `tapResponse` for handling API responses in a clean way
   - Combines RxJS operators like `switchMap`, `exhaustMap`, and `pipe` for complex data flows

##### Example Store Structure (Auth)

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
      login: rxMethod<LoginUser>(/* ... */),
      register: rxMethod<NewUser>(/* ... */),
      updateUser: rxMethod<User>(/* ... */),
      logout: rxMethod<void>(/* ... */),
    }),
  ),
  withCallState({ collection: 'getUser' }),
);
```

##### Call State Management

The application implements a sophisticated call state tracking system to handle API request states, allowing for:

- Tracking loading states (`loading`, `loaded`, `error`)
- Generic error handling across all API requests
- Providing UI feedback based on request status

```typescript 
export type CallState = 'init' | 'loading' | 'loaded' | { error: string };
```

##### State Interaction in Components

Smart components interact with stores using dependency injection, providing a clean interface between UI and state:

```typescript
// Example component
@Component({
  selector: 'app-login',
  template: `
    <!-- Template binds to store signals -->
    <app-login-form 
      [isPending]="authStore.getUser.loading()" 
      (submitForm)="submit($event)">
    </app-login-form>
  `,
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);
  
  submit(credentials: LoginUser): void {
    this.authStore.login(credentials);
  }
}
```

##### Advantages of NgRx Signals Store

1. **Performance**: Fine-grained reactivity with signals reduces unnecessary re-renders
2. **Simplicity**: More straightforward API compared to traditional NgRx, with less boilerplate
3. **Type Safety**: Comprehensive TypeScript support throughout the state management system
4. **Locality**: State is encapsulated within domain boundaries, avoiding global state complexity
5. **Testability**: Stores are easily testable through dependency injection

This implementation demonstrates a modern, efficient approach to state management in Angular applications, taking full advantage of signals and the composition patterns provided by NgRx Signals Store.

#### The smart-dumb components design pattern for the components:

There is a clear distinction in the codebase between the smart and dumb components. The main reason behind this decision is that I want most of my components to be reusable and easier to be tested. That means that they should not have dependencies and they just consume the data they get from the smart component. Also it makes clearer a compoenent's responsibility.

#### Avoid using external dependencies

As you can see in the package.json, we didn't include external libraries, like `angular-material`, libs for the ui components, state management,etc. The reason is that it might be tempting to use a library like this in the short term to develop something fast, but in the long term they can introduce many problems:

- opinionated styles
- make the migration to newer versions of Angular more difficult
- not full control on them

#### Testing

**TBD**
