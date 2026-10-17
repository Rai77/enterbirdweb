"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
};

// Yalnız ziyaretçinin kendi seçimi saklanır (bkz. ThemeScript).
const STORAGE_KEY = "eb-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Geçerli tema <html> üzerindeki "dark" sınıfıdır; ThemeScript onu sayfa
// çizilmeden önce koyar. React durumu ayrıca tutulmaz, sınıf izlenir.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";
const getServerSnapshot = (): Theme => "light";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const toggle = useCallback(
    () => setTheme(getSnapshot() === "dark" ? "light" : "dark"),
    [setTheme],
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: "light" as Theme,
      setTheme: () => {},
      toggle: () => {},
    };
  }
  return ctx;
}
