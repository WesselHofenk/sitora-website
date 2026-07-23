import { Cookie, Scale } from "lucide-react";
import { business, contact, legalDocuments } from "@/content/site";
import { CONSENT_STORAGE_KEY, CONSENT_VERSION, consentCapabilities } from "@/lib/consent";
import { PageHero } from "./ui";

function Updated({ date }: { date: string }) {
  const formatted = new Intl.DateTimeFormat("nl-NL", { dateStyle: "long", timeZone: "Europe/Amsterdam" }).format(new Date(`${date}T12:00:00+02:00`));
  return <p className="mb-8 text-sm text-slate-700">Laatst bijgewerkt: <time dateTime={date}>{formatted}</time></p>;
}

function LegalBody({ date, icon, sections }: { date: string; icon?: React.ReactNode; sections: Array<[string, string]> }) {
  return <section className="py-16 sm:py-20"><article className="mx-auto max-w-3xl px-5 sm:px-8"><Updated date={date} />{icon ? <div className="mb-3 text-orange-800" aria-hidden="true">{icon}</div> : null}{sections.map(([title, text]) => <section key={title} className="border-b border-slate-200 py-7"><h2 className="text-xl font-black text-slate-950">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></section>)}</article></section>;
}

export function PrivacyPage() {
  const sections: Array<[string, string]> = [
    ["Wie is verantwoordelijk?", `${business.name}, gedreven door ${business.ownerName} (KvK ${business.chamberOfCommerce}, btw ${business.vatNumber}), is verantwoordelijk voor de verwerking via deze website. Privacyvragen kun je sturen naar ${business.email}. Er wordt op deze website geen postadres gepubliceerd.`],
    ["Welke gegevens verwerkt het aanvraagformulier?", "Het formulier kan naam, bedrijfsnaam, e-mailadres, telefoonnummer, branche, website-status, gekozen pakket of dienst en je bericht verwerken. Alleen naam, e-mailadres, branche, keuze, bericht en toestemming zijn noodzakelijk voor een compacte aanvraag; overige velden zijn optioneel."],
    ["Waarom worden deze gegevens gebruikt?", "De gegevens worden gebruikt om je gevraagde contact op te volgen, de vraag te beoordelen en zo nodig een voorstel voor te bereiden. Gegevens uit het vrije bericht worden niet naar analytics gestuurd."],
    ["Formulierleverancier", `De aanvraag wordt technisch gecontroleerd door de website van Sitora en daarna via FormSubmit afgeleverd bij ${contact.email}. FormSubmit en de e-mail- en hostingleveranciers verwerken daarbij alleen gegevens die nodig zijn voor aflevering en beveiliging.`],
    ["AI-chatbot Sitora 24/7", "Chatberichten worden via een beveiligde serverroute verwerkt door OpenAI om een antwoord te maken. De website bewaart het gesprek niet permanent; de zichtbare geschiedenis blijft alleen tijdens de huidige browsersessie beschikbaar. Deel geen gevoelige persoonsgegevens in de chat."],
    ["Bewaren", "Aanvraag- en projectgegevens worden niet langer bewaard dan nodig voor opvolging, dienstverlening, administratie en eventuele wettelijke verplichtingen. De concrete interne bewaartermijnen en verwijderprocedure moeten door de eigenaar worden vastgesteld en periodiek gecontroleerd."],
    ["Delen en doorgifte", "Sitora verkoopt persoonsgegevens niet. Leveranciers ontvangen alleen gegevens die nodig zijn voor hosting, formulieraflevering, e-mail of administratie. De eigenaar moet de actuele leveranciersafspraken en eventuele doorgifte buiten de EER periodiek verifiëren."],
    ["Analytics en marketing", `De website kan GA4${consentCapabilities.marketing ? " en een Meta Pixel" : ""} laden wanneer een geldig productie-ID is ingesteld en je vooraf toestemming geeft. Zonder toestemming worden geen optionele meetevents verstuurd.`],
    ["Jouw verzoek", `Je kunt via ${contact.email} vragen om inzage, correctie, verwijdering, beperking of bezwaar, of gegeven toestemming intrekken. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.`],
    ["Beveiliging", "De website gebruikt HTTPS, invoervalidatie, een honeypot, aanvraagbeperking en beveiligingsheaders. Geen enkele technische maatregel sluit alle risico's uit."],
  ];
  return <><PageHero eyebrow="Privacyverklaring" title="Zorgvuldig omgaan met jouw gegevens" description="Hier lees je welke gegevens de website verwerkt, waarom dat gebeurt en welke leveranciers daarbij betrokken zijn." /><LegalBody date={legalDocuments.privacy.updatedAt} sections={sections} /></>;
}

