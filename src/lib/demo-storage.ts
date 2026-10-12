"use client";

/**
 * Browser-local demo persistence.
 *
 * NOT suitable for production administration: data lives in one browser's
 * localStorage, is readable and editable by anyone using that browser, and is never
 * shared with the server or other visitors. Stored values are parsed with Zod and
 * discarded if they do not match, because browser storage is untrusted input.
 *
 * To go to production, replace the `createDemoStore` instances in
 * `use-demo-data.ts` with server data fetching (see README).
 */
import type { z } from "zod";

const CHANGE_EVENT = "supgs-demo-change";

export interface DemoStore<T> {
  subscribe: (cb: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (value: T) => void;
  reset: () => void;
}

export function createDemoStore<T>(key: string, schema: z.ZodType<T>, seed: T): DemoStore<T> {
  let cachedRaw: string | null | undefined;
  let cachedValue: T = seed;

  const read = (): T => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return seed; // storage blocked (private mode etc.)
    }
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    if (raw === null) {
      cachedValue = seed;
      return cachedValue;
    }
    try {
      const parsed = schema.safeParse(JSON.parse(raw));
      cachedValue = parsed.success ? parsed.data : seed;
    } catch {
      cachedValue = seed;
    }
    return cachedValue;
  };

  return {
    subscribe(cb) {
      const onStorage = (e: StorageEvent) => {
        if (e.key === key || e.key === null) cb();
      };
      window.addEventListener("storage", onStorage);
      window.addEventListener(CHANGE_EVENT, cb);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(CHANGE_EVENT, cb);
      };
    },
    getSnapshot: read,
    getServerSnapshot: () => seed,
    set(value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        throw new Error(
          "Could not save to this browser. Storage may be full or blocked. Try removing large uploaded images.",
        );
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    reset() {
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
  };
}
