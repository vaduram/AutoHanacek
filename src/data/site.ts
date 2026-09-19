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
	zalozeno: 2006,
	vlastniDilnaOd: 2015,
	spadovaOblast: ['Moravský Písek', 'Bzenec', 'Veselí nad Moravou'],
	// Souřadnice provozovny – doplnit přesně podle mapy, než se nasadí mapa a JSON-LD.
	geo: { lat: null as number | null, lng: null as number | null },
};

export const oteviraciDoba = [
	{ den: 'Pondělí–Pátek', cas: '7:00–16:00' },
	{ den: 'Sobota', cas: 'dle objednání' },
	{ den: 'Neděle', cas: 'zavřeno' },
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
		'Sezóna přezutí — 4 kola i s vyvážením <strong>od 950 Kč</strong>. ' +
		'Pneuservis si objednáte online vpravo, ostatní práce telefonicky.',
	sezonaMobil: 'Přezutí 4 kol s vyvážením <strong>od 950 Kč</strong>',
	/**
	 * Čísla v hero pásu.
	 *
	 * ⚠️ Položky s `[…]` jsou nevyplněné. Doplň skutečné hodnoty, nebo je odsud
	 * smaž — vymyšlené číslo je u obchodního tvrzení právní problém (nekalé
	 * obchodní praktiky) a v místě, kde servis znají, stejně neprojde.
	 *
	 * Kde čísla vzít: SmartServis → Zákazníci (počet záznamů), účetnictví
	 * (počet zakázek za rok × roky), nebo skladová evidence uskladněných sad.
	 * Starý web uváděl „přes 700 zákazníků" — bez roku, takže neověřitelné.
	 *
	 * Konkrétní číslo působí věrohodněji než kulaté: „1 240" věří člověk spíš
	 * než „5 000". A hodnota s rokem („od 2006") je ověřitelná, tedy bezpečná.
	 */
	cisla: [
		{ hodnota: '950', dopocitat: 950, popis: 'Kč / 4 kola' },
		{ hodnota: '2006', dopocitat: 2006, popis: 'v provozu od' },
		{ hodnota: '24/7', dopocitat: null, popis: 'odtah nonstop' },
		{ hodnota: '9', dopocitat: 9, popis: 'oborů pod jednou střechou' },
		{ hodnota: '[?]', dopocitat: null, popis: 'opravených vozů' },
		{ hodnota: '[?]', dopocitat: null, popis: 'zákazníků' },
	],
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
			text: 'Druhou sadu necháte u nás. Od 500 Kč za sezónu, na jaře je připravená.',
			textKratky: 'Od 500 Kč za sezónu.',
		},
	],
};

export const specializace = {
	nadpis: ['Na čem si', 'zakládáme'],
	perex: 'Práce, které jinde odmítnou nebo posílají dál. Děláme je u sebe, na vlastním vybavení.',
	karty: [
		{
			nazev: 'Turbodmychadla',
			text: 'GARRETT, HOLSET, IHI, KKK, MITSUBISHI, SCHWITZER. Rozebrání a kontrola zdarma, oprava od 1 999 Kč.',
			textKratky: 'GARRETT, HOLSET, IHI, KKK. Rozebrání a kontrola zdarma.',
			foto: { soubor: 'turbo.jpg', popis: 'rozebrané turbo na ponku, detail kompresorového kola', pomer: '4 / 3' },
		},
		{
			nazev: 'Olej v automatu',
			text: 'Strojní proplach s filtrem. Bez plničky vyteče jen polovina náplně, zbytek zůstane v měniči a chladiči. Interval 60 000 km.',
			textKratky: 'Strojní proplach s filtrem, interval 60 000 km.',
			foto: { soubor: 'automat.jpg', popis: 'strojní plnička připojená k automatu, hadice a průhledné trubice', pomer: '4 / 3' },
		},
		{
			nazev: 'Klimatizace',
			text: 'R134a i novější R1234yf, dezinfekce výparníku, ozonové čištění, pylový filtr. Diagnostika od 399 Kč.',
			textKratky: 'R134a i R1234yf, dezinfekce, ozon, pylový filtr.',
			foto: { soubor: 'klima.jpg', popis: 'plnička klimatizace u otevřené kapoty, displej stanice', pomer: '4 / 3' },
		},
		{
			nazev: 'Odtah NONSTOP',
			text: 'Osobní i dodávková vozidla do 3,5 t, kdykoliv. Od 25 Kč/km.',
			textKratky: 'Osobní i dodávková vozidla do 3,5 t. Od 25 Kč/km.',
			foto: { soubor: 'odtah.jpg', popis: 'odtahový vůz s naloženým autem za tmy, modré světlo', pomer: '4 / 3' },
		},
	],
};