export function CookiePage() {
  const active = [consentCapabilities.analytics ? "GA4 voor analytics" : "", consentCapabilities.marketing ? "Meta Pixel voor marketing" : ""].filter(Boolean);
  const sections: Array<[string, string]> = [
    ["Huidige technische situatie", active.length ? `De volgende optionele technieken zijn geconfigureerd: ${active.join(" en ")}. Ze laden uitsluitend na toestemming.` : "Er zijn in deze productieconfiguratie geen analytics- of marketingscripts actief. De website werkt volledig zonder optionele tracking."],
    ["Noodzakelijke lokale opslag", `De voorkeureninterface gebruikt de lokale opslagsleutel '${CONSENT_STORAGE_KEY}' met toestemmingsversie ${CONSENT_VERSION}. De record bevat categorieën en het moment van je keuze, geen naam, e-mailadres of marketingprofiel.`],
    ["Analytics", consentCapabilities.analytics ? "GA4 laadt pas nadat je analytics accepteert. De website stuurt geen formulierinhoud of contactgegevens als analytics-eigenschap mee." : "GA4 is niet geconfigureerd en wordt daarom niet geladen."],
    ["Marketing", consentCapabilities.marketing ? "De geconfigureerde marketingpixel laadt pas nadat je marketing accepteert." : "Er is geen marketingpixel geconfigureerd en er wordt daarom geen marketingtracking geladen."],
    ["Keuze wijzigen", "Gebruik 'Cookievoorkeuren' onderaan iedere pagina om je keuze te bekijken of in te trekken. Bij intrekken wordt optionele tracking uitgeschakeld en worden bekende trackingcookies van deze site verwijderd voor zover de browser dat toestaat."],
  ];
  return <><PageHero eyebrow="Cookieverklaring" title="Jij bepaalt of optionele meting actief is" description="Noodzakelijke functies werken altijd. Analytics en marketing blijven uit totdat je ze bewust inschakelt." /><LegalBody date={legalDocuments.cookies.updatedAt} icon={<Cookie />} sections={sections} /></>;
}

export function TermsPage() {
  const sections: Array<[string, string]> = [
    ["Offerte en scope", "De geaccepteerde offerte beschrijft pagina's, functies, planning, correctierondes, verantwoordelijkheden en eventuele diensten van derden. Werk buiten die scope wordt alleen na afstemming uitgevoerd."],
    ["Aanlevering en planning", "De planning start wanneer de afgesproken informatie, materialen en toegangen compleet zijn. Vertraging in aanlevering of gebundelde feedback kan de planning verschuiven. Een oplevertermijn is geen resultaat- of beschikbaarheidsgarantie."],
    ["Correctierondes", "Het aantal correctierondes volgt uit pakket en offerte. Business en daarop voortbouwende pakketten bevatten binnen de huidige standaardscope twee rondes. Extra rondes of een nieuwe koers kunnen als meerwerk worden aangeboden."],
    ["Betaling", "Voor een eenmalig project geldt volgens de huidige werkwijze 50% voor de start en 50% voor publicatie, tenzij de offerte iets anders bepaalt. Werk begint of wordt gepubliceerd na ontvangst van het afgesproken bedrag."],
    ["Eigendom en licenties", "Na volledige betaling worden het overeengekomen ontwerp en de afgesproken inhoud overgedragen zoals in de offerte bepaald. Licenties, tooling, lettertypen, beeldmateriaal en diensten van derden blijven onder hun eigen voorwaarden vallen."],
    ["Inhoud en rechten", "De opdrachtgever controleert juistheid, wettelijke informatie en gebruiksrechten van aangeleverde tekst, beelden, logo's en claims. Sitora publiceert geen klantmateriaal waarvan de benodigde toestemming ontbreekt."],
    ["Meerwerk", "Nieuwe pagina's, functies, koppelingen of koerswijzigingen buiten de scope worden alleen uitgevoerd na afstemming en een geaccepteerde prijsopgave."],
    ["Onderhoud en support", "Onderhoud is niet verplicht en wordt per aangevraagde beurt uitgevoerd. Scope, prijs, back-ups, responstijd en eventuele supportperiode volgen uit de afzonderlijke afspraak; buiten afgesproken supportvensters wordt geen bereikbaarheid toegezegd."],
    ["Websitechatbot", "De eenmalige chatbotprijs geldt voor de vooraf afgesproken installatie en inhoud. Externe licenties, latere wijzigingen en werkzaamheden buiten die scope worden vooraf apart besproken."],
    ["Hosting en derden", "Hosting, domein en externe licenties zijn niet standaard inbegrepen. Beschikbaarheid, wijzigingen en prijzen van externe leveranciers vallen buiten de directe controle van Sitora en worden vooraf zo concreet mogelijk vastgelegd."],
    ["Oplevering en publicatie", "Voor publicatie controleert de opdrachtgever inhoud, contactgegevens, links en wettelijke informatie en geeft schriftelijk akkoord. Aantoonbare technische gebreken binnen de afgesproken scope worden volgens de overeenkomst behandeld."],
    ["Aansprakelijkheid en einde opdracht", "Beperkingen van aansprakelijkheid, annulering, opschorting en beëindiging moeten in de ondertekende overeenkomst en juridisch beoordeelde voorwaarden zijn vastgelegd. Dwingend recht blijft van toepassing."],
  ];
  return <><PageHero eyebrow="Algemene voorwaarden" title="Afspraken over scope, feedback, betaling en oplevering" description="Deze voorwaarden beschrijven de huidige commerciële werkwijze. De geaccepteerde offerte en overeenkomst bepalen de concrete projectafspraken." /><LegalBody date={legalDocuments.terms.updatedAt} icon={<Scale />} sections={sections} /></>;
}
