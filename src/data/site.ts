/**
 * Veškerý textový obsah webu na jednom místě.
 * Měnit se má tady, ne v komponentách.
 */

export const firma = {
	nazev: 'Hanáček Auto s.r.o.',
	znacka: 'Hanáček Auto-Pneu-Servis',
	ulice: 'Velkomoravská 791',
	psc: '696 85',
	mesto: 'Moravský Písek',
	telefon: '+420 603 544 678',
	telefonZobrazit: '603 544 678',
	telefonHref: 'tel:+420603544678',
	email: 'info@hanacekauto.cz',
	ico: '035 93 657',
	dic: 'CZ03593657',
	// Sídlo podle výpisu z obchodního rejstříku (kurzy.cz, data z justice.cz k 29. 1. 2025).
	sidlo: 'Nedakoničky 283, 696 85 Moravský Písek',
	zalozeno: 2006,
	vlastniDilnaOd: 2015,
	spadovaOblast: ['Moravský Písek', 'Bzenec', 'Veselí nad Moravou'],
	// Budova „Auto-Pneu-Servis Hanáček" v OpenStreetMap (way 688578217), ověřeno 25. 9. 2026.
	geo: { lat: 48.9826231, lng: 17.3248234 },
};

/**
 * `dny` jsou čísla dnů podle Date.getDay() (0 = neděle), `otevira` a `zavira` celé
 * hodiny pražského času. Z nich web počítá stav „Teď otevřeno". O svátcích
 * (seznam v KdeJsme.astro) místo stavu radí zavolat — majitel neví jistě,
 * jestli mají zavřeno o všech.
 */
const vsedni = { otevira: 7, zavira: 16 };

export const oteviraciDoba = [
	{ den: 'Pondělí–pátek', cas: `${vsedni.otevira}:00–${vsedni.zavira}:00`, dny: [1, 2, 3, 4, 5], ...vsedni },
	{ den: 'Sobota', cas: 'dle objednání', dny: [6] },
	{ den: 'Neděle', cas: 'zavřeno', dny: [0] },
	{ den: 'Svátky', cas: 'většinou zavřeno, volejte předem', dny: [] as number[] },
];

/** Externí rezervační kalendář SmartServis (PneuB2B). */
export const rezervace = {
	url: 'https://hanacekauto.rezervaceservisu.cz/',
	/** Vrací URL kalendáře s návratovým odkazem zpět na náš web. */
	urlSNavratem(zpet: string) {
		return `${this.url}?backUrl=${encodeURIComponent(zpet)}`;
	},

	/**
	 * Nativní vložení komponenty místo iframu — kalendář pak běží v našem
	 * layoutu a dá se obarvit přes CSS proměnné (viz Rezervace.astro).
	 *
	 * ⚠️ Názvy souborů obsahují content hash, který se PneuB2B při každém
	 * nasazení změní. Když se bundle nenačte, stránka se sama přepne zpátky
	 * na iframe — objednávka tedy nikdy nepřestane fungovat, jen zešedne.
	 *
	 * Až od PneuB2B (Pavel Hvozdovič, +420 734 682 144) získáme stabilní URL
	 * bez hashe, dosadí se sem a tenhle problém zmizí.
	 * Ověřeno 18. 9. 2026.
	 */
	komponenta: {
		/**
		 * VYPNUTO. Komponenta se sice zaregistruje, ale pak zamrzne na vlastním
		 * načítání dat — spinner donekonečna. Zvenčí se to ladit nedá a iframe
		 * funguje, takže jedeme na něm.
		 *
		 * Zapnout až po domluvě s PneuB2B (stabilní URL bundlu + podporovaný
		 * postup vložení). Pak je potřeba pojistku dodělat tak, aby hlídala
		 * i vykreslení obsahu, ne jen registraci prvku.
		 */
		povoleno: false,

		puvod: 'https://hanacekauto.rezervaceservisu.cz',
		styly: 'styles.3027c286ed4a9b2178e0.css',
		polyfills: 'polyfills.524ca8a87bda0d6465ec.js',
		hlavni: 'main.fbf8e41777d885519a02.js',
		apiUrl: 'https://hanacekauto.smartservis.cloud/api',
		logoUrl: 'https://hanacekauto.smartservis.cloud/images/logo.png',
		userGuid: 'DA5888B1-55DE-4D3C-96BC-8B82A6E8A6B4',
	},
};

/**
 * Titulek v hero sekci. Návrh nabízel pět variant, tady je vybraná.
 * Přepneš změnou indexu – 0 je výchozí z návrhu.
 */
