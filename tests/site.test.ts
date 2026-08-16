import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { allStaticSlugs, navigation, packages, sectors, sitemapSlugs } from "../src/content/site.ts";
import { formSubmitFields, notificationSubject, requestType } from "../src/lib/lead-notification.ts";
import { normalizeLead, validateLead, validateSubmissionMeta } from "../src/lib/lead-validation.ts";
import { normalizeFixedPackage, normalizeOffer, offerOptions, packageActionLabel, packageDestination } from "../src/lib/offer-options.ts";
import { createSubmissionTokenGuard } from "../src/lib/submission-protection.ts";
import { buildLocalChatReply } from "../src/lib/chatbot-conversation.ts";

test("public routes, branch hub and sitemap stay consistent", () => {
  assert.equal(new Set(allStaticSlugs).size, allStaticSlugs.length);
  assert.ok(allStaticSlugs.includes("branches"));
  assert.ok(sitemapSlugs.includes("branches"));
  assert.ok(!sitemapSlugs.includes("bedankt"));
  assert.ok(navigation.some((item) => item.href === "/branches"));
  for (const sector of sectors) assert.ok(sitemapSlugs.includes(sector.slug));
});

test("branch metadata and branch-specific content are unique", () => {
  assert.equal(new Set(sectors.map((sector) => sector.metaTitle)).size, sectors.length);
  assert.equal(new Set(sectors.map((sector) => sector.metaDescription)).size, sectors.length);
  assert.equal(new Set(sectors.map((sector) => sector.visitorIntent)).size, sectors.length);
  assert.equal(new Set(sectors.map((sector) => sector.structure.join("|"))).size, sectors.length);
  assert.equal(new Set(sectors.flatMap((sector) => sector.faqs.map((faq) => faq.question))).size, sectors.flatMap((sector) => sector.faqs).length);
});

test("package and maintenance query values normalize safely", () => {
  const values = new Set(offerOptions.map((option) => option.value));
  for (const item of packages) {
    assert.ok(values.has(item.id));
    assert.equal(normalizeOffer(item.id), item.id);
  }
  assert.equal(normalizeOffer("basis-onderhoud"), "basis-onderhoud");
  assert.equal(normalizeOffer("groot-onderhoud"), "groot-onderhoud");
  assert.equal(normalizeOffer("onbekend"), "overig");
  assert.equal(normalizeOffer(undefined), "overig");
  assert.equal(normalizeFixedPackage("premium"), "premium");
  assert.equal(normalizeFixedPackage("maatwerk"), "starter");
});

test("each website package has the intended next step", () => {
  assert.equal(packageDestination("starter"), "/contact?pakket=starter#advies");
  assert.equal(packageDestination("business"), "/contact?pakket=business#advies");
  assert.equal(packageDestination("premium"), "/contact?pakket=premium#advies");
  assert.equal(packageDestination("maatwerk"), "/offerte?pakket=maatwerk#offerteformulier");
  for (const packageId of ["starter", "business", "premium"]) {
    assert.equal(packageActionLabel(packageId), "Plan een kennismaking");
  }
  assert.equal(packageActionLabel("maatwerk"), "Vraag een maatwerkofferte aan");
});

test("compact lead validation accepts optional company and phone but rejects invalid offers", () => {
  const valid = normalizeLead({
    kind: "compact",
    name: "Test Gebruiker",
    email: "test@example.test",
    industry: "Retail",
    currentWebsite: "Ik heb nog geen website",
    package: "starter",
    message: "Dit is een veilige testaanvraag.",
    privacy: true,
  });
  assert.deepEqual(validateLead(valid), {});
  assert.equal(validateLead({ ...valid, package: "onbekend" }).package?.includes("geldige"), true);
});

test("fixed package intake requires company and phone and keeps the selected package", () => {
  const valid = normalizeLead({
    kind: "package",
    name: "Test Gebruiker",
    company: "Testbedrijf",
    email: "test@example.test",
    phone: "+31 6 1234 5678",
    package: "premium",
    message: "We willen graag kennismaken over onze nieuwe website.",
    privacy: true,
  });
  assert.deepEqual(validateLead(valid), {});
  assert.equal(valid.package, "premium");
  assert.ok(validateLead({ ...valid, company: "" }).company);
  assert.ok(validateLead({ ...valid, phone: "123" }).phone);
  assert.ok(validateLead({ ...valid, package: "maatwerk" }).package);
  assert.ok(validateLead({ ...valid, email: "geen-email" }).email);
});

