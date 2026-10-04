/** Local calendar helpers. Keys are intentionally never derived from toISOString(). */
export function localDateKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function parseLocalDateKey(key: string): Date { const [year, month, day] = key.split('-').map(Number); return new Date(year, month - 1, day); }
export function addLocalDays(date: Date, days: number): Date { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days); }
export function localDayDifference(from: Date, to: Date): number { return Math.round((Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) - Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) / 86_400_000); }