export const TITULKY: readonly (readonly [string, string, string])[] = [
	['Vaše auto', 'v rukou, které', 'mu rozumí.'],
	['Všechno', 'kolem auta.', 'Na jednom místě.'],
	['Nechte to na nás.', 'Tak jako ostatní', 'od roku 2006.'],
	['Staráte se o tisíc věcí.', 'S námi auto', 'mezi ně nepatří.'],
	['Autoservis,', 'který vám řekne', 'cenu dopředu'],
];

export const TITULEK_INDEX = 0;
export const titulek = TITULKY[TITULEK_INDEX];

export const hero = {
	stitek: `${firma.mesto} · vlastní dílna od ${firma.vlastniDilnaOd}`,
	perex:
		'Pneuservis, brzdy a podvozek, klimatizace, turbodmychadla, olej v automatech, ' +
		'diagnostika a příprava na STK, odtah nonstop. Celý ceník máme na webu a konečnou ' +
		'cenu potvrdíme před zahájením práce.',
	perexMobil: 'Pneuservis, brzdy, klimatizace, turba, automaty, STK i odtah nonstop.',
	sezonaStitek: 'Právě teď',
	sezona:
		'Sezóna přezutí — 4 kola i s vyvážením <strong>od 1 100 Kč</strong>. ' +
		'Pneuservis si objednáte online vpravo, ostatní práce telefonicky.',
	sezonaMobil: 'Přezutí 4 kol s vyvážením <strong>od 1 100 Kč</strong>',
	/**
	 * Čísla v hero pásu. Počty aut a zákazníků zadány 4. 10. 2026.
	 *
	 * ⚠️ Vymyšlené číslo je u obchodního tvrzení právní problém (nekalé obchodní
	 * praktiky) a v místě, kde servis znají, stejně neprojde. Položka s `[…]`
	 * se v pásu zobrazí jako nevyplněná.
	 */
	cisla: [
		{ hodnota: '15 000+', dopocitat: null, popis: 'opravených aut' },
		{ hodnota: '8 000+', dopocitat: null, popis: 'spokojených zákazníků' },
		// místo, kam se v pásu vloží `hodnoceni` níže
		'hodnoceni' as const,
		{ hodnota: '2006', dopocitat: 2006, popis: 'v provozu od' },
		{ hodnota: '24/7', dopocitat: null, popis: 'odtah nonstop' },
	],

	/**
	 * Hodnocení zákazníků.
	 *
	 * `pocet` a `url` zatím chybí — doplň je. Známka bez počtu hodnocení je
	 * slabší tvrzení (4,8 ze čtyř recenzí a ze čtyř set je propastný rozdíl)
	 * a odkaz na profil dělá z tvrzení ověřitelnou věc.
	 *
	 * Ověřeno 19. 9. 2026: Firmy.cz uvádí 5,0 z 6 hodnocení. Google se ověřit
	 * nepodařilo — hodnota níže je podle toho, co je vidět v Mapách.
	 */
	hodnoceni: {
		znamka: '4,8',
		maximum: 5,
		pocet: null as number | null,
		zdroj: 'Google',
		url: null as string | null,
	},
};

export const rezervacePanel = {
	nadpis: 'Rezervace pneuservisu',
	zdroj: 'rezervaceservisu.cz',
	popis:
		'Online kalendář zvládá pneuservis. Vyvážení i kontrola defektů jsou v ceně ' +
		'přezutí — platí se zvlášť jen uskladnění sady.',
	ukony: [
		{ nazev: 'Přezutí 4 kol', doplnek: 'vyvážení v ceně', vychozi: true },
		{ nazev: 'Přezutí + uskladnění sady', doplnek: null, vychozi: false },
	],
	cta: 'Otevřít kalendář a vybrat termín',
	telefonPoznamka:
		'Servis, klimatizaci, turbo, automat nebo STK objednáme telefonicky — ' +
		`<a href="${firma.telefonHref}">${firma.telefonZobrazit}</a>, Po–Pá 7:00–16:00.`,
};

export const bezici = [
	'Přezutí',
	'Vyvážení',
	'Uskladnění pneu',
	'Opravy defektů',
	'Diagnostika DELPHI / WOW / KTS',
	'Turbodmychadla GARRETT · HOLSET · IHI · KKK',
	'Olej v automatu se strojním proplachem',
	'Klimatizace R134a · R1234yf',
	'Tažná zařízení',
	'Autoskla',
	'Odtah nonstop',
];

