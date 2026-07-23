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
  responseExpectation: "Contact opnemen kan op ieder moment. Berichten worden op werkdagen zo snel mogelijk behandeld.",
  serviceArea: "Nederland en Nederlandstalig België",
  workingModel: "Persoonlijk en online samenwerken",
  domain: "https://sitora.nl",
  portraitPath: "",
  socialLinks: {} as Record<string, string>,
  placeholdersRequired: false,
};

export const legalDocuments = {
  privacy: { updatedAt: "2026-07-23" },
  cookies: { updatedAt: "2026-07-23" },
  terms: { updatedAt: "2026-07-23" },
} as const;

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
  { label: "Branches", href: "/branches" },
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
  metaTitle: string;
  metaDescription: string;
  customerTypes: string[];
  visitorIntent: string;
  trustBarriers: string[];
  desiredAction: string;
  proofTypes: string[];
  imageGuidance: string;
  layout: "proof-first" | "action-first" | "structure-first";
  problems: string[];
  features: { title: string; text: string }[];
  structure: string[];
  services: string[];
  benefits: string[];
  faqs: SectorFaq[];
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
    metaTitle: "Website voor bouw- en klusbedrijven",
    metaDescription: "Een duidelijke website voor aannemers, installateurs en klusbedrijven, met projecten, werkgebieden en gerichte offerteaanvragen.",
    customerTypes: ["Aannemers", "Installateurs", "Schilders en afbouwers", "Zelfstandige vakbedrijven"],
    visitorIntent: "Werk beoordelen, beschikbaarheid inschatten en een concrete offerte aanvragen.",
    trustBarriers: ["Onduidelijke projectervaring", "Geen zicht op werkgebied", "Te weinig context bij foto's"],
    desiredAction: "Een offerteaanvraag met projecttype, locatie en planning.",
    proofTypes: ["Projectfoto's met toelichting", "Werkgebied", "Certificaten met geldige onderbouwing"],
    imageGuidance: "Gebruik eigen projectfoto's van uitvoering en eindresultaat, met toestemming van betrokkenen.",
    layout: "proof-first",
    problems: ["Projecten missen context", "Diensten lopen door elkaar", "Aanvragen bevatten te weinig informatie"],
    services: ["Projectportfolio", "Dienstenpagina's", "Offerte-intake", "Werkgebieden"],
    features: [
      { title: "Projecten met verhaal", text: "Toon uitgangssituatie, aanpak en resultaat in plaats van alleen losse foto's." },
      { title: "Gerichte aanvragen", text: "Vraag projecttype, locatie en gewenste planning direct uit." },
      { title: "Mobiel bereikbaar", text: "Bellen, WhatsAppen en aanvragen blijven altijd binnen handbereik." },
      { title: "Lokale structuur", text: "Diensten en werkgebieden krijgen een heldere, vindbare plek." },
    ],
    benefits: ["Kwaliteit zichtbaar maken", "Aanvragen beter kwalificeren", "Sneller contact op mobiel"],
    structure: ["Diensten en specialismen", "Projecten per type werk", "Werkwijze en planning", "Werkgebied", "Over het vakbedrijf", "Offerte aanvragen"],
    faqs: [
      { question: "Kan een aanvraag meteen projectgegevens uitvragen?", answer: "Ja. Denk aan type werk, locatie, gewenste planning en beschikbare foto's. Zo kun je gerichter reageren zonder het formulier onnodig lang te maken." },
      { question: "Hoe tonen we projecten zonder klantgegevens prijs te geven?", answer: "Met toestemming kun je het type opdracht, de aanpak en het resultaat tonen. Adressen en herkenbare persoonsgegevens laat je weg wanneer publicatie daarvoor niet nodig is." },
    ],
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
    metaTitle: "Website voor automotivebedrijven",
    metaDescription: "Websites voor garages, detailers en mobiliteitsbedrijven met een heldere route naar diensten, aanbod en afspraken.",
    customerTypes: ["Garages", "Detailers", "Dealers", "Mobiliteitsdiensten"],
    visitorIntent: "Een dienst of voertuig vinden, betrouwbaarheid controleren en een afspraak maken.",
    trustBarriers: ["Onduidelijke specialismen", "Verouderd aanbod", "Geen heldere afspraakroute"],
    desiredAction: "Een werkplaatsafspraak, proefrit of gerichte informatieaanvraag.",
    proofTypes: ["Echte reviews", "Werkplaatsspecialismen", "Garantievoorwaarden", "Actueel voertuigaanbod"],
    imageGuidance: "Combineer eigen werkplaatsbeelden met consistente voertuigfotografie en vermijd niet-actuele voorraadbeelden.",
    layout: "action-first",
    problems: ["Diensten en aanbod raken vermengd", "Afspraken kosten te veel stappen", "Reviews en expertise staan los van elkaar"],
    services: ["Werkplaatsdiensten", "Voertuigaanbod", "Online afspraak", "Reviews"],
    features: [
      { title: "Afspraakroute", text: "Laat bezoekers gericht een onderhouds-, reparatie- of adviesmoment aanvragen." },
      { title: "Aanbod in beeld", text: "Presenteer voertuigen of diensten met duidelijke kenmerken en vervolgstappen." },
      { title: "Vertrouwen", text: "Breng reviews, specialismen en echte garanties logisch samen." },
      { title: "Slimme koppelingen", text: "Bereid de website voor op agenda-, voorraad- of CRM-koppelingen." },
    ],
    benefits: ["Meer gerichte afspraken", "Aanbod snel scanbaar", "Expertise geloofwaardig tonen"],
    structure: ["Werkplaats of showroom kiezen", "Diensten en specialismen", "Voertuigen of cases", "Reviews en garanties", "Praktische informatie", "Afspraak aanvragen"],
    faqs: [
      { question: "Kan de website met een agenda of voorraadsysteem koppelen?", answer: "Vaak wel. Tijdens de intake controleren we welke koppeling beschikbaar is, wie de leverancier beheert en welke terugvaloptie nodig is." },
      { question: "Hoe houden we voertuig- of diensteninformatie actueel?", answer: "Dat kan via een beheermogelijkheid of een geschikte externe koppeling. De gekozen werkwijze en eventuele licentiekosten worden vooraf vastgelegd." },
    ],
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
    metaTitle: "Website voor beauty en gezondheid",
    metaDescription: "Een rustige website voor salons, studio's en praktijken, met begrijpelijke behandelingen, verwachtingen en een eenvoudige afspraakroute.",
    customerTypes: ["Beautysalons", "Wellnessstudio's", "Zelfstandige behandelaars", "Gezondheidspraktijken"],
    visitorIntent: "Een behandeling begrijpen, geschiktheid beoordelen en met vertrouwen boeken.",
    trustBarriers: ["Onduidelijke behandeling", "Onbekende deskundigheid", "Onvolledige voor- en nazorg"],
    desiredAction: "Een passende behandeling boeken of eerst een inhoudelijke vraag stellen.",
    proofTypes: ["Controleerbare kwalificaties", "Echte behandelinformatie", "Resultaatbeelden met expliciete toestemming"],
    imageGuidance: "Gebruik rustige eigen fotografie; publiceer resultaat- of cliëntbeelden alleen met aantoonbare toestemming.",
    layout: "structure-first",
    problems: ["Behandelingen zijn moeilijk te vergelijken", "Tarieven en verwachtingen blijven onduidelijk", "Boeken is omslachtig"],
    services: ["Behandelingen", "Online boeken", "Specialisten", "Voor- en nazorg"],
    features: [
      { title: "Behandeling per behoefte", text: "Bezoekers vinden snel wat past bij hun vraag of gewenste resultaat." },
      { title: "Duidelijke verwachtingen", text: "Leg werkwijze, duur, voorbereiding en nazorg overzichtelijk uit." },
      { title: "Boeken zonder drempel", text: "Koppel een passende agenda of laat gericht een afspraak aanvragen." },
      { title: "Zorgvuldig bewijs", text: "Presenteer kwalificaties en resultaten geloofwaardig en respectvol." },
    ],
    benefits: ["Meer vertrouwen vóór de afspraak", "Behandelingen helder vergelijken", "Eenvoudiger boeken"],
    structure: ["Behoefte of behandeling", "Voor wie en wanneer niet", "Werkwijze en nazorg", "Team en kwalificaties", "Tarieven", "Boeken of advies vragen"],
    faqs: [
      { question: "Kunnen contra-indicaties duidelijk maar rustig worden uitgelegd?", answer: "Ja. Belangrijke geschiktheidsinformatie krijgt een vaste, goed leesbare plek bij de behandeling. Medische claims worden alleen opgenomen als ze aantoonbaar kloppen." },
      { question: "Kan een bestaand boekingssysteem blijven werken?", answer: "Als het systeem een betrouwbare link of koppeling aanbiedt, kan die meestal worden geïntegreerd. We controleren ook de mobiele en toetsenbordbediening." },
    ],
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
    metaTitle: "Website voor horecaondernemers",
    metaDescription: "Een snelle horec website met sfeer, een mobiel leesbaar menu, actuele openingstijden en een duidelijke reserveringsroute.",
    customerTypes: ["Restaurants", "Cafés", "Cateraars", "Kleinschalige verblijfsconcepten"],
    visitorIntent: "Sfeer en aanbod bekijken, praktische informatie controleren en reserveren.",
    trustBarriers: ["Verouderd menu", "Onzekere openingstijden", "Omslachtig reserveren"],
    desiredAction: "Een tafel, arrangement of cateringaanvraag vastleggen.",
    proofTypes: ["Actuele menu-informatie", "Eigen sfeerfotografie", "Echte gastbeoordelingen", "Heldere allergeneninformatie"],
    imageGuidance: "Werk met actuele eigen fotografie van ruimte en gerechten; optimaliseer grote beelden voor mobiel.",
    layout: "action-first",
    problems: ["Menu's zijn slecht leesbaar op mobiel", "Reserveren zit verstopt", "Sfeer en praktische informatie sluiten niet aan"],
    services: ["Menu en arrangementen", "Reserveren", "Locatie en openingstijden", "Events"],
    features: [
      { title: "Mobiel menu", text: "Een actueel, goed leesbaar menu zonder onhandige PDF-route." },
      { title: "Direct reserveren", text: "Een vaste, herkenbare route naar tafel, event of aanvraag." },
      { title: "Sfeer met snelheid", text: "Sterk beeldgebruik zonder dat de website traag wordt." },
      { title: "Lokale informatie", text: "Openingstijden, route, bereikbaarheid en contact staan logisch bij elkaar." },
    ],
    benefits: ["Meer directe reserveringen", "Aanbod prettig op mobiel", "Sfeer en informatie in balans"],
    structure: ["Sfeer en kernconcept", "Menu of arrangementen", "Reserveren", "Groepen en events", "Openingstijden en route", "Contact"],
    faqs: [
      { question: "Kan het menu zonder onhandige pdf worden bijgehouden?", answer: "Ja. Een webmenu is beter leesbaar op mobiel en kan per categorie worden beheerd. Een downloadbare versie kan aanvullend blijven bestaan." },
      { question: "Hoe voorkomen we dat openingstijden op meerdere plekken verschillen?", answer: "We kiezen één beheerde bron en verwijzen daar consequent naar. Afwijkende feestdagen krijgen een zichtbare, tijdige vermelding." },
    ],
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
    metaTitle: "Website voor wonen en interieur",
    metaDescription: "Websites voor interieurstudio's, woonwinkels en adviseurs die inspiratie verbinden met collecties en adviesafspraken.",
    customerTypes: ["Interieurstudio's", "Woonwinkels", "Stylisten", "Maatwerkinterieurbouwers"],
    visitorIntent: "Stijl en aanbod verkennen, kwaliteit beoordelen en advies plannen.",
    trustBarriers: ["Mooie beelden zonder context", "Onduidelijk assortiment", "Geen route van inspiratie naar advies"],
    desiredAction: "Een showroombezoek of persoonlijk adviesgesprek plannen.",
    proofTypes: ["Gerealiseerde interieurs", "Merken en materialen", "Proces van ontwerp tot plaatsing"],
    imageGuidance: "Gebruik consistente projectfotografie met ruimte voor materiaal, detail en totaalbeeld.",
    layout: "proof-first",
    problems: ["Inspiratie mist een duidelijke vervolgstap", "Collecties zijn versnipperd", "Advies en verkoop voelen los van elkaar"],
    services: ["Collecties", "Interieuradvies", "Inspiratie", "Afspraak maken"],
    features: [
      { title: "Visuele richting", text: "Een eigen art direction die aansluit op collectie, merk en doelgroep." },
      { title: "Collectie-overzicht", text: "Orden producten en stijlen zonder een generiek webwinkelgevoel." },
      { title: "Advies als route", text: "Maak duidelijk wanneer deskundig advies waarde toevoegt en hoe je het boekt." },
      { title: "Ruimte voor verhalen", text: "Cases, merken en materiaalkeuzes krijgen inhoud en context." },
    ],
    benefits: ["Sterkere merkbeleving", "Collecties overzichtelijk presenteren", "Meer adviesafspraken"],
    structure: ["Inspiratie per woonstijl", "Collecties en materialen", "Projecten", "Advieswerkwijze", "Merken of makers", "Afspraak inplannen"],
    faqs: [
      { question: "Is een volledige webshop nodig om collecties te tonen?", answer: "Nee. Een inspirerende collectiepresentatie met een advies- of winkelroute kan beter passen. E-commerce voegen we alleen toe als voorraad, betaling en beheer goed zijn geregeld." },
      { question: "Hoe geven we projectfoto's genoeg context?", answer: "Benoem de ruimte, klantvraag, materiaalkeuzes en rol van het bedrijf. Gebruik alleen beelden waarvoor publicatierechten zijn vastgelegd." },
    ],
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
    metaTitle: "Website voor creatieve ondernemers",
    metaDescription: "Een onderscheidende portfoliowebsite voor ontwerpers, fotografen en makers, met context bij het werk en een gerichte projectaanvraag.",
    customerTypes: ["Ontwerpers", "Fotografen", "Makers", "Kleine creatieve bureaus"],
    visitorIntent: "Stijl en ervaring beoordelen en bepalen of er een goede projectmatch is.",
    trustBarriers: ["Werk zonder uitleg", "Onduidelijk dienstenaanbod", "Geen indicatie van samenwerking"],
    desiredAction: "Een projectaanvraag met type opdracht, planning en relevante context.",
    proofTypes: ["Geverifieerde cases", "Procesbeelden", "Publicaties of erkenningen met bron"],
    imageGuidance: "Laat het eigen werk leidend zijn en voeg per beeld projectcontext en correcte rechten toe.",
    layout: "proof-first",
    problems: ["Portfolio en aanbod vertellen twee verhalen", "Werk wordt zonder context getoond", "De contactstap blijft te vrijblijvend"],
    services: ["Portfolio", "Cases", "Diensten", "Projectaanvraag"],
    features: [
      { title: "Eigen signatuur", text: "Geen standaardtemplate, maar een ontwerp dat past bij jouw werk en persoonlijkheid." },
      { title: "Case-opbouw", text: "Vertel per project over vraag, concept, proces en resultaat." },
      { title: "Selectief contact", text: "Vraag budget, planning en type opdracht op een prettige manier uit." },
      { title: "Flexibel portfolio", text: "Maak ruimte om nieuw werk later logisch toe te voegen." },
    ],
    benefits: ["Werk krijgt context", "Sterker onderscheidend vermogen", "Betere projectaanvragen"],
    structure: ["Geselecteerd werk", "Cases met proces", "Diensten en samenwerking", "Over de maker", "Beschikbaarheid", "Project aanvragen"],
    faqs: [
      { question: "Kan het portfolio visueel vrij zijn en toch toegankelijk blijven?", answer: "Ja. We bewaken contrast, toetsenbordbediening, tekstalternatieven en leesvolgorde zonder de visuele signatuur vlak te maken." },
      { question: "Hoe voorkom ik aanvragen die niet bij mijn werk passen?", answer: "Een korte projectintake kan type opdracht, timing en context uitvragen. Budget wordt alleen gevraagd wanneer dat echt helpt bij kwalificatie." },
    ],
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
    metaTitle: "Website voor dierenbedrijven",
    metaDescription: "Een benaderbare website voor trimsalons, trainers, pensions en diergerichte diensten, met heldere voorwaarden en een zorgvuldige intake.",
    customerTypes: ["Trimsalons", "Dierentrainers", "Pensions", "Diergerichte dienstverleners"],
    visitorIntent: "Controleren of de aanpak bij het dier past en een afspraak of intake aanvragen.",
    trustBarriers: ["Onbekende werkwijze", "Voorwaarden pas na boeken", "Te weinig informatie over veiligheid"],
    desiredAction: "Een intake met diersoort, leeftijd en relevante bijzonderheden.",
    proofTypes: ["Werkwijze en visie", "Controleerbare opleiding", "Echte praktijkbeelden", "Heldere veiligheidsvoorwaarden"],
    imageGuidance: "Gebruik rustige eigen beelden van de werkomgeving; toon dieren en eigenaren alleen met toestemming.",
    layout: "structure-first",
    problems: ["Diensten verschillen per dier of situatie", "Voorwaarden worden te laat gevonden", "Afspraken missen belangrijke intakegegevens"],
    services: ["Diensten per dier", "Afspraken", "Werkwijze", "Praktische informatie"],
    features: [
      { title: "Gerichte dienstkeuze", text: "Bezoekers kiezen op dier, behoefte of type begeleiding." },
      { title: "Intake vooraf", text: "Vraag ras, leeftijd en relevante bijzonderheden zorgvuldig uit." },
      { title: "Heldere voorwaarden", text: "Maak voorbereiding, annulering en veiligheid makkelijk vindbaar." },
      { title: "Vertrouwen door expertise", text: "Laat visie, ervaring en omgang met dieren centraal staan." },
    ],
    benefits: ["Passende aanvragen ontvangen", "Voorwaarden vooraf duidelijk", "Vertrouwen opbouwen"],
    structure: ["Diensten per dier of behoefte", "Aanpak en welzijn", "Voorbereiding en voorwaarden", "Over de professional", "Tarieven", "Intake aanvragen"],
    faqs: [
      { question: "Welke informatie hoort in een eerste dierenintake?", answer: "Vraag alleen wat nodig is voor een goede eerste beoordeling, zoals diersoort, leeftijd en relevante bijzonderheden. Gevoelige informatie hoort niet in analytics." },
      { question: "Kunnen annulerings- en veiligheidsregels vooraf zichtbaar zijn?", answer: "Ja. Praktische voorwaarden staan bij de dienst en nogmaals bij de afspraakroute, zodat bezoekers niet pas na het boeken worden verrast." },
    ],
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
    metaTitle: "Website voor zakelijke dienstverlening",
    metaDescription: "Een inhoudelijk sterke website voor adviseurs, consultants en dienstverleners die expertise vertaalt naar relevante kennismakingen.",
    customerTypes: ["Adviseurs", "Consultants", "Specialistische bureaus", "Professionele dienstverleners"],
    visitorIntent: "Expertise en aanpak toetsen en bepalen welke kennismaking of dienst past.",
    trustBarriers: ["Abstracte claims", "Onduidelijke doelgroep", "Cases zonder aantoonbare rol"],
    desiredAction: "Een inhoudelijk voorbereide kennismaking aanvragen.",
    proofTypes: ["Cases met toestemming", "Publicaties", "Controleerbare expertise", "Heldere methodiek"],
    imageGuidance: "Kies eigen team- en werksituaties boven generieke vergaderfoto's; benoem de context in de alttekst.",
    layout: "action-first",
    problems: ["Expertise blijft abstract", "Diensten lijken op die van concurrenten", "Leads weten niet welke stap past"],
    services: ["Expertisegebieden", "Cases", "Kennismaking", "Kennisbank"],
    features: [
      { title: "Heldere positionering", text: "Leg scherp uit voor wie je werkt, welk probleem je oplost en waarom jouw aanpak past." },
      { title: "Bewijs met inhoud", text: "Cases, expertise en publicaties versterken elkaar." },
      { title: "Logische leadroute", text: "Stuur verschillende doelgroepen naar de juiste kennismaking of aanvraag." },
      { title: "Schaalbare kennis", text: "Bereid de structuur voor op artikelen, diensten en sectorpagina's." },
    ],
    benefits: ["Expertise begrijpelijk maken", "Meer relevante kennismakingen", "Duidelijker onderscheid"],
    structure: ["Voor wie en welk vraagstuk", "Expertisegebieden", "Aanpak", "Cases en inzichten", "Over de adviseur", "Kennismaking aanvragen"],
    faqs: [
      { question: "Hoe maken we complexe expertise begrijpelijk zonder te versimpelen?", answer: "We beginnen bij herkenbare vragen, leggen de aanpak in stappen uit en bieden verdieping waar die nodig is. Vaktaal krijgt context in plaats van te worden weggepoetst." },
      { question: "Welke cases mogen op de website?", answer: "Alleen cases waarvoor publicatie is toegestaan. De rol, aanpak en eventuele resultaten worden controleerbaar en zonder vertrouwelijke details beschreven." },
    ],
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
    metaTitle: "Website voor winkels en retail",
    metaDescription: "Een merkvaste retailwebsite die assortiment, winkellocatie en service verbindt en bezoekers naar winkel, vraag of aankoop leidt.",
    customerTypes: ["Zelfstandige winkels", "Retailconcepten", "Showrooms", "Merkwinkels"],
    visitorIntent: "Assortiment en beschikbaarheid verkennen en kiezen tussen winkelbezoek, vraag of aankoop.",
    trustBarriers: ["Verschil tussen online en winkel", "Onbekende voorraadstatus", "Verspreide service-informatie"],
    desiredAction: "Een winkel bezoeken, voorraad navragen of gericht online kopen.",
    proofTypes: ["Actuele collecties", "Winkelinformatie", "Servicevoorwaarden", "Echte product- en sfeerbeelden"],
    imageGuidance: "Gebruik consistente fotografie van winkel, collectie en details; houd campagnebeelden actueel.",
    layout: "structure-first",
    problems: ["Online en winkel voelen als twee merken", "Assortiment is lastig te ontdekken", "Praktische winkelinformatie zit verspreid"],
    services: ["Assortiment", "Winkellocaties", "Acties", "Service en contact"],
    features: [
      { title: "Merk en winkel samen", text: "Een consistente uitstraling over collectie, campagne en locatie." },
      { title: "Slim assortiment", text: "Presenteer categorieën en highlights met of zonder volledige webshop." },
      { title: "Bezoek stimuleren", text: "Locatie, voorraadvragen en openingstijden krijgen een duidelijke route." },
      { title: "Groei voorbereid", text: "Koppelingen met voorraad, nieuwsbrief of e-commerce kunnen later meegroeien." },
    ],
    benefits: ["Sterkere merkconsistentie", "Meer winkelbezoek of aanvragen", "Assortiment beter vindbaar"],
    structure: ["Nieuwe collectie of campagne", "Assortiment per categorie", "Winkellocatie", "Service en veelgestelde vragen", "Merkverhaal", "Bezoeken of contact"],
    faqs: [
      { question: "Moet een retailwebsite altijd een webshop zijn?", answer: "Nee. Voor sommige winkels is online oriënteren en winkelbezoek de belangrijkste route. We kiezen e-commerce alleen als assortiment, voorraad, logistiek en beheer daarop zijn ingericht." },
      { question: "Kan voorraad op de website worden getoond?", answer: "Dat hangt af van het kassasysteem of voorraadplatform. We controleren de beschikbare koppeling en spreken af wat de bezoeker ziet wanneer actuele voorraad niet beschikbaar is." },
    ],
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
    metaTitle: "Website voor onderwijs en opleiders",
    metaDescription: "Een toegankelijke website voor scholen, opleiders en trainingsorganisaties, met duidelijke routes naar aanbod, planning en aanmelden.",
    customerTypes: ["Opleiders", "Trainingsorganisaties", "Scholen", "Educatieve initiatieven"],
    visitorIntent: "Aanbod, niveau, planning en toelating vergelijken en daarna aanmelden of informatie vragen.",
    trustBarriers: ["Informatie voor doelgroepen door elkaar", "Onduidelijke startmomenten", "Moeilijk toegankelijk aanmelden"],
    desiredAction: "Aanmelden, een brochure bekijken of een gerichte informatievraag stellen.",
    proofTypes: ["Erkende informatie met bron", "Docentprofielen", "Programma en leeruitkomsten", "Toelatings- en kosteninformatie"],
    imageGuidance: "Gebruik representatieve eigen onderwijsbeelden en leg toestemming voor herkenbare leerlingen of deelnemers vast.",
    layout: "action-first",
    problems: ["Verschillende doelgroepen zoeken andere informatie", "Aanbod en planning zijn lastig te overzien", "Aanmelden bevat onnodige drempels"],
    services: ["Opleidingsaanbod", "Planning", "Aanmelden", "Informatie per doelgroep"],
    features: [
      { title: "Doelgroepgerichte routes", text: "Leerlingen, ouders en organisaties vinden ieder hun eigen informatie." },
      { title: "Aanbod vergelijken", text: "Niveau, duur, startmoment en resultaat zijn snel scanbaar." },
      { title: "Toegankelijk aanmelden", text: "Formulieren en informatie werken met toetsenbord, mobiel en ondersteunende technologie." },
      { title: "Actueel houden", text: "Structuur voor nieuws, agenda, documenten of een latere beheerkoppeling." },
    ],
    benefits: ["Minder zoekwerk voor bezoekers", "Aanbod helder vergelijken", "Toegankelijker aanmelden"],
    structure: ["Route per doelgroep", "Opleidingen en leeruitkomsten", "Niveau, duur en planning", "Docenten en organisatie", "Praktische voorwaarden", "Aanmelden of informatie vragen"],
    faqs: [
      { question: "Hoe bedienen we leerlingen, ouders en opdrachtgevers op één website?", answer: "Met herkenbare ingangen per doelgroep en gedeelde broninformatie. Zo hoeft dezelfde planning of opleiding niet op meerdere plekken handmatig te worden bijgehouden." },
      { question: "Welke toegankelijkheid is belangrijk bij aanmelden?", answer: "Formulieren moeten met toetsenbord en ondersteunende technologie werken, fouten duidelijk uitleggen en op mobiel leesbaar blijven. Documenten krijgen waar mogelijk een toegankelijke webversie." },
    ],
  },
];

