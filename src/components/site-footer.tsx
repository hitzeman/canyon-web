import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-black/60 sm:flex-row sm:items-center sm:justify-between dark:text-white/60">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="transition-colors hover:text-black dark:hover:text-white"
        >
          {site.email}
        </a>
      </div>
    </footer>
  );
}
