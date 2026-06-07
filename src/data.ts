export type LocationType = "DSP" | "KEK";
export type IslandGroup = "Sumatra" | "Java" | "Bali-Nusa Tenggara" | "Kalimantan" | "Sulawesi" | "Papua-Maluku";

export type TourismLocation = {
  slug: string;
  name: string;
  category: LocationType[];
  island: IslandGroup;
  province: string;
  coordinates: [number, number];
  tourismType: string;
  summary: string;
  imageSlug: string;
  imageCount: number;
  coverImageIndex?: number;
  landAvailable: string;
  minimumInvestment: string;
  revenuePotential: string;
  roi: string;
  demand: string;
  infrastructure: string[];
  zones: { name: string; area: string; use: string; capex: string }[];
  stats: { label: string; value: string; note: string }[];
  document: string;
  advisorEmail: string;
  advisorWhatsapp: string;
  seo: {
    title: string;
    description: string;
  };
};

export type Kpi = {
  label: string;
  value: string;
  yoy: number;
  source: string;
  unit: string;
  trend: number[];
};

export type Download = {
  title: string;
  category: string;
  destination: string;
  year: number;
  file: string;
  description: string;
};

export type Advisor = {
  displayName: string;
  organization: string;
  role: string;
  email: string;
  whatsapp: string;
  responseSla: string;
  officeHours: string;
  mailtoSubjectTemplate: string;
  whatsappMessageTemplate: string;
  prototypeNote: string;
};

export const advisor: Advisor = {
  displayName: "Indonesia Tourism Investment Relations Desk",
  organization: "Ministry of Tourism, Republic of Indonesia",
  role: "General investment inquiry contact for tourism opportunities",
  email: "investment.tourism@kemenpar.go.id",
  whatsapp: "+6281119502026",
  responseSla: "Usually responds within 1 business day",
  officeHours: "Monday-Friday, 09:00-17:00 WIB",
  mailtoSubjectTemplate: "Investment inquiry - Invest in Indonesia Tourism",
  whatsappMessageTemplate:
    "Hello Indonesia Tourism Investment Relations Desk, I would like to ask about tourism investment opportunities in Indonesia.",
  prototypeNote: "Dummy contact for prototype use. Replace with approved official contact before public launch.",
};

export function advisorForLocation(location: TourismLocation): Advisor {
  const deskType = location.category.includes("KEK") ? "SEZ Investment Desk" : "Destination Investment Desk";
  return {
    displayName: `${location.name} ${deskType}`,
    organization: "Ministry of Tourism, Republic of Indonesia",
    role: `Direct investment facilitation desk for ${location.name}, ${location.province}`,
    email: location.advisorEmail,
    whatsapp: location.advisorWhatsapp,
    responseSla: "Usually responds within 1 business day",
    officeHours: "Monday-Friday, 09:00-17:00 WIB",
    mailtoSubjectTemplate: `Investment inquiry - ${location.name}`,
    whatsappMessageTemplate: `Hello ${location.name} Investment Desk, I would like to ask about investment opportunities in ${location.name}.`,
    prototypeNote: "Destination-specific dummy contact for prototype use. Replace with approved official PIC before public launch.",
  };
}

export const downloads: Download[] = [
  {
    title: "Indonesia Tourism Investment Guide",
    category: "Investment Guide",
    destination: "National",
    year: 2026,
    file: "/downloads/investment-guide.pdf",
    description: "Investor-facing overview of Indonesia's tourism opportunities, pathway, and priority areas.",
  },
  {
    title: "Tourism Investment Licensing Checklist",
    category: "Licensing",
    destination: "National",
    year: 2026,
    file: "/downloads/licensing-checklist.pdf",
    description: "Practical checklist for OSS/NIB readiness and tourism licensing preparation.",
  },
  {
    title: "Danau Toba Investment Memorandum",
    category: "Investment Memorandum",
    destination: "Danau Toba",
    year: 2026,
    file: "/downloads/investment-memorandum-danau-toba.pdf",
    description: "Destination memorandum for lakeside hospitality, wellness, and cultural tourism.",
  },
  {
    title: "Borobudur Investment Memorandum",
    category: "Investment Memorandum",
    destination: "Borobudur",
    year: 2026,
    file: "/downloads/investment-memorandum-borobudur.pdf",
    description: "Destination memorandum for heritage hospitality and visitor experience investment.",
  },
  {
    title: "Mandalika Investment Memorandum",
    category: "Investment Memorandum",
    destination: "Mandalika",
    year: 2026,
    file: "/downloads/investment-memorandum-mandalika.pdf",
    description: "Destination memorandum for integrated resort, sport tourism, and beachfront commercial assets.",
  },
  {
    title: "Labuan Bajo Investment Memorandum",
    category: "Investment Memorandum",
    destination: "Labuan Bajo",
    year: 2026,
    file: "/downloads/investment-memorandum-labuan-bajo.pdf",
    description: "Destination memorandum for premium eco-tourism, marine services, and hospitality.",
  },
  {
    title: "Likupang Investment Memorandum",
    category: "Investment Memorandum",
    destination: "Likupang",
    year: 2026,
    file: "/downloads/investment-memorandum-likupang.pdf",
    description: "Destination memorandum for marine eco-tourism, diving, and wellness retreats.",
  },
  {
    title: "Tourism SEZ Opportunities Overview",
    category: "Investment Memorandum",
    destination: "Tourism SEZ",
    year: 2026,
    file: "/downloads/tourism-sez-opportunities-overview.pdf",
    description: "Overview for tourism-oriented Special Economic Zone opportunities.",
  },
];

