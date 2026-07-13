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

- servervalidatie;
- honeypot;
- maximaal drie pogingen per IP-adres per tien minuten;
- foutstatussen zonder persoonsgegevens te loggen;
- provider-acceptatie en aanvraagnummer in de serverlogs;
- een verplichte Resend-koppeling zonder extra package.

Kopieer `.env.example` naar `.env.local` en configureer voor productie:

```env
RESEND_API_KEY=
LEAD_TO_EMAIL=info@sitora.nl
LEAD_FROM_EMAIL="Sitora website <website@sitora.nl>"
```

Het formulier accepteert pas een aanvraag wanneer Resend de e-mail aan `info@sitora.nl` heeft geaccepteerd. Zonder `RESEND_API_KEY` en `LEAD_FROM_EMAIL` verschijnt bewust een duidelijke foutmelding; er wordt nooit een succesvol verzonden aanvraag gesimuleerd.

Voeg de variabelen op het gekozen hostingplatform toe aan **Production**, **Preview** en desgewenst **Development**, en voer daarna een nieuwe deployment uit. Verifieer `sitora.nl` in Resend voordat je `website@sitora.nl` als afzender gebruikt. Publiceer daarvoor exact de SPF-, DKIM- en eventuele MX-records die Resend voor dit domein toont. Voeg nooit een tweede SPF-record op dezelfde hostnaam toe; combineer waarden wanneer de provider dat voorschrijft. Publiceer daarnaast een DMARC-record op `_dmarc.sitora.nl`, bijvoorbeeld eerst met beleid `p=none`, en controleer de rapporten voordat je dit aanscherpt.

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
3. Voeg de drie benodigde server-side environment variables toe.
4. Koppel `sitora.nl` en laat `www.sitora.nl` doorsturen naar de apexvariant.
5. Voer een nieuwe deployment uit.
6. Test met een echte inzending. Een POST naar `https://sitora.nl/api/advies` moet JSON teruggeven; een Apache-404 betekent dat de serverroute nog niet is gedeployed.
7. Zoek in de serverlogs op `[contact-form] Provider accepted email` en controleer het `providerId` en `submissionId`.

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
