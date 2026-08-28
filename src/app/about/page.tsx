import type { Metadata } from "next";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `How ${site.name} got started and what we build.`,
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight">About us</h1>
      <div className="mt-8 space-y-6 text-lg leading-8 text-black/70 dark:text-white/70">
        <p>
          {site.name} started the way these things usually do: a handful of
          friends, a long weekend, and a pack that fell apart two miles from the
          car.
        </p>
        <p>
          We build a small number of things and we build them to last. Every
          product gets used hard by the people who designed it before it ever
          goes on the site, and anything that doesn&apos;t come back in one
          piece doesn&apos;t ship.
        </p>
        <p>
          Questions, repairs, or just want to tell us where you took your gear?{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-foreground underline underline-offset-4"
          >
            {site.email}
          </a>
        </p>
      </div>
    </main>
  );
}