test("maatwerk quote validates every required project answer", () => {
  const valid = normalizeLead({
    kind: "custom",
    name: "Test Gebruiker",
    company: "Testbedrijf",
    email: "test@example.test",
    phone: "+31 6 1234 5678",
    package: "maatwerk",
    websiteType: "Platform, portaal of webapp",
    pageCount: "25",
    webshop: "Nee",
    appointmentPlanner: "Ja",
    aiChat: "Ja",
    multilingual: "Nee",
    hasLogo: "Ja",
    hasBrandStyle: "Nee",
    deliveryDate: "2026-12-15",
    budget: "€ 7.500 – € 10.000",
    message: "We hebben een portaal met een externe API-koppeling nodig.",
    privacy: true,
  });
  assert.deepEqual(validateLead(valid), {});
  assert.ok(validateLead({ ...valid, websiteType: "" }).websiteType);
  assert.ok(validateLead({ ...valid, webshop: "" }).webshop);
  assert.ok(validateLead({ ...valid, deliveryDate: "binnenkort" }).deliveryDate);
  assert.ok(validateLead({ ...valid, budget: "" }).budget);
});

test("submission metadata blocks instant and malformed submissions", () => {
  const now = Date.now();
  const validMeta = normalizeLead({
    kind: "package",
    formStartedAt: new Date(now - 2_000).toISOString(),
    submissionToken: "123e4567-e89b-12d3-a456-426614174000",
  });
  assert.equal(validateSubmissionMeta(validMeta, now), "");
  assert.ok(validateSubmissionMeta({ ...validMeta, formStartedAt: new Date(now - 100).toISOString() }, now));
  assert.ok(validateSubmissionMeta({ ...validMeta, submissionToken: "ongeldig" }, now));
});

test("duplicate submission tokens are rejected during the protection window", () => {
  const guard = createSubmissionTokenGuard(60_000);
  assert.equal(guard.isDuplicate("token-1", 1_000), false);
  assert.equal(guard.isDuplicate("token-1", 2_000), true);
  assert.equal(guard.isDuplicate("token-1", 62_000), false);
});

test("internal notifications distinguish package and custom requests and contain all answers", () => {
  const fixed = normalizeLead({
    kind: "package",
    name: "Ada Voorbeeld",
    company: "Voorbeeld BV",
    email: "ada@example.test",
    phone: "+31 6 1234 5678",
    package: "premium",
    message: "Graag een kennismaking.",
    sourcePage: "/contact?pakket=premium&utm_source=google",
    utmSource: "google",
  });
  assert.equal(notificationSubject(fixed), "Nieuwe aanvraag: Premium");
  assert.equal(requestType(fixed), "Vaste pakketaanvraag");
  const fixedFields = formSubmitFields(fixed, "aanvraag-1", new Date("2026-07-27T10:00:00Z"));
  assert.equal(fixedFields.Pakket, "Premium");
  assert.equal(fixedFields["Type aanvraag"], "Vaste pakketaanvraag");
  assert.equal(fixedFields["UTM source"], "google");
  assert.equal(fixedFields.Bedrijfsnaam, "Voorbeeld BV");

  const custom = normalizeLead({
    kind: "custom",
    name: "Ada Voorbeeld",
    company: "Voorbeeld BV",
    email: "ada@example.test",
    phone: "+31 6 1234 5678",
    package: "maatwerk",
    websiteType: "Webshop",
    pageCount: "30",
    webshop: "Ja",
    appointmentPlanner: "Nee",
    aiChat: "Ja",
    multilingual: "Ja",
    hasLogo: "Ja",
    hasBrandStyle: "Ja",
    deliveryDate: "2026-12-15",
    budget: "Meer dan € 10.000",
    message: "Koppeling met ons ERP is nodig.",
  });
  assert.equal(notificationSubject(custom), "Nieuwe maatwerkofferte aangevraagd");
  assert.equal(requestType(custom), "Maatwerkofferte");
  const customFields = formSubmitFields(custom, "aanvraag-2", new Date("2026-07-27T10:00:00Z"));
  assert.equal(customFields["Type website"], "Webshop");
  assert.equal(customFields["Gewenst aantal pagina’s"], "30");
  assert.equal(customFields["AI-chat gewenst"], "Ja");
  assert.equal(customFields.Budgetindicatie, "Meer dan € 10.000");
  assert.equal(customFields["Extra wensen of opmerkingen"], "Koppeling met ons ERP is nodig.");
});