const dspMemo: Record<string, string> = {
  "danau-toba": "/downloads/investment-memorandum-danau-toba.pdf",
  borobudur: "/downloads/investment-memorandum-borobudur.pdf",
  mandalika: "/downloads/investment-memorandum-mandalika.pdf",
  "labuan-bajo": "/downloads/investment-memorandum-labuan-bajo.pdf",
  likupang: "/downloads/investment-memorandum-likupang.pdf",
};

const sezMemo = "/downloads/tourism-sez-opportunities-overview.pdf";

export const locations: TourismLocation[] = [
  {
    slug: "danau-toba",
    name: "Danau Toba",
    category: ["DSP"],
    island: "Sumatra",
    province: "North Sumatra",
    coordinates: [2.676, 98.88],
    tourismType: "Lake heritage, nature, wellness, and cultural tourism",
    summary:
      "Danau Toba anchors one of Southeast Asia's most distinctive lake destinations: a vast volcanic landscape with Batak cultural depth, dramatic viewpoints, and strong potential for higher-value stays. The investment proposition combines destination-scale hospitality, waterfront experiences, wellness retreats, and community-based tourism circuits that can extend visitor length of stay beyond sightseeing. Improved air access through Silangit and road upgrades strengthen the route to market, while the destination's identity supports both premium leisure and domestic MICE positioning. For early-stage investors, the most compelling opportunities sit around curated lakeside resorts, eco-lodges, mobility services, cultural programming, and visitor amenities that raise average spend while preserving the destination's environmental and cultural character.",
    imageSlug: "danau-toba",
    imageCount: 5,
    landAvailable: "42-180 ha indicative clusters",
    minimumInvestment: "USD 8M",
    revenuePotential: "USD 38M annual addressable tourism spend",
    roi: "9-13% illustrative project IRR",
    demand: "Growing domestic leisure and regional nature tourism demand",
    infrastructure: ["Silangit Airport access", "Ring-road improvements", "Waterfront utilities in priority nodes", "Cultural village circuits"],
    zones: [
      { name: "Lakeside Resort Cluster", area: "55 ha", use: "Eco-resort, villas, wellness", capex: "USD 18-42M" },
      { name: "Cultural Experience Belt", area: "22 ha", use: "Museum, retail, performance venue", capex: "USD 6-14M" },
      { name: "Mobility & Marina Node", area: "12 ha", use: "Jetty, shuttle, visitor services", capex: "USD 4-9M" },
    ],
    stats: [
      { label: "Indicative annual visitors", value: "1.4M", note: "Prototype 2026 target" },
      { label: "Average stay potential", value: "2.8 nights", note: "With packaged circuits" },
      { label: "Priority lots", value: "7", note: "Indicative investment zones" },
    ],
    document: dspMemo["danau-toba"],
    advisorEmail: "investment.danautoba@kemenpar.go.id",
    advisorWhatsapp: "+6281119502101",
    seo: {
      title: "Danau Toba Tourism Investment Opportunities",
      description: "Explore Danau Toba investment opportunities in lakeside hospitality, wellness, and cultural tourism.",
    },
  },
  {
    slug: "borobudur",
    name: "Borobudur",
    category: ["DSP"],
    island: "Java",
    province: "Central Java",
    coordinates: [-7.6079, 110.2038],
    tourismType: "World heritage, cultural, creative economy, and boutique hospitality",
    summary:
      "Borobudur offers a rare investment profile: globally recognized heritage, strong domestic awareness, and a maturing network of cultural villages, creative economy assets, and premium hospitality demand. The opportunity is not volume alone; it is value creation through interpretation, stay extension, destination management, and curated experiences that connect the temple landscape with craft, culinary, cycling, wellness, and education. Investors can target boutique hotels, cultural venues, visitor experience platforms, and high-quality retail that complement heritage conservation. The destination is particularly suitable for operators who can deliver refined experiences, strong storytelling, and partnerships with local communities.",
    imageSlug: "borobudur",
    imageCount: 5,
    landAvailable: "18-95 ha across experience nodes",
    minimumInvestment: "USD 6M",
    revenuePotential: "USD 52M annual premium experience spend",
    roi: "8-12% illustrative project IRR",
    demand: "High recognition among domestic and international cultural travelers",
    infrastructure: ["Yogyakarta International Airport access", "Regional road network", "Village tourism routes", "Heritage visitor management upgrades"],
    zones: [
      { name: "Boutique Hospitality Ring", area: "24 ha", use: "Boutique hotels, wellness, dining", capex: "USD 10-28M" },
      { name: "Cultural Interpretation Hub", area: "9 ha", use: "Museum, immersive galleries, retail", capex: "USD 5-12M" },
      { name: "Village Experience Corridor", area: "31 ha", use: "Cycling, craft, culinary routes", capex: "USD 3-8M" },
    ],
    stats: [
      { label: "Brand recognition", value: "Global", note: "UNESCO-linked destination pull" },
      { label: "Visitor spend uplift", value: "+22%", note: "Prototype curated-package scenario" },
      { label: "Priority lots", value: "6", note: "Indicative investment zones" },
    ],
    document: dspMemo.borobudur,
    advisorEmail: "investment.borobudur@kemenpar.go.id",
    advisorWhatsapp: "+6281119502102",
    seo: {
      title: "Borobudur Tourism Investment Opportunities",
      description: "Explore Borobudur investment opportunities in heritage hospitality, cultural venues, and visitor experience.",
    },
  },
  {
    slug: "mandalika",
    name: "Mandalika",
    category: ["DSP", "KEK"],
    island: "Bali-Nusa Tenggara",
    province: "West Nusa Tenggara",
    coordinates: [-8.8955, 116.299],
    tourismType: "Integrated resort, sport tourism, beach, entertainment, and MICE",
    summary:
      "Mandalika combines priority destination status with a tourism Special Economic Zone proposition, creating a clearer platform for integrated resort and event-led growth. Its beaches, international circuit, and established destination branding support a diversified investment story across hospitality, entertainment, sport tourism, marina concepts, and beachfront commercial uses. The strongest investor fit is for operators who can program year-round demand beyond major events, integrate premium accommodation with experience retail, and build destination services that serve both domestic and international visitors. Mandalika is well positioned as a showcase for structured tourism area development in eastern Indonesia.",
    imageSlug: "mandalika",
    imageCount: 5,
    landAvailable: "95-240 ha within integrated destination nodes",
    minimumInvestment: "USD 15M",
    revenuePotential: "USD 76M annual leisure and event spend",
    roi: "10-15% illustrative project IRR",
    demand: "Event-led awareness with beach resort and domestic leisure demand",
    infrastructure: ["Lombok International Airport access", "International racing circuit", "Beachfront road network", "Integrated destination utilities"],
    zones: [
      { name: "Beachfront Resort Parcels", area: "80 ha", use: "Resort, villas, branded residences", capex: "USD 35-90M" },
      { name: "Sport & Entertainment District", area: "28 ha", use: "Arena, retail, event plaza", capex: "USD 14-36M" },
      { name: "Marina & Lifestyle Front", area: "16 ha", use: "Waterfront dining, marina services", capex: "USD 8-22M" },
    ],
    stats: [
      { label: "SEZ positioning", value: "Active", note: "Tourism SEZ proposition" },
      { label: "Event demand", value: "Global", note: "International motorsport pull" },
      { label: "Priority lots", value: "9", note: "Indicative investment zones" },
    ],
    document: dspMemo.mandalika,
    advisorEmail: "investment.mandalika@kemenpar.go.id",
    advisorWhatsapp: "+6281119502103",
    seo: {
      title: "Mandalika Tourism Investment Opportunities",
      description: "Explore Mandalika investment opportunities in resorts, sport tourism, entertainment, and SEZ development.",
    },
  },
  {
    slug: "labuan-bajo",
    name: "Labuan Bajo",
    category: ["DSP"],
    island: "Bali-Nusa Tenggara",
    province: "East Nusa Tenggara",
    coordinates: [-8.496, 119.887],
    tourismType: "Premium eco-tourism, marine tourism, hospitality, and marina services",
    summary:
      "Labuan Bajo is one of Indonesia's most internationally legible gateways for premium nature and marine tourism, strengthened by its role as the entry point to Komodo and surrounding island experiences. The investment thesis is anchored in quality over mass volume: eco-sensitive resorts, marina services, dive and sailing operations, sustainable mobility, and curated hospitality that protects the destination's natural value. The destination is attractive to investors who understand conservation-led positioning, higher average daily rate potential, and the need for operational excellence in sensitive marine environments. Early-stage opportunities should prioritize low-impact development, premium service quality, and destination management partnerships.",
    imageSlug: "labuan-bajo",
    imageCount: 5,
    landAvailable: "24-130 ha across coastal and gateway nodes",
    minimumInvestment: "USD 10M",
    revenuePotential: "USD 64M annual premium eco-tourism spend",
    roi: "10-14% illustrative project IRR",
    demand: "Strong international appeal for Komodo, marine, and island-hopping experiences",
    infrastructure: ["Komodo Airport access", "Harbor and marina upgrades", "Tourism village circuits", "Growing premium accommodation base"],
    zones: [
      { name: "Eco-Resort Cluster", area: "36 ha", use: "Low-impact resort, villas, wellness", capex: "USD 18-46M" },
      { name: "Marina Service Node", area: "11 ha", use: "Marina, charter, dive operation", capex: "USD 8-18M" },
      { name: "Gateway Experience District", area: "15 ha", use: "Retail, dining, visitor center", capex: "USD 6-15M" },
    ],
    stats: [
      { label: "Premium demand", value: "High", note: "Marine and nature tourism pull" },
      { label: "ADR uplift potential", value: "+18%", note: "Prototype premium positioning" },
      { label: "Priority lots", value: "8", note: "Indicative investment zones" },
    ],
    document: dspMemo["labuan-bajo"],
    advisorEmail: "investment.labuanbajo@kemenpar.go.id",
    advisorWhatsapp: "+6281119502104",
    seo: {
      title: "Labuan Bajo Tourism Investment Opportunities",
      description: "Explore Labuan Bajo investment opportunities in eco-resorts, marina services, and marine tourism.",
    },
  },
  {
    slug: "likupang",
    name: "Likupang",
    category: ["DSP", "KEK"],
    island: "Sulawesi",
    province: "North Sulawesi",
    coordinates: [1.682, 125.059],
    tourismType: "Marine eco-tourism, diving, wellness, and island-hopping",
    summary:
      "Likupang represents a marine-led tourism frontier with white-sand beaches, island-hopping potential, and access to North Sulawesi's broader diving and nature circuits. As both a priority destination and a tourism SEZ proposition, it can support eco-marine resorts, wellness retreats, dive tourism, and visitor services that build a differentiated northern Indonesia offer. The destination is particularly compelling for investors seeking early-mover positioning in an emerging area where destination planning, sustainability standards, and product design can shape demand formation from the beginning.",
    imageSlug: "likupang",
    imageCount: 5,
    landAvailable: "60-210 ha in coastal tourism zones",
    minimumInvestment: "USD 7M",
    revenuePotential: "USD 32M annual marine tourism spend",
    roi: "9-14% illustrative project IRR",
    demand: "Emerging marine leisure demand with diving and wellness potential",
    infrastructure: ["Sam Ratulangi Airport access", "Coastal access improvements", "Tourism SEZ planning nodes", "Marine activity routes"],
    zones: [
      { name: "Eco-Marine Resort Belt", area: "65 ha", use: "Eco-resort, wellness, beachfront villas", capex: "USD 20-52M" },
      { name: "Dive & Island Gateway", area: "14 ha", use: "Dive center, boats, visitor services", capex: "USD 5-13M" },
      { name: "Community Tourism Node", area: "18 ha", use: "Culinary, craft, homestay upgrade", capex: "USD 3-7M" },
    ],
    stats: [
      { label: "SEZ positioning", value: "Active", note: "Tourism SEZ proposition" },
      { label: "Marine assets", value: "High", note: "Diving and island circuits" },
      { label: "Priority lots", value: "7", note: "Indicative investment zones" },
    ],
    document: dspMemo.likupang,
    advisorEmail: "investment.likupang@kemenpar.go.id",
    advisorWhatsapp: "+6281119502105",
    seo: {
      title: "Likupang Tourism Investment Opportunities",
      description: "Explore Likupang investment opportunities in marine eco-tourism, diving, and wellness retreats.",
    },
  },
  {
    slug: "tanjung-lesung",
    name: "Tanjung Lesung",
    category: ["KEK"],
    island: "Java",
    province: "Banten",
    coordinates: [-6.481, 105.656],
    tourismType: "Beach resort, family leisure, marina, and coastal hospitality",
    summary:
      "Tanjung Lesung is a tourism Special Economic Zone proposition on Java's western coastline, well positioned for domestic leisure, weekend resort demand, and coastal destination development. Its proximity to Greater Jakarta creates a practical market base for family resorts, beachfront hospitality, marina-linked experiences, and event programming. The investment thesis benefits from a clear coastal identity and room for destination-scale product creation. The strongest opportunities are likely in resort repositioning, integrated visitor services, destination retail, and experience packages that convert short visits into higher-value stays.",
    imageSlug: "kek-tanjung-lesung",
    imageCount: 3,
    landAvailable: "85-260 ha indicative SEZ parcels",
    minimumInvestment: "USD 12M",
    revenuePotential: "USD 44M annual domestic leisure spend",
    roi: "9-13% illustrative project IRR",
    demand: "Weekend and family leisure from Java's major urban markets",
    infrastructure: ["Coastal road access", "Existing resort base", "Beach and marina potential", "Regional tourism circuits"],
    zones: [
      { name: "Family Resort Front", area: "70 ha", use: "Resort, villas, beach club", capex: "USD 22-58M" },
      { name: "Marina & Activity Node", area: "18 ha", use: "Marina services, water sports", capex: "USD 8-20M" },
      { name: "Destination Retail Village", area: "12 ha", use: "Dining, local retail, events", capex: "USD 5-11M" },
    ],
    stats: [
      { label: "Primary market", value: "Java", note: "Drive-to leisure demand" },
      { label: "SEZ positioning", value: "Active", note: "Tourism SEZ proposition" },
      { label: "Priority lots", value: "5", note: "Indicative investment zones" },
    ],
    document: sezMemo,
    advisorEmail: "investment.tanjunglesung@kemenpar.go.id",
    advisorWhatsapp: "+6281119502201",
    seo: {
      title: "Tanjung Lesung Tourism SEZ Opportunities",
      description: "Explore Tanjung Lesung tourism SEZ opportunities in coastal resorts, marina, and family leisure.",
    },
  },
  {
    slug: "tanjung-kelayang",
    name: "Tanjung Kelayang",
    category: ["KEK"],
    island: "Sumatra",
    province: "Bangka Belitung Islands",
    coordinates: [-2.552, 107.67],
    tourismType: "Island resort, granite coast, sailing, and marine leisure",
    summary:
      "Tanjung Kelayang offers an island resort proposition around Belitung's distinctive granite coastline and marine scenery. It is well suited for boutique resorts, sailing and island-hopping products, premium leisure villas, and visitor services that elevate the destination from scenic travel into a higher-yield hospitality platform. Investors can build around strong visual appeal, differentiated coastal character, and the ability to package beach, island, culinary, and creative economy experiences into a compact destination circuit.",
    imageSlug: "belitung",
    imageCount: 5,
    landAvailable: "48-150 ha indicative coastal parcels",
    minimumInvestment: "USD 9M",
    revenuePotential: "USD 35M annual island leisure spend",
    roi: "9-13% illustrative project IRR",
    demand: "Island leisure, photography-led travel, sailing, and domestic premium stays",
    infrastructure: ["H.A.S. Hanandjoeddin Airport access", "Island-hopping routes", "Coastal road network", "Existing boutique accommodation"],
    zones: [
      { name: "Granite Coast Resort Zone", area: "38 ha", use: "Resort, villas, beach club", capex: "USD 18-42M" },
      { name: "Sailing Gateway", area: "10 ha", use: "Jetty, sailing, visitor services", capex: "USD 5-12M" },
      { name: "Creative Economy Strip", area: "9 ha", use: "Retail, dining, events", capex: "USD 3-8M" },
    ],
    stats: [
      { label: "Destination identity", value: "Distinctive", note: "Granite island scenery" },
      { label: "SEZ positioning", value: "Active", note: "Tourism SEZ proposition" },
      { label: "Priority lots", value: "6", note: "Indicative investment zones" },
    ],
    document: sezMemo,
    advisorEmail: "investment.tanjungkelayang@kemenpar.go.id",
    advisorWhatsapp: "+6281119502202",
    seo: {
      title: "Tanjung Kelayang Tourism SEZ Opportunities",
      description: "Explore Tanjung Kelayang tourism SEZ opportunities in island resorts, sailing, and marine leisure.",
    },
  },
  {
    slug: "morotai",
    name: "Morotai",
    category: ["KEK"],
    island: "Papua-Maluku",
    province: "North Maluku",
    coordinates: [2.33, 128.36],
    tourismType: "Remote island resort, diving, heritage, and marine adventure",
    summary:
      "Morotai gives investors exposure to remote island tourism with marine adventure, diving potential, and World War II heritage narratives. The investment opportunity is best framed around carefully managed eco-resorts, destination operations, dive infrastructure, and experience design that turns remoteness into a premium attribute rather than a barrier. The destination requires patient capital and strong operators, but it offers early-mover potential in a less crowded tourism frontier with strong scenery and story-led product possibilities.",
    imageSlug: "kek-morotai",
    imageCount: 3,
    landAvailable: "70-190 ha indicative island parcels",
    minimumInvestment: "USD 8M",
    revenuePotential: "USD 24M annual adventure tourism spend",
    roi: "8-12% illustrative project IRR",
    demand: "Niche international diving, adventure, and remote island leisure",
    infrastructure: ["Regional airport access", "Island coastal routes", "Marine activity nodes", "Heritage sites"],
    zones: [
      { name: "Remote Eco-Resort Sites", area: "42 ha", use: "Eco-resort, villas, wellness", capex: "USD 14-34M" },
      { name: "Dive Operations Hub", area: "8 ha", use: "Dive center, boat services", capex: "USD 3-9M" },
      { name: "Heritage Experience Loop", area: "12 ha", use: "Museum, guided routes, retail", capex: "USD 2-6M" },
    ],
    stats: [
      { label: "Market position", value: "Frontier", note: "Remote island investment profile" },
      { label: "SEZ positioning", value: "Active", note: "Tourism SEZ proposition" },
      { label: "Priority lots", value: "5", note: "Indicative investment zones" },
    ],
    document: sezMemo,
    advisorEmail: "investment.morotai@kemenpar.go.id",
    advisorWhatsapp: "+6281119502203",
    seo: {
      title: "Morotai Tourism SEZ Opportunities",
      description: "Explore Morotai tourism SEZ opportunities in remote island resorts, diving, and heritage tourism.",
    },
  },
  {
    slug: "lido",
    name: "Lido",
    category: ["KEK"],
    island: "Java",
    province: "West Java",
    coordinates: [-6.77, 106.81],
    tourismType: "Integrated leisure, creative economy, MICE, and entertainment",
    summary:
      "Lido is an integrated leisure and creative economy proposition near the Greater Jakarta market, making it relevant for entertainment, MICE, family leisure, and lifestyle-led development. Its strongest advantage is market proximity: investors can target high-frequency domestic visits, corporate events, media-linked attractions, and destination retail without relying solely on long-haul tourism. The opportunity is best suited to operators who can build repeatable programming and anchor experiences with clear commercial logic.",
    imageSlug: "kek-lido",
    imageCount: 3,
    landAvailable: "55-170 ha indicative integrated parcels",
    minimumInvestment: "USD 18M",
    revenuePotential: "USD 68M annual leisure and MICE spend",
    roi: "10-15% illustrative project IRR",
    demand: "Greater Jakarta leisure, corporate MICE, and family entertainment",
    infrastructure: ["Toll-road access", "Integrated development base", "MICE and creative economy potential", "Domestic visitor market proximity"],
    zones: [
      { name: "Entertainment Anchor District", area: "36 ha", use: "Attractions, events, retail", capex: "USD 30-75M" },
      { name: "MICE & Hotel Cluster", area: "24 ha", use: "Hotel, convention, dining", capex: "USD 24-58M" },
      { name: "Creative Economy Campus", area: "18 ha", use: "Studio, training, creative retail", capex: "USD 10-28M" },
    ],
    stats: [
      { label: "Market access", value: "High", note: "Greater Jakarta proximity" },
      { label: "SEZ positioning", value: "Active", note: "Tourism and creative economy proposition" },
      { label: "Priority lots", value: "6", note: "Indicative investment zones" },
    ],
    document: sezMemo,
    advisorEmail: "investment.lido@kemenpar.go.id",
    advisorWhatsapp: "+6281119502204",
    seo: {
      title: "Lido Tourism SEZ Opportunities",
      description: "Explore Lido tourism SEZ opportunities in entertainment, MICE, hospitality, and creative economy.",
    },
  },
  {
    slug: "singhasari",
    name: "Singhasari",
    category: ["KEK"],
    island: "Java",
    province: "East Java",
    coordinates: [-7.89, 112.67],
    tourismType: "Digital tourism, heritage, education, and creative economy",
    summary:
      "Singhasari is differentiated by its blend of tourism, creative economy, education, digital services, and East Java heritage circuits. Rather than a pure resort play, the investment story fits digital tourism platforms, education-linked tourism, creative industry facilities, visitor experience technology, and hospitality that connects Malang, Batu, and regional heritage routes. It is especially relevant for investors looking at tourism services, creative production, and human-capital linked destination development.",
    imageSlug: "kek-singhasari",
    imageCount: 3,
    landAvailable: "22-120 ha indicative mixed-use parcels",
    minimumInvestment: "USD 6M",
    revenuePotential: "USD 28M annual creative tourism spend",
    roi: "8-12% illustrative project IRR",
    demand: "Domestic education, creative economy, and heritage-linked leisure demand",
    infrastructure: ["East Java road network", "Malang urban market access", "Creative economy talent base", "Heritage and mountain tourism circuits"],
    zones: [
      { name: "Digital Tourism Campus", area: "18 ha", use: "Studio, labs, training, offices", capex: "USD 8-20M" },
      { name: "Heritage Visitor Node", area: "10 ha", use: "Interpretation, retail, dining", capex: "USD 4-10M" },
      { name: "Creative Hospitality Cluster", area: "14 ha", use: "Hotel, co-living, event space", capex: "USD 7-18M" },
    ],
    stats: [
      { label: "Differentiator", value: "Digital", note: "Creative economy and tourism services" },
      { label: "SEZ positioning", value: "Active", note: "Tourism-linked SEZ proposition" },
      { label: "Priority lots", value: "5", note: "Indicative investment zones" },
    ],
    document: sezMemo,
    advisorEmail: "investment.singhasari@kemenpar.go.id",
    advisorWhatsapp: "+6281119502205",
    seo: {
      title: "Singhasari Tourism SEZ Opportunities",
      description: "Explore Singhasari tourism SEZ opportunities in digital tourism, creative economy, and heritage experiences.",
    },
  },
  {
    slug: "sanur",
    name: "Sanur",
    category: ["KEK"],
    island: "Bali-Nusa Tenggara",
    province: "Bali",
    coordinates: [-8.69, 115.26],
    tourismType: "Wellness, medical tourism, hospitality, and coastal lifestyle",
    summary:
      "Sanur is a mature Bali destination with strong wellness, medical tourism, hospitality, and coastal lifestyle potential. Its investment profile is less about frontier discovery and more about upgrading value: integrated wellness services, health-linked stays, premium hospitality, senior living concepts, and curated coastal experiences. For international investors, Sanur can function as a credible platform for medical and wellness tourism that benefits from Bali's global brand while requiring high service quality and careful integration with local character.",
    imageSlug: "bali",
    imageCount: 5,
    landAvailable: "18-80 ha indicative wellness and hospitality nodes",
    minimumInvestment: "USD 12M",
    revenuePotential: "USD 84M annual wellness and hospitality spend",
    roi: "10-14% illustrative project IRR",
    demand: "Bali international brand with wellness and health tourism potential",
    infrastructure: ["Ngurah Rai Airport access", "Mature hospitality ecosystem", "Healthcare and wellness service base", "Coastal lifestyle amenities"],
    zones: [
      { name: "Integrated Wellness Hub", area: "20 ha", use: "Wellness resort, clinics, recovery stay", capex: "USD 28-70M" },
      { name: "Coastal Lifestyle Quarter", area: "12 ha", use: "Retail, dining, cultural events", capex: "USD 8-22M" },
      { name: "Senior Living & Long-Stay Node", area: "16 ha", use: "Residences, serviced apartments", capex: "USD 18-45M" },
    ],
    stats: [
      { label: "International brand", value: "Bali", note: "High global awareness" },
      { label: "SEZ positioning", value: "Active", note: "Wellness and health tourism proposition" },
      { label: "Priority lots", value: "6", note: "Indicative investment zones" },
    ],
    document: sezMemo,
    advisorEmail: "investment.sanur@kemenpar.go.id",
    advisorWhatsapp: "+6281119502206",
    seo: {
      title: "Sanur Tourism SEZ Opportunities",
      description: "Explore Sanur tourism SEZ opportunities in wellness, medical tourism, and premium hospitality.",
    },
  },
  {
    slug: "kura-kura-bali",
    name: "Kura-Kura Bali",
    category: ["KEK"],
    island: "Bali-Nusa Tenggara",
    province: "Bali",
    coordinates: [-8.735, 115.22],
    tourismType: "Island lifestyle, creative economy, education, wellness, and premium hospitality",
    summary:
      "Kura-Kura Bali is positioned for premium island lifestyle, education, creative economy, wellness, and hospitality investment. The destination can attract investors looking for a curated mixed-use platform that connects Bali's global appeal with higher-value, knowledge-led, and lifestyle-oriented programming. Opportunity areas include premium accommodations, wellness, cultural venues, learning campuses, and experience retail that can operate year-round and target long-stay international demand.",
    imageSlug: "bali",
    imageCount: 5,
    coverImageIndex: 2,
    landAvailable: "25-95 ha indicative island mixed-use parcels",
    minimumInvestment: "USD 15M",
    revenuePotential: "USD 72M annual lifestyle and long-stay spend",
    roi: "9-13% illustrative project IRR",
    demand: "Premium Bali lifestyle, long-stay, education, and wellness demand",
    infrastructure: ["Ngurah Rai Airport access", "Island mixed-use planning", "Bali service ecosystem", "Creative economy networks"],
    zones: [
      { name: "Premium Island Stay Cluster", area: "24 ha", use: "Resort, villas, serviced residences", capex: "USD 32-78M" },
      { name: "Learning & Creative Campus", area: "14 ha", use: "Education, studios, event space", capex: "USD 12-30M" },
      { name: "Wellness Waterfront", area: "10 ha", use: "Wellness, dining, cultural retail", capex: "USD 9-24M" },
    ],
    stats: [
      { label: "Market position", value: "Premium", note: "Lifestyle and long-stay potential" },
      { label: "SEZ positioning", value: "Active", note: "Tourism-linked SEZ proposition" },
      { label: "Priority lots", value: "5", note: "Indicative investment zones" },
    ],
    document: sezMemo,
    advisorEmail: "investment.kurakurabali@kemenpar.go.id",
    advisorWhatsapp: "+6281119502207",
    seo: {
      title: "Kura-Kura Bali Tourism SEZ Opportunities",
      description: "Explore Kura-Kura Bali tourism SEZ opportunities in lifestyle, education, wellness, and premium hospitality.",
    },
  },
  {
    slug: "batam",
    name: "Batam International Tourism & Health SEZ",
    category: ["KEK"],
    island: "Sumatra",
    province: "Riau Islands",
    coordinates: [1.104, 104.035],
    tourismType: "Health tourism, cross-border leisure, MICE, and urban hospitality",
    summary:
      "Batam's tourism and health-oriented SEZ proposition is driven by cross-border access, proximity to Singapore and Malaysia, urban hospitality, health services, and MICE demand. The opportunity is commercially pragmatic: investors can target medical and wellness trips, short-stay leisure, corporate meetings, and integrated hospitality services with strong regional connectivity. Batam is best suited for operators that can combine service quality, efficient logistics, and cross-border market development.",
    imageSlug: "kek-batam",
    imageCount: 3,
    landAvailable: "35-140 ha indicative health and hospitality nodes",
    minimumInvestment: "USD 14M",
    revenuePotential: "USD 58M annual health and short-stay tourism spend",
    roi: "10-15% illustrative project IRR",
    demand: "Cross-border short-stay, health tourism, MICE, and urban leisure demand",
    infrastructure: ["Ferry and airport access", "Urban hospitality base", "Regional business market", "Healthcare service potential"],
    zones: [
      { name: "Health Tourism Campus", area: "22 ha", use: "Clinics, recovery hotel, wellness", capex: "USD 22-60M" },
      { name: "Cross-Border Hospitality Node", area: "18 ha", use: "Hotel, dining, retail, MICE", capex: "USD 18-44M" },
      { name: "Waterfront Leisure Front", area: "14 ha", use: "Dining, events, marina services", capex: "USD 8-20M" },
    ],
    stats: [
      { label: "Regional access", value: "High", note: "Cross-border market proximity" },
      { label: "SEZ positioning", value: "Active", note: "Tourism and health proposition" },
      { label: "Priority lots", value: "5", note: "Indicative investment zones" },
    ],
    document: sezMemo,
    advisorEmail: "investment.batam@kemenpar.go.id",
    advisorWhatsapp: "+6281119502208",
    seo: {
      title: "Batam Tourism and Health SEZ Opportunities",
      description: "Explore Batam tourism and health SEZ opportunities in health tourism, MICE, and urban hospitality.",
    },
  },
];

