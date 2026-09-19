// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://www.hanacekauto.cz',
	trailingSlash: 'ignore',
	build: {
		inlineStylesheets: 'auto',
	},
});
