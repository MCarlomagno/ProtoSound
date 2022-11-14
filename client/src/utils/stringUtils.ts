export function formatAddress(addr: string) {
  const len = addr.length;
  return addr.substring(0, 5) + '...' + addr.substring(len - 5, len);
} 