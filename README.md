# Sitora website

Productiegerichte Next.js-website voor Sitora, een websitespecialist voor vak-, bouw- en installatiebedrijven in Nederland en Nederlandstalig België.

## Starten

Vereisten: Node.js 20.9 of nieuwer en pnpm.

```bash
pnpm install
pnpm dev
```

Open daarna `http://localhost:3000`.

## Controlecommando's

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## Inhoud en bedrijfsgegevens aanpassen

Alle herbruikbare inhoud staat in `src/content/site.ts`:

- `business`: eigenaar, telefoon, WhatsApp, e-mail, KvK, btw-nummer, openingstijden en domein;
- `navigation`: navigatie;
- `sectors`: brancheteksten, functies, structuren en branchespecifieke FAQ;
- `packages`: prijzen, inhoud, eigendom en abonnementsvoorwaarden;
- `processSteps`: werkwijze;
- `projects`: vijf expliciet fictieve conceptontwerpen;
- `faqs`: algemene FAQ.

De publieke bedrijfsgegevens staan centraal in `src/content/site.ts`. Vervang `portraitPath` door het pad naar een echte, geoptimaliseerde portretfoto zodra die beschikbaar is.

## Formulieren

De formulieren sturen JSON naar `src/app/api/advies/route.ts`. De route bevat:

- client- en servervalidatie;
- honeypot;
- maximaal drie pogingen per IP-adres per tien minuten;
- foutstatussen zonder persoonsgegevens te loggen;
- expliciete HTTP-statusafhandeling;
- bezorging via de cross-origin AJAX-endpoint van FormSubmit aan `info@sitora.nl`.

De browser laat de aanvraag eerst controleren door de same-origin route `/api/advies`. Pas na geldige servervalidatie stuurt de browser de genormaliseerde velden als JSON naar FormSubmit. De AJAX-endpoint ondersteunt cross-origin verzoeken; succes wordt alleen getoond wanneer zowel de eigen API-route als FormSubmit de aanvraag accepteert. Deze opzet voorkomt de HTTP 403 die FormSubmit geeft aan rechtstreekse verzoeken vanuit Vercel-serverless IP-adressen.

Er zijn geen API-keys of server-side environment variables nodig voor formulierbezorging. Na de eerste geldige inzending stuurt FormSubmit een eenmalige activatiemail naar `info@sitora.nl`. Klik op de bevestigingslink om bezorging te activeren. Niet-bevestigde inzendingen worden volgens FormSubmit maximaal 30 dagen bewaard.

De aanvraag bevat minimaal Naam, Bedrijfsnaam, E-mailadres, Telefoonnummer, Branche, Huidige website en Bericht. Het uitgebreide formulier stuurt daarnaast land, werkgebied, project, pakket, doel, functies en startperiode mee. `Reply-To` wordt ingesteld op het ingevulde e-mailadres.

## Cookiekeuze en analytics

De toestemmingsinterface ondersteunt noodzakelijk, analytics en marketing. Optionele scripts laden alleen als:

1. de bezoeker toestemming geeft; én
2. het bijbehorende ID is ingesteld.

```env
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

De keuze wordt lokaal opgeslagen en is opnieuw te openen via **Cookie-instellingen** in de footer.

## Routes

- `/`
- `/websites-voor-loodgieters`
- `/websites-voor-elektriciens`
- `/websites-voor-schilders`
- `/websites-voor-dakdekkers`
- `/websites-voor-aannemers`
- `/pakketten`
- `/werkwijze`
- `/voorbeelden`
- `/over-sitora`
- `/contact`
- `/veelgestelde-vragen`
- `/privacyverklaring`
- `/cookieverklaring`
- `/algemene-voorwaarden`
- `/bedankt`

Daarnaast zijn een eigen 404, `robots.txt`, sitemap, manifest, favicon en gegenereerde social image aanwezig.

De oude route `/over-klusgroei` blijft als compatibele redirect naar `/over-sitora` bestaan.

## Afbeeldingen

Beelden staan lokaal in `public/images`. Vervang deze stockbeelden vóór livegang bij voorkeur door eigen, aantoonbaar bruikbare projectfotografie. Alt-teksten en verwijzingen zijn centraal of bij het component aanpasbaar.

De loodgieter-toolphoto is van Matt Artz en wordt lokaal gebruikt onder de Unsplash License; overige stockbeelden moeten vóór publicatie eveneens op herkomst en gebruiksrecht worden gecontroleerd.

## Deployen op hosting met een Next.js-runtime

De route `/api/advies` is servercode en werkt niet wanneer alleen statische HTML-bestanden naar Apache worden geüpload. Gebruik Vercel of een andere host die Next.js 16 en serverroutes uitvoert, of configureer op de huidige host expliciet een blijvend Node.js-proces met `pnpm start` achter het domein.

1. Plaats het project in een Git-repository en importeer het in het hostingplatform.
2. Gebruik `pnpm build` als buildcommand en `pnpm start` als startcommand wanneer de host dit vraagt.
3. Voor formulierbezorging zijn geen environment variables nodig.
4. Koppel `sitora.nl` en laat `www.sitora.nl` doorsturen naar de apexvariant.
5. Voer een nieuwe deployment uit.
6. Dien het formulier één keer in en bevestig de activatiemail van FormSubmit in `info@sitora.nl`.
7. Test daarna met een tweede echte inzending. Een POST naar `https://sitora.nl/api/advies` moet JSON met `ok: true` teruggeven.
8. Zoek bij problemen in de Vercel-logs op `[contact-form]`; technische providerfouten worden alleen daar gelogd.

## Vóór publicatie

- voeg een echte portretfoto van Wessel toe;
- vervang conceptbeelden waar nodig;
- laat privacy-, cookie- en voorwaardenpagina's juridisch controleren;
- configureer en test echte e-mailbezorging;
- koppel het apexdomein en laat `www.sitora.nl` daarna naar de apexvariant verwijzen;
- controleer offerte en overeenkomst op eigendom, abonnement en opzegging;
- voeg alleen echte reviews, certificeringen of klantcases toe;
- test telefoon, WhatsApp, domein en formulieren op echte apparaten.

De interne intake-, offerte-, feedback-, launch- en opleverchecklists staan in `docs/launch-operations.md`.