export type Package = {
  id: "starter" | "business" | "premium" | "maatwerk";
  name: string;
  price: string;
  cadence: string;
  audience: string;
  notFor: string;
  exclusions: string[];
  description: string;
  features: string[];
  featured: boolean;
  ownership: string;
};

export const packages: Package[] = [
  {
    id: "starter", name: "Starter", price: "€ 695", cadence: "eenmalig, excl. btw", audience: "Voor een sterke, compacte online basis", featured: false,
    notFor: "Niet bedoeld voor uitgebreide contentstructuren of maatwerkfuncties.",
    exclusions: ["Hosting en domein", "Externe licenties", "Uitgebreide koppelingen"],
    description: "Een professionele maatwerkwebsite waarmee je bedrijf direct geloofwaardig en bereikbaar online staat.",
    features: ["Professionele maatwerkwebsite", "Tot 5 pagina's", "Responsive ontwerp", "Contactformulier", "Basis-SEO", "WhatsApp-koppeling", "Socialmedia-koppelingen", "Oplevering in 5–7 werkdagen"],
    ownership: "Na volledige betaling zijn het overeengekomen ontwerp en de inhoud van jou. Hosting en domein zijn niet standaard inbegrepen.",
  },
  {
    id: "business", name: "Business", price: "€ 1.295", cadence: "eenmalig, excl. btw", audience: "Voor bedrijven die professioneler willen groeien", featured: false,
    notFor: "Niet bedoeld voor portalen, complexe boekingsstromen of uitgebreide API-koppelingen.",
    exclusions: ["Hosting en domein", "Betaalde externe licenties", "Maatwerkportalen"],
    description: "Meer ruimte voor aanbod, vindbaarheid en conversie, met een premium ontwerp dat bij je doelgroep past.",
    features: ["Alles uit Starter", "Tot 10 pagina's", "Premium maatwerkdesign", "Geavanceerde SEO-basis", "Google Maps en Reviews", "Blog- of nieuwsfunctie", "Conversiegerichte CTA's", "Performance-optimalisatie", "2 correctierondes"],
    ownership: "Na volledige betaling zijn het overeengekomen ontwerp en de inhoud van jou. Hosting en domein zijn niet standaard inbegrepen.",
  },
  {
    id: "premium", name: "Premium", price: "€ 1.895", cadence: "eenmalig, excl. btw", audience: "Voor merken die online onderscheid willen maken", featured: true,
    notFor: "Niet bedoeld voor complexe applicaties of onbeperkte functionaliteit.",
    exclusions: ["Hosting en domein", "Betaalde externe licenties", "Complexe applicatielogica"],
    description: "Een exclusieve website met meer beleving, slimme functies en gerichte optimalisatie voor resultaat.",
    features: ["Alles uit Business", "Tot 20 pagina's", "Exclusief maatwerkdesign", "Gerichte, subtiele animaties", "Conversie-optimalisatie", "Portfolio- of casesectie", "Afspraken- of offertemodule", "Analytics- en Search Console-inrichting met jouw toegang", "Prioriteitsbehandeling", "Optimalisatiesessie"],
    ownership: "Na volledige betaling zijn het overeengekomen ontwerp en de inhoud van jou. Hosting en domein zijn niet standaard inbegrepen.",
  },
  {
    id: "maatwerk", name: "Maatwerk", price: "Vanaf € 3.495", cadence: "eenmalig, excl. btw", audience: "Voor complexe ambities en maatwerkfunctionaliteit", featured: false,
    notFor: "Niet nodig wanneer een compact pakket de volledige vraag al dekt.",
    exclusions: ["Niet-afgesproken uitbreidingen", "Externe abonnementen", "Werk buiten de vastgelegde scope"],
    description: "Een schaalbare oplossing wanneer je website onderdeel wordt van een groter digitaal proces.",
    features: ["Alles uit Premium", "Onbeperkt aantal pagina's binnen de afgesproken scope", "Maatwerkfunctionaliteit", "API-koppelingen", "Portaal of dashboard", "Boekingssysteem", "Meertaligheid", "Schaalbare technische architectuur", "Uitgebreide projectbegeleiding", "Planning op maat"],
    ownership: "De definitieve investering en planning volgen na scopebepaling. Hosting, domein en externe diensten worden transparant apart vastgelegd.",
  },
];

