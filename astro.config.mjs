// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Náhled na github.io vs. ostrá doména.
 *
 * Workflow nastavuje GITHUB_PAGES=true, takže se web staví pro
 * https://vaduram.github.io/AutoHanacek/ — tam musí být `base`,
 * jinak se CSS a obrázky hledají v kořeni domény a nenačtou se.
 *
 * Až bude hotové DNS: v .github/workflows/deploy.yml smaž řádek
 * s GITHUB_PAGES a přidej public/CNAME s obsahem www.hanacekauto.cz.
 */
const naGithubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
	site: naGithubPages ? 'https://vaduram.github.io' : 'https://www.hanacekauto.cz',
	base: naGithubPages ? '/AutoHanacek' : undefined,
	trailingSlash: 'ignore',
	build: {
		inlineStylesheets: 'auto',
	},
});
