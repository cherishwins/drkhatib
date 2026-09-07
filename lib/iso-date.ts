/** Convert display dates to ISO 8601 for schema.org Event.startDate. */
const MONTHS: Record<string, string> = {
  jan: '01',
  january: '01',
  feb: '02',
  february: '02',
  mar: '03',
  march: '03',
  apr: '04',
  april: '04',
  may: '05',
  jun: '06',
  june: '06',
  jul: '07',
  july: '07',
  aug: '08',
  august: '08',
  sep: '09',
  sept: '09',
  september: '09',
  oct: '10',
  october: '10',
  nov: '11',
  november: '11',
  dec: '12',
  december: '12',
};

export function toIso8601Date(value: string): string {
  const raw = value.trim();
  if (!raw) return raw;
  if (/^\d{4}-\d{2}(-\d{2})?(T.*)?$/.test(raw)) return raw;
  if (/^\d{4}$/.test(raw)) return raw;
  const monthYear = raw.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYear) {
    const month = MONTHS[monthYear[1].toLowerCase()];
    if (month) return `${monthYear[2]}-${month}`;
  }
  return raw;
}