export const maintenanceOptions = [
  { id: "basis-onderhoud", name: "Basis onderhoud", price: "€ 79", cadence: "per beurt, excl. btw", features: ["Back-up", "Updates", "Functionele controle", "Kleine beveiligingscheck"] },
  { id: "groot-onderhoud", name: "Groot onderhoud", price: "€ 149", cadence: "per beurt, excl. btw", features: ["Alles uit Basis onderhoud", "Snelheidscontrole", "Formuliertests", "Kleine technische of visuele verbeteringen"] },
];

export const chatbotOffer = {
  id: "website-chatbot",
  name: "Websitechatbot",
  price: "€ 149",
  cadence: "eenmalig, excl. btw · geen abonnement",
  description: "Een chatbot die bezoekers helpt met vooraf afgestemde informatie en hen doorstuurt naar persoonlijk contact wanneer een antwoord ontbreekt.",
  features: [
    "Installatie op je website",
    "Antwoorden afgestemd op jouw dienstverlening",
    "Aansluiting op de uitstraling van je website",
    "Duidelijke route naar persoonlijk contact",
  ],
};

export const maintenanceFaqs = [
  { question: "Is websiteonderhoud verplicht?", answer: "Nee. Sitora werkt zonder verplicht onderhoudsabonnement. Je vraagt een losse onderhoudsbeurt aan wanneer dat nodig is." },
  { question: "Wat valt onder Basis onderhoud?", answer: "Basis onderhoud bevat een back-up, updates, een functionele controle en een kleine beveiligingscheck." },
  { question: "Wat valt onder Groot onderhoud?", answer: "Groot onderhoud bevat alles uit Basis onderhoud, plus een snelheidscontrole, formuliertests en kleine technische of visuele verbeteringen." },
  { question: "Zijn grotere wijzigingen inbegrepen?", answer: "Nee. Nieuwe pagina's, koppelingen en omvangrijke wijzigingen worden eerst beoordeeld en apart geprijsd." },
];

