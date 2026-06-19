/**
 * lib/services.ts
 *
 * Scalable service system data layer containing the 7 core services.
 * Integrates content blocks, FAQs, scope bullets, process steps, and related links.
 *
 * Slugs:
 *   1. elektroinstallationen (contains Photovoltaik)
 *   2. service-und-reparatur
 *   3. heizung-und-lueftung
 *   4. periodische-kontrollen
 *   5. e-mobilitaet-und-ladestationen
 *   6. smart-home
 *   7. schwachstrom-und-netzwerk
 */

export interface FAQItem {
  question: string
  answer: string
}

export interface ProcessStep {
  title: string
  description: string
}

export type BlockType = 'text' | 'split' | 'features'

export interface TextBlock {
  type: 'text'
  title?: string
  text: string
}

export interface SplitBlock {
  type: 'split'
  title?: string
  text: string
  image: string
  imageAlt: string
  imagePosition: 'left' | 'right'
}

export interface FeaturesBlock {
  type: 'features'
  title?: string
  features: {
    title: string
    description: string
  }[]
}

export type ContentBlock = TextBlock | SplitBlock | FeaturesBlock

export interface Service {
  slug: string
  title: string
  chip: string
  description: string
  image: string
  imageAlt: string
  heroText: string
  scopeBullets: string[]
  processSteps: ProcessStep[]
  faqs: FAQItem[]
  relatedServices: string[] // slugs
  contentBlocks: ContentBlock[]
}

