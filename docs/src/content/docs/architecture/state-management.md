---
title: Architecture
description: A guide in my new Starlight docs site.
---

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

**TBD**

#### The smart-dumb components design pattern for the components:

There is a clear distinction in the codebase between the smart and dumb components. The main reason behind this decision is that I want most of my components to be reusable and easier to be tested. That means that they should not have dependencies and they just consume the data they get from the smart component. Also it makes clearer a compoenent's responsibility.

#### Avoid using external dependencies

As you can see in the package.json, we didn't include external libraries, like `angular-material`, libs for the ui components, state management,etc. The reason is that it might be tempting to use a library like this in the short term to develop something fast, but in the long term they can introduce many problems:

- opinionated styles
- make the migration to newer versions of Angular more difficult
- not full control on them

#### Testing

**TBD**