export const chatbotFaqs = [
  { question: "Betaal ik maandelijks voor de chatbot?", answer: "Nee. De installatie kost eenmalig € 149 exclusief btw en heeft geen verplicht Sitora-abonnement. Eventuele externe licenties worden vooraf besproken." },
  { question: "Wat doet de websitechatbot?", answer: "De chatbot beantwoordt vooraf afgestemde veelgestelde vragen en verwijst bezoekers naar persoonlijk contact wanneer informatie ontbreekt of onzeker is." },
  { question: "Kan de chatbot later worden aangepast?", answer: "Ja. Aanpassingen buiten de afgesproken installatie worden eerst beoordeeld en vooraf geprijsd." },
  { question: "Vervangt de chatbot persoonlijk contact?", answer: "Nee. De chatbot biedt laagdrempelige hulp en houdt een duidelijke route naar persoonlijk contact beschikbaar." },
];

export const processSteps = [
  { number: "01", title: "Aanvraag en kennismaking", text: "We bespreken je bedrijf, doelgroep, vraag en afhankelijkheden. Daarna bepalen we of en welk traject passend is." },
  { number: "02", title: "Intake en scope", text: "Pagina's, functies, inhoud, verantwoordelijkheden, feedbackrondes, externe kosten en planning worden vooraf vastgelegd." },
  { number: "03", title: "Inhoud en richting", text: "Na complete aanlevering bepalen we informatiehiërarchie, klantreis en visuele richting voor je merk en doelgroep." },
  { number: "04", title: "Ontwerp en ontwikkeling", text: "We werken de afgesproken pagina's responsive uit en bouwen de benodigde functies en technische SEO-basis." },
  { number: "05", title: "Feedback, test en akkoord", text: "Feedback wordt per afgesproken ronde gebundeld. Daarna testen we inhoud, toegankelijkheid, formulieren en techniek en vragen we publicatieakkoord." },
  { number: "06", title: "Livegang en overdracht", text: "Na akkoord en de afgesproken betaling publiceren we, dragen we de overeengekomen onderdelen over en leggen we support of los onderhoud vast." },
];

