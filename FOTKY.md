# Fotky a video

Sem se nahrávají soubory pod **přesně těmito názvy**. Jakmile soubor existuje,
web ho sám začne používat místo popsané atrapy — nic se nikde nepřepisuje.
Dokud chybí, zobrazí se tmavé pole s popisem záběru, ne rozbitý obrázek.

## Hero

| Soubor | Co to je |
|---|---|
| `hero.mp4` | Smyčka 8–12 s, **bez zvuku**, H.264, cíl do 3 MB. Teď je tu povolování kola utahovačkou (IMG_3256), čtverec 1080 × 1080 — web ho ořízne podle obrazovky, na monitoru zůstane jen pás kolem středu. Web ji ztmaví a odbarví sám — nedodávej už upravené. Běží jen na tabletu a větším. |
| `hero-poster.jpg` | První snímek z videa. Je vidět, než se video načte, a na mobilu je jediný — video se tam nestahuje. |

Video není povinné — bez něj hero použije `hero-poster.jpg`, a bez obojího
zůstane tmavý gradient se světelnými pruhy. Vypadá to dobře, ale je to slabší.

## Specializace (poměr 4:3)

| Soubor | Co nafotit |
|---|---|
| `turbo.jpg` | Rozebrané turbo na ponku, detail kompresorového kola |
| `automat.jpg` | Strojní plnička připojená k automatu, hadice a průhledné trubice |
| `klima.jpg` | Plnička klimatizace u otevřené kapoty, displej stanice |
| `odtah.jpg` | Odtahový vůz s naloženým autem za tmy, modré světlo |

Ke každé kartě může být i video se stejným názvem: `turbo.mp4`, `automat.mp4`,
`klima.mp4`, `odtah.mp4`. Na tabletu a notebooku se přes fotku prolne a běží ve
smyčce, na mobilu zůstane jen fotka a video se tam vůbec nestahuje. Fotka je
proto dál potřeba — na mobilu je jediná a jinde je vidět, než se video načte.

- Smyčka 6–10 s, **bez zvuku** (zvukovou stopu při exportu vypni), ořez 4:3.
- 960 × 720 px stačí, karta je na monitoru široká zhruba 340 px.
- H.264, cíl do 1,5 MB na video — na stránce jsou čtyři najednou.
- Konec navázat na začátek, ať smyčka necukne.

## Galerie dílny

Teď jsou tu snímky vytažené z videí ve `Video/202609_a` (zdroj = `IMG_xxxx.MOV`).
Web je ořezává na střed podle velikosti dlaždice, proto stačí 16:9 nebo 3:2.

| Soubor | Co je na něm | Zdroj |
|---|---|---|
| `hala.jpg` | Hala se zvedáky, vůz na stání | 3276 |
| `prezouvacka.jpg` | Přezouvací stroj s kolem, ruce v rukavicích | 3268 |
| `vyvazovacka.jpg` | Vyvažovačka s nasazeným kolem | 3267 |
| `regal-pneu.jpg` | Regál s uskladněnými sadami pneu, popsané sady | 3295 |
| `motor.jpg` | Práce v motorovém prostoru | 3279 |
| `ponk.jpg` | Nářadí na stěně nad ponkem | 3248 |
| `budova.jpg` | Budova dílny zvenku, čelní pohled na vrata | 3243 |

## Sekce „Dílnu jsme si postavili sami"

| Soubor | Co nafotit |
|---|---|
| `dilna.mp4` | Smyčka průjezdu kolem budovy (IMG_3239), tam a zpět, 1280 × 720. Jen na tabletu a větším. |
| `dilna.jpg` | První snímek z videa. Na mobilu je jediný, jinde je vidět, než se video načte. |

## Na co si dát pozor

- **Fotit na šířku**, ne na výšku — web ořezává na střed.
- Dlouhá strana **2400 px** stačí, větší jen nafukuje stránku.
- Nepřeexponovat. Návrh počítá s tmavšími, kontrastními snímky.
- Žádný stock. Celý dojem webu stojí na tom, že jsou fotky skutečné.
