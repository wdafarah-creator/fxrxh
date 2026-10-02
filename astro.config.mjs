// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is what makes canonical URLs, Open Graph images and the sitemap
// absolute — social platforms and search engines reject relative ones.
// https://astro.build/config
export default defineConfig({
	site: 'https://fxrxh.com',
	integrations: [
		sitemap({
			// scratch comparison routes, not part of the site
			filter: (page) => !page.includes('/cursor/'),
		}),
	],
});
