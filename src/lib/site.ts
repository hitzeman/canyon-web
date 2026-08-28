export const site = {
  name: "Canyon Supply Co.",
  shortName: "Canyon Supply",
  tagline: "Gear built for the long way round.",
  description:
    "Canyon Supply Co. makes durable, no-nonsense outdoor gear for people who'd rather be outside.",
  email: "hello@canyonsupply.co",
  // Used for absolute URLs in metadata. Override per-environment at build time.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://canyonsupply.co",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
] as const;
