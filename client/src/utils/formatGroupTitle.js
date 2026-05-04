// No default export used — this file exports multiple helpers
export function formatGroupTitle(key) {
  return key
    .replace(/([A-Z])/g, " $1") // camelCase → spaced
    .replace(/\b\w/g, (c) => c.toUpperCase()) // capitalize
    .trim();
}
