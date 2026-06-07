export function formatLPS(value: number): string {
  return `L ${value.toLocaleString('es-HN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
