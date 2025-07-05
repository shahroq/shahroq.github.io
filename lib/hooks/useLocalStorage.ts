import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const isClient = typeof window !== "undefined";

  // Read from localStorage on client after mount
  useEffect(() => {
    if (!isClient) return;

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`useLocalStorage: error reading key "${key}"`, error);
    }
  }, [key, isClient]);

  // Write to localStorage when value changes
  useEffect(() => {
    if (!isClient) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`useLocalStorage: error writing key "${key}"`, error);
    }
  }, [key, storedValue, isClient]);

  return [storedValue, setStoredValue] as const;
}
