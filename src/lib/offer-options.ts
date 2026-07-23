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

export function normalizeOffer(requested?: string) {
  return requested && offerValues.has(requested) ? requested : "overig";
}