test("public legal components contain no draft or concept warning", async () => {
  const source = (await readFile(new URL("../src/components/legal-pages.tsx", import.meta.url), "utf8")).toLowerCase();
  for (const forbidden of ["concepttekst", "conceptvoorwaarden", "juridische controle vereist", "praktisch uitgangspunt"]) {
    assert.equal(source.includes(forbidden), false, forbidden);
  }
});

test("optional scripts remain behind their matching consent state", async () => {
  const consentSource = await readFile(new URL("../src/components/cookie-consent.tsx", import.meta.url), "utf8");
  const layoutSource = await readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
  assert.ok(consentSource.includes("consent?.analytics && GA_ID"));
  assert.ok(consentSource.includes("consent?.marketing && META_ID"));
  assert.equal(layoutSource.includes("googletagmanager.com/gtag"), false);
  assert.equal(layoutSource.includes("connect.facebook.net/en_US/fbevents"), false);
});

test("chat provider configuration stays server-side and stateless", async () => {
  const routeSource = await readFile(new URL("../src/app/api/chat/route.ts", import.meta.url), "utf8");
  const environmentExample = await readFile(new URL("../.env.example", import.meta.url), "utf8");

  assert.ok(routeSource.includes('process.env.OPENAI_API_KEY'));
  assert.ok(routeSource.includes('process.env.OPENAI_CHAT_MODEL || "gpt-5-mini"'));
  assert.ok(routeSource.includes("store: false"));
  assert.equal(routeSource.includes("NEXT_PUBLIC_OPENAI"), false);
  assert.ok(environmentExample.includes("OPENAI_API_KEY="));
  assert.ok(environmentExample.includes("OPENAI_CHAT_MODEL=gpt-5-mini"));
});

test("chat knowledge answers Dutch wording variations without provider configuration", () => {
  for (const question of ["Wat kost een website?", "Hoeveel kosten websites?", "Welke prijzen hebben jullie?"]) {
    const reply = buildLocalChatReply([{ role: "user", content: question }]);
    assert.match(reply.answer, /€ 695/);
    assert.match(reply.answer, /excl\. btw/);
    assert.ok(reply.actions.some((action) => action.href === "/pakketten"));
  }
});

test("chat keeps pricing context for a simple company website", () => {
  const first = buildLocalChatReply([{ role: "user", content: "Hoeveel kosten websites?" }]);
  const followUp = buildLocalChatReply([
    { role: "user", content: "Hoeveel kosten websites?" },
    { role: "assistant", content: first.answer },
    { role: "user", content: "Ik wil gewoon een simpele website voor mijn bedrijf" },
  ]);
  assert.match(followUp.answer, /Starter/);
  assert.match(followUp.answer, /5–7 werkdagen/);
  assert.match(followUp.answer, /al een website|vanaf nul/);

  const statusFollowUp = buildLocalChatReply([
    { role: "user", content: "Hoeveel kosten websites?" },
    { role: "assistant", content: first.answer },
    { role: "user", content: "Ik wil gewoon een simpele website voor mijn bedrijf" },
    { role: "assistant", content: followUp.answer },
    { role: "user", content: "Ik heb nog geen website, dus ik start vanaf nul" },
  ]);
  assert.match(statusFollowUp.answer, /vanaf de basis/);
  assert.match(statusFollowUp.answer, /branche/);
});

test("all primary chat intents return useful verified actions", () => {
  const expectations = [
    ["Welke diensten bieden jullie aan?", "/diensten"],
    ["Maken jullie webshops?", "/offerte?pakket=maatwerk#offerteformulier"],
    ["Hoe lang duurt een website?", "/pakketten"],
    ["Kunnen jullie mijn bestaande website verbeteren?", "/website-onderhoud"],
    ["Werken jullie met kleine bedrijven?", "/branches"],
    ["Hoe kan ik contact opnemen?", "/contact#advies"],
    ["Kan ik een afspraak maken?", "/contact#advies"],
    ["Wat doet Sitora precies?", "/diensten"],
    ["Waarom zou ik voor Sitora kiezen?", "/werkwijze"],
  ] as const;

  for (const [question, href] of expectations) {
    const reply = buildLocalChatReply([{ role: "user", content: question }]);
    assert.ok(reply.answer.length > 40, question);
    assert.ok(reply.actions.some((action) => action.href === href), question);
  }
});
