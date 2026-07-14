# Sitora website

Productiegerichte Next.js-website voor Sitora, een websitespecialist voor ondernemers en organisaties in uiteenlopende branches in Nederland en Nederlandstalig België.

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
- `packages`: eenmalige pakketprijzen, inhoud en eigendom;
- `maintenanceOptions`: losse onderhoudsbeurten zonder verplichte looptijd;
- `processSteps`: werkwijze;
- `projects`: vier expliciet fictieve conceptontwerpen;
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

De aanvraag bevat minimaal Naam, Bedrijfsnaam, E-mailadres, Telefoonnummer, Branche, Huidige website, Pakket of dienst en Bericht. URL-parameters `pakket` en `dienst` selecteren de juiste optie automatisch. Het uitgebreide formulier stuurt daarnaast land, werkgebied, project, doel, functies en startperiode mee. `Reply-To` wordt ingesteld op het ingevulde e-mailadres.

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
- `/diensten`
- `/websites-voor-bouw-en-klus`
- `/websites-voor-automotive`
- `/websites-voor-beauty-en-gezondheid`
- `/websites-voor-horeca`
- `/websites-voor-wonen`
- `/websites-voor-de-creatieve-sector`
- `/websites-voor-dierenbedrijven`
- `/websites-voor-zakelijke-dienstverlening`
- `/websites-voor-retail`
- `/websites-voor-onderwijs`
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

De oude route `/over-klusgroei` en de vroegere vakspecifieke branche-URL's blijven als compatibele redirects bestaan.

## Afbeeldingen

Beelden staan lokaal in `public/images`. Vervang deze stockbeelden vóór livegang bij voorkeur door eigen, aantoonbaar bruikbare projectfotografie. Alt-teksten en verwijzingen zijn centraal of bij het component aanpasbaar.

Historische stockbeelden zijn nog lokaal aanwezig maar worden niet meer in de algemene websitepresentatie gebruikt. Verwijder ongebruikte assets pas nadat is bevestigd dat externe of oudere pagina's ze niet nodig hebben.

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
- controleer offerte en overeenkomst op scope, eigendom, betaling en losse onderhoudsbeurten;
- voeg alleen echte reviews, certificeringen of klantcases toe;
- test telefoon, WhatsApp, domein en formulieren op echte apparaten.

De interne intake-, offerte-, feedback-, launch- en opleverchecklists staan in `docs/launch-operations.md`.
