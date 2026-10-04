# Hanáček Auto — web

Statický web autoservisu Hanáček Auto (Moravský Písek), Velkomoravská 791.
Implementace návrhu **3a „Grand Tourer"** (kinematický hero, modrá ze značky,
tmavé i světlé téma, přezutí jako hlavní cíl).

## Spuštění

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # výstup do dist/
npm run preview  # náhled buildu
npm run check    # typová kontrola
```

Node 22+.

## Jak je to postavené

| | |
|---|---|
| Astro 7, statický výstup | žádný framework, na stránce běží ~2 kB vlastního JS |
| Vlastní CSS s tokeny | návrh je custom, Tailwind by tu byl jen balast |
| Fonty self-hostované | `@fontsource` — žádné volání na Google, tedy ani otazník kolem GDPR |
| Tmavé téma výchozí | světlé podle systému, přepínač v hlavičce, volba v `localStorage` |

Veškeré texty a ceny jsou v **`src/data/site.ts`**. Měň je tam, ne v komponentách.

### Titulek v hero sekci

Návrh nabízel pět variant. Vybraná je v `site.ts`:

```ts
export const TITULEK_INDEX = 0;   // „Vaše auto v rukou, které mu rozumí."
```

Přepneš změnou indexu, ostatní varianty jsou v poli `TITULKY` hned nad tím.

### Fotky a video

Viz **[FOTKY.md](./FOTKY.md)** — seznam souborů a co nafotit.

Komponenta `PhotoSlot` kontroluje při buildu, jestli soubor v `public/media/`
existuje. Když ano, vloží ho; když ne, nechá popsanou atrapu s instrukcí.
**Nikdy nevznikne rozbitý obrázek** a nemusí se nic přepojovat — stačí nahrát
soubor pod správným názvem a přebuildit.

### Rezervační kalendář

Sekce `#rezervace` vkládá `hanacekauto.rezervaceservisu.cz` přes `<iframe>`
s parametrem `backUrl` zpět na náš web.

Ověřeno, že jde i **nativní vložení** jejich web-componenty — bylo by to v našem
layoutu a barvách místo cizího iframu:

```html
<smartservis-reservation-full
  api-url="https://hanacekauto.smartservis.cloud/api"
  logo-url="https://hanacekauto.smartservis.cloud/images/logo.png"
  user-guid="DA5888B1-55DE-4D3C-96BC-8B82A6E8A6B4">
</smartservis-reservation-full>
```

Jejich API vrací `Access-Control-Allow-Origin: *`, takže z cizí domény funguje.
Brzdí to jediná věc: JS bundle má v názvu content hash (`main.<hash>.js`), který se
při každém jejich nasazení změní — web by se jednou tiše rozbil. Až od PneuB2B
získáme **stabilní URL bundlu** (Pavel Hvozdovič, +420 734 682 144 — sám nabízel
„vyšší formu integrace"), dá se iframe vyměnit.

Kalendář umí i parametry `?rz=` (předvyplní RZ), `?pobocka=` a `?backUrl=`,
a při dokončené rezervaci posílá `window` událost `save-gtag` — použitelné
pro měření konverzí.

## Nasazení na GitHub Pages

GitHub Pages **neumí a nemusí umět Astro**. Web sestaví GitHub Actions a na Pages
pošle až hotové HTML — Pages je jen statický hosting, o Astru se nedozví.

Workflow je v `.github/workflows/deploy.yml`.

> **Pozor na kořen repozitáře.** GitHub čte workflow jen z `.github/workflows/`
> **v kořeni repozitáře**. Tenhle soubor je uvnitř složky `web/`, takže kořenem
> repozitáře musí být `web/` — ne nadřazená `AutoHanacek/`.
> Kdybys chtěl kořen o úroveň výš, musí se workflow přesunout tam a akci
> `withastro/action@v6` přidat `with: { path: ./web }`.

Po prvním pushi ještě v repozitáři: **Settings → Pages → Source → GitHub Actions**.

### Vlastní doména vs. github.io

Web běží na **www.hanacekauto.cz**. Doména je zadaná v GitHubu
(**Settings → Pages → Custom domain**); soubor `public/CNAME` se při nasazení
přes GitHub Actions nepoužívá, proto tu není.

DNS spravuje Thinline (Český hosting), u kterého je doména registrovaná:

| Záznam | Hodnota |
|---|---|
| `www` CNAME | `vaduram.github.io` |
| `@` A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| `@` AAAA | `2606:50c0:8000::153` … `2606:50c0:8003::153` |
| `@` MX | `mx1d10.thinline.cz`, `mx1b20.thinline.cz` — **neměnit**, jinak přestane chodit `info@` |

Holá doména `hanacekauto.cz` přesměruje na `www` sama (GitHub).

Staré adresy z eshop-rychle.cz (`/AUTOSERVIS-a3_7.htm`, …) přesměrovává na nový
web `STARE_ADRESY` v `astro.config.mjs`; ostatní skončí na `src/pages/404.astro`.

Náhled na `github.io` (nastavením `GITHUB_PAGES=true` v `deploy.yml`, viz
`astro.config.mjs`) funguje, jen dokud v repozitáři není vlastní doména.

## Co zbývá před spuštěním

1. **Fotky a video** — bez nich hero stojí jen na gradientu. Největší položka.
2. **Právní texty** — návrh zásad ochrany osobních údajů je na stránce
   `/ochrana-osobnich-udaju/` (text v `ochranaUdaju` v `site.ts`). Doplnit `[?]`
   a nechat zkontrolovat. Staré obchodní podmínky se nedají použít, odkazují na
   zákon 101/2000 Sb., což je předGDPR.
3. **Mapa** v sekci kontakt — v návrhu není, ale zákazník ji hledá.
   Doplnit i `firma.geo` v `site.ts`, JSON-LD ji pak použije.
4. **Ověřit IČO OSVČ** — web uvádí 742 14 021, obchodní rejstřík 742 10 021.
   Na webu je teď jen IČO s.r.o., které sedí.
5. **Search Console** — po přechodu na doménu zkontrolovat, že se nový web indexuje
   a staré adresy přecházejí na nové (přesměrování viz výše).

## Poznámky k implementaci

- Z návrhu **nepřevzatý giphy GIF** v hero — byl to jen zástupný obrázek.
  Nahrazen `<video>` s vlastním souborem, s fallbackem na poster a dál na gradient.
- **Rezervační panel v hero neukazuje konkrétní volné termíny.** V mockupu byly
  („Po 21. 9. · 7:30 — VYBRÁNO"), ale vypisovat vymyšlené časy zákazníkovi je lež —
  skutečnou dostupnost zná jen SmartServis. Panel proto shrne, co kalendář umí,
  a pošle na něj.
- Anotační pruh z návrhu („Foto/video na pozadí — atrapa") je poznámka pro
  designéra, na web nepatří — instrukce jsou místo toho v `FOTKY.md`.
- Animace respektují `prefers-reduced-motion`. Prvky se schovávají až z JS, takže
  když se skript nenačte, obsah zůstane vidět.