export const sezona = {
	nadpis: ['Sezóna: přezutí', 'znamená čtyři věci'],
	perex:
		'Žádné příplatky za vyvážení ani „dovážení" po pár kilometrech. Co je v ceně, je ' +
		'v ceně. Zbytek dílny běží normálně dál — servis, klima, turba i odtah.',
	body: [
		{
			cislo: '01',
			nazev: 'Přezutí 4 kol',
			text: 'Demontáž, výměna, montáž a dotažení momentovým klíčem podle předpisu výrobce.',
			textKratky: 'Dotažení momentovým klíčem podle předpisu výrobce.',
		},
		{
			cislo: '02',
			nazev: 'Vyvážení v ceně',
			text: 'Každé kolo vyvážíme, neúčtujeme zvlášť. Volant nevibruje, pneu se nesjíždí nerovnoměrně.',
			textKratky: 'Neúčtujeme zvlášť.',
		},
		{
			cislo: '03',
			nazev: 'Defekt na místě',
			text: 'Když se při přezutí najde poškození, spravíme ho hned a cenu vám řekneme předem.',
			textKratky: 'Cenu řekneme předem.',
		},
		{
			cislo: '04',
			nazev: 'Uskladnění',
			text: 'Druhou sadu necháte u nás. Od 500 Kč za sezónu, na jaře je připravená.',
			textKratky: 'Od 500 Kč za sezónu.',
		},
	],
};

export const specializace = {
	nadpis: ['Na čem si', 'zakládáme'],
	perex: 'Práce, které jinde odmítnou nebo posílají dál. Děláme je u sebe, na vlastním vybavení.',
	karty: [
		{
			nazev: 'Turbodmychadla',
			text: 'GARRETT, HOLSET, IHI, KKK, MITSUBISHI, SCHWITZER. Rozebrání a kontrola zdarma, oprava od 1 999 Kč.',
			textKratky: 'GARRETT, HOLSET, IHI, KKK. Rozebrání a kontrola zdarma.',
			foto: { soubor: 'turbo.jpg', video: 'turbo.mp4', popis: 'opotřebované turbodmychadlo na ponku v dílně', pomer: '4 / 3' },
		},
		{
			nazev: 'Olej v automatu',
			text: 'Strojní proplach s filtrem. Bez plničky vyteče jen polovina náplně, zbytek zůstane v měniči a chladiči. Interval 60 000 km.',
			textKratky: 'Strojní proplach s filtrem, interval 60 000 km.',
			foto: { soubor: 'automat.jpg', video: 'automat.mp4', popis: 'volič automatické převodovky s polohami P, R, N, D', pomer: '4 / 3' },
		},
		{
			nazev: 'Klimatizace',
			text: 'R134a i novější R1234yf, dezinfekce výparníku, ozonové čištění, pylový filtr. Diagnostika od 399 Kč.',
			textKratky: 'R134a i R1234yf, dezinfekce, ozon, pylový filtr.',
			foto: { soubor: 'klima.jpg', video: 'klima.mp4', popis: 'displej klimatizace v autě, nastaveno 23 °C', pomer: '4 / 3' },
		},
		{
			nazev: 'Odtah NONSTOP',
			text: 'Osobní i dodávková vozidla do 3,5 t, kdykoliv. Od 25 Kč/km.',
			textKratky: 'Osobní i dodávková vozidla do 3,5 t. Od 25 Kč/km.',
			foto: { soubor: 'odtah.jpg', video: 'odtah.mp4', popis: 'modrý odtahový vůz Iveco s logem Hanáček Auto-Pneu-Servis', pomer: '4 / 3' },
		},
	],
};

export const galerie = {
	nadpis: ['Podívejte se', 'k nám do dílny'],
	perex:
		'Dvě stání, zvedáky, vlastní pneuservisní i diagnostické vybavení. ' +
		'Uvidíte, kam auto necháváte.',
	fotky: [
		{ soubor: 'hala.jpg', popis: 'hala dílny se zvedáky, vůz na stání', sloupce: 3, radky: 2, mobil: 2 },
		{ soubor: 'prezouvacka.jpg', popis: 'přezouvací stroj s kolem, ruce v rukavicích', sloupce: 2, radky: 1, mobil: 1 },
		{ soubor: 'vyvazovacka.jpg', popis: 'vyvažovačka s nasazeným kolem', sloupce: 1, radky: 1, mobil: 1 },
		{ soubor: 'regal-pneu.jpg', popis: 'regál s uskladněnými sadami pneu, popsané sady', sloupce: 3, radky: 1, mobil: 2 },
		{ soubor: 'motor.jpg', popis: 'práce v motorovém prostoru', sloupce: 2, radky: 1, mobil: 1 },
		{ soubor: 'ponk.jpg', popis: 'nářadí na stěně nad ponkem', sloupce: 2, radky: 1, mobil: 1 },
		{ soubor: 'budova.jpg', popis: 'budova dílny zvenku', sloupce: 2, radky: 1, mobil: 2 },
	],
};

