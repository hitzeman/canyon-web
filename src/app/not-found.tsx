import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start justify-center px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-lg text-black/70 dark:text-white/70">
        That trail doesn&apos;t go anywhere.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition-colors hover:border-black/40 dark:border-white/20 dark:hover:border-white/50"
      >
        Back home
      </Link>
    </main>
  );
}
