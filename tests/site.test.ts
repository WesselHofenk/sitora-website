import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { allStaticSlugs, navigation, packages, sectors, sitemapSlugs } from "../src/content/site.ts";
import { normalizeLead, validateLead } from "../src/lib/lead-validation.ts";
import { normalizeOffer, offerOptions } from "../src/lib/offer-options.ts";

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