export type ConceptProject = {
  status: "concept";
  slug: string;
  type: string;
  name: string;
  direction: string;
  audience: string;
  objective: string;
  pageStructure: string[];
  features: string[];
  accent: string;
};

export type VerifiedCaseStudy = {
  status: "live-project" | "client-case";
  slug: string;
  clientName: string;
  permission: true;
  sector: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  launchDate?: string;
  measurableResult?: { value: string; source: string };
  testimonial?: { quote: string; permission: true };
  logoPermission?: true;
  screenshots?: string[];
  beforeAfter?: string[];
};

// Only verified case studies with explicit publication permission belong here.
export const caseStudies: VerifiedCaseStudy[] = [];

export const projects: ConceptProject[] = [
  { status: "concept", slug: "atelier-nova", type: "Creatieve sector", name: "Atelier Nova", direction: "Redactioneel en uitgesproken", audience: "Opdrachtgevers die stijl en werkwijze willen beoordelen", objective: "Portfolio en projectaanvragen samenbrengen", pageStructure: ["Selectie", "Cases", "Diensten", "Projectintake"], features: ["Cases", "Eigen art direction", "Projectintake"], accent: "#f26322" },
  { status: "concept", slug: "mira-studio", type: "Beauty en gezondheid", name: "Mira Studio", direction: "Rustig en verfijnd", audience: "Bezoekers die behandeling en deskundigheid vergelijken", objective: "Behandelingen begrijpelijk maken en afspraken stimuleren", pageStructure: ["Behandelingen", "Werkwijze", "Expertise", "Boeken"], features: ["Behandelingen", "Boeken", "Vertrouwen"], accent: "#d48d73" },
  { status: "concept", slug: "noord-advies", type: "Zakelijke dienstverlening", name: "Noord Advies", direction: "Helder en gezaghebbend", audience: "Beslissers met een specialistisch adviesvraagstuk", objective: "Complexe expertise vertalen naar relevante leads", pageStructure: ["Vraagstukken", "Expertise", "Cases", "Kennismaking"], features: ["Expertise", "Cases", "Kennismaking"], accent: "#4f7294" },
  { status: "concept", slug: "tafel-twaalf", type: "Horeca", name: "Tafel Twaalf", direction: "Warm en uitnodigend", audience: "Mobiele bezoekers die sfeer, menu en beschikbaarheid zoeken", objective: "Sfeer, menu en reserveren in één mobiele ervaring", pageStructure: ["Concept", "Menu", "Groepen", "Reserveren"], features: ["Menu", "Reserveren", "Locatie"], accent: "#b85c38" },
];

