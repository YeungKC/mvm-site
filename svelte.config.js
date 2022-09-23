import adapter from '@sveltejs/adapter-auto';
import appEngine from 'svelte-adapter-appengine';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: process.env.APP_ENGINE ? appEngine() : adapter(),
		// Override http methods in the Todo forms
		// methodOverride: {
		// 	allowed: ['PATCH', 'DELETE']
		// },
		trailingSlash: 'always',
		inlineStyleThreshold: 1024 * 32
	}
};

export default config;