export const heroSlides = [
  {
    image: "/assets/images/hero/hero-01.jpg",
    kicker: "Tourism Investment Gateway",
    title: "Invest in Indonesia Tourism",
    copy: "Priority destinations, tourism SEZs, investor data, licensing guidance, and direct public-sector contact in one gateway.",
  },
  {
    image: "/assets/images/hero/hero-02.jpg",
    kicker: "Curated Opportunities",
    title: "From iconic heritage to marine frontiers",
    copy: "Compare DSP and tourism SEZ locations across Indonesia with clear investment signals and downloadable memoranda.",
  },
  {
    image: "/assets/images/hero/hero-03.jpg",
    kicker: "Investor Confidence",
    title: "Data, process, and people in one place",
    copy: "Use KPI trends, licensing steps, OSS/NIB gateway, and named advisor access to move from interest to action.",
  },
];

export const heroStats = [
  { label: "International tourist arrivals", value: 14.2, suffix: "M", decimals: 1 },
  { label: "Tourism investment pipeline", value: 4.8, suffix: "B USD", decimals: 1 },
  { label: "GDP contribution", value: 4.1, suffix: "%", decimals: 1 },
  { label: "Jobs supported", value: 21.9, suffix: "M", decimals: 1 },
];

export const kpis: Kpi[] = [
  { label: "International Tourist Arrivals", value: "14.2M", yoy: 17.8, source: "BPS / Ministry of Tourism placeholder", unit: "million visits", trend: [4.0, 5.5, 8.2, 11.7, 14.2] },
  { label: "Domestic Tourist Trips", value: "1.08B", yoy: 9.4, source: "BPS placeholder", unit: "billion trips", trend: [0.62, 0.73, 0.84, 0.99, 1.08] },
  { label: "Tourism Foreign Exchange", value: "USD 16.4B", yoy: 13.1, source: "Ministry of Tourism placeholder", unit: "USD billion", trend: [3.5, 6.9, 10.4, 14.5, 16.4] },
  { label: "Tourism GDP Contribution", value: "4.1%", yoy: 0.6, source: "BPS placeholder", unit: "percent", trend: [3.1, 3.4, 3.7, 3.9, 4.1] },
  { label: "Tourism Employment", value: "21.9M", yoy: 5.7, source: "BPS placeholder", unit: "million jobs", trend: [18.2, 18.9, 19.8, 20.7, 21.9] },
  { label: "Tourism Investment Realization", value: "USD 4.8B", yoy: 12.6, source: "BKPM placeholder", unit: "USD billion", trend: [2.2, 2.7, 3.4, 4.2, 4.8] },
];

