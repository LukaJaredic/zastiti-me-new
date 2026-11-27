'use client';

import {useSyncExternalStore} from 'react';

/**
 * Whether the mobile menu is open, shared by every SiteHeader.
 *
 * Each language has its own layout, so switching language shows the other
 * language's header (a fresh one, or the one Next kept hidden from an earlier
 * visit). A switch from the menu should leave the menu open, like the theme
 * switch, so the state lives here, outside any one header: the language icon
 * calls `carryTo(href)`, and the header that shows that page finds the menu
 * still open. Every other change of page closes it.
 */
type MenuState = {
  isOpen: boolean;
  /** Opened by a language switch: appear in place, without sliding in. */
  opensInPlace: boolean;
  /** The page a language switch is heading to; arriving there keeps it open. */
  keepOpenOn: string | null;
};

const closed: MenuState = {isOpen: false, opensInPlace: false, keepOpenOn: null};
let state = closed;
const listeners = new Set<() => void>();

function set(next: MenuState) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const menuState = {
  open: () => set({isOpen: true, opensInPlace: false, keepOpenOn: null}),
  close: () => set(closed),
  /** A language switch from the menu: stay open on arrival at `href`. */
  carryTo: (href: string) =>
    set({isOpen: true, opensInPlace: true, keepOpenOn: href}),
  /**
   * A header showed `pathname`: close, unless a language switch led here.
   * While Next swaps pages, both the outgoing and the incoming header may
   * report the new path, so the marker isn't used up on arrival: it lasts
   * while you stay on that page and goes when the menu closes or you move.
   */
  arrivedAt: (pathname: string) => {
    if (!state.isOpen || state.keepOpenOn === pathname) return;
    set(closed);
  },
};

/** The menu state; closed on the server and while hydrating. */
export function useMenuState(): MenuState {
  return useSyncExternalStore(subscribe, () => state, () => closed);
}
