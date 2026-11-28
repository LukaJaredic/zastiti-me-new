/**
 * Runs in <head> before the first paint (app/[locale]/layout.tsx). Pages are
 * static, so React only learns the reader's saved light/dark pick after
 * hydration (ColorMode.tsx); this applies it at once by setting data-theme
 * on <html>, the attribute the root Theme keeps in sync afterwards. Without a
 * pick nothing is set and the page follows the OS. app/globals.css lets the
 * attribute steer the theme wrappers until React marks them itself.
 */

/** Where ColorMode.tsx keeps the pick. */
export const colorModeKey = 'zastiti-color-mode';

export const colorModeScript = `try{var m=localStorage.getItem(${JSON.stringify(colorModeKey)});if(m==="light"||m==="dark")document.documentElement.setAttribute("data-theme",m)}catch(e){}`;