export const faqs = [
  { question: "Wat kost een chatbot voor mijn website?", answer: "De installatie van de Sitora-websitechatbot kost eenmalig € 149 exclusief btw, zonder verplicht abonnement. Eventuele externe licenties of extra werkzaamheden worden vooraf besproken." },
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
  { question: "Van wie blijven domein en hostingaccount?", answer: "De gewenste tenaamstelling en toegang worden vóór de start vastgelegd. Hosting en domein vallen niet standaard in de pakketprijs." },
  { question: "Hoeveel correctierondes zijn inbegrepen?", answer: "Het aantal rondes staat in de offerte. Business en daarop voortbouwende pakketten bevatten volgens de huidige pakketscope twee correctierondes; voor andere trajecten geldt de geaccepteerde offerte." },
  { question: "Wie levert teksten en afbeeldingen aan?", answer: "Dat spreken we vooraf af. De opdrachtgever blijft verantwoordelijk voor juistheid en gebruiksrechten van aangeleverd materiaal; inhoudelijke ondersteuning kan apart worden opgenomen." },
  { question: "Hoe worden analytics en privacy geregeld?", answer: "Analytics wordt alleen gekoppeld wanneer een echte meetomgeving en passende toestemming zijn ingericht. Formuliergegevens worden niet als analytics-event meegestuurd." },
  { question: "Wat gebeurt er na de livegang?", answer: "We leggen overdracht, een eventuele supportperiode en openstaande externe acties vast. Later onderhoud kan per beurt worden aangevraagd." },
  { question: "Hoe worden back-ups en beveiliging geregeld?", answer: "Dat hangt af van hosting en onderhoudsscope. De verantwoordelijkheden, frequentie en herstelmogelijkheden worden daarom vóór publicatie expliciet vastgelegd." },
  { question: "Wat als aanlevering of feedback vertraagt?", answer: "De planning schuift mee wanneer afgesproken inhoud, toegang of gebundelde feedback later binnenkomt. Een nieuwe haalbare planning wordt afgestemd." },
  { question: "Kan een bestaande website worden gemigreerd?", answer: "Ja, wanneer inhoud, redirects, domein, e-mail en technische afhankelijkheden vooraf zijn geïnventariseerd. De migratiescope wordt apart bevestigd." },
  { question: "Krijg ik de broncode?", answer: "Overdracht volgt de offerte en overeenkomst. Eigendom geldt na volledige betaling en met uitzondering van licenties, tooling en diensten van derden." },
  { question: "Kan een project worden geannuleerd?", answer: "De gevolgen van annulering horen in de geaccepteerde offerte en voorwaarden te staan. Laat deze afspraken juridisch beoordelen voordat ze contractueel worden gebruikt." },
];

export const allStaticSlugs = [
  ...sectors.map((sector) => sector.slug),
  "branches", "diensten", "pakketten", "werkwijze", "voorbeelden", "over-sitora", "contact", "veelgestelde-vragen", "website-onderhoud", "chatbot-voor-je-website",
  "privacyverklaring", "cookieverklaring", "algemene-voorwaarden", "bedankt",
];

export const sitemapSlugs = allStaticSlugs.filter((slug) => slug !== "bedankt");
