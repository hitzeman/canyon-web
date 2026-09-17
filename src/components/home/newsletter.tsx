import { newsletter } from '@/lib/site';

/**
 * A plain HTML form: it posts straight to the email provider configured in
 * site.ts, so it needs no JavaScript and leaves validation to the browser.
 */
export function Newsletter() {
  const configured = newsletter.action !== null;

  return (
    <section aria-labelledby="newsletter-heading" className="bg-coal py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 px-6 md:flex-row md:items-end">
        <div className="max-w-lg">
          <h2
            id="newsletter-heading"
            className="mb-4 font-display text-5xl leading-none text-white uppercase md:text-6xl"
          >
            Drop 002
            <br />
            is coming
          </h2>
          <p className="text-base leading-relaxed text-[#888]">
            Get the email before the shirts hit the site. No spam, a few times a year.
          </p>
        </div>

        <div className="w-full md:w-auto md:min-w-[380px]">
          <form
            method="post"
            action={newsletter.action ?? undefined}
            className="border-b border-[#666]"
          >
            {/* Disabled until a provider URL is set, so it can never post to this page. */}
            <fieldset disabled={!configured} className="flex min-w-0 items-center gap-4">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name={newsletter.emailField}
                required
                autoComplete="email"
                placeholder="you@email.com"
                className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white placeholder:text-[#808080]"
              />
              {newsletter.hidden.map((field) => (
                <input key={field.name} type="hidden" name={field.name} value={field.value} />
              ))}
              <button
                type="submit"
                className="shrink-0 py-4 text-xs font-bold tracking-widest text-accent uppercase transition-colors enabled:hover:text-accent-hover disabled:cursor-not-allowed"
              >
                Sign up
              </button>
            </fieldset>
          </form>
          <p className="mt-3 text-[11px] text-[#888]">
            {configured ? 'No spam. Unsubscribe anytime.' : 'Sign-ups open soon.'}
          </p>
        </div>
      </div>
    </section>
  );
}
