// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

/**
 * Ostrá doména vs. náhled na github.io.
 *
 * Web běží na www.hanacekauto.cz — doména je nastavená v GitHubu
 * (Settings → Pages → Custom domain), soubor CNAME se při nasazení přes
 * GitHub Actions nepoužívá.
 *
 * GITHUB_PAGES=true postaví web pro https://vaduram.github.io/AutoHanacek/
 * (s `base`, jinak se CSS a obrázky hledají v kořeni domény). Funguje jen,
 * dokud v repozitáři není vlastní doména — pak github.io přesměruje na ni.
 */
const naGithubPages = process.env.GITHUB_PAGES === 'true';
const site = naGithubPages ? 'https://vaduram.github.io' : 'https://www.hanacekauto.cz';
const base = naGithubPages ? '/AutoHanacek' : '';

/**
 * Adresy starého webu (eshop-rychle.cz, podle jeho sitemap.xml ze 4. 10. 2026)
 * → kam patří teď. Google je zná, bez přesměrování by skončily na 404.
 *
 * GitHub Pages neumí 301, takže se pro každou vygeneruje stránka s okamžitým
 * meta refresh — ten Google bere jako trvalé přesměrování.
 * Adresa bez přípony dostane `.html`; GitHub Pages ji pak obslouží i bez ní.
 */
const STARE_ADRESY = {
	'O-NAS-a1_0.htm': '/#dilna',
	'Historie-Firmy-a1_1.htm': '/#dilna',
	'KONTAKTY-a2_0.htm': '/#kde-jsme',
	'NASE-SLUZBY-a3_0.htm': '/#ceny',
	'Opravy-TURBODMYCHADEL-a3_4.htm': '/#ceny',
	'Odtahova-Sluzba-a3_5.htm': '/#ceny',
	'PNEUSERVIS-a3_6.htm': '/#rezervace',
	'AUTOSERVIS-a3_7.htm': '/#ceny',
	'Profesionalni-Chiptunig-a3_10.htm': '/#ceny',
	'Reference-a1_12.htm': '/',
	'Servis-a-doplneni-Klimatizaci-a3_13.htm': '/#ceny',
	'Montaz-taznych-zarizeni-a3_19.htm': '/#ceny',
	'Vymeny-Autoskel-a3_20.htm': '/#ceny',
	'Ozonove-cisteni-klimatizace-a3_24.htm': '/#ceny',
	'OBCHODNI-PODMINKY-a5_0.htm': '/',
	'show-free.htm': '/',
	'obchodni-podminky-eshopu': '/',
	'vymena-oleju-v-automatickych-p': '/#ceny',
	'vymena-oleju-v-automatickych-prevodovkach': '/#ceny',
	'opravy-vstrikovacu-a-cerpadel-common-rail': '/#ceny',
	'osobni-udaje-informacni-povinnost': '/ochrana-osobnich-udaju/',
	'osobni-udaje-diskuze': '/ochrana-osobnich-udaju/',
	'osobni-udaje-heureka': '/ochrana-osobnich-udaju/',
	'osobni-udaje-hlidaci-pes': '/ochrana-osobnich-udaju/',
	'osobni-udaje-newsletter': '/ochrana-osobnich-udaju/',
	'osobni-udaje-registrace': '/ochrana-osobnich-udaju/',
	'osobni-udaje-remarketing': '/ochrana-osobnich-udaju/',
	'ochrana-osobnich-udaju-cookie-lista': '/ochrana-osobnich-udaju/',
};

/** @returns {import('astro').AstroIntegration} */
function stareAdresy() {
	return {
		name: 'stare-adresy',
		hooks: {
			'astro:build:done': ({ dir }) => {
				const koren = fileURLToPath(dir);
				for (const [stara, nova] of Object.entries(STARE_ADRESY)) {
					const kam = base + nova;
					const kanonicka = site + kam.split('#')[0];
					const soubor = path.extname(stara) ? stara : `${stara}.html`;
					fs.writeFileSync(
						path.join(koren, soubor),
						`<!doctype html><html lang="cs"><head><meta charset="utf-8"><title>Hanáček Auto</title>` +
							`<link rel="canonical" href="${kanonicka}"><meta http-equiv="refresh" content="0; url=${kam}">` +
							`</head><body><p>Stránka se přestěhovala: <a href="${kam}">pokračovat na nový web</a>.</p>` +
							`<script>location.replace(${JSON.stringify(kam)})</script></body></html>`,
					);
				}
			},
		},
	};
}

export default defineConfig({
	site,
	base: base || undefined,
	trailingSlash: 'ignore',
	build: {
		inlineStylesheets: 'auto',
	},
	integrations: [stareAdresy()],
});
