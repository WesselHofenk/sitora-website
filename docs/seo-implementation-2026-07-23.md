# SEO-implementatie en overdracht — 23 juli 2026

## Doel en positionering

Sitora richt zich op mkb, dienstverleners, vakbedrijven en organisaties in Nederland en Nederlandstalig België. De website positioneert Sitora als persoonlijke online webpartner voor professionele maatwerkwebsites, losse onderhoudsbeurten en een websitechatbot.

Het chatbotaanbod is op de onderhoudspagina, dienstenpagina, pakketcontext, FAQ, contactformulier en een eigen landingspagina verwerkt:

- eenmalig € 149 exclusief btw;
- geen verplicht abonnement;
- installatie en afstemming op vooraf bepaalde veelgestelde vragen;
- eventuele externe licenties en werk buiten de afgesproken installatie worden vooraf besproken;
- geen ongefundeerde beloftes over omzet, bereikbaarheid, zoekposities of resultaten.

## Zoekwoord- en paginaverdeling

| Pagina | Primair onderwerp | Ondersteunende zoekintentie |
| --- | --- | --- |
| `/` | Sitora; professionele maatwerkwebsite | webdesign voor ondernemers, website zonder standaardtemplate |
| `/diensten` | professionele website laten maken | webdesign, ontwikkeling, SEO-basis en onderhoud |
| `/pakketten` | website laten maken prijs | websitepakketten, eenmalige websitekosten |
| `/website-onderhoud` | websiteonderhoud zonder abonnement | losse onderhoudsbeurt, website laten bijwerken |
| `/chatbot-voor-je-website` | chatbot voor je website | websitechatbot € 149, chatbot laten installeren |
| `/branches` | websites per branche | branchegerichte webdesignoplossingen |
| `/websites-voor-bouw-en-klus` | website voor bouw- en klusbedrijven | website voor aannemer, installateur of vakbedrijf |
| `/websites-voor-automotive` | website voor automotivebedrijven | website voor garage, dealer of detailer |
| `/websites-voor-beauty-en-gezondheid` | website voor beauty en gezondheid | website voor salon, studio of praktijk |
| `/websites-voor-horeca` | website voor horeca | restaurantwebsite, reserveren en mobiel menu |
| `/websites-voor-wonen` | website voor wonen en interieur | website voor woonwinkel of interieurstudio |
| `/websites-voor-de-creatieve-sector` | website voor creatieve ondernemers | portfoliowebsite voor maker, fotograaf of bureau |
| `/websites-voor-zzp-en-dienstverleners` | website voor zzp en dienstverleners | professionele zzp-website |
| `/websites-voor-retail-en-webshops` | website voor retail en webshops | webshop of winkelwebsite |
| `/websites-voor-vastgoed` | website voor vastgoed | website voor makelaar of vastgoedadviseur |
| `/websites-voor-onderwijs` | website voor onderwijs | website voor opleider, cursus of trainingsbureau |
| `/werkwijze` | werkwijze website laten maken | intake, ontwerp, bouw, feedback en livegang |
| `/voorbeelden` | voorbeelden van websites | conceptontwerpen en webdesigninspiratie |
| `/over-sitora` | over Sitora en Wessel Hofenk | persoonlijke webpartner en werkwijze |
| `/contact` | contact met Sitora | gratis websiteadvies, chatbot of onderhoud aanvragen |
| `/veelgestelde-vragen` | vragen over een website laten maken | prijs, scope, eigendom, hosting en onderhoud |

De juridische pagina's ondersteunen vertrouwen en navigatie, maar zijn geen zelfstandige commerciële zoekwoordtargets. Iedere commerciële pagina heeft een eigen hoofdonderwerp, unieke title, description, H1 en canonical om onnodige zoekwoordconcurrentie te beperken.

## Uitgevoerde on-page en technische optimalisatie

