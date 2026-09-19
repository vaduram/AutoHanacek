/**
 * Připojí `base` k cestě do public/.
 *
 * Soubory importované přes `import` nebo <Image> si base doplní Astro samo,
 * ale ručně psaná cesta jako "/media/hala.jpg" ne — na github.io by pak
 * mířila do kořene domény a nenačetla se.
 */
export function verejne(cesta: string): string {
	const base = import.meta.env.BASE_URL;
	return `${base.replace(/\/$/, '')}/${cesta.replace(/^\//, '')}`;
}
