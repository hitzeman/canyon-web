export const THEME_STORAGE_KEY = 'theme';

/**
 * Runs before first paint, at the top of <body>. The prerendered HTML can't know
 * the visitor's theme, so this applies it — their saved choice, else the OS
 * preference — before any content is painted, which is what keeps the page from
 * flashing the wrong colors.
 *
 * Inlined as a string because it has to run ahead of hydration. `useTheme()`
 * reads the result back off <html> rather than deciding it a second time.
 */
export const themeScript = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});document.documentElement.classList.toggle("dark",t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches)}catch(e){}`;