export const dilna = {
	stitek: `Vlastní dílna od ${firma.vlastniDilnaOd}`,
	nadpis: ['Dílnu jsme si', 'postavili sami'],
	/** Fakta podle stránky Historie firmy na starém webu hanacekauto.cz. */
	perex:
		'Servis vede Vlastimil Hanáček. Začínali jsme v roce 2006 v pronajaté dílně — ' +
		'a když přestala stačit, postavili jsme si vlastní.',
	milniky: [
		{ rok: '2006', nazev: 'První dílna', text: 'Začínáme v pronajatých prostorách.' },
		{
			rok: '2013',
			nazev: 'Plná kapacita',
			text: 'Stálých zákazníků přibývá, na další auta ani nové přístroje už není místo.',
		},
		{
			rok: '2015',
			nazev: 'Vlastní hala',
			text: 'V září je hotovo — dílna se zázemím pro vybavení a parkováním pro zákazníky.',
		},
	],
	odstavce: [
		'Díky vlastní hale jsme mohli rozšířit služby a ceny přitom zůstaly tam, ' +
			'kde je naši zákazníci znají.',
		'Jezdí k nám z Moravského Písku, Bzence a Veselí nad Moravou.',
	],
	foto: {
		soubor: 'dilna.jpg',
		video: 'dilna.mp4',
		popis: 'budova autoservisu s nápisem AUTO-PNEU-SERVIS a parkovištěm',
		pomer: '4 / 3',
	},
};

export const cenik = {
	nadpis: 'Ostatní služby',
	poznamka: 'Ceny orientační · potvrdíme před prací',
	poznamkaMobil: 'Ceny orientační, konečnou cenu potvrdíme před zahájením práce.',
	polozky: [
		{
			cislo: '01',
			nazev: 'Autoservis',
			popis: 'Brzdy, podvozek, tlumiče, ložiska, motory, převodovky, výfuky, vstřikovače Common Rail.',
			cena: 'od 850 Kč/hod',
			cenaMobil: 'od 850 Kč/h',
			zvyraznit: true,
		},
		{
			cislo: '02',
			nazev: 'Turbodmychadla',
			popis: 'GARRETT, HOLSET, IHI, KKK, MITSUBISHI, SCHWITZER. Rozebrání a kontrola zdarma.',
			cena: 'od 1 999 Kč',
			cenaMobil: 'od 1 999 Kč',
			zvyraznit: true,
		},
		{
			cislo: '03',
			nazev: 'Olej v automatu',
			popis: 'Strojní plnička s proplachem. Bez ní vyteče jen polovina náplně — zbytek zůstane v měniči a chladiči. Interval 60 000 km.',
			cena: '6 000–12 000 Kč',
			cenaMobil: '6–12 tis. Kč',
			zvyraznit: true,
		},
		{
			cislo: '04',
			nazev: 'Klimatizace',
			popis: 'R134a i novější R1234yf, dezinfekce výparníku, ozonové čištění, pylový filtr. Čištění od 499 Kč.',
			cena: 'od 399 Kč',
			cenaMobil: 'od 399 Kč',
			zvyraznit: true,
		},
		{
			cislo: '05',
			nazev: 'Diagnostika',
			popis: 'Počítačová diagnostika systémy DELPHI, WOW, KTS.',
			cena: 'od 400 Kč',
			cenaMobil: 'od 400 Kč',
			zvyraznit: true,
		},
		{
			cislo: '06',
			nazev: 'STK',
			popis: 'Příprava vozu na technickou i emise a zprostředkování STK.',
			cena: 'cena individuální',
			cenaMobil: 'individuálně',
			zvyraznit: false,
		},
		{
			cislo: '07',
			nazev: 'Odtah NONSTOP',
			popis: 'Osobní i dodávková vozidla do 3,5 t. Voláte kdykoliv.',
			cena: 'od 25 Kč/km',
			cenaMobil: 'od 25 Kč/km',
			zvyraznit: true,
		},
		{
			cislo: '08',
			nazev: 'Tažná zař. · Autoskla',
			popis: 'Autohak, Jaeger, Thule, Westfalia; 7 i 13 pólů, homologace EU. Skla často z povinného ručení.',
			cena: 'naceníme telefonicky',
			cenaMobil: 'telefonicky',
			zvyraznit: false,
		},
	],
	dale: {
		nadpis: 'Dále děláme',
		polozky: [
			'chiptuning',
			'karosářské a lakýrnické práce',
			'svařování plastů',
			'opravy po havárii',
			'konzultace při koupi vozu',
		],
		poznamka: 'naceníme telefonicky',
		poznamkaMobil: 'telefonicky',
	},
};

