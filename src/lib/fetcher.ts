import { cache } from "react";

const BASE_URL = "https://dummyjson.com/";

export const fetcher = cache(
  async <T>(url: string, init?: RequestInit): Promise<T> => {
    try {
      const res = await fetch(BASE_URL + url, init);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);

      return (await res.json()) as T;
    } catch (error) {
      const msg = error instanceof Error ? error.message : `Unknown error`;
      throw Error(msg);
    }
  },
);

export async function saveData<T>(key: string, data: T) {
  if (!window) return;

  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    const msg =
      error instanceof Error
        ? `${error.message}: Error Saving ${key} data`
        : `Unknown error:: Error Saving ${key} data`;
    throw Error(msg);
  }
}

export const getData = cache(
  async <T>(key: string, initialData: T): Promise<T> => {
    if (!window) return initialData;

    try {
      const res = localStorage.getItem(key);
      return res ? JSON.parse(res) : initialData;
    } catch (error) {
      const msg =
        error instanceof Error
          ? `${error.message}: Error Getting ${key} data`
          : `Unknown error:: Error Getting ${key} data`;
      throw Error(msg);
    }
  },
);

export async function deleteData(key: string) {
  if (!window) return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    const msg =
      error instanceof Error
        ? `${error.message}: Error Deleting ${key} data`
        : `Unknown error:: Error Deleting ${key} data`;
    throw Error(msg);
  }
}
