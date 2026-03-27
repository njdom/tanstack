import { createClientOnlyFn } from '@tanstack/react-start';

const clientSave = createClientOnlyFn((key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
});

const clientLoad = createClientOnlyFn((key: string): unknown => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
});

const clientClear = createClientOnlyFn((key: string) => {
  localStorage.removeItem(key);
});

export abstract class LocalStorageService<T> {
  constructor(protected readonly storageKey: string) {}

  protected save(data: T): void {
    try {
      clientSave(this.storageKey, data);
    } catch (error) {
      console.error(`[${this.storageKey}] Failed to save to localStorage:`, error);
    }
  }

  protected load(): T | null {
    try {
      return clientLoad(this.storageKey) as T | null;
    } catch (error) {
      console.error(`[${this.storageKey}] Failed to load from localStorage:`, error);
      return null;
    }
  }

  protected clear(): void {
    try {
      clientClear(this.storageKey);
    } catch (error) {
      console.error(`[${this.storageKey}] Failed to clear localStorage:`, error);
    }
  }
}