export const ctaPas = {
	nadpis: ['Ať to máte', 'z hlavy do minuty'],
	perex:
		'Pneuservis si zarezervujete online kdykoliv — vyberete si čas, my připravíme stroj ' +
		'a vaši uskladněnou sadu. Na ostatní práce stačí zavolat.',
	primarni: 'Rezervovat pneuservis online',
	sekundarni: `Ostatní servis: ${firma.telefonZobrazit}`,
};

export const kdeJsme = {
	stitek: 'Kde nás najdete',
	doplnek: 'parkování u dílny',
	mapa: {
		/** Tmavě přebarvené dlaždice OSM; provozovna je přesně uprostřed obrázku. */
		soubor: 'mapa.jpg',
		sirka: 2800,
		vyska: 1200,
		atribuce: '© OpenStreetMap',
		atribuceUrl: 'https://www.openstreetmap.org/copyright',
	},
	odkazy: [
		{
			text: 'Mapy.cz',
			href: `https://mapy.com/fnc/v1/showmap?center=${firma.geo.lng},${firma.geo.lat}&zoom=17&marker=true`,
		},
		{
			text: 'Google Maps',
			href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${firma.znacka}, ${firma.ulice}, ${firma.mesto}`)}`,
		},
		{ text: 'Waze', href: `https://waze.com/ul?ll=${firma.geo.lat},${firma.geo.lng}&navigate=yes` },
	],
	hodiny: {
		nadpis: 'Otevírací doba',
		odtah: 'Odtah nonstop',
		odtahCas: '24/7',
		cta: `Zavolat ${firma.telefonZobrazit}`,
	},
	majitel: {
		stitek: 'Majitel servisu',
		jmeno: 'Vlastimil Hanáček',
		/** Slovy majitele. Když je null, karta ukáže jen fotku a jméno. */
		medailon: ('„Mám rád dobře odvedenou práci. Největší radost mám, když se ke mně zákazníci ' +
			'vracejí — protože byli spokojení, ne protože se závada vrátila.“') as string | null,
		foto: { soubor: 'majitel.jpg', popis: 'Vlastimil Hanáček, majitel servisu, v dílně' },
	},
};

export const navigace = [
	{ text: 'Přezutí', href: '#rezervace' },
	{ text: 'Služby', href: '#ceny' },
	{ text: 'Dílna', href: '#dilna' },
	{ text: 'Kontakt', href: '#kde-jsme' },
];

/**
 * Stránka /ochrana-osobnich-udaju/. Řetězce smí obsahovat HTML (odkazy).
 *
 * ⚠️ Návrh, ne právní posudek — před spuštěním ho má projít majitel, ideálně
 * i právník. `[?]` jsou údaje, které z webu zjistit nejde.
 *
 * Popisuje web tak, jak je: bez cookies a analytiky, kalendář až po kliknutí,
 * hosting GitHub Pages. Přibude-li měření návštěvnosti, vložená mapa nebo
 * jiný hosting, text přestane platit a musí se upravit.
 */
