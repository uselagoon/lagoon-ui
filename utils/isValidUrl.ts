export const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    const safeProtocols = ['https:', 'http:'];
    return safeProtocols.includes(parsed.protocol);
  } catch {
    return false;
  }
};
