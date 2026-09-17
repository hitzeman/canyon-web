'use client';

import { useSyncExternalStore } from 'react';

const URL_CHANGE_EVENT = 'canyon:urlchange';

/**
 * The fragment in the address bar, as a reactive value.
 *
 * The prerendered HTML has no fragment to go on, so the server snapshot is
 * empty and React reads the real one straight after hydration.
 */
export function useLocationHash(): string {
  return useSyncExternalStore(subscribe, getHash, getServerHash);
}

function getHash(): string {
  return window.location.hash;
}

function getServerHash(): string {
  return '';
}

function subscribe(onChange: () => void): () => void {
  announceHistoryChanges();
  const events = ['hashchange', 'popstate', URL_CHANGE_EVENT];
  for (const event of events) window.addEventListener(event, onChange);
  return () => {
    for (const event of events) window.removeEventListener(event, onChange);
  };
}

let announcing = false;

/**
 * The router navigates an in-page link such as /#story with history.pushState,
 * which fires no event of its own — neither hashchange nor popstate — so the
 * fragment would otherwise change unobserved. This wraps the two history methods
 * once to announce the change; it adds an event and alters nothing else.
 */
function announceHistoryChanges(): void {
  if (announcing) return;
  announcing = true;

  for (const method of ['pushState', 'replaceState'] as const) {
    const original = history[method];
    history[method] = function patched(this: History, ...args: Parameters<History['pushState']>) {
      const result = original.apply(this, args);
      window.dispatchEvent(new Event(URL_CHANGE_EVENT));
      return result;
    };
  }
}
