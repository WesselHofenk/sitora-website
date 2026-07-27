export const offerOptions = [
  { value: "starter", label: "Starter" },
  { value: "business", label: "Business" },
  { value: "premium", label: "Premium" },
  { value: "maatwerk", label: "Maatwerk" },
  { value: "basis-onderhoud", label: "Basis onderhoud" },
  { value: "groot-onderhoud", label: "Groot onderhoud" },
  { value: "website-chatbot", label: "Websitechatbot — eenmalig € 149" },
  { value: "overig", label: "Overige vraag" },
] as const;

export const offerValues = new Set<string>(offerOptions.map((option) => option.value));
export const fixedPackageOptions = offerOptions.filter((option) =>
  ["starter", "business", "premium"].includes(option.value),
);
export const fixedPackageValues = new Set<string>(fixedPackageOptions.map((option) => option.value));

export function offerLabel(value?: string) {
  return offerOptions.find((option) => option.value === value)?.label || "Overige vraag";
}

export function normalizeOffer(requested?: string) {
  return requested && offerValues.has(requested) ? requested : "overig";
}

export function normalizeFixedPackage(requested?: string) {
  return requested && fixedPackageValues.has(requested) ? requested : "starter";
}

export function packageDestination(packageId: string) {
  if (packageId === "maatwerk") return "/offerte?pakket=maatwerk#offerteformulier";
  return `/contact?pakket=${packageId}#advies`;
}

export function packageActionLabel(packageId: string) {
  return packageId === "maatwerk" ? "Vraag een maatwerkofferte aan" : "Plan een kennismaking";
}
