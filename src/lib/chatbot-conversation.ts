import { business, chatbotOffer, maintenanceOptions, packages } from "../content/site.ts";

export type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatAction = {
  label: string;
  href?: string;
  message?: string;
};

export type ChatReply = {
  answer: string;
  actions: ChatAction[];
};

const packageById = Object.fromEntries(packages.map((item) => [item.id, item])) as Record<
  (typeof packages)[number]["id"],
  (typeof packages)[number]
>;

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("nl-NL")
    .replace(/[^a-z0-9€+]+/g, " ")
    .trim();
}

function has(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function userHistory(messages: ConversationMessage[]) {
  return messages.filter((message) => message.role === "user").map((message) => normalize(message.content));
}

function previousAssistant(messages: ConversationMessage[]) {
  return normalize([...messages].reverse().find((message) => message.role === "assistant")?.content || "");
}

function packageSummary(id: "starter" | "business" | "premium" | "maatwerk") {
  const item = packageById[id];
  return `${item.name} (${item.price} ${item.cadence})`;
}

const contactActions: ChatAction[] = [
  { label: "Contactformulier", href: "/contact#advies" },
  { label: "WhatsApp", href: `https://wa.me/${business.whatsapp}` },
];

export function buildLocalChatReply(messages: ConversationMessage[]): ChatReply {
  const users = userHistory(messages);
  const text = users.at(-1) || "";
  const earlierUsers = users.slice(0, -1).join(" ");
  const assistantContext = previousAssistant(messages.slice(0, -1));
  const context = `${earlierUsers} ${assistantContext}`;

  const isGreeting = has(text, ["hoi", "hallo", "hey", "goedemorgen", "goedemiddag", "goedenavond"]);
  const isThanks = has(text, ["bedankt", "dankjewel", "dank je", "thanks"]);
  const isAppointment = has(text, ["afspraak", "kennismaking", "gesprek plannen", "gesprek boeken", "spreken", "bellen"]);
  const isContact = has(text, ["contact", "telefoon", "telefoonnummer", "e mail", "email", "mailen", "whatsapp", "bereiken"]);
  const isPrice = has(text, ["kost", "kosten", "prijs", "prijzen", "tarief", "budget", "investering", "hoeveel"]);
  const isWebshop = has(text, ["webshop", "webwinkel", "e commerce", "online winkel"]);
  const isImprove = has(text, ["bestaande website", "huidige website", "verbeter", "vernieuw", "redesign", "optimaliseer", "optimaliseren", "migreren", "migratie", "verouderd"]);
  const isTimeline = has(text, ["hoe lang", "duurt", "oplever", "levertijd", "termijn", "wanneer klaar", "snel online"]);
  const isSmallBusiness = has(text, ["klein bedrijf", "kleine bedrijven", "zzp", "zzp er", "starter", "eenmanszaak", "zelfstandige", "mkb"]);
  const isWhy = has(text, ["waarom sitora", "waarom kiezen", "onderscheid", "voordeel", "beter dan", "voor sitora kiezen"]);
  const isServices = has(text, ["dienst", "diensten", "aanbod", "wat doet sitora", "wat maken jullie", "wat bieden jullie", "waarmee helpen"]);
  const isMaintenance = has(text, ["onderhoud", "update", "beveilig", "back up", "backup"]);
  const isChatbot = has(text, ["chatbot", "chat bot"]);
  const isSimpleWebsite = has(text, ["simpele website", "eenvoudige website", "kleine website", "compacte website", "basis website", "bedrijfswebsite", "paar pagina", "tot 5 pagina"]);
  const wantsWebsite = has(text, ["ik wil een website", "website laten maken", "nieuwe website", "site laten maken", "website nodig"]);
  const hasPriceContext = has(context, ["wat kost", "hoeveel kost", "prijzen", "compacte bedrijfswebsite", "uitgebreidere site", "webshop maatwerk"]);
  const askedWebsiteStatus = has(assistantContext, ["heb je al een website of start je vanaf nul"]);
  const hasExistingWebsite = has(text, ["ik heb al een website", "heb al een website", "bestaande site", "huidige site"]);
  const startsFromScratch = has(text, ["vanaf nul", "nog geen website", "geen website", "helemaal nieuw"]);
  const askedBusinessType = has(assistantContext, ["wat voor bedrijf of organisatie heb je"]);
  const askedProductCount = has(assistantContext, ["hoeveel producten wil je ongeveer aanbieden"]);
  const askedImprovementPriority = has(assistantContext, ["wat wil je vooral verbeteren"]);

  if (isAppointment) {
    return {
      answer: `Zeker. Via het contactformulier kun je een kennismaking of afspraak aanvragen. Je kunt Sitora ook bellen of WhatsAppen via ${business.phoneDisplay}. Berichten worden op werkdagen zo snel mogelijk behandeld.`,
      actions: contactActions,
    };
  }

  if (isContact) {
    return {
      answer: `Je bereikt Sitora via ${business.email}, telefonisch of via WhatsApp op ${business.phoneDisplay}. Contact opnemen kan op ieder moment; berichten worden op werkdagen zo snel mogelijk behandeld.`,
      actions: contactActions,
    };
  }

  if (askedWebsiteStatus && hasExistingWebsite) {
    return {
      answer: "Helder. Dan kijkt Sitora eerst naar wat behouden kan blijven en wat beter moet. Wat is nu het grootste probleem met je website: de uitstraling, snelheid, vindbaarheid of het aantal aanvragen?",
      actions: [
        { label: "Website verbeteren", href: "/website-onderhoud" },
        { label: "Vraag bespreken", href: "/contact#advies" },
      ],
    };
  }

  if (askedWebsiteStatus && startsFromScratch) {
    return {
      answer: "Duidelijk, dan kunnen we de structuur en uitstraling vanaf de basis goed op je doelgroep afstemmen. In welke branche werk je?",
      actions: [
        { label: "Branches bekijken", href: "/branches" },
        { label: "Starter bespreken", href: "/contact?pakket=starter#advies" },
      ],
    };
  }

  if (askedBusinessType && text.length > 1) {
    return {
      answer: `Dank, dan kan de website specifiek op ${text} en de bijbehorende klantvragen worden ingericht. Heb je al een website die vervangen moet worden, of start je vanaf nul?`,
      actions: [
        { label: "Pakketten bekijken", href: "/pakketten" },
        { label: "Afspraak maken", href: "/contact#advies" },
      ],
    };
  }

  if (askedProductCount && /\d/.test(text)) {
    return {
      answer: `Met ongeveer ${text} producten is een maatwerkscope passend om categorieën, betalingen, verzending en beheer goed vast te leggen. Zijn er koppelingen met bijvoorbeeld voorraad, boekhouding of een kassasysteem nodig?`,
      actions: [
        { label: "Maatwerkofferte", href: "/offerte?pakket=maatwerk#offerteformulier" },
        { label: "Afspraak maken", href: "/contact#advies" },
      ],
    };
  }

  if (askedImprovementPriority && text.length > 1) {
    return {
      answer: `Duidelijk: ${text}. Sitora kan beoordelen of een gerichte verbetering volstaat of dat een bredere vernieuwing slimmer is. Wil je dit als losse verbetering laten beoordelen of denk je aan een complete nieuwe website?`,
      actions: [
        { label: "Verbetering bespreken", href: "/contact#advies" },
        { label: "Onderhoud bekijken", href: "/website-onderhoud" },
      ],
    };
  }

  if (isSimpleWebsite && (hasPriceContext || wantsWebsite || has(text, ["bedrijf", "website"]))) {
    return {
      answer: `Dan past ${packageSummary("starter")} waarschijnlijk het best. Dit pakket bevat een maatwerkwebsite tot 5 pagina’s, responsive ontwerp, een contactformulier, basis-SEO en WhatsApp- en socialmedia-koppelingen. De beoogde oplevering is 5–7 werkdagen nadat alle afgesproken informatie en materialen compleet zijn. Heb je al een website, of start je vanaf nul?`,
      actions: [
        { label: "Starter bespreken", href: "/contact?pakket=starter#advies" },
        { label: "Pakketten bekijken", href: "/pakketten" },
      ],
    };
  }

  if (isWebshop) {
    return {
      answer: `Ja, Sitora kan een webshop als maatwerktraject beoordelen en bouwen. ${packageSummary("maatwerk")} en de definitieve investering en planning volgen na het vastleggen van functies, assortiment, betalingen, verzending en eventuele koppelingen. Hoeveel producten wil je ongeveer aanbieden?`,
      actions: [
        { label: "Maatwerkofferte", href: "/offerte?pakket=maatwerk#offerteformulier" },
        { label: "Afspraak maken", href: "/contact#advies" },
      ],
    };
  }

  if (isImprove) {
    return {
      answer: `Ja. Sitora kan een bestaande website vernieuwen, uitbreiden of technisch en visueel verbeteren. Los onderhoud begint bij ${maintenanceOptions[0].price} ${maintenanceOptions[0].cadence}; grotere wijzigingen of een migratie worden eerst beoordeeld en apart geprijsd. Wat wil je vooral verbeteren: uitstraling, snelheid, vindbaarheid of meer aanvragen?`,
      actions: [
        { label: "Website verbeteren", href: "/website-onderhoud" },
        { label: "Vraag bespreken", href: "/contact#advies" },
      ],
    };
  }

  if (isTimeline) {
    return {
      answer: `Voor Starter is de beoogde oplevering 5–7 werkdagen nadat alle afgesproken informatie en materialen compleet zijn. Voor Business, Premium en Maatwerk wordt de planning afgestemd op de scope, functies, aanlevering en feedback. Welk type website heb je in gedachten?`,
      actions: [
        { label: "Pakketten bekijken", href: "/pakketten" },
        { label: "Planning bespreken", href: "/contact#advies" },
      ],
    };
  }

  if (isPrice) {
    return {
      answer: `De websitepakketten zijn ${packageSummary("starter")}, ${packageSummary("business")}, ${packageSummary("premium")} en ${packageSummary("maatwerk")}. Hosting en domein zijn niet standaard inbegrepen. Zoek je een compacte bedrijfswebsite, een uitgebreidere website of een webshop/maatwerkoplossing?`,
      actions: [
        { label: "Pakketten bekijken", href: "/pakketten" },
        { label: "Offerte aanvragen", href: "/offerte?pakket=maatwerk#offerteformulier" },
      ],
    };
  }

  if (isMaintenance) {
    return {
      answer: `Onderhoud is niet verplicht. Basis onderhoud kost ${maintenanceOptions[0].price} ${maintenanceOptions[0].cadence}; Groot onderhoud kost ${maintenanceOptions[1].price} ${maintenanceOptions[1].cadence}. Grotere uitbreidingen en nieuwe koppelingen worden vooraf apart besproken. Wat heeft je website nodig?`,
      actions: [
        { label: "Onderhoud bekijken", href: "/website-onderhoud" },
        { label: "Contact opnemen", href: "/contact#advies" },
      ],
    };
  }

  if (isChatbot) {
    return {
      answer: `De Sitora-websitechatbot kost ${chatbotOffer.price} ${chatbotOffer.cadence}. De installatie wordt afgestemd op je dienstverlening en huisstijl en houdt een duidelijke route naar persoonlijk contact. Eventuele externe licenties of extra werkzaamheden worden vooraf besproken. Wil je de chatbot voor een bestaande of een nieuwe website?`,
      actions: [
        { label: "Chatbot bekijken", href: "/chatbot-voor-je-website" },
        { label: "Chatbot bespreken", href: "/contact#advies" },
      ],
    };
  }

  if (isSmallBusiness) {
    return {
      answer: `Ja. Sitora werkt juist voor ondernemers, mkb-bedrijven, vakbedrijven en organisaties in Nederland en Nederlandstalig België. Starter is bedoeld als compacte professionele basis, zonder standaardtemplate of verplicht onderhoudsabonnement. In welke branche werk je?`,
      actions: [
        { label: "Branches bekijken", href: "/branches" },
        { label: "Starter bekijken", href: "/pakketten" },
      ],
    };
  }

  if (isWhy) {
    return {
      answer: `Sitora bouwt maatwerk rond je bedrijf, doelgroep en gewenste klantreis, dus niet vanuit een ingevuld standaardtemplate. De prijzen zijn vooraf duidelijk, de website is responsive en je zit niet vast aan een onderhoudsabonnement. Welke van die punten is voor jouw website het belangrijkst?`,
      actions: [
        { label: "Werkwijze bekijken", href: "/werkwijze" },
        { label: "Afspraak maken", href: "/contact#advies" },
      ],
    };
  }

  if (isServices) {
    return {
      answer: `Sitora helpt met strategie en paginastructuur, maatwerk webdesign, responsive websiteontwikkeling, contact- en offertestromen, een SEO- en performancebasis, uitbreidingen, losse onderhoudsbeurten en websitechatbots. Waar wil je mee geholpen worden?`,
      actions: [
        { label: "Website laten maken", message: "Ik wil een website laten maken" },
        { label: "Website verbeteren", message: "Ik wil mijn bestaande website verbeteren" },
        { label: "Diensten bekijken", href: "/diensten" },
      ],
    };
  }

  if (wantsWebsite) {
    return {
      answer: "Leuk, daar help ik je graag bij. Sitora maakt websites op maat, van een compacte bedrijfssite tot uitgebreide oplossingen. Wat voor bedrijf of organisatie heb je?",
      actions: [
        { label: "Pakketten bekijken", href: "/pakketten" },
        { label: "Afspraak maken", href: "/contact#advies" },
      ],
    };
  }

  if (isThanks) {
    return {
      answer: "Graag gedaan! Wil je nog iets weten over een website, pakket, onderhoud of contact met Sitora?",
      actions: [
        { label: "Diensten", message: "Welke diensten bieden jullie aan?" },
        { label: "Contact", href: "/contact#advies" },
      ],
    };
  }

  if (isGreeting) {
    return {
      answer: "Hoi! Ik help je graag met vragen over Sitora, websites, pakketten, onderhoud of het plannen van een kennismaking. Waar ben je naar op zoek?",
      actions: [
        { label: "Diensten", message: "Welke diensten bieden jullie aan?" },
        { label: "Prijzen", message: "Wat kost een website?" },
      ],
    };
  }

  return {
    answer: "Daar kan ik geen betrouwbaar Sitora-antwoord op geven. Ik help je wel graag met websites, pakketten, onderhoud, chatbots of contact. Waarover wil je meer weten?",
    actions: [
      { label: "Diensten", message: "Welke diensten bieden jullie aan?" },
      { label: "Contact opnemen", href: "/contact#advies" },
    ],
  };
}
