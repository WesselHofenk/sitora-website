export const offerOptions = [
  { value: "starter", label: "Starter" },
  { value: "business", label: "Business" },
  { value: "premium", label: "Premium" },
  { value: "maatwerk", label: "Maatwerk" },
  { value: "basis-onderhoud", label: "Basis onderhoud" },
  { value: "groot-onderhoud", label: "Groot onderhoud" },
  { value: "overig", label: "Overige vraag" },
] as const;

export function normalizeOffer(requested?: string) {
  return offerOptions.some((option) => option.value === requested) ? requested! : "overig";
}