export const licensingSteps = [
  {
    title: "Create OSS Account",
    agency: "OSS / Ministry of Investment",
    time: "1 business day",
    documents: "Authorized representative, email, company identity, passport or ID.",
    link: "https://oss.go.id",
  },
  {
    title: "Select Tourism KBLI",
    agency: "OSS / Sector classification reference",
    time: "1-2 business days",
    documents: "Business plan, tourism activity type, investment scope.",
    link: "https://oss.go.id",
  },
  {
    title: "Obtain NIB",
    agency: "OSS",
    time: "1 business day",
    documents: "Entity data, shareholder data, address, capital plan.",
    link: "https://oss.go.id",
  },
  {
    title: "Confirm Location and Spatial Alignment",
    agency: "Regional government / ATR-BPN",
    time: "7-14 business days",
    documents: "Location coordinates, site plan, land status, spatial plan reference.",
    link: "https://oss.go.id",
  },
  {
    title: "Prepare Environmental Approval",
    agency: "Environment authority",
    time: "10-25 business days",
    documents: "UKL-UPL or AMDAL requirement, project description, mitigation plan.",
    link: "https://oss.go.id",
  },
  {
    title: "Submit Sectoral Tourism Requirements",
    agency: "Ministry of Tourism / regional tourism office",
    time: "5-12 business days",
    documents: "Facility plan, service standard, operator profile, safety readiness.",
    link: "https://oss.go.id",
  },
  {
    title: "Construction and Building Readiness",
    agency: "Regional government / technical agencies",
    time: "10-20 business days",
    documents: "Technical drawings, building readiness, utility plan, HSE checklist.",
    link: "https://oss.go.id",
  },
  {
    title: "Operational Compliance and Reporting",
    agency: "OSS / regional and sector authorities",
    time: "Ongoing",
    documents: "Operational reports, tax compliance, employment reporting, tourism standards.",
    link: "https://oss.go.id",
  },
];

