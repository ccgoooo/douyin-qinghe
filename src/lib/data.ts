import candle from "@/assets/p-candle.jpg";
import diffuser from "@/assets/p-diffuser.jpg";
import soap from "@/assets/p-soap.jpg";
import hero from "@/assets/hero.jpg";

/** Set to true to add <meta name="robots" content="noindex,nofollow"> on every page. */
export const SEO_NOINDEX = true;

export type Product = { id: string; name: string; desc: string; price: number; image: string; tag: string };

export const products: Product[] = [
  { id: "lavender-candle", name: "Lavender Field Candle", desc: "Hand-poured soy wax with dried lavender buds. 40-hour burn.", price: 128, image: candle, tag: "Candle" },
  { id: "eucalyptus-diffuser", name: "Eucalyptus Reed Diffuser", desc: "Amber glass diffuser with rattan reeds. Fresh, airy, calming.", price: 168, image: diffuser, tag: "Diffuser" },
  { id: "herb-soap-trio", name: "Garden Herb Soap Trio", desc: "Three cold-process bars: lavender, sage, and oat honey.", price: 88, image: soap, tag: "Bath" },
  { id: "morning-set", name: "Quiet Morning Gift Set", desc: "Candle, oil blend and linen pouch, gift-wrapped by hand.", price: 268, image: hero, tag: "Gift" },
  { id: "sleep-oil", name: "Deep Sleep Oil Blend", desc: "10ml blend of cedar, chamomile and sweet orange.", price: 98, image: diffuser, tag: "Oil" },
  { id: "workshop", name: "Candle-Making Workshop", desc: "A 2-hour in-studio class. Take home two candles you made.", price: 220, image: candle, tag: "Service" },
];

export const team = [
  { name: "Lin Qing", role: "Founder & Scent Maker" },
  { name: "Mo Yue", role: "Ceramics & Packaging" },
  { name: "Ah Tao", role: "Workshops & Local Delivery" },
];

export const faqs = [
  { q: "Do you offer local delivery?", a: "Yes — orders within our local delivery zone arrive in 1–2 days. In-store pickup is always free." },
  { q: "Are your ingredients natural?", a: "We use soy and coconut wax, cotton wicks and plant-based essential oils." },
  { q: "Can I return an item?", a: "Unused items can be returned within 14 days. Candles that have been lit cannot be returned." },
  { q: "Do you take custom orders?", a: "Yes, for events and gifts. Send us a message through the contact page." },
];

export const fmt = (n: number) => `¥${n.toFixed(0)}`;
