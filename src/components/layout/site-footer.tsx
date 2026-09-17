import Link from 'next/link';

import { CanyonLogo } from './canyon-logo';
import { footerNav, legalNav, linkHref, site } from '@/lib/site';

const LINK_CLASS = 'text-sm text-link transition-colors hover:text-accent-text';

export function SiteFooter() {
  // Evaluated while prerendering, so this is the year the site was built.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-footer">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="mb-4">
              <span className="sr-only">{site.name}</span>
              <CanyonLogo className="h-10 md:h-11" />
            </p>
            <p className="text-sm leading-relaxed text-subtle">
              Small-batch shirts from Mission Viejo, CA. Built between the desert and the coast.
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h2 className="mb-5 text-[10px] font-bold tracking-widest text-quiet uppercase">
                {group.heading}
              </h2>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a href={link.href} className={LINK_CLASS}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={linkHref(link)} className={LINK_CLASS}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-subtle md:flex-row md:items-center">
          <p>
            &copy; {year} {site.name} All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((link) => (
              <li key={link.label}>
                <Link href={linkHref(link)} className="transition-colors hover:text-accent-text">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