- Unieke metadata, canonicals en social metadata per indexeerbare pagina.
- Logische H1/H2-structuur, beschrijvende linkteksten en inhoud die aansluit op de zoekintentie.
- Interne links tussen diensten, pakketten, onderhoud, chatbot, branches, FAQ en contact.
- Zelfcanonieke URL's op `https://sitora.nl` en een permanente `www`-redirect.
- `robots.txt` en XML-sitemap met de relevante indexeerbare pagina's.
- `noindex` voor de compatibiliteits-/bedankroute.
- Organization-, WebSite-, Service-, Offer-, FAQ- en Breadcrumb-structured data waar inhoudelijk passend.
- Duidelijke bedrijfs- en contactgegevens zonder een niet-bestaand bezoekadres of openingstijden te verzinnen.
- Afbeeldingen met beschrijvende alt-tekst, responsive `sizes` en Next.js-optimalisatie naar AVIF/WebP.
- Semantische paginaregions, toetsenbordbediening, zichtbare focusstijlen en ondersteuning voor `prefers-reduced-motion`.
- Beveiligingsheaders, veilige formuliercontrole en server-side verwerking van de AI-chatbot.
- Mobiele actiebalk en CTA's die naar een vooraf ingevulde, gevalideerde contactkeuze leiden.

## Kwaliteitsmetingen

Lighthouse is gemeten op de homepage in een mobiele en desktopconfiguratie.

| Meting | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Productiebaseline mobiel | 86 | 97 | 100 | 100 |
| Productiebaseline desktop | 100 | 97 | 100 | 100 |
| Lokale nameting mobiel na verbeteringen | 97 | 100 | 100 | 100 |

Bij de nameting waren alle contrastcontroles geslaagd, was de gemeten CLS `0`, de Total Blocking Time `26 ms` en gaf Lighthouse geen besparing meer aan voor de logolevering. Labmetingen variëren per run en zijn geen garantie voor Core Web Vitals in echte gebruikssituaties.

Daarnaast zijn linting, TypeScript-controle, de productiebuild en alle geautomatiseerde tests uitgevoerd. De sitemap bevat 24 indexeerbare URL's; de overige statische routes bestaan uit de homepage, systeemroutes en bewust niet-geïndexeerde routes.

## Externe acties na livegang

Deze acties vereisen toegang tot externe accounts en kunnen niet betrouwbaar vanuit de codebase worden afgerond:

1. Voeg de servervariabele `OPENAI_API_KEY` toe in Vercel en voer daarna een nieuwe deployment uit. Gebruik optioneel `OPENAI_CHAT_MODEL` om het model te kiezen. Zet nooit een echte sleutel in Git of in een `NEXT_PUBLIC_`-variabele.
2. Verifieer `https://sitora.nl` als domeinproperty in Google Search Console, dien `https://sitora.nl/sitemap.xml` in en vraag inspectie/indexering aan voor home, diensten, pakketten, onderhoud, chatbot en de belangrijkste branchepagina's.
3. Maak of optimaliseer alleen een Google Bedrijfsprofiel als Sitora volgens de actuele Google-richtlijnen in aanmerking komt. Gebruik uitsluitend geverifieerde bedrijfsgegevens en verzin geen fysiek bezoekadres of openingstijden.
4. Publiceer inhoud op basis van echte klantvragen en aantoonbare projecten, bijvoorbeeld afzonderlijke cases, keuzehulp voor pakketten en onderhoudsvraagstukken. Vermijd dunne locatiepagina's zonder unieke lokale waarde.
5. Bouw relevante verwijzingen op via echte leveranciers, brancheverenigingen, samenwerkingen, klanten en vakinhoudelijke publicaties. Koop geen links en gebruik geen geautomatiseerde linknetwerken.
6. Controleer maandelijks Search Console op indexering, zoekopdrachten, doorklikratio, Core Web Vitals en pagina's die inhoudelijk met elkaar gaan concurreren.

Een eerste positie in Google kan niet worden gegarandeerd. Technische kwaliteit en relevante content leggen de basis; uiteindelijke posities hangen ook af van concurrentie, autoriteit, merkbekendheid, indexering en zoekgedrag.
