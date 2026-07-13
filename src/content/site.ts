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

// Backwards-compatible alias used by shared contact components.
export const contact = {
  phoneDisplay: business.phoneDisplay,
  phoneHref: business.phoneHref,
  whatsapp: business.whatsapp,
  email: business.email,
  location: business.address,
};

export const navigation = [
  { label: "Voor wie", href: "/#voor-wie" },
  { label: "Pakketten", href: "/pakketten" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Voorbeelden", href: "/voorbeelden" },
  { label: "Over Sitora", href: "/over-sitora" },
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
  problems: string[];
  features: { title: string; text: string }[];
  structure: string[];
  services: string[];
  benefits: string[];
  faqs: SectorFaq[];
  image: string;
  imageAlt: string;
};

export const sectors: Sector[] = [
  {
    slug: "websites-voor-loodgieters",
    name: "loodgieter",
    plural: "loodgieters",
    eyebrow: "Website laten maken voor loodgieters",
    title: "Van lekkage tot installatie: klanten zien direct waarvoor ze je kunnen bellen",
    description: "Een loodgieterswebsite moet haast én vertrouwen aankunnen. Spoedklanten bellen meteen; geplande opdrachtgevers vragen gericht een offerte aan.",
    problems: ["Spoed en regulier werk lopen door elkaar", "Het werkgebied is niet direct duidelijk", "Aanvragen missen foto's, locatie of type klus"],
    services: ["Lekkage en spoed", "Leidingwerk", "Sanitair en badkamers", "Verwarming en onderhoud"],
    features: [
      { title: "Spoedroute", text: "Een vaste belknop en korte spoedkeuze voor lekkages en acute problemen." },
      { title: "Werkgebied", text: "Plaatsen en regio's staan logisch in beeld, zonder een muur van zoekwoorden." },
      { title: "Gerichte intake", text: "Type klus, locatie en gewenste termijn komen direct bij de aanvraag mee." },
      { title: "Foto-upload voorbereid", text: "De formulierarchitectuur kan later veilig worden uitgebreid met afbeeldingen." },
    ],
    structure: ["Home met spoedcontact", "Lekkage en reparatie", "Badkamer en sanitair", "Onderhoud", "Werkgebied", "Offerte aanvragen"],
    benefits: ["Direct bellen op mobiel", "Minder terugvragen per aanvraag", "Duidelijk onderscheid tussen spoed en gepland werk"],
    faqs: [
      { question: "Kan de website een aparte spoedknop krijgen?", answer: "Ja. We kunnen spoedcontact op mobiel en op relevante dienstenpagina's prominent tonen, zonder de rest van de website onrustig te maken." },
      { question: "Kunnen klanten foto's van een lekkage meesturen?", answer: "De website kan hierop worden voorbereid. Voor veilige bestandsverwerking koppelen we bij implementatie een geschikte opslag- of formulierprovider." },
    ],
    image: "/images/loodgieter.jpg",
    imageAlt: "Twee professionele pijptangen voor leidingwerk",
  },
  {
    slug: "websites-voor-elektriciens",
    name: "elektricien",
    plural: "elektriciens",
    eyebrow: "Website voor elektriciens",
    title: "Een heldere website voor storingen, installaties en zakelijke projecten",
    description: "Particulieren willen snel hulp; zakelijke opdrachtgevers willen capaciteit en betrouwbaarheid beoordelen. De website geeft beide een eigen route.",
    problems: ["Storingen vragen om snel contact", "Particulier en zakelijk aanbod raakt vermengd", "Specialismen zoals laadpalen krijgen te weinig uitleg"],
    services: ["Storingen", "Groepenkasten", "Laadpalen", "Verlichting", "Inspecties", "Zakelijke installaties"],
    features: [
      { title: "Storing of project", text: "Bezoekers kiezen meteen tussen directe hulp en een geplande installatie." },
      { title: "Woning en bedrijf", text: "Aparte routes voorkomen dat verschillende doelgroepen door elkaar lopen." },
      { title: "Diensten met context", text: "Elke dienst legt uit wanneer iemand contact opneemt en welke informatie nodig is." },
      { title: "Vertrouwen zonder claims", text: "Ruimte voor echte certificeringen en keurmerken zodra die zijn aangeleverd." },
    ],
    structure: ["Home", "Storingen", "Groepenkast", "Laadpalen", "Zakelijk", "Inspecties", "Offerte aanvragen"],
    benefits: ["Snelle storingsroute", "Duidelijke scheiding van klanttypen", "Ruimte voor echte bevoegdheden en referenties"],
    faqs: [
      { question: "Kunnen we certificeringen tonen?", answer: "Ja, mits je de juiste namen en geldige bewijsstukken aanlevert. We verzinnen of suggereren geen bevoegdheden." },
      { question: "Is een aparte pagina voor laadpalen zinvol?", answer: "Voor bedrijven die deze dienst actief verkopen meestal wel. Bezoekers hebben andere vragen over locatie, aansluiting en gebruik dan bij regulier elektrawerk." },
    ],
    image: "/images/elektricien.jpg",
    imageAlt: "Elektricien controleert een elektrische installatie",
  },
  {
    slug: "websites-voor-schilders",
    name: "schildersbedrijf",
    plural: "schilders",
    eyebrow: "Website voor schildersbedrijven",
    title: "Laat afwerking en onderhoud zien vóór de klant een offerte aanvraagt",
    description: "Schilderwerk wordt vooral beoordeeld met het oog. Een rustige projectpresentatie en een intake per pandtype maken jouw kwaliteit concreet.",
    problems: ["Projectfoto's staan verspreid op social media", "Binnen- en buitenwerk worden niet onderscheiden", "Offertevragen missen pandtype en onderhoudsstaat"],
    services: ["Binnenschilderwerk", "Buitenschilderwerk", "Houtrot herstel", "Onderhoudsplannen", "Zakelijke projecten"],
    features: [
      { title: "Voor en na", text: "Projectbeelden kunnen als duidelijk paar worden gepresenteerd zonder overdreven effecten." },
      { title: "Pandgerichte intake", text: "Woning, VvE, bedrijfspand of monument bepaalt welke vragen worden gesteld." },
      { title: "Onderhoud uitleggen", text: "Laat zien wanneer periodiek onderhoud slimmer is dan losse reparaties." },
      { title: "Projectportfolio", text: "Filter projecten op binnen, buiten, houtwerk of zakelijke opdracht." },
    ],
    structure: ["Home met recent werk", "Binnen", "Buiten", "Onderhoud", "Projecten", "Over het bedrijf", "Offerte aanvragen"],
    benefits: ["Werk overtuigt visueel", "Betere informatie vóór opname", "Seizoenswerk logisch presenteren"],
    faqs: [
      { question: "Kan ik zelf nieuwe projecten toevoegen?", answer: "Dat kan met een passend beheersysteem of onderhoudsafspraak. De gekozen oplossing hangt af van hoe vaak je projecten publiceert." },
      { question: "Werken voor-en-na-foto's ook op mobiel?", answer: "Ja. We gebruiken een eenvoudige, toegankelijke presentatie die ook zonder slepen of hover duidelijk blijft." },
    ],
    image: "/images/schilder.jpg",
    imageAlt: "Schilder brengt zorgvuldig verf aan op een buitengevel",
  },
  {
    slug: "websites-voor-dakdekkers",
    name: "dakdekker",
    plural: "dakdekkers",
    eyebrow: "Website laten maken voor dakdekkers",
    title: "Bij lekkage snel bereikbaar, bij renovatie overtuigend onderbouwd",
    description: "Een dakwebsite moet urgentie opvangen zonder schreeuwerig te worden. Daktype, locatie en probleem vormen de basis van iedere aanvraag.",
    problems: ["Spoedvragen bevatten weinig bruikbare informatie", "Daktypen en werkzaamheden blijven vaag", "Renovatieklanten missen proces en voorbeelden"],
    services: ["Daklekkage", "Dakrenovatie", "Inspectie", "Pannendaken", "Bitumen daken", "Onderhoud"],
    features: [
      { title: "Lekkageroute", text: "Locatie, daktype en zichtbare schade worden direct uitgevraagd." },
      { title: "Daktype als ingang", text: "Pannen, bitumen en platte daken krijgen ieder relevante uitleg." },
      { title: "Inspectieproces", text: "Bezoekers zien wat een inspectie wel en niet oplevert." },
      { title: "Beeldmateriaal voorbereid", text: "Veilige foto-upload kan later via een geconfigureerde provider worden toegevoegd." },
    ],
    structure: ["Home met lekkagekeuze", "Dakreparatie", "Renovatie", "Inspectie", "Daktypen", "Werkgebied", "Offerte aanvragen"],
    benefits: ["Urgentie zonder druktrucs", "Bruikbare intake per daktype", "Meer vertrouwen bij grotere renovaties"],
    faqs: [
      { question: "Kan de site spoed en renovatie apart behandelen?", answer: "Ja. Een lekkage vraagt om kort contact; renovatie vraagt om bewijs, werkwijze en een uitgebreidere intake. Die routes houden we bewust apart." },
      { question: "Kunnen klanten hun daktype kiezen?", answer: "Ja. De intake kan keuzes tonen voor onder meer pannendak, bitumen, EPDM en 'weet ik niet'." },
    ],
    image: "/images/dakdekker.jpg",
    imageAlt: "Dakdekker inspecteert een pannendak",
  },
  {
    slug: "websites-voor-aannemers",
    name: "aannemer",
    plural: "aannemers",
    eyebrow: "Website voor aannemers en bouwbedrijven",
    title: "Geef grotere projecten de context die opdrachtgevers nodig hebben",
    description: "Aanbouw, renovatie en zakelijke bouw vragen om meer dan een fotogalerij. De website maakt aanpak, projectomvang en vervolgstappen inzichtelijk.",
    problems: ["Projecten tonen weinig context", "Kleine en grote aanvragen komen in hetzelfde formulier", "Proces, planning en werkgebied zijn onvoldoende uitgelegd"],
    services: ["Renovatie", "Aanbouw", "Verbouwing", "Nieuwbouw", "Zakelijke projecten", "Service en onderhoud"],
    features: [
      { title: "Projectverhalen", text: "Type opdracht, uitgangssituatie, aanpak en oplevering staan logisch bij elkaar." },
      { title: "Gedetailleerde intake", text: "Locatie, projecttype, fase, gewenste start en belangrijke functies komen vooraf mee." },
      { title: "Proces als bewijs", text: "Een duidelijke werkwijze laat zien hoe voorbereiding, uitvoering en communicatie verlopen." },
      { title: "Werken-bij voorbereid", text: "Een vacaturesectie kan worden toegevoegd voor bedrijven die nieuwe vakmensen zoeken." },
    ],
    structure: ["Home", "Diensten", "Projecten", "Werkwijze", "Over het bouwbedrijf", "Werken bij", "Project bespreken"],
    benefits: ["Serieuze aanvragen beter kwalificeren", "Projecten krijgen inhoud en context", "Geschikt voor meerdere teams en regio's"],
    faqs: [
      { question: "Kan het formulier kleine klussen filteren?", answer: "We kunnen projecttype, omvang en gewenste start uitvragen. De website wijst niemand automatisch af, maar geeft jou wel meer context om snel te beoordelen." },
      { question: "Is een werken-bijpagina inbegrepen?", answer: "Deze past binnen Sitora Maatwerk of kan als aanvullende pagina worden aangeboden, afhankelijk van inhoud en benodigde functionaliteit." },
    ],
    image: "/images/aannemer.jpg",
    imageAlt: "Aannemer bespreekt de voortgang op een bouwplaats",
  },
];

export type Package = {
  id: "start" | "professional" | "groei" | "abonnement";
  name: string;
  price: string;
  cadence: string;
  audience: string;
  description: string;
  features: string[];
  featured: boolean;
  ownership: string;
  conditions?: string[];
};

export const packages: Package[] = [
  {
    id: "start",
    name: "Sitora Start",
    price: "€ 795",
    cadence: "eenmalig, excl. btw",
    audience: "Zelfstandige vakmensen en kleine bedrijven",
    description: "Een professionele one-page website met een korte route naar bellen, WhatsApp en offerte.",
    features: ["One-page website", "Responsive ontwerp", "Dienstenoverzicht", "Bel- en WhatsAppknop", "Offerteformulier", "Technische SEO-basis", "Tekst redigeren op basis van jouw informatie", "1 correctieronde"],
    featured: false,
    ownership: "Na volledige betaling zijn ontwerp en inhoud van jou; hosting en domein zijn niet inbegrepen.",
  },
  {
    id: "professional",
    name: "Sitora Professional",
    price: "€ 1.495",
    cadence: "eenmalig, excl. btw",
    audience: "Vakbedrijven met meerdere diensten",
    description: "De complete basis voor aparte diensten, projecten en een gerichte offerte-intake.",
    features: ["Tot 7 pagina's", "Branchegericht ontwerp", "Aparte dienstenpagina's", "Project- of portfoliosectie", "Professioneel gestructureerde teksten", "Conversiegericht offerteformulier", "Technische en lokale SEO-basis", "Google Reviews-koppeling voorbereid", "2 correctierondes", "3 maanden technische ondersteuning"],
    featured: true,
    ownership: "Na volledige betaling zijn ontwerp en inhoud van jou; hosting en domein zijn niet inbegrepen.",
  },
  {
    id: "groei",
    name: "Sitora Maatwerk",
    price: "Vanaf € 4.495",
    cadence: "eenmalig, excl. btw",
    audience: "Bouw- en installatiebedrijven met bredere ambities",
    description: "Een schaalbare website voor meerdere diensten, locaties, projecten of werving.",
    features: ["Tot 15 pagina's", "Volledig afgestemde structuur", "Meerdere locaties of werkgebieden", "Uitgebreide projectsectie", "Vacature- of werken-bijpagina", "Meerdere formulieren", "Lokale landingspaginastructuur", "Analytics en conversiemeting voorbereid", "3 correctierondes", "Persoonlijke strategiesessie"],
    featured: false,
    ownership: "Na volledige betaling zijn ontwerp en inhoud van jou; exacte prijs volgt na scopebepaling.",
  },
  {
    id: "abonnement",
    name: "Website-abonnement",
    price: "Vanaf € 89",
    cadence: "per maand, excl. btw",
    audience: "Bedrijven die zonder grote startinvestering online willen",
    description: "Website, hosting en technisch beheer in één vast maandbedrag.",
    features: ["Website tot 5 pagina's", "Hosting", "Technisch onderhoud", "Back-ups", "Beveiligingsupdates", "Basis-SEO-inrichting", "30 minuten kleine wijzigingen per maand"],
    featured: false,
    ownership: "De abonnementsvoorwaarden bepalen wat na beëindiging wordt overgedragen.",
    conditions: ["Eenmalige setup: € 249 excl. btw", "Minimale looptijd: 24 maanden", "Daarna opzegbaar volgens de overeenkomst"],
  },
];

export const processSteps = [
  { number: "01", title: "Kennismaken", text: "We bespreken je bedrijf, belangrijkste diensten, werkgebied en het type aanvragen dat je zoekt." },
  { number: "02", title: "Structuur en ontwerp", text: "Zodra logo, contactgegevens, diensten en beschikbaar beeld compleet zijn, start de termijn van zeven werkdagen." },
  { number: "03", title: "Feedback", text: "Je beoordeelt het complete eerste ontwerp. We verwerken de afgesproken feedback binnen de correctierondes van je pakket." },
  { number: "04", title: "Controleren en publiceren", text: "Na akkoord, technische controle en eventuele domeinkoppeling zetten we de website live." },
];

export const projects = [
  { slug: "van-dijk-installaties", type: "Loodgieter", name: "Van Dijk Installaties", direction: "Direct en lokaal", objective: "Spoed en geplande aanvragen scheiden", features: ["Spoedknop", "Werkgebied", "Dienstkeuze"], image: "/images/loodgieter.jpg" },
  { slug: "volt-elektro", type: "Elektricien", name: "Volt Elektrotechniek", direction: "Technisch en geordend", objective: "Zakelijke en particuliere diensten verduidelijken", features: ["Storingsroute", "Laadpalen", "Zakelijk werk"], image: "/images/elektricien.jpg" },
  { slug: "verfvast", type: "Schilder", name: "Verfvast Schilders", direction: "Visueel en verzorgd", objective: "Projectkwaliteit en onderhoud tonen", features: ["Voor en na", "Pandtype", "Onderhoud"], image: "/images/schilder.jpg" },
  { slug: "hoogdak", type: "Dakdekker", name: "Hoogdak Dakservice", direction: "Robuust en urgent", objective: "Lekkages sneller kwalificeren", features: ["Daktype", "Locatie", "Inspectie"], image: "/images/dakdekker.jpg" },
  { slug: "bouwlijn", type: "Aannemer", name: "Bouwlijn Projecten", direction: "Ruim en zakelijk", objective: "Grotere verbouwingen professioneel presenteren", features: ["Projectcases", "Proces", "Uitgebreide intake"], image: "/images/aannemer.jpg" },
];

export const faqs = [
  { question: "Wat kost een website bij Sitora?", answer: "Sitora Start kost € 795, Professional € 1.495 en Sitora Maatwerk begint bij € 4.495. Het website-abonnement begint bij € 89 per maand met € 249 setup en een minimale looptijd van 24 maanden. Alle prijzen zijn exclusief btw." },
  { question: "Hoe snel kan mijn website online staan?", answer: "Je ontvangt het eerste complete ontwerp binnen zeven werkdagen nadat alle afgesproken informatie en materialen compleet zijn. Feedback, domeinkoppeling en aanvullende functies bepalen de uiteindelijke livegang." },
  { question: "Wanneer gaat de termijn van zeven werkdagen in?", answer: "De termijn start zodra we de intake, diensten, contactgegevens, het logo en het afgesproken beeldmateriaal compleet hebben ontvangen." },
  { question: "Wat moet ik zelf aanleveren?", answer: "Minimaal je bedrijfs- en contactgegevens, diensten, werkgebied, logo en beschikbare projectfoto's. Wij helpen met structuur en schrijven of redigeren de teksten binnen de scope van je pakket." },
  { question: "Kunnen jullie mijn bestaande website vernieuwen?", answer: "Ja. We beoordelen eerst welke inhoud bruikbaar is en wat opnieuw moet worden opgebouwd. Grote migraties of technische koppelingen kunnen meerwerk zijn." },
  { question: "Is mijn website geschikt voor mobiel?", answer: "Ja. Alle pakketten bevatten een responsive ontwerp dat we op gangbare telefoon-, tablet- en desktopschermen controleren." },
  { question: "Kom ik direct bovenaan Google?", answer: "Nee, dat kan niemand eerlijk garanderen. We leveren een technisch sterke SEO-basis met heldere structuur, metadata en snelle pagina's. Posities hangen ook af van concurrentie, autoriteit en vervolgwerk." },
  { question: "Kan ik later pagina's laten toevoegen?", answer: "Ja. Nieuwe diensten, werkgebieden of projecten kunnen later worden toegevoegd. We spreken vooraf af of dit binnen ondersteuning valt of als meerwerk wordt uitgevoerd." },
  { question: "Kan ik zelf teksten en foto's aanpassen?", answer: "Dat kan wanneer we een beheermogelijkheid opnemen. Voor klanten die liever niets technisch beheren, kan Sitora wijzigingen uitvoeren." },
  { question: "Wat zijn de maandelijkse kosten?", answer: "Bij een eenmalig pakket zijn hosting, domein en doorlopend onderhoud niet standaard inbegrepen. Het abonnement kost vanaf € 89 per maand exclusief btw, plus € 249 setup." },
  { question: "Wat gebeurt er als het eerste ontwerp niet bevalt?", answer: "We bespreken welke onderdelen anders moeten en verwerken de afgesproken feedback binnen het aantal correctierondes van jouw pakket. Dit is geen onbeperkte revisie- of geld-terugbelofte." },
  { question: "Hoeveel correctierondes zijn inbegrepen?", answer: "Start bevat één, Professional twee en Maatwerk drie correctierondes. Extra rondes of een koerswijziging buiten de intake kunnen als meerwerk worden aangeboden tegen een vooraf afgesproken vast uurtarief. Het actuele uurtarief is op aanvraag." },
  { question: "Is de website na betaling van mij?", answer: "Bij de eenmalige pakketten zijn ontwerp en inhoud na volledige betaling van jou, met uitzondering van licenties of diensten van derden. Bij het abonnement gelden de overdrachtsafspraken uit de overeenkomst." },
  { question: "Werkt Sitora ook voor Belgische bedrijven?", answer: "Ja, voor Nederlandstalige vak- en bouwbedrijven in België. Offerte, btw-behandeling en juridische afspraken worden passend vastgelegd." },
  { question: "Kan mijn website een offerteformulier bevatten?", answer: "Ja. Elk pakket bevat een passend formulier. Professional en Maatwerk bieden ruimte voor een uitgebreidere intake per dienst." },
  { question: "Regelen jullie een domeinnaam en hosting?", answer: "Bij het abonnement zijn hosting en technisch beheer inbegrepen. Bij een eenmalig pakket spreken we hosting en domein apart af; we wekken niet de indruk dat die standaard in de pakketprijs zitten." },
  { question: "Wat is het verschil tussen eenmalig betalen en een abonnement?", answer: "Eenmalig betalen geeft duidelijk eigendom na betaling, maar hosting en onderhoud staan los. Het abonnement spreidt de investering en bevat hosting en beheer, met een minimale looptijd van 24 maanden." },
  { question: "Hoe lang loopt het abonnement?", answer: "De minimale looptijd is 24 maanden. De exacte opzeg- en overdrachtsvoorwaarden staan vóór ondertekening duidelijk in de overeenkomst." },
  { question: "Wat valt onder kleine maandelijkse wijzigingen?", answer: "Bij het abonnement is maximaal 30 minuten per maand bedoeld voor kleine tekst- of beeldwijzigingen. Nieuwe pagina's, functies, grote migraties en uitgebreid SEO-werk vallen hier niet onder." },
  { question: "Zijn de prijzen inclusief of exclusief btw?", answer: "Alle genoemde prijzen zijn exclusief btw." },
];

export const allStaticSlugs = [
  ...sectors.map((sector) => sector.slug),
  "pakketten", "werkwijze", "voorbeelden", "over-sitora", "contact", "veelgestelde-vragen",
  "privacyverklaring", "cookieverklaring", "algemene-voorwaarden", "bedankt",
];
