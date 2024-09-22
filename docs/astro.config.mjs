// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      logo: {src: './src/assets/hello.png', replacesTitle: true},
      title: 'Angular Realworld App',
      social: {
        github: 'https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app',
      },
      sidebar: [
        {
          label: 'Architecture',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        
      ],
    }),
  ],
});