export const ochranaUdaju = {
	titulek: 'Ochrana osobních údajů',
	upraveno: '4. 10. 2026',
	perex:
		'Jak zacházíme s údaji, které nám svěříte, když se objednáte, zavoláte nebo u nás necháte auto. ' +
		'Zkráceně: používáme je jen k tomu, co je potřeba k zakázce, a nikomu je neprodáváme.',
	sekce: [
		{
			nadpis: 'Kdo údaje zpracovává',
			odstavce: [
				`Správcem je ${firma.nazev}, IČO ${firma.ico}, se sídlem ${firma.sidlo}. ` +
					`Provozovna: ${firma.ulice}, ${firma.psc} ${firma.mesto}.`,
				`S čímkoli ohledně vašich údajů se obraťte na <a href="mailto:${firma.email}">${firma.email}</a> ` +
					`nebo telefon <a href="${firma.telefonHref}">${firma.telefonZobrazit}</a>.`,
			],
		},
		{
			nadpis: 'Tento web',
			body: [
				'Nepoužívá cookies ani nástroje na měření návštěvnosti nebo reklamu.',
				'Písma i mapa jsou uložené přímo na webu, takže se při prohlížení nepřipojujete k žádné další službě.',
				'Prohlížeč si pamatuje jen to, jestli chcete světlý, nebo tmavý vzhled. Ta volba zůstává ve vašem ' +
					'zařízení a k nám se nedostane.',
				'Web běží na službě GitHub Pages společnosti GitHub, Inc. Ta podle své dokumentace z bezpečnostních ' +
					'důvodů zaznamenává IP adresy návštěvníků, viz ' +
					'<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" ' +
					'target="_blank" rel="noopener">zásady GitHubu</a>.',
				'Odkazy na Mapy.com, Google Maps a Waze otevírají cizí weby. Tam už platí jejich pravidla.',
			],
		},
		{
			nadpis: 'Online rezervace pneuservisu',
			odstavce: [
				'Rezervační kalendář běží na systému SmartServis (PneuB2B), provozovatel [?] (název a IČO podle ' +
					'smlouvy). Kalendář se načte, až když ho otevřete.',
				'Údaje, které do něj vyplníte, slouží jen k domluvě termínu a provozovatel systému je pro nás ' +
					'zpracovává jako zpracovatel. Kalendář má vlastní lištu s nastavením cookies, ty spravuje jeho provozovatel.',
			],
		},
		{
			nadpis: 'Když nám zavoláte nebo přivezete auto',
			odstavce: [
				'Zpracováváme jméno, telefon a e-mail, údaje o vozidle (SPZ, VIN, stav tachometru), co na voze ' +
					'děláme, a u firem fakturační údaje. U odtahu také místo, odkud auto vezeme, u uskladnění, ' +
					'komu sada pneu patří.',
				'Potřebujeme je k domluvě a provedení zakázky (plnění smlouvy, čl. 6 odst. 1 písm. b) GDPR). ' +
					'Doklady pak musíme uchovat kvůli účetnictví a daním (právní povinnost, čl. 6 odst. 1 písm. c) GDPR).',
				'Údaje držíme po dobu zakázky nebo uskladnění, doklady tak dlouho, jak určují účetní a daňové ' +
					'předpisy. Historii servisu vozu uchováváme [?].',
			],
		},
		{
			nadpis: 'Komu je předáváme',
			odstavce: [
				'Jen tomu, kdo nám pomáhá zakázku zajistit (provozovateli rezervačního systému, [?] účetní), ' +
					'a úřadům, pokud to vyžaduje zákon. Neprodáváme je a nepoužíváme k reklamě.',
			],
		},
		{
			nadpis: 'Vaše práva',
			odstavce: [
				'Můžete po nás chtít, abychom vám řekli, jaké údaje o vás máme, opravili je, smazali, omezili ' +
					'jejich zpracování nebo vám je předali. Proti zpracování můžete podat námitku. Stačí napsat ' +
					'nebo zavolat.',
				'Pokud si myslíte, že s údaji nakládáme špatně, můžete si stěžovat u ' +
					'<a href="https://uoou.gov.cz" target="_blank" rel="noopener">Úřadu pro ochranu osobních údajů</a>, ' +
					'Pplk. Sochora 27, 170 00 Praha 7.',
			],
		},
	],
};

/** Stránka 404 — sem dojde i odkaz na starý web, který nemá přesměrování (astro.config.mjs). */
export const nenalezeno = {
	stitek: 'Chyba 404',
	nadpis: 'Tahle stránka tu není',
	text:
		'Možná jste přišli odkazem ze starého webu. Všechno důležité — ceník, objednání ' +
		'pneuservisu i kontakt — teď najdete na jedné stránce.',
	domu: 'Na hlavní stránku',
};

export const seo = {
	titulek: 'Hanáček Auto — autoservis a pneuservis, Moravský Písek',
	popis:
		'Autoservis a pneuservis v Moravském Písku. Přezutí od 1 100 Kč s vyvážením v ceně, ' +
		'klimatizace, turbodmychadla, olej v automatu, odtah nonstop. Objednejte se online.',
};
