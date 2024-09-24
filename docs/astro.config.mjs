// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      logo: { src: './src/assets/logo.png', replacesTitle: true },
      title: 'Angular Realworld App',
      social: {
        github: 'https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app',
      },
      sidebar: [
        {
          label: 'Introduction',
          items: [
            { label: 'Introduction', slug: 'introduction' },
            { label: 'App explanation', slug: 'introduction/explanation' },
            { label: 'Angular features', slug: 'introduction/features' },
             { label: 'Run the app locally', slug: 'introduction/local-dev' }
          ],
        },
        {
          label: 'Architecture',
          items: [
            { label: 'Folder structure', slug: 'architecture/structure' },
            { label: 'State management', slug: 'architecture/state-management' }
          ],
        },
        {
          label: 'How to contribute',
          items: [
            { label: 'How to contribute', slug: 'how-to-contribute' }
          ],
        },
      ],
    }),
  ],
});
