export function hexToRgba(hex: string, alpha: number) {
  if (hex == null || alpha > 1 || alpha < 0) {
    return '';
  }

  // Extract hex number
  const replaced = hex.replace('#', '');
  if (replaced.length !== 6) {
    return '';
  }

  // Parse hex number to rgba
  const parsed = parseInt(replaced, 16);
  const r = (parsed >> 16) & 255;
  const g = (parsed >> 8) & 255;
  const b = parsed & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
