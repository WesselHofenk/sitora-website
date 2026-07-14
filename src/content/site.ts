export const business = {
  name: "Sitora",
  ownerName: "Wessel Hofenk",
  phoneDisplay: "06 44 64 90 15",
  phoneHref: "+31644649015",
  whatsapp: "31644649015",
  email: "info@sitora.nl",
  address: "Online",
  chamberOfCommerce: "97419311",
  vatNumber: "NL005269026B05",
  openingHours: "Klantenservice 24/7 bereikbaar",
  domain: "https://sitora.nl",
  portraitPath: "",
  socialLinks: {} as Record<string, string>,
  placeholdersRequired: false,
};

export const contact = {
  phoneDisplay: business.phoneDisplay,
  phoneHref: business.phoneHref,
  whatsapp: business.whatsapp,
  email: business.email,
  location: business.address,
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Diensten", href: "/diensten" },
  { label: "Branches", href: "/#branches" },
  { label: "Pakketten", href: "/pakketten" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Voorbeelden", href: "/voorbeelden" },
  { label: "Over ons", href: "/over-sitora" },
  { label: "FAQ", href: "/veelgestelde-vragen" },
  { label: "Contact", href: "/contact" },
];

export type SectorFaq = { question: string; answer: string };
export type Sector = {
  slug: string;
  name: string;
  plural: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  problems: string[];
  features: { title: string; text: string }[];
  structure: string[];
  services: string[];
  benefits: string[];
  faqs: SectorFaq[];
};

const branchDefaults = {
  structure: ["Home", "Diensten of aanbod", "Over de organisatie", "Bewijs of projecten", "Veelgestelde vragen", "Contact"],
  faqs: [
    { question: "Krijgt iedere website een eigen ontwerp?", answer: "Ja. Sitora werkt niet met een standaardtemplate. Structuur, uitstraling en contactroute worden afgestemd op je bedrijf, doelgroep en aanbod." },
    { question: "Kan de website later worden uitgebreid?", answer: "Ja. Nieuwe pagina's, functies, talen of koppelingen kunnen later worden toegevoegd. Je ontvangt vooraf een duidelijke prijsopgave." },
  ],
};

export const sectors: Sector[] = [
  {
    slug: "websites-voor-bouw-en-klus",
    name: "bouw- of klusbedrijf",
    plural: "Bouw en klus",
    eyebrow: "Websites voor bouw en klus",
    title: "Laat kwaliteit, projecten en bereikbaarheid direct overtuigen",
    description: "Voor aannemers, installateurs en klusbedrijven maken we projecten, diensten en offerteaanvragen overzichtelijk zonder vakjargon te verbergen.",
    image: "/images/branches/bouw-en-klus.jpg",
    imageAlt: "Vakman aan het werk op een professionele bouwlocatie",
    problems: ["Projecten missen context", "Diensten lopen door elkaar", "Aanvragen bevatten te weinig informatie"],
    services: ["Projectportfolio", "Dienstenpagina's", "Offerte-intake", "Werkgebieden"],
    features: [
      { title: "Projecten met verhaal", text: "Toon uitgangssituatie, aanpak en resultaat in plaats van alleen losse foto's." },
      { title: "Gerichte aanvragen", text: "Vraag projecttype, locatie en gewenste planning direct uit." },
      { title: "Mobiel bereikbaar", text: "Bellen, WhatsAppen en aanvragen blijven altijd binnen handbereik." },
      { title: "Lokale structuur", text: "Diensten en werkgebieden krijgen een heldere, vindbare plek." },
    ],
    benefits: ["Kwaliteit zichtbaar maken", "Aanvragen beter kwalificeren", "Sneller contact op mobiel"], ...branchDefaults,
  },
  {
    slug: "websites-voor-automotive",
    name: "automotivebedrijf",
    plural: "Automotive",
    eyebrow: "Websites voor automotive",
    title: "Van werkplaats tot showroom: geef iedere bezoeker de juiste route",
    description: "Voor garages, detailers, dealers en mobiliteitsdiensten combineren we vertrouwen, aanbod en afspraakmogelijkheden in één heldere website.",
    image: "/images/branches/automotive.jpg",
    imageAlt: "Automonteur werkt aan een auto in een professionele garage",
    problems: ["Diensten en aanbod raken vermengd", "Afspraken kosten te veel stappen", "Reviews en expertise staan los van elkaar"],
    services: ["Werkplaatsdiensten", "Voertuigaanbod", "Online afspraak", "Reviews"],
    features: [
      { title: "Afspraakroute", text: "Laat bezoekers gericht een onderhouds-, reparatie- of adviesmoment aanvragen." },
      { title: "Aanbod in beeld", text: "Presenteer voertuigen of diensten met duidelijke kenmerken en vervolgstappen." },
      { title: "Vertrouwen", text: "Breng reviews, specialismen en echte garanties logisch samen." },
      { title: "Slimme koppelingen", text: "Bereid de website voor op agenda-, voorraad- of CRM-koppelingen." },
    ],
    benefits: ["Meer gerichte afspraken", "Aanbod snel scanbaar", "Expertise geloofwaardig tonen"], ...branchDefaults,
  },
  {
    slug: "websites-voor-beauty-en-gezondheid",
    name: "beauty- of gezondheidspraktijk",
    plural: "Beauty en gezondheid",
    eyebrow: "Websites voor beauty en gezondheid",
    title: "Een rustige uitstraling die deskundigheid en vertrouwen uitstraalt",
    description: "Voor salons, studio's en praktijken maken we behandelingen begrijpelijk, resultaten zorgvuldig zichtbaar en boeken eenvoudig.",
    image: "/images/branches/beauty-gezondheid.jpg",
    imageAlt: "Moderne en verzorgde beautysalon met professionele behandelplekken",
    problems: ["Behandelingen zijn moeilijk te vergelijken", "Tarieven en verwachtingen blijven onduidelijk", "Boeken is omslachtig"],
    services: ["Behandelingen", "Online boeken", "Specialisten", "Voor- en nazorg"],
    features: [
      { title: "Behandeling per behoefte", text: "Bezoekers vinden snel wat past bij hun vraag of gewenste resultaat." },
      { title: "Duidelijke verwachtingen", text: "Leg werkwijze, duur, voorbereiding en nazorg overzichtelijk uit." },
      { title: "Boeken zonder drempel", text: "Koppel een passende agenda of laat gericht een afspraak aanvragen." },
      { title: "Zorgvuldig bewijs", text: "Presenteer kwalificaties en resultaten geloofwaardig en respectvol." },
    ],
    benefits: ["Meer vertrouwen vóór de afspraak", "Behandelingen helder vergelijken", "Eenvoudiger boeken"], ...branchDefaults,
  },
  {
    slug: "websites-voor-horeca",
    name: "horecaonderneming",
    plural: "Horeca",
    eyebrow: "Websites voor horeca",
    title: "Sfeer, aanbod en reserveren in één uitnodigende ervaring",
    description: "Voor restaurants, cafés, cateraars en verblijfsconcepten vertalen we sfeer naar een snelle website die ook onderweg prettig werkt.",
    image: "/images/branches/horeca.jpg",
    imageAlt: "Stijlvol restaurantinterieur met sfeervolle verlichting",
    problems: ["Menu's zijn slecht leesbaar op mobiel", "Reserveren zit verstopt", "Sfeer en praktische informatie sluiten niet aan"],
    services: ["Menu en arrangementen", "Reserveren", "Locatie en openingstijden", "Events"],
    features: [
      { title: "Mobiel menu", text: "Een actueel, goed leesbaar menu zonder onhandige PDF-route." },
      { title: "Direct reserveren", text: "Een vaste, herkenbare route naar tafel, event of aanvraag." },
      { title: "Sfeer met snelheid", text: "Sterk beeldgebruik zonder dat de website traag wordt." },
      { title: "Lokale informatie", text: "Openingstijden, route, bereikbaarheid en contact staan logisch bij elkaar." },
    ],
    benefits: ["Meer directe reserveringen", "Aanbod prettig op mobiel", "Sfeer en informatie in balans"], ...branchDefaults,
  },
  {
    slug: "websites-voor-wonen",
    name: "woonbedrijf",
    plural: "Wonen",
    eyebrow: "Websites voor wonen",
    title: "Maak stijl, collectie en advies tastbaar voordat iemand binnenstapt",
    description: "Voor interieurstudio's, woonwinkels en adviseurs combineren we inspiratie, collecties en een deskundige adviesroute.",
    image: "/images/branches/wonen.jpg",
    imageAlt: "Modern en warm ingericht interieur met eigentijdse meubels",
    problems: ["Inspiratie mist een duidelijke vervolgstap", "Collecties zijn versnipperd", "Advies en verkoop voelen los van elkaar"],
    services: ["Collecties", "Interieuradvies", "Inspiratie", "Afspraak maken"],
    features: [
      { title: "Visuele richting", text: "Een eigen art direction die aansluit op collectie, merk en doelgroep." },
      { title: "Collectie-overzicht", text: "Orden producten en stijlen zonder een generiek webwinkelgevoel." },
      { title: "Advies als route", text: "Maak duidelijk wanneer deskundig advies waarde toevoegt en hoe je het boekt." },
      { title: "Ruimte voor verhalen", text: "Cases, merken en materiaalkeuzes krijgen inhoud en context." },
    ],
    benefits: ["Sterkere merkbeleving", "Collecties overzichtelijk presenteren", "Meer adviesafspraken"], ...branchDefaults,
  },
  {
    slug: "websites-voor-de-creatieve-sector",
    name: "creatieve onderneming",
    plural: "Creatieve sector",
    eyebrow: "Websites voor de creatieve sector",
    title: "Een portfolio dat jouw signatuur laat spreken en toch verkoopt",
    description: "Voor ontwerpers, fotografen, makers en bureaus bouwen we een onderscheidend portfolio met een heldere commerciële route.",
    image: "/images/branches/creatief.jpg",
    imageAlt: "Fotograaf bewerkt beelden in een professionele creatieve studio",
    problems: ["Portfolio en aanbod vertellen twee verhalen", "Werk wordt zonder context getoond", "De contactstap blijft te vrijblijvend"],
    services: ["Portfolio", "Cases", "Diensten", "Projectaanvraag"],
    features: [
      { title: "Eigen signatuur", text: "Geen standaardtemplate, maar een ontwerp dat past bij jouw werk en persoonlijkheid." },
      { title: "Case-opbouw", text: "Vertel per project over vraag, concept, proces en resultaat." },
      { title: "Selectief contact", text: "Vraag budget, planning en type opdracht op een prettige manier uit." },
      { title: "Flexibel portfolio", text: "Maak ruimte om nieuw werk later logisch toe te voegen." },
    ],
    benefits: ["Werk krijgt context", "Sterker onderscheidend vermogen", "Betere projectaanvragen"], ...branchDefaults,
  },
  {
    slug: "websites-voor-dierenbedrijven",
    name: "dierenbedrijf",
    plural: "Dieren",
    eyebrow: "Websites voor dierenbedrijven",
    title: "Deskundig en benaderbaar voor baasjes én hun dieren",
    description: "Voor trimsalons, trainers, pensions en diergerichte diensten maken we aanbod, voorwaarden en afspraken rustig en duidelijk.",
    image: "/images/branches/dieren.jpg",
    imageAlt: "Dierenarts onderzoekt een hond in een professionele praktijk",
    problems: ["Diensten verschillen per dier of situatie", "Voorwaarden worden te laat gevonden", "Afspraken missen belangrijke intakegegevens"],
    services: ["Diensten per dier", "Afspraken", "Werkwijze", "Praktische informatie"],
    features: [
      { title: "Gerichte dienstkeuze", text: "Bezoekers kiezen op dier, behoefte of type begeleiding." },
      { title: "Intake vooraf", text: "Vraag ras, leeftijd en relevante bijzonderheden zorgvuldig uit." },
      { title: "Heldere voorwaarden", text: "Maak voorbereiding, annulering en veiligheid makkelijk vindbaar." },
      { title: "Vertrouwen door expertise", text: "Laat visie, ervaring en omgang met dieren centraal staan." },
    ],
    benefits: ["Passende aanvragen ontvangen", "Voorwaarden vooraf duidelijk", "Vertrouwen opbouwen"], ...branchDefaults,
  },
  {
    slug: "websites-voor-zakelijke-dienstverlening",
    name: "zakelijke dienstverlener",
    plural: "Zakelijke dienstverlening",
    eyebrow: "Websites voor zakelijke dienstverlening",
    title: "Maak expertise concreet en de volgende stap vanzelfsprekend",
    description: "Voor adviseurs, consultants en professionele dienstverleners vertalen we complexe kennis naar een overtuigend en toegankelijk verhaal.",
    image: "/images/branches/zakelijke-dienstverlening.jpg",
    imageAlt: "Zakelijke professionals bespreken plannen in een modern kantoor",
    problems: ["Expertise blijft abstract", "Diensten lijken op die van concurrenten", "Leads weten niet welke stap past"],
    services: ["Expertisegebieden", "Cases", "Kennismaking", "Kennisbank"],
    features: [
      { title: "Heldere positionering", text: "Leg scherp uit voor wie je werkt, welk probleem je oplost en waarom jouw aanpak past." },
      { title: "Bewijs met inhoud", text: "Cases, expertise en publicaties versterken elkaar." },
      { title: "Logische leadroute", text: "Stuur verschillende doelgroepen naar de juiste kennismaking of aanvraag." },
      { title: "Schaalbare kennis", text: "Bereid de structuur voor op artikelen, diensten en sectorpagina's." },
    ],
    benefits: ["Expertise begrijpelijk maken", "Meer relevante kennismakingen", "Duidelijker onderscheid"], ...branchDefaults,
  },
  {
    slug: "websites-voor-retail",
    name: "retailbedrijf",
    plural: "Retail",
    eyebrow: "Websites voor retail",
    title: "Verbind winkel, collectie en service in één sterk merkverhaal",
    description: "Voor winkels en retailconcepten maken we assortiment, locaties en service online net zo aantrekkelijk en duidelijk als in de zaak.",
    image: "/images/branches/retail.jpg",
    imageAlt: "Stijlvolle kledingwinkel met een verzorgde productpresentatie",
    problems: ["Online en winkel voelen als twee merken", "Assortiment is lastig te ontdekken", "Praktische winkelinformatie zit verspreid"],
    services: ["Assortiment", "Winkellocaties", "Acties", "Service en contact"],
    features: [
      { title: "Merk en winkel samen", text: "Een consistente uitstraling over collectie, campagne en locatie." },
      { title: "Slim assortiment", text: "Presenteer categorieën en highlights met of zonder volledige webshop." },
      { title: "Bezoek stimuleren", text: "Locatie, voorraadvragen en openingstijden krijgen een duidelijke route." },
      { title: "Groei voorbereid", text: "Koppelingen met voorraad, nieuwsbrief of e-commerce kunnen later meegroeien." },
    ],
    benefits: ["Sterkere merkconsistentie", "Meer winkelbezoek of aanvragen", "Assortiment beter vindbaar"], ...branchDefaults,
  },
  {
    slug: "websites-voor-onderwijs",
    name: "onderwijsorganisatie",
    plural: "Onderwijs",
    eyebrow: "Websites voor onderwijs",
    title: "Informatie die leerlingen, ouders en professionals snel begrijpen",
    description: "Voor opleiders, scholen en trainingsorganisaties ontwerpen we een toegankelijke route door aanbod, planning en aanmelden.",
    image: "/images/branches/onderwijs.jpg",
    imageAlt: "Docent en studenten in een moderne lesruimte",
    problems: ["Verschillende doelgroepen zoeken andere informatie", "Aanbod en planning zijn lastig te overzien", "Aanmelden bevat onnodige drempels"],
    services: ["Opleidingsaanbod", "Planning", "Aanmelden", "Informatie per doelgroep"],
    features: [
      { title: "Doelgroepgerichte routes", text: "Leerlingen, ouders en organisaties vinden ieder hun eigen informatie." },
      { title: "Aanbod vergelijken", text: "Niveau, duur, startmoment en resultaat zijn snel scanbaar." },
      { title: "Toegankelijk aanmelden", text: "Formulieren en informatie werken met toetsenbord, mobiel en ondersteunende technologie." },
      { title: "Actueel houden", text: "Structuur voor nieuws, agenda, documenten of een latere beheerkoppeling." },
    ],
    benefits: ["Minder zoekwerk voor bezoekers", "Aanbod helder vergelijken", "Toegankelijker aanmelden"], ...branchDefaults,
  },
];

export type Package = {
  id: "starter" | "business" | "premium" | "maatwerk";
  name: string;
  price: string;
  cadence: string;
  audience: string;
  description: string;
  features: string[];
  featured: boolean;
  ownership: string;
};

export const packages: Package[] = [
  {
    id: "starter", name: "Starter", price: "€ 695", cadence: "eenmalig, excl. btw", audience: "Voor een sterke, compacte online basis", featured: false,
    description: "Een professionele maatwerkwebsite waarmee je bedrijf direct geloofwaardig en bereikbaar online staat.",
    features: ["Professionele maatwerkwebsite", "Tot 5 pagina's", "Responsive ontwerp", "Contactformulier", "Basis-SEO", "WhatsApp-koppeling", "Socialmedia-koppelingen", "Oplevering in 5–7 werkdagen"],
    ownership: "Na volledige betaling zijn het overeengekomen ontwerp en de inhoud van jou. Hosting en domein zijn niet standaard inbegrepen.",
  },
  {
    id: "business", name: "Business", price: "€ 1.295", cadence: "eenmalig, excl. btw", audience: "Voor bedrijven die professioneler willen groeien", featured: false,
    description: "Meer ruimte voor aanbod, vindbaarheid en conversie, met een premium ontwerp dat bij je doelgroep past.",
    features: ["Alles uit Starter", "Tot 10 pagina's", "Premium maatwerkdesign", "Geavanceerde SEO-basis", "Google Maps en Reviews", "Blog- of nieuwsfunctie", "Conversiegerichte CTA's", "Performance-optimalisatie", "2 correctierondes"],
    ownership: "Na volledige betaling zijn het overeengekomen ontwerp en de inhoud van jou. Hosting en domein zijn niet standaard inbegrepen.",
  },
  {
    id: "premium", name: "Premium", price: "€ 1.895", cadence: "eenmalig, excl. btw", audience: "Voor merken die online onderscheid willen maken", featured: true,
    description: "Een exclusieve website met meer beleving, slimme functies en gerichte optimalisatie voor resultaat.",
    features: ["Alles uit Business", "Tot 20 pagina's", "Exclusief maatwerkdesign", "Geavanceerde animaties", "Conversie-optimalisatie", "Portfolio- of casesectie", "Afspraken- of offertemodule", "Google Analytics en Search Console", "Prioriteitsbehandeling", "Gratis optimalisatiesessie"],
    ownership: "Na volledige betaling zijn het overeengekomen ontwerp en de inhoud van jou. Hosting en domein zijn niet standaard inbegrepen.",
  },
  {
    id: "maatwerk", name: "Maatwerk", price: "Vanaf € 3.495", cadence: "eenmalig, excl. btw", audience: "Voor complexe ambities en maatwerkfunctionaliteit", featured: false,
    description: "Een schaalbare oplossing wanneer je website onderdeel wordt van een groter digitaal proces.",
    features: ["Alles uit Premium", "Onbeperkt aantal pagina's binnen de afgesproken scope", "Maatwerkfunctionaliteit", "API-koppelingen", "Portaal of dashboard", "Boekingssysteem", "Meertaligheid", "Schaalbare technische architectuur", "Uitgebreide projectbegeleiding", "Planning op maat"],
    ownership: "De definitieve investering en planning volgen na scopebepaling. Hosting, domein en externe diensten worden transparant apart vastgelegd.",
  },
];

export const maintenanceOptions = [
  { id: "basis-onderhoud", name: "Basis onderhoud", price: "€ 79", cadence: "per beurt, excl. btw", features: ["Back-up", "Updates", "Functionele controle", "Kleine beveiligingscheck"] },
  { id: "groot-onderhoud", name: "Groot onderhoud", price: "€ 149", cadence: "per beurt, excl. btw", features: ["Alles uit Basis onderhoud", "Snelheidscontrole", "Formuliertests", "Kleine technische of visuele verbeteringen"] },
];

export const processSteps = [
  { number: "01", title: "Kennismaken", text: "We bespreken je bedrijf, doelgroep, aanbod, doelen en wat je website voor bezoekers moet doen." },
  { number: "02", title: "Strategie en ontwerp", text: "We bepalen structuur en visuele richting. Het ontwerp wordt op maat gemaakt voor jouw merk en doelgroep." },
  { number: "03", title: "Bouwen en feedback", text: "We bouwen responsive, verwerken de afgesproken feedback en controleren inhoud, techniek en formulieren." },
  { number: "04", title: "Controleren en publiceren", text: "Na akkoord en technische eindcontrole koppelen we het domein en zetten we de website live." },
];

export const projects = [
  { slug: "atelier-nova", type: "Creatieve sector", name: "Atelier Nova", direction: "Redactioneel en uitgesproken", objective: "Portfolio en projectaanvragen samenbrengen", features: ["Cases", "Eigen art direction", "Projectintake"], accent: "#f26322" },
  { slug: "mira-studio", type: "Beauty en gezondheid", name: "Mira Studio", direction: "Rustig en verfijnd", objective: "Behandelingen begrijpelijk maken en afspraken stimuleren", features: ["Behandelingen", "Boeken", "Vertrouwen"], accent: "#d48d73" },
  { slug: "noord-advies", type: "Zakelijke dienstverlening", name: "Noord Advies", direction: "Helder en gezaghebbend", objective: "Complexe expertise vertalen naar relevante leads", features: ["Expertise", "Cases", "Kennismaking"], accent: "#4f7294" },
  { slug: "tafel-twaalf", type: "Horeca", name: "Tafel Twaalf", direction: "Warm en uitnodigend", objective: "Sfeer, menu en reserveren in één mobiele ervaring", features: ["Menu", "Reserveren", "Locatie"], accent: "#b85c38" },
];

export const faqs = [
  { question: "Zijn de prijzen eenmalig?", answer: "Ja. Starter, Business en Premium zijn eenmalige websiteprojecten. Maatwerk begint vanaf € 3.495 en wordt na scopebepaling eenmalig geoffreerd. Eventuele extra's worden altijd vooraf besproken en geprijsd." },
  { question: "Is een onderhoudsabonnement verplicht?", answer: "Nee. Bij Sitora zit je niet vast aan een onderhoudsabonnement. Je betaalt alleen wanneer je onderhoud, ondersteuning of wijzigingen nodig hebt." },
  { question: "Kan ik later pagina's of functies toevoegen?", answer: "Ja. De website kan later worden uitgebreid met nieuwe pagina's, talen, formulieren, boekingen, koppelingen of andere functies. Je ontvangt vooraf een duidelijke prijsopgave." },
  { question: "Voor welke branches maakt Sitora websites?", answer: "Sitora werkt onder meer voor bouw en klus, automotive, beauty en gezondheid, horeca, wonen, de creatieve sector, dierenbedrijven, zakelijke dienstverlening, retail en onderwijs. Ook andere branches zijn welkom." },
  { question: "Wat is het verschil tussen de pakketten?", answer: "De pakketten verschillen vooral in het aantal pagina's, het niveau van design en SEO en de inbegrepen functies. Starter biedt een compacte basis; Business en Premium voegen meer diepgang en conversie toe. Complexe platforms en koppelingen vallen onder Maatwerk." },
  { question: "Zijn hosting en domeinnaam inbegrepen?", answer: "Hosting en domein zijn niet standaard inbegrepen in de pakketprijzen. Indien gewenst adviseert of regelt Sitora dit apart; kosten en eigendom worden vooraf transparant vastgelegd." },
  { question: "Werkt Sitora met standaardtemplates?", answer: "Nee. Iedere website wordt afgestemd op het bedrijf, de doelgroep, het aanbod en de gewenste uitstraling. Daardoor voelt het resultaat als jouw merk, niet als een ingevuld standaardmodel." },
  { question: "Hoe snel kan mijn website online staan?", answer: "Starter heeft een beoogde oplevering van 5–7 werkdagen nadat alle afgesproken informatie en materialen compleet zijn. Voor grotere pakketten en maatwerk volgt een passende planning." },
  { question: "Is mijn website geschikt voor mobiel?", answer: "Ja. Iedere website wordt responsive ontworpen en gecontroleerd op gangbare telefoon-, tablet- en desktopschermen." },
  { question: "Kom ik direct bovenaan Google?", answer: "Dat kan niemand eerlijk garanderen. Sitora levert de SEO-basis die bij het pakket hoort. Resultaten hangen daarnaast af van concurrentie, inhoud, autoriteit en vervolgwerk." },
  { question: "Kan ik zelf teksten en foto's aanpassen?", answer: "Dat kan wanneer een beheermogelijkheid onderdeel van de gekozen oplossing is. Je kunt wijzigingen ook los door Sitora laten uitvoeren, zonder verplicht abonnement." },
  { question: "Zijn de prijzen inclusief of exclusief btw?", answer: "Alle genoemde prijzen zijn exclusief btw." },
];

export const allStaticSlugs = [
  ...sectors.map((sector) => sector.slug),
  "diensten", "pakketten", "werkwijze", "voorbeelden", "over-sitora", "contact", "veelgestelde-vragen",
  "privacyverklaring", "cookieverklaring", "algemene-voorwaarden", "bedankt",
];