export const services: Service[] = [
  {
    slug: 'elektroinstallationen',
    title: 'Elektroinstallationen',
    chip: 'Sanierung + Umbau',
    description:
      'Planung und Ausführung für Sanierung, Umbau und Badumbau. Vom Schema bis zur Inbetriebnahme, inklusive Photovoltaik-Anschluss ans Hausnetz.',
    image: '/images/hero-installation.webp',
    imageAlt: 'Hand mit Schraubenzieher im Verteiler mit farbigen Kabeln',
    heroText:
      'Professionelle Elektroplanung und sichere Installationen für Umbauten, Sanierungen und Neubauten. Vom Verteiler bis zur Steckdose.',
    scopeBullets: [
      'Beratung & Ausführungsplanung vor Ort',
      'Wohnungs- und Haus-Sanierungen',
      'Küchen- & Badumbau sowie Teilsanierungen',
      'Photovoltaik-Anschluss (AC-seitig) ans Hausnetz',
      'Verteilungsbau & Schaltschrankerneuerungen',
    ],
    processSteps: [
      {
        title: 'Erstkontakt & Besprechung',
        description: 'Sie kontaktieren uns über das Anfrageformular oder per Telefon unter 044 540 08 35. Wir klären die Anforderungen für Ihre geplante Elektroinstallation oder Sanierung.',
      },
      {
        title: 'Planung & Vor-Ort-Termin',
        description: 'Wir führen eine detaillierte Vor-Ort-Besichtigung durch, planen die Leitungsführung, erstellen notwendige Schemata und senden Ihnen eine transparente Offerte.',
      },
      {
        title: 'Fachgerechte Installation',
        description: 'Unser erfahrenes Team verlegt Kabel, setzt Verteiler und baut Steckdosen oder Anschlüsse ein – sauber, sicher und nach geltenden NIN-Normen.',
      },
      {
        title: 'Prüfung & Übergabe',
        description: 'Wir messen alle Leitungen durch, führen eine abschliessende Qualitätsprüfung durch und übergeben Ihnen die betriebsbereite Installation samt Dokumentation.',
      },
    ],
    faqs: [
      {
        question: 'Was umfasst Ihre Dienstleistung im Bereich Elektroinstallationen?',
        answer: 'Wir planen und realisieren elektrische Installationen für Umbauten, Wohnungssanierungen sowie Küchen- und Badezimmerumbauten. Zudem übernehmen wir den AC-seitigen Anschluss von Photovoltaikanlagen an Ihr Hausnetz.',
      },
      {
        question: 'Wie schnell können Sie reagieren?',
        answer: 'Während unserer regulären Bürozeiten von Montag bis Freitag (07:30–17:30 Uhr) beantworten wir Anfragen direkt oder rufen innerhalb von 60 Minuten zurück. Planbare Arbeiten vereinbaren wir flexibel nach Ihren Wünschen.',
      },
      {
        question: 'Wie läuft der Prozess ab?',
        answer: 'Nach Ihrer Kontaktaufnahme führen wir bei Bedarf eine Besichtigung vor Ort durch, erstellen eine transparente Offerte und planen die fachgerechte Ausführung. Nach Abschluss der Arbeiten prüfen wir die Installationen und übergeben die Dokumentation.',
      },
      {
        question: 'Bieten Sie für Elektroinstallationen einen Notdienst an?',
        answer: 'Ja. Für akute Notfälle wie einen kompletten Netzausfall oder sicherheitskritische Störungen steht Ihnen unser Pikettdienst rund um die Uhr (24/7) zur Verfügung.',
      },
      {
        question: 'Welche Gebiete decken Sie ab?',
        answer: 'Wir sind hauptsächlich in Weiningen, Zürich, Schlieren, Dietikon, Geroldswil, Oetwil, Uitikon, Birmensdorf, Spreitenbach, Baden, Wettingen und im gesamten Limmattal tätig.',
      },
    ],
    relatedServices: ['service-und-reparatur', 'smart-home', 'e-mobilitaet-und-ladestationen'],
    contentBlocks: [
      {
        type: 'split',
        title: 'Sanierung und Umbau',
        text: 'Vom einfachen Zimmerumbau bis zur kompletten Altbausanierung begleiten wir Sie zuverlässig. Wir koordinieren die Schnittstellen mit anderen Gewerken, zeichnen die Elektropläne und setzen die Installation sauber und termingerecht um.',
        image: '/images/solar3.png',
        imageAlt: 'Hand mit Schraubenzieher im Verteiler',
        imagePosition: 'right',
      },
      {
        type: 'split',
        title: 'Photovoltaik-Anschluss (AC-Seite)',
        text: 'Gewinnen Sie eigene Energie. Die Installation der PV-Paneele auf dem Dach (DC-Seite) übernimmt Ihr Solateur — wir sorgen im Keller für den fachgerechten Anschluss des Wechselrichters an Ihr Hausnetz, installieren die nötigen Schutzeinrichtungen und übernehmen die offizielle Anmeldung beim Netzbetreiber.',
        image: '/images/solar4.png',
        imageAlt: 'Photovoltaik Anschluss im Keller',
        imagePosition: 'left',
      },
    ],
  },
  {
    slug: 'service-und-reparatur',
    title: 'Service und Reparatur',
    chip: 'Tagesgeschäft',
    description:
      'Defekte Lampe, gelockerte Steckdose, ausgelöste Sicherung. Schnell und sauber behoben. Ausserhalb der Bürozeiten erreichen Sie unser Pikett 7x24.',
    image: '/images/_AMA7867.jpg',
    imageAlt: 'Techniker am offenen Sicherungskasten',
    heroText:
      'Schnelle Hilfe bei Störungen, Reparaturen und Anpassungen im Alltag. Zuverlässig und sauber gelöst.',
    scopeBullets: [
      'Behebung von Kurzschlüssen & Netzausfällen',
      'Reparatur & Austausch von Steckdosen & Schaltern',
      'Montage von Leuchten & Beleuchtungssystemen',
      '7x24 Pikettdienst für Notfälle',
      'Kleinstinstallationen aller Art',
    ],
    processSteps: [
      {
        title: 'Störung melden',
        description: 'Sie schildern uns Ihr Problem telefonisch oder online. Bei dringenden Fällen reagiert unser 24/7 Notdienst direkt und veranlasst den Pikett-Einsatz.',
      },
      {
        title: 'Disponierung',
        description: 'Wir vereinbaren einen zeitnahen Termin. Unser Servicetechniker fährt mit einem voll ausgestatteten Werkstattwagen direkt zu Ihnen.',
      },
      {
        title: 'Fehlersuche & Behebung',
        description: 'Wir messen die Leitungen durch, lokalisieren den Defekt (z.B. Kurzschluss, defekter FI) und reparieren ihn dank mitgeführter Ersatzteile meist sofort.',
      },
      {
        title: 'Abschlusskontrolle',
        description: 'Nach erfolgreicher Fehlerbehebung führen wir eine Sicherheitsprüfung durch, um die gefahrlose Nutzung Ihrer Elektrogeräte zu gewährleisten.',
      },
    ],
    faqs: [
      {
        question: 'Was beinhaltet Ihr Service- und Reparaturdienst?',
        answer: 'Wir beheben alltägliche Elektroprobleme wie defekte Steckdosen, fehlerhafte Schalter, Probleme mit Sicherungen oder defekte Leuchten direkt vor Ort.',
      },
      {
        question: 'Wie schnell können Sie reagieren?',
        answer: 'Für dringende Störungen sind wir sofort einsatzbereit. Während der Bürozeiten nehmen wir Ihren Anruf direkt entgegen, ausserhalb erhalten Sie bei Notfällen innerhalb von 60 Minuten einen Rückruf.',
      },
      {
        question: 'Wie läuft der Prozess ab?',
        answer: 'Sie beschreiben uns die Störung telefonisch oder per Formular. Unser Techniker kommt mit einem voll ausgerüsteten Servicefahrzeug vorbei, lokalisiert den Fehler und repariert ihn meist direkt beim ersten Termin.',
      },
      {
        question: 'Bieten Sie auch ausserhalb der Bürozeiten einen Notdienst an?',
        answer: 'Ja, für dringende elektrische Störungen und Gefahrensituationen betreiben wir einen 24/7-Pikettdienst für die gesamte Region.',
      },
      {
        question: 'Welche Gebiete decken Sie ab?',
        answer: 'Unser Servicegebiet umfasst Weiningen, Zürich, Schlieren, Dietikon, Geroldswil, Oetwil, Uitikon, Birmensdorf, Spreitenbach, Baden, Wettingen sowie das Limmattal.',
      },
    ],
    relatedServices: ['elektroinstallationen', 'periodische-kontrollen'],
    contentBlocks: [
      {
        type: 'text',
        title: 'Zuverlässiger Elektro-Service',
        text: 'Kleine Mängel oder plötzliche Ausfälle stören den Alltag. Wir beheben Elektro-Probleme schnell und unkompliziert. Unsere Servicefahrzeuge sind mit den gängigsten Ersatzteilen ausgerüstet, sodass wir Reparaturen meist direkt beim ersten Termin abschliessen können.',
      },
      {
        type: 'split',
        title: '7x24 Notdienst im Limmattal',
        text: 'Bei akuten Stromausfällen, Brandgeruch aus dem Schaltschrank oder blockierten Türen sind wir auch nachts und am Wochenende erreichbar. Ein Anruf genügt — wir rufen innerhalb von 60 Minuten zurück.',
        image: '/images/_AMA7416.jpg',
        imageAlt: 'Techniker am Schaltschrank',
        imagePosition: 'right',
      },
    ],
  },
  {
    slug: 'heizung-und-lueftung',
    title: 'Heizung und Lüftung',
    chip: 'Grundfos / Viessmann',
    description:
      'Elektrischer Anschluss und Fehlersuche an Wärmepumpe, Umwälzpumpe und Lüftungsanlage.',
    image: '/images/vent2.png',
    imageAlt: 'Umwälzpumpe mit Display im Heizungsraum',
    heroText:
      'Elektrischer Anschluss, Steuerungstechnik und Störungsbehebung für Heizungs- und Lüftungsanlagen.',
    scopeBullets: [
      'Anschluss von Wärmepumpen & Heizkesseln',
      'Verdrahtung von Lüftungs- & Klimageräten',
      'Einbau & Tausch von Umwälzpumpen (z.B. Grundfos)',
      'Integration von Raumthermostaten & Regelungen',
      'Fehlersuche bei Steuerungsstörungen',
    ],
    processSteps: [
      {
        title: 'Anfrage & Abstimmung',
        description: 'Sie teilen uns die technischen Daten Ihrer Wärmepumpe, Lüftungsanlage oder Umwälzpumpe mit. Wir stimmen uns bei Bedarf direkt mit Ihrem Heizungsinstallateur ab.',
      },
      {
        title: 'Elektro-Planung',
        description: 'Wir planen die Kabeldimensionierung, die Absicherungen im Hauptverteiler sowie die Leitungswege für Steuerungs- und Leistungskabel.',
      },
      {
        title: 'Anschluss & Verdrahtung',
        description: 'Wir verlegen die Leitungen und schliessen die Steuergeräte, Aussenfühler und Motoren fachgerecht an. Umwälzpumpen werden elektrisch in das System integriert.',
      },
      {
        title: 'Funktionsprüfung',
        description: 'Gemeinsam mit dem Heizungsbauer prüfen wir die Steuersignale und die Stromversorgung, um einen störungsfreien Betrieb zu garantieren.',
      },
    ],
    faqs: [
      {
        question: 'Was umfasst Ihr Service im Bereich Heizung und Lüftung?',
        answer: 'Wir übernehmen den elektrischen Anschluss, die steuerungstechnische Verdrahtung und die Fehlersuche an Wärmepumpen, Heizkesseln, Lüftungsanlagen und Umwälzpumpen.',
      },
      {
        question: 'Wie schnell können Sie reagieren?',
        answer: 'Anfragen über das Kontaktformular oder per Telefon werden während der Bürozeiten umgehend bearbeitet. Im Falle einer dringenden Heizungsstörung koordinieren wir schnellstmöglich einen Termin.',
      },
      {
        question: 'Wie läuft der Prozess ab?',
        answer: 'Wir analysieren die elektrischen Anforderungen Ihrer Heizungs- oder Lüftungsanlage, verlegen die notwendigen Zuleitungen ab der Hauptverteilung, installieren die Absicherungen und schliessen die Steuereinheiten fachgerecht an.',
      },
      {
        question: 'Bieten Sie einen Notdienst bei Heizungsausfällen an?',
        answer: 'Ja, falls der Ausfall der Heizung auf eine elektrische Störung der Zuleitung oder Steuerung zurückzuführen ist, beheben wir diese im Rahmen unseres 24/7-Pikettdienstes.',
      },
      {
        question: 'Welche Gebiete decken Sie ab?',
        answer: 'Wir bedienen Kunden in Weiningen, Zürich, Schlieren, Dietikon, Geroldswil, Oetwil, Uitikon, Birmensdorf, Spreitenbach, Baden, Wettingen und in der Limmattal-Region.',
      },
    ],
    relatedServices: ['elektroinstallationen', 'smart-home'],
    contentBlocks: [
      {
        type: 'split',
        title: 'Anschluss und Steuerung',
        text: 'Moderne Heiz- und Lüftungsanlagen benötigen eine präzise Steuerung. Wir verdrahten Wärmepumpen, Klimaanlagen und Lüftungsgeräte fachgerecht und sorgen dafür, dass Fühler, Thermostate und Stellmotoren reibungslos miteinander kommunizieren.',
        image: '/images/_AMA7796.jpg',
        imageAlt: 'Steuerungsanschluss der Heizung',
        imagePosition: 'right',
      },
    ],
  },
  {
    slug: 'periodische-kontrollen',
    title: 'Periodische Kontrollen',
    chip: 'Sicherheitsnachweis',
    description:
      'Die Aufforderung des Netzbetreibers leiten Sie direkt an uns weiter, wir wickeln den Rest ab. Durchgeführt vom eidg. dipl. Sicherheitsexperten im eigenen Haus, inklusive Sicherheitsnachweis.',
    image: '/images/_AMA8284.jpg',
    imageAlt: 'Sicherheitsexperte mit Messgerät bei der periodischen Kontrolle',
    heroText:
      'Gesetzlich vorgeschriebene Sicherheitsprüfungen (SiNa) Ihrer Elektroinstallationen durch zertifizierte Experten.',
    scopeBullets: [
      'Durchführung gemäss NIV (Niederspannungs-Installationsverordnung)',
      'Messung von Schutzleitern & Isolationswiderständen',
      'Überprüfung der FI-Schutzschalter',
      'Erstellung des offiziellen Sicherheitsnachweises (SiNa)',
      'Fachgerechte Behebung festgestellter Mängel',
    ],
    processSteps: [
      {
        title: 'Aufforderung einreichen',
        description: 'Sie senden uns das Aufforderungsschreiben Ihres Netzbetreibers (z.B. EKZ). Wir übernehmen die gesamte administrative Koordination.',
      },
      {
        title: 'Unabhängige Prüfung',
        description: 'Unser zertifizierter, eidg. dipl. Sicherheitsexperte prüft Ihre Hausinstallation vor Ort (Sichtprüfung, Isolationsmessungen, FI-Tests).',
      },
      {
        title: 'Mängelbehebung',
        description: 'Falls Mängel festgestellt werden, dokumentieren wir diese sachlich. Unser Installationsteam kann diese Mängel nach Ihrer Freigabe zeitnah beheben.',
      },
      {
        title: 'SiNa-Ausstellung',
        description: 'Nach erfolgreicher Prüfung bzw. Mängelbehebung stellen wir den offiziellen Sicherheitsnachweis (SiNa) aus und senden ihn direkt an den Netzbetreiber.',
      },
    ],
    faqs: [
      {
        question: 'Was ist eine periodische Elektro-Kontrolle?',
        answer: 'Dies ist eine gesetzlich vorgeschriebene Sicherheitsprüfung der elektrischen Hausinstallationen gemäss Niederspannungs-Installationsverordnung (NIV), um die Betriebssicherheit zu gewährleisten.',
      },
      {
        question: 'Wie schnell können Sie reagieren?',
        answer: 'Nach Erhalt Ihrer Anfrage planen wir die Kontrolle innerhalb weniger Wochen ein, damit Sie die gesetzlichen Fristen Ihres Netzbetreibers sicher einhalten können.',
      },
      {
        question: 'Wie läuft der Prozess ab?',
        answer: 'Unser eidg. dipl. Sicherheitsexperte führt die Messungen und Sichtprüfungen durch. Bei Mängelheit erhalten Sie den Sicherheitsnachweis (SiNa). Allfällige Mängel dokumentieren wir und beheben sie nach Ihrer Freigabe.',
      },
      {
        question: 'Bieten Sie einen Notdienst für Kontrollen an?',
        answer: 'Nein, periodische Kontrollen sind planbare Arbeiten und kein Notfalldienst. Sollte jedoch bei einer Prüfung ein lebensgefährlicher Mangel festgestellt werden, beheben wir diesen sofort im Notfalleinsatz.',
      },
      {
        question: 'Welche Gebiete decken Sie ab?',
        answer: 'Wir führen periodische Kontrollen in Weiningen, Zürich, Schlieren, Dietikon, Geroldswil, Oetwil, Uitikon, Birmensdorf, Spreitenbach, Baden, Wettingen sowie im Limmattal durch.',
      },
    ],
    relatedServices: ['elektroinstallationen', 'service-und-reparatur'],
    contentBlocks: [
      {
        type: 'split',
        title: 'Der Ablauf einer Kontrolle',
        text: 'Wenn Sie vom Netzbetreiber (z.B. EKZ) die Aufforderung zur Kontrolle erhalten, können Sie uns diese direkt übergeben. Unser eidg. dipl. Sicherheitsexperte prüft Ihre Leitungen, dokumentiert die Messwerte und stellt den gesetzlichen Sicherheitsnachweis (SiNa) aus. Falls Mängel gefunden werden, beheben wir diese effizient.',
        image: '/images/_AMA8378.jpg',
        imageAlt: 'Messgerät periodische Kontrolle',
        imagePosition: 'right',
      },
    ],
  },
  {
    slug: 'e-mobilitaet-und-ladestationen',
    title: 'E-Mobilität und Ladestationen',
    chip: 'E-Mobilität',
    description:
      'Wir prüfen die Anschlussleistung, planen den Kabelweg, montieren die Wallbox und übernehmen die Anmeldung beim Netzbetreiber.',
    image: '/images/wallbox.png',
    imageAlt: 'Wallbox mit angestecktem Elektroauto in heller Garage',
    heroText:
      'Zukunftsfähige Ladelösungen für Ihr Elektrofahrzeug. Von der ersten Abklärung bis zur betriebsbereiten Wallbox.',
    scopeBullets: [
      'Netzanschlussprüfung & Lastmanagement',
      'Verlegung von Zuleitungen & Absicherungen',
      'Installation & Inbetriebnahme von Wallboxen',
      'Anmeldung beim lokalen Energieversorger (EW)',
      'Einweisung in die Bedienung',
    ],
    processSteps: [
      {
        title: 'Kapazitätsprüfung',
        description: 'Wir prüfen vorab die Anschlussleistung Ihrer Hauszuleitung, um festzustellen, ob eine Wallbox ohne Überlastung betrieben werden kann.',
      },
      {
        title: 'Konzeption & Offerte',
        description: 'Wir planen den Kabelweg vom Zählerkasten zum Stellplatz, wählen die passende Wallbox und konzipieren bei Bedarf ein dynamisches Lastmanagement.',
      },
      {
        title: 'Montage & Anschluss',
        description: 'Wir verlegen die Zuleitung, installieren die Schutzelemente (FI-Schalter Typ B), montieren die Wallbox und schliessen sie fachgerecht an.',
      },
      {
        title: 'EW-Meldung & Start',
        description: 'Wir übernehmen die offizielle Fertigmeldung beim lokalen Energieversorger (EW), führen die Sicherheitsmessung durch und weisen Sie in die Bedienung ein.',
      },
    ],
    faqs: [
      {
        question: 'Was beinhaltet der Service für E-Mobilität und Ladestationen?',
        answer: 'Wir prüfen die verfügbare Anschlussleistung Ihres Gebäudes, planen die Leitungsführung, installieren die Wallbox und integrieren bei Bedarf ein Lastmanagementsystem.',
      },
      {
        question: 'Wie schnell können Sie reagieren?',
        answer: 'Auf Anfragen reagieren wir während der Bürozeiten direkt oder rufen innerhalb von 60 Minuten zurück. Eine Erstberatung und Besichtigung vor Ort planen wir zeitnah ein.',
      },
      {
        question: 'Wie läuft der Prozess ab?',
        answer: 'Nach einer Abklärung der Anschlussleistung erstellen wir eine Offerte. Danach verlegen wir die Leitungen, installieren die Schutzeinrichtungen, montieren die Wallbox, melden die Anlage beim EW an und nehmen sie in Betrieb.',
      },
      {
        question: 'Bieten Sie für Ladestationen einen Notdienst an?',
        answer: 'Ja, falls ein Kurzschluss oder Defekt an der Ladestation die restliche Hausinstallation beeinträchtigt, beheben wir diese Störung über unseren 24/7-Pikettdienst.',
      },
      {
        question: 'Welche Gebiete decken Sie ab?',
        answer: 'Wir installieren Wallboxen in Weiningen, Zürich, Schlieren, Dietikon, Geroldswil, Oetwil, Uitikon, Birmensdorf, Spreitenbach, Baden, Wettingen und der gesamten Limmattal-Region.',
      },
    ],
    relatedServices: ['elektroinstallationen', 'schwachstrom-und-netzwerk'],
    contentBlocks: [
      {
        type: 'split',
        title: 'Planung und Installation',
        text: 'Jedes Gebäude hat andere Stromkapazitäten. Wir analysieren Ihre Hauszuleitung, planen die Kabelwege vom Zählerkasten in die Garage und installieren Ihre Wallbox sicher. Bei Mehrfamilienhäusern implementieren wir dynamische Lastmanagementsysteme.',
        image: '/images/wabox-hand.png',
        imageAlt: 'Wallbox Installation',
        imagePosition: 'right',
      },
    ],
  },
  {
    slug: 'smart-home',
    title: 'Smart Home',
    chip: 'KNX & LOXONE',
    description:
      'Als KNX zertifizierter Partner und LOXONE Partner planen, verdrahten und programmieren wir Ihr Smart Home als dokumentiertes System, das über Jahre wartbar bleibt.',
    image: '/images/knx.png',
    imageAlt: 'Zwei Techniker am Schaltschrank von Swisshelp Elektro',
    heroText:
      'Intelligente Haussteuerung mit bewährten Systemen wie KNX und LOXONE. Für Komfort, Sicherheit und Effizienz.',
    scopeBullets: [
      'Planung & Systemdesign (KNX Certified Partner / LOXONE Partner)',
      'Bus-Verkabelung & Schaltschrankaufbau',
      'Programmierung von Szenen, Licht & Beschattung',
      'Visualisierung für Smartphones & Tablets',
      'Wartung, Updates & Systemerweiterungen',
    ],
    processSteps: [
      {
        title: 'Bedarfsanalyse',
        description: 'In einem Erstgespräch definieren wir Ihre Wünsche bezüglich Steuerung von Licht, Beschattung, Raumklima und Sicherheitsfunktionen.',
      },
      {
        title: 'Systemdesign',
        description: 'Als zertifizierter KNX/LOXONE-Partner planen wir die Bus-Topologie, die Aktoren im Schaltschrank und die Platzierung der Taster und Sensoren.',
      },
      {
        title: 'Verdrahtung & Programmierung',
        description: 'Wir bauen den Schaltschrank auf, führen die Busverkabelung durch und programmieren die Steuerungslogik und die App-Visualisierung.',
      },
      {
        title: 'Übergabe & Feintuning',
        description: 'Nach der Inbetriebnahme testen wir alle Szenarien vor Ort. Sie erhalten eine Einweisung und wir passen das System nach Ihren ersten Erfahrungen an.',
      },
    ],
    faqs: [
      {
        question: 'Was umfasst Ihre Dienstleistung im Bereich Smart Home?',
        answer: 'Als zertifizierter KNX-Partner und LOXONE-Partner planen, verkabeln, programmieren und warten wir intelligente Gebäudesteuerungen für Licht, Beschattung, Heizung und Sicherheit.',
      },
      {
        question: 'Wie schnell können Sie reagieren?',
        answer: 'Für Beratungen und Projektplanungen vereinbaren wir zeitnah Termine. Bei Funktionsstörungen bestehender von uns installierter Systeme bemühen wir uns um schnellstmögliche Behebung.',
      },
      {
        question: 'Wie läuft der Prozess ab?',
        answer: 'Zuerst definieren wir gemeinsam Ihre Anforderungen. Es folgen die Elektroplanung, die Installation des Bussystems im Schaltschrank, die Programmierung der Steuerungslogik und schliesslich die Inbetriebnahme und Einweisung.',
      },
      {
        question: 'Bieten Sie bei Steuerungsfehlern einen Notdienst an?',
        answer: 'Ja, bei kritischen Ausfällen der Haussteuerung, durch die wichtige Funktionen wie Heizung oder Licht komplett ausfallen, hilft unser 24/7-Notdienst.',
      },
      {
        question: 'Welche Gebiete decken Sie ab?',
        answer: 'Wir betreuen Smart-Home-Projekte in Weiningen, Zürich, Schlieren, Dietikon, Geroldswil, Oetwil, Uitikon, Birmensdorf, Spreitenbach, Baden, Wettingen und im Limmattal.',
      },
    ],
    relatedServices: ['elektroinstallationen', 'schwachstrom-und-netzwerk', 'heizung-und-lueftung'],
    contentBlocks: [
      {
        type: 'split',
        title: 'KNX und LOXONE Partnerships',
        text: 'Ein echtes Smart Home basiert auf robuster Systemtechnik, nicht auf unsicheren WLAN-Steckdosen. Als zertifizierter KNX- und LOXONE-Partner programmieren wir Ihr Zuhause nach bewährten Industriestandards. Licht, Beschattung, Heizung und Sicherheit greifen perfekt ineinander.',
        image: '/images/loxone.png',
        imageAlt: 'Schaltschrank Smart Home',
        imagePosition: 'right',
      },
      {
        type: 'features',
        title: 'Ihre Vorteile',
        features: [
          {
            title: 'Höchster Komfort',
            description: 'Szenensteuerung für Beleuchtung, Musik und Storen mit einem einzigen Tastendruck.',
          },
          {
            title: 'Energieeffizienz',
            description: 'Heizung und Beschattung arbeiten intelligent zusammen, um Strom und Heizkosten zu sparen.',
          },
          {
            title: 'Zukunftssicherheit',
            description: 'Offene Standards sorgen dafür, dass Ihr System auch nach Jahrzehnten erweiterbar und reparierbar bleibt.',
          },
        ],
      },
    ],
  },
  {
    slug: 'schwachstrom-und-netzwerk',
    title: 'Schwachstrom und Netzwerk',
    chip: 'Cat6A / Glasfaser',
    description:
      'Telefon, Türsprechanlage, LAN-Verkabelung und Patchpanel. Vom Einfamilienhaus bis zum Bürostandort.',
    image: '/images/_AMA8278.jpg',
    imageAlt: 'Strukturierte Netzwerkverkabelung mit Patchpanel',
    heroText:
      'Zuverlässige Netzwerk- und Kommunikationslösungen für störungsfreies Arbeiten und Wohnen.',
    scopeBullets: [
      'Strukturierte LAN-Verkabelungen (Cat6A / Glasfaser)',
      'Einbau & Anschluss von Patchpanels & Netzwerkdosen',
      'Installation von Türsprechanlagen & Gegensprechanlagen',
      'WLAN-Abdeckungsoptimierung & Access Points',
      'Telefonsysteme & Schwachstrominstallationen',
    ],
    processSteps: [
      {
        title: 'Anforderungsanalyse',
        description: 'Wir besprechen Ihren Bedarf an Netzwerkanschlüssen, WLAN-Abdeckung, Türsprechanlagen oder Telefonie im Gebäude.',
      },
      {
        title: 'Verkabelungsplan',
        description: 'Wir planen die optimalen Kabelwege für strukturierte Cat6A/Glasfaser-Leitungen und die Positionierung von Switches und WLAN Access Points.',
      },
      {
        title: 'Installation',
        description: 'Wir ziehen die Datenkabel ein, installieren die RJ45-Dosen und schliessen die Leitungen auf dem Patchpanel im Medienverteiler an.',
      },
      {
        title: 'Messung & Protokoll',
        description: 'Jede installierte Netzwerkverbindung wird mit einem professionellen Messgerät geprüft und protokolliert, um die volle Bandbreite zu garantieren.',
      },
    ],
    faqs: [
      {
        question: 'Was beinhaltet der Service für Schwachstrom und Netzwerk?',
        answer: 'Wir planen und installieren strukturierte LAN-Verkabelungen (Cat6A / Glasfaser), Patchpanels, Netzwerkdosen, WLAN Access Points sowie Gegensprechanlagen und Telefonsysteme.',
      },
      {
        question: 'Wie schnell können Sie reagieren?',
        answer: 'Anfragen über das Kontaktformular oder per Telefon werden während der Bürozeiten umgehend beantwortet. Termine für Installationen stimmen wir flexibel mit Ihnen ab.',
      },
      {
        question: 'Wie läuft der Prozess ab?',
        answer: 'Nach der Bedarfsanalyse verlegen wir die Netzwerkkabel, montieren die Dosen und das Patchpanel im Medienverteiler. Nach Abschluss messen und protokollieren wir jede Datenleitung für die Qualitätssicherung.',
      },
      {
        question: 'Bieten Sie bei Netzwerkausfällen einen Notdienst an?',
        answer: 'Ja, falls ein Netzausfall sicherheitsrelevante Anlagen (wie Alarmsysteme oder Türsprechanlagen) betrifft, ist unser 24/7-Pikettdienst für Sie da.',
      },
      {
        question: 'Welche Gebiete decken Sie ab?',
        answer: 'Unser Einsatzgebiet für Netzwerktechnik umfasst Weiningen, Zürich, Schlieren, Dietikon, Geroldswil, Oetwil, Uitikon, Birmensdorf, Spreitenbach, Baden, Wettingen und das gesamte Limmattal.',
      },
    ],
    relatedServices: ['smart-home', 'elektroinstallationen'],
    contentBlocks: [
      {
        type: 'split',
        title: 'Moderne Netzwerktechnik',
        text: 'Homeoffice und Streaming erfordern stabile Verbindungen. Wir verlegen hochwertige Cat-Leitungen und richten Ihre Netzwerkverteilung im Medienverteiler fachgerecht ein. So geniessen Sie maximale Bandbreite ohne Funkunterbrüche.',
        image: '/images/_AMA7510.jpg',
        imageAlt: 'Netzwerktechnik Patchpanel',
        imagePosition: 'right',
      },
    ],
  },
  {
    slug: 'photovoltaik-anschluss',
    title: 'Photovoltaik Anschluss',
    chip: 'AC-Seite',
    description:
      'Wechselrichter-Anschluss und Netzanbindung. Die DC-Seite übernimmt Ihr PV-Anbieter, wir schliessen sauber ans Hausnetz an.',
    image: '/images/solar2.png',
    imageAlt: 'Wechselrichter Anschluss und Elektroinstallation für Photovoltaik',
    heroText:
      'Sichere Anbindung Ihrer Photovoltaikanlage ans Stromnetz. Von der Planung bis zur Anmeldung beim Netzbetreiber.',
    scopeBullets: [
      'Planung der AC-seitigen Elektroinstallation',
      'Verlegung von Zuleitungen und Absicherungen',
      'Wechselrichter-Anschluss und Schutzeinrichtungen',
      'Netzanmeldung beim lokalen Energieversorger (EW)',
      'Sicherheitsprüfung und Inbetriebnahme',
    ],
    processSteps: [
      {
        title: 'Absprache mit Solateur',
        description: 'Wir koordinieren mit Ihrem Solateur, um die DC-seitige Installation (Paneele, Wiring) mit der AC-seitigen Elektroinstallation abzustimmen.',
      },
      {
        title: 'Planung AC-Seite',
        description: 'Wir planen die Kabeldimensionierung vom Wechselrichter zur Hausverteilung, die erforderlichen Schutzeinrichtungen (Leitungsschutzschalter, FI-Schalter) und die Leitungswege.',
      },
      {
        title: 'Installation und Verdrahtung',
        description: 'Wir installieren die Schutzgeräte im Hauptverteiler, verlegen die Zuleitung zum Wechselrichter und verbinden alle Komponenten fachgerecht nach den geltenden Normen.',
      },
      {
        title: 'EW-Anmeldung und Inbetriebnahme',
        description: 'Nach Prüfung aller Sicherheitsaspekte melden wir die Anlage beim Energieversorger an. Die PV-Anlage wird offiziell freigegeben und kann Energie ins Netz einspeisen.',
      },
    ],
    faqs: [
      {
        question: 'Was ist der Unterschied zwischen DC- und AC-Seite bei Photovoltaik?',
        answer: 'Die DC-Seite (Gleichstrom) umfasst die Solarpanels und deren Verdrahtung. Die AC-Seite (Wechselstrom) beginnt hinter dem Wechselrichter und verbindet die Anlage mit dem Hausnetz und dem öffentlichen Stromnetz. Wir kümmern uns um die AC-Seite.',
      },
      {
        question: 'Welche Anforderungen gelten für den PV-Anschluss?',
        answer: 'Der Anschluss muss nach den geltenden Normen (SIA, NIN) erfolgen. Es sind spezielle Schutzgeräte (FI-Schalter Typ B, Leitungsschutzschalter) erforderlich, und die Anlage muss beim Netzbetreiber angemeldet werden.',
      },
      {
        question: 'Wie lange dauert die Installation?',
        answer: 'Die AC-seitige Installation dauert typischerweise ein bis zwei Tage, abhängig von der Entfernung zwischen Wechselrichter und Hauptverteiler sowie der Komplexität der Anlage.',
      },
      {
        question: 'Bieten Sie auch die DC-seitige Installation an?',
        answer: 'Nein, die DC-seitige Installation (Panelanbringung, Verkabelung) übernimmt üblicherweise der Solateur. Wir fokussieren auf den fachgerechten AC-seitigen Anschluss ans Hausnetz.',
      },
      {
        question: 'Welche Gebiete decken Sie ab?',
        answer: 'Wir installieren PV-Anschlüsse in Weiningen, Zürich, Schlieren, Dietikon, Geroldswil, Oetwil, Uitikon, Birmensdorf, Spreitenbach, Baden, Wettingen und im gesamten Limmattal.',
      },
    ],
    relatedServices: ['elektroinstallationen', 'periodische-kontrollen'],
    contentBlocks: [
      {
        type: 'split',
        title: 'Planung und Dimensionierung',
        text: 'Die Leistung Ihrer PV-Anlage muss richtig dimensioniert werden. Wir berechnen die erforderliche Kabeldimensionierung basierend auf der Anlagenleistung und den Sicherheitsanforderungen. Damit wird gewährleistet, dass Ihre Anlage sicher und effizient läuft.',
        image: '/images/solar4.png',
        imageAlt: 'Elektrotechnische Planung für PV-Anlagenanbindung',
        imagePosition: 'right',
      },
      {
        type: 'split',
        title: 'Wechselrichter und Netzanbindung',
        text: 'Der Wechselrichter wandelt den Gleichstrom der Panels in Wechselstrom um. Wir schliessen den Wechselrichter mit den erforderlichen Schutzgeräten sauber an Ihr Hausnetz an. Danach erfolgt die offizielle Anmeldung beim Netzbetreiber – so können Sie Ihren Solarstrom ins Netz einspeisen.',
        image: '/images/ai-solar-inverter.webp',
        imageAlt: 'Wechselrichter Anschluss und Netzanbindung',
        imagePosition: 'left',
      },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
