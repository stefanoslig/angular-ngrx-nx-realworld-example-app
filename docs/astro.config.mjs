// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      logo: {src: './src/assets/logo.png', replacesTitle: true},
      title: 'Angular Realworld App',
      social: {
        github: 'https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app',
      },
      sidebar: [
        {
          label: 'Angular Realworld App',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Introduction', slug: 'introduction' },
            { label: 'App explanation', slug: 'explanation' },
            { label: 'Angular features', slug: 'features' },
            { label: 'Architecture', slug: 'architecture' },
            { label: 'How to contribute', slug: 'contributions' },
            { label: 'How to run the app locally', slug: 'local-dev' },
          ],
        },
        
      ],
    }),
  ],
});
