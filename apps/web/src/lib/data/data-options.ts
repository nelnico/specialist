// types + helpers

export interface DataOption {
  label: string;
  value: number;
  priority?: number;
}

export function getValueByLabelFromList(
  options: DataOption[],
  label?: string | null
): number | undefined {
  if (!label) return undefined;
  const norm = label.trim().toLowerCase();
  const option = options.find((o) => o.label.toLowerCase() === norm);
  return option?.value;
}

export function getLabelByValueFromList(
  options: DataOption[],
  value?: number | null
): string | undefined {
  if (value == null) return undefined;
  return options.find((o) => o.value === value)?.label;
}

export function tryFindOptionValue(
  options: DataOption[],
  text?: string | null
): number | undefined {
  if (!text) return undefined;
  const norm = text.trim().toLowerCase();
  const option = options.find((o) => o.label.toLowerCase() === norm);
  return option?.value;
}

// option sets

export const reviewOptions: DataOption[] = [
  { value: 1, label: "xx" },
  { value: 2, label: "xx" },
  { value: 3, label: "xx" },
  { value: 4, label: "xx" },
  { value: 5, label: "xx" },
];

export const genderOptions: DataOption[] = [
  { value: 1, label: "Female", priority: 1 },
  { value: 2, label: "Male", priority: 2 },
];

export const provinceOptions: DataOption[] = [
  { value: 1, label: "Gauteng", priority: 1 },
  { value: 2, label: "KwaZulu-Natal", priority: 2 },
  { value: 3, label: "Western Cape", priority: 3 },
  { value: 4, label: "Eastern Cape", priority: 4 },
  { value: 5, label: "Mpumalanga", priority: 5 },
  { value: 6, label: "Limpopo", priority: 6 },
  { value: 7, label: "North West", priority: 7 },
  { value: 8, label: "Free State", priority: 8 },
  { value: 9, label: "Northern Cape", priority: 9 },
];

export const serviceOptions: DataOption[] = [
  { value: 1, label: "xx", priority: 1 },
  { value: 2, label: "xx", priority: 2 },
  { value: 3, label: "xx", priority: 3 },
  { value: 4, label: "xx", priority: 4 },
  { value: 5, label: "xx", priority: 5 },
  { value: 6, label: "xx", priority: 6 },
  { value: 7, label: "xx", priority: 7 },
  { value: 8, label: "xx", priority: 8 },
  { value: 9, label: "xx", priority: 9 },
  { value: 10, label: "xx", priority: 10 },
];
