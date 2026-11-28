'use client';

import {createContext, use, useCallback, useSyncExternalStore} from 'react';
import type {ReactNode} from 'react';
import {colorModeKey} from './colorModeScript';

/**
 * The reader's light/dark choice. "system" follows the OS until they pick
 * one; the pick is remembered in localStorage. Pages are static, so the
 * server always renders "system" and React applies a stored pick on
 * hydration. colorModeScript applies it earlier, before the first paint.
 */
export type ColorMode = 'system' | 'light' | 'dark';

const KEY = colorModeKey;
const listeners = new Set<() => void>();

function readStored(): ColorMode {
  const v = localStorage.getItem(KEY);
  return v === 'light' || v === 'dark' ? v : 'system';
}

function subscribeStored(fn: () => void) {
  listeners.add(fn);
  window.addEventListener('storage', fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener('storage', fn);
  };
}

const darkQuery = '(prefers-color-scheme: dark)';

function subscribeSystem(fn: () => void) {
  const mq = window.matchMedia(darkQuery);
  mq.addEventListener('change', fn);
  return () => mq.removeEventListener('change', fn);
}

const ColorModeContext = createContext<{
  mode: ColorMode;
  resolved: 'light' | 'dark';
  setMode: (mode: ColorMode) => void;
}>({mode: 'system', resolved: 'light', setMode: () => {}});

export function ColorModeProvider({
  children,
}: {
  children: (mode: ColorMode) => ReactNode;
}) {
  const mode = useSyncExternalStore<ColorMode>(
    subscribeStored,
    readStored,
    () => 'system',
  );
  const systemDark = useSyncExternalStore(
    subscribeSystem,
    () => window.matchMedia(darkQuery).matches,
    () => false,
  );
  const setMode = useCallback((next: ColorMode) => {
    if (next === 'system') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, next);
    listeners.forEach((fn) => fn());
  }, []);
  const resolved = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode;

  return (
    <ColorModeContext value={{mode, resolved, setMode}}>
      {children(mode)}
    </ColorModeContext>
  );
}

export function useColorMode() {
  return use(ColorModeContext);
}