export const faqs = [
  {
    question: "Is OSS mandatory for foreign tourism investors?",
    answer:
      "Yes. OSS is the official integrated government gateway for business licensing. Investors should use it to obtain NIB and continue relevant licensing steps.",
  },
  {
    question: "Can a location be assessed before formal registration?",
    answer:
      "Yes. Early-stage location screening can be discussed with investment relations or destination authorities before the investor proceeds through formal licensing.",
  },
  {
    question: "Do requirements differ between DSP and KEK locations?",
    answer:
      "The core OSS/NIB pathway remains the reference point, while SEZ locations may include additional incentives, management-body coordination, or zone-specific requirements.",
  },
  {
    question: "Are the figures in this prototype official?",
    answer:
      "No. KPI, ROI, land, and investment figures are realistic placeholders for prototype interaction and must be replaced with approved official data before publication.",
  },
];

export const years = ["2021", "2022", "2023", "2024", "2025"];

export function imageSet(slug: string, count: number) {
  return Array.from({ length: count }, (_, index) => `/assets/images/${slug}/${slug}-${String(index + 1).padStart(2, "0")}.jpg`);
}

export function coverImage(location: TourismLocation) {
  const index = location.coverImageIndex ?? 1;
  return `/assets/images/${location.imageSlug}/${location.imageSlug}-${String(index).padStart(2, "0")}.jpg`;
}