export const galerie = {
	nadpis: ['Podívejte se', 'k nám do dílny'],
	perex:
		'Dvě stání, zvedáky, vlastní pneuservisní i diagnostické vybavení. ' +
		'Uvidíte, kam auto necháváte.',
	fotky: [
		{ soubor: 'hala.jpg', popis: 'celkový pohled do haly se dvěma zvedáky, denní světlo z vrat', sloupce: 3, radky: 2, mobil: 2 },
		{ soubor: 'prezouvacka.jpg', popis: 'přezouvací stroj s kolem, ruce v rukavicích', sloupce: 2, radky: 1, mobil: 1 },
		{ soubor: 'vyvazovacka.jpg', popis: 'vyvažovačka', sloupce: 1, radky: 1, mobil: 1 },
		{ soubor: 'regal-pneu.jpg', popis: 'regál s uskladněnými sadami pneu, popsané sady', sloupce: 3, radky: 1, mobil: 2 },
		{ soubor: 'diagnostika.jpg', popis: 'diagnostika s notebookem u vozu', sloupce: 2, radky: 1, mobil: 1 },
		{ soubor: 'ponk.jpg', popis: 'srovnané nářadí na ponku, shora', sloupce: 2, radky: 1, mobil: 1 },
		{ soubor: 'budova.jpg', popis: 'budova dílny zvenku z Velkomoravské', sloupce: 2, radky: 1, mobil: 2 },
	],
};

export const dilna = {
	stitek: `Vlastní dílna od ${firma.vlastniDilnaOd}`,
	nadpis: ['Dílnu jsme si', 'postavili sami'],
	odstavce: [
		'Servis vede Vlastimil Hanáček. Od roku 2006 v pronajatých prostorách, od září 2015 ' +
			've vlastní hale — postavili jsme ji, protože kapacita přestala stačit.',
		'Jezdí k nám z Moravského Písku, Bzence a Veselí nad Moravou.',
	],
	foto: {
		soubor: 'prezouvaci-stroj.jpg',
		popis: 'přezouvací stroj s kolem, ruce mechanika v rukavicích, jedno boční světlo',
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
			cena: 'od 700 Kč/hod',
			cenaMobil: 'od 700 Kč/h',
			zvyraznit: true,
		},
		{
			cislo: '02',
			nazev: 'Turbodmychadla',
			popis: 'GARRETT, HOLSET, IHI, KKK, MITSUBISHI, SCHWITZER. Rozebrání a kontrola zdarma.',
			cena: 'od 1 999 Kč',
			cenaMobil: 'od 1 999 Kč',
			zvyraznit: true,
		},
		{
			cislo: '03',
			nazev: 'Olej v automatu',
			popis: 'Strojní plnička s proplachem. Bez ní vyteče jen polovina náplně — zbytek zůstane v měniči a chladiči. Interval 60 000 km.',
			cena: '6 000–12 000 Kč',
			cenaMobil: '6–12 tis. Kč',
			zvyraznit: true,
		},
		{
			cislo: '04',
			nazev: 'Klimatizace',
			popis: 'R134a i novější R1234yf, dezinfekce výparníku, ozonové čištění, pylový filtr. Čištění od 499 Kč.',
			cena: 'od 399 Kč',
			cenaMobil: 'od 399 Kč',
			zvyraznit: true,
		},
		{
			cislo: '05',
			nazev: 'Diagnostika a STK',
			popis: 'Systémy DELPHI, WOW, KTS. Příprava na technickou i emise.',
			cena: 'dle rozsahu',
			cenaMobil: 'dle rozsahu',
			zvyraznit: false,
		},
		{
			cislo: '06',
			nazev: 'Odtah NONSTOP',
			popis: 'Osobní i dodávková vozidla do 3,5 t. Voláte kdykoliv.',
			cena: 'od 25 Kč/km',
			cenaMobil: 'od 25 Kč/km',
			zvyraznit: true,
		},
		{
			cislo: '07',
			nazev: 'Tažná zař. · Autoskla',
			popis: 'Autohak, Jaeger, Thule, Westfalia; 7 i 13 pólů, homologace EU. Skla často z povinného ručení.',
			cena: 'naceníme telefonicky',
			cenaMobil: 'telefonicky',
			zvyraznit: false,
		},
	],
	dale:
		'Dále: chiptuning · karosářské a lakýrnické práce · svařování plastů · ' +
		'opravy po havárii · konzultace při koupi vozu',
};

export const ctaPas = {
	nadpis: ['Ať to máte', 'z hlavy do minuty'],
	perex:
		'Pneuservis si zarezervujete online kdykoliv — vyberete si čas, my připravíme stroj ' +
		'a vaši uskladněnou sadu. Na ostatní práce stačí zavolat.',
	primarni: 'Rezervovat pneuservis online',
	sekundarni: `Ostatní servis: ${firma.telefonZobrazit}`,
};

export const navigace = [
	{ text: 'Přezutí', href: '#rezervace' },
	{ text: 'Služby', href: '#ceny' },
	{ text: 'Dílna', href: '#dilna' },
	{ text: 'Kontakt', href: '#kontakt' },
];

export const seo = {
	titulek: 'Hanáček Auto — autoservis a pneuservis, Moravský Písek',
	popis:
		'Autoservis a pneuservis v Moravském Písku. Přezutí od 950 Kč s vyvážením v ceně, ' +
		'klimatizace, turbodmychadla, olej v automatu, odtah nonstop. Objednejte se online.',
};
