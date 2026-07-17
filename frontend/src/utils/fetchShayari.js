import { getRandomShayari } from '../data/shayari';

const STORAGE_KEY = 'romantic-proposal-shayari';

export async function fetchShayari() {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) {
      throw new Error('API failed');
    }

    const data = await response.json();
    const quote = data?.quote?.trim();
    if (quote) {
      window.localStorage.setItem(STORAGE_KEY, quote);
      return quote;
    }
  } catch {
    const fallback = getRandomShayari();
    window.localStorage.setItem(STORAGE_KEY, fallback);
    return fallback;
  }

  const fallback = getRandomShayari();
  window.localStorage.setItem(STORAGE_KEY, fallback);
  return fallback;
}
