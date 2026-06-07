import { useEffect, useMemo, useRef, useState } from "react";
import L, { Map as LeafletMap } from "leaflet";
import {
  ArrowDownToLine,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarClock,
  Check,
  ChevronDown,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Globe2,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Plane,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import {
  Advisor,
  Download as DownloadItem,
  IslandGroup,
  LocationType,
  TourismLocation,
  advisor,
  advisorForLocation,
  coverImage,
  downloads,
  faqs,
  heroSlides,
  heroStats,
  imageSet,
  kpis,
  licensingSteps,
  locations,
  years,
} from "./data";

type Route =
  | { page: "home" }
  | { page: "opportunities" }
  | { page: "location"; slug: string }
  | { page: "data" }
  | { page: "licensing" }
  | { page: "resources" };

type KpiView = "chart" | "table";

const navItems = [
  { label: "Home", href: "#/" },
  { label: "Opportunities", href: "#/opportunities" },
  { label: "Data", href: "#/data" },
  { label: "Licensing", href: "#/licensing" },
  { label: "Resources", href: "#/resources" },
];

const islandOptions: ("All" | IslandGroup)[] = ["All", "Sumatra", "Java", "Bali-Nusa Tenggara", "Sulawesi", "Papua-Maluku"];
const typeOptions: ("All" | LocationType)[] = ["All", "DSP", "KEK"];
function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  if (parts[0] === "opportunities") return { page: "opportunities" };
  if (parts[0] === "location" && parts[1]) return { page: "location", slug: parts[1] };
  if (parts[0] === "data") return { page: "data" };
  if (parts[0] === "licensing") return { page: "licensing" };
  if (parts[0] === "resources") return { page: "resources" };
  return { page: "home" };
}

function App() {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const handleHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    const activeLocation = route.page === "location" ? locations.find((location) => location.slug === route.slug) : undefined;
    document.title = activeLocation?.seo.title ?? "Invest in Indonesia Tourism";
    const meta = document.querySelector("meta[name='description']");
    if (meta) {
      meta.setAttribute(
        "content",
        activeLocation?.seo.description ??
          "Invest in Indonesia Tourism - curated tourism investment opportunities, priority destinations, KPI data, and licensing guidance.",
      );
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  const location = route.page === "location" ? locations.find((item) => item.slug === route.slug) : undefined;
  const routeKey = route.page === "location" ? `${route.page}-${route.slug}` : route.page;

  return (
    <div className="app-shell">
      <Header />
      <div className="route-shell" key={routeKey}>
        {route.page === "home" && <HomePage />}
        {route.page === "opportunities" && <OpportunitiesPage />}
        {route.page === "location" && location && <LocationPage location={location} />}
        {route.page === "location" && !location && <NotFoundPage />}
        {route.page === "data" && <DataPage />}
        {route.page === "licensing" && <LicensingPage />}
        {route.page === "resources" && <ResourcesPage />}
      </div>
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="Invest in Indonesia Tourism home">
        <img src="/kemenpar-logo.png" alt="Ministry of Tourism logo" />
        <span>
          <strong>Invest in Indonesia Tourism</strong>
          <small>Ministry of Tourism, Republic of Indonesia</small>
        </span>
      </a>
      <button className="icon-button mobile-menu" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open navigation">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={open ? "nav-links open" : "nav-links"} onClick={() => setOpen(false)}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a className="nav-cta" href="https://oss.go.id" target="_blank" rel="noreferrer">
          OSS Gateway
          <ExternalLink size={16} />
        </a>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <OpportunityPreview />
      <KpiPreview />
      <LicensingGateway />
      <AdvisorBand />
    </>
  );
}

function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[active];

  return (
    <section className="hero" aria-label="Invest in Indonesia Tourism hero">
      {heroSlides.map((item, index) => (
        <img
          key={item.image}
          className={index === active ? "hero-image active" : "hero-image"}
          src={item.image}
          alt=""
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="hero-scrim" />
      <div className="hero-content">
        <div className="hero-copy">
          <span className="eyebrow">{slide.kicker}</span>
          <h1>{slide.title}</h1>
          <p>{slide.copy}</p>
          <div className="hero-actions">
            <a className="button primary" href="#/opportunities">
              <MapPin size={18} />
              Explore Opportunities
            </a>
            <a className="button secondary" href="/downloads/investment-guide.pdf" download>
              <Download size={18} />
              Download Investment Guide
            </a>
            <a className="button ghost-light" href="https://oss.go.id" target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              Register via OSS
            </a>
          </div>
        </div>
        <div className="hero-stats" aria-label="Tourism performance statistics">
          {heroStats.map((stat) => (
            <CounterStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
      <div className="hero-dots" aria-label="Hero carousel controls">
        {heroSlides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            className={index === active ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function CounterStat({ label, value, suffix, decimals }: (typeof heroStats)[number]) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const duration = 2000;
        const animate = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setShown(value * eased);
          if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="stat-tile" ref={ref}>
      <strong>
        {shown.toFixed(decimals)}
        <span>{suffix}</span>
      </strong>
      <small>{label}</small>
    </div>
  );
}

function OpportunityPreview() {
  const featured = ["labuan-bajo", "mandalika", "borobudur"];
  const cards = locations.filter((location) => featured.includes(location.slug));

  return (
    <section className="section light" id="opportunities">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Investment opportunities"
          title="Priority destinations and active tourism SEZs"
          copy="Explore investable locations by region, type, demand driver, indicative land availability, and downloadable investment documents."
        />
        <div className="feature-grid three">
          {cards.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
        <div className="section-action-row">
          <a className="button primary" href="#/opportunities">
            <Globe2 size={18} />
            Open Interactive Map
          </a>
        </div>
      </div>
    </section>
  );
}

function LocationCard({ location }: { location: TourismLocation }) {
  return (
    <article className="location-card">
      <img src={coverImage(location)} alt={`${location.name} tourism investment`} loading="lazy" />
      <div className="location-card-body">
        <div className="badge-row">
          {location.category.map((category) => (
            <span className={category === "DSP" ? "badge red" : "badge gold"} key={category}>
              {category}
            </span>
          ))}
          <span className="badge muted">{location.island}</span>
        </div>
        <h3>{location.name}</h3>
        <p>{location.tourismType}</p>
        <dl>
          <div>
            <dt>Land</dt>
            <dd>{location.landAvailable}</dd>
          </div>
          <div>
            <dt>Min. investment</dt>
            <dd>{location.minimumInvestment}</dd>
          </div>
        </dl>
        <a className="text-link" href={`#/location/${location.slug}`}>
          View Detail
          <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}

function KpiPreview() {
  return (
    <section className="section white">
      <div className="section-inner">
        <div className="section-header-row">
          <SectionHeading
            eyebrow="Data confidence"
            title="Macro signals for investment screening"
            copy="The prototype dashboard uses realistic placeholder values with source labels and quarterly update metadata."
          />
          <a className="button secondary-blue" href="#/data">
            <BarChart3 size={18} />
            View KPI Dashboard
          </a>
        </div>
        <div className="kpi-strip">
          {kpis.slice(0, 4).map((kpi) => (
            <KpiCard key={kpi.label} kpi={kpi} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LicensingGateway() {
  return (
    <section className="section licensing-band">
      <div className="section-inner split">
        <div>
          <span className="eyebrow">OSS/NIB Gateway</span>
          <h2>From opportunity screening to formal licensing</h2>
          <p>
            Investors can review the licensing timeline, download a document checklist, and continue to the official OSS portal when ready to start the formal process.
          </p>
          <div className="hero-actions compact">
            <a className="button primary" href="#/licensing">
              <FileText size={18} />
              Review Licensing Steps
            </a>
            <a className="button secondary" href="https://oss.go.id" target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              Start via OSS
            </a>
          </div>
        </div>
        <div className="process-mini" aria-label="OSS quick pathway">
          {["Create OSS account", "Select tourism KBLI", "Submit NIB"].map((item, index) => (
            <div key={item}>
              <span>{index + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvisorBand() {
  return (
    <section className="section advisor-band">
      <div className="section-inner advisor-layout">
        <div>
          <span className="eyebrow">Investor relationship</span>
          <h2>Direct desks for destination follow-up</h2>
          <p>Every DSP and SEZ page routes investors to a destination-specific investment desk, with a central desk available as fallback.</p>
        </div>
        <AdvisorCard advisor={advisor} locationName="Indonesia Tourism" />
      </div>
    </section>
  );
}

function OpportunitiesPage() {
  const [type, setType] = useState<"All" | LocationType>("All");
  const [island, setIsland] = useState<"All" | IslandGroup>("All");
  const [selected, setSelected] = useState<TourismLocation | null>(null);

  const filtered = useMemo(() => {
    return locations.filter((location) => {
      const typeMatch = type === "All" || location.category.includes(type);
      const islandMatch = island === "All" || location.island === island;
      return typeMatch && islandMatch;
    });
  }, [type, island]);

  const handleTypeChange = (nextType: "All" | LocationType) => {
    setType(nextType);
    if (nextType === "All") {
      setIsland("All");
      setSelected(null);
    }
  };

  const handleIslandChange = (nextIsland: "All" | IslandGroup) => {
    setIsland(nextIsland);
    if (nextIsland === "All") {
      setType("All");
      setSelected(null);
    }
  };

  useEffect(() => {
    if (!filtered.length) {
      setSelected(null);
      return;
    }
    if (selected && filtered.some((location) => location.slug === selected.slug)) {
      return;
    }
    if (type === "All" && island === "All") {
      return;
    }
    setSelected(filtered[0] ?? null);
  }, [filtered, island, selected, type]);

  return (
    <main>
      <PageHero
        eyebrow="Investment Opportunities"
        title="Explore Indonesia by destination, SEZ, and region"
        copy="A vector map of Indonesia highlights priority tourism destinations and active tourism-oriented Special Economic Zones with investor-ready side panels."
        image="/assets/images/hero/hero-04.jpg"
      />
      <section className="section light">
        <div className="section-inner">
          <div className="filter-bar">
            <div className="filter-group">
              <Filter size={18} />
              <span>Type</span>
              <SegmentedControl options={typeOptions} value={type} onChange={handleTypeChange} />
            </div>
            <div className="filter-group wide">
              <Globe2 size={18} />
              <span>Region</span>
              <SegmentedControl options={islandOptions} value={island} onChange={handleIslandChange} />
            </div>
          </div>
          <div className="map-layout">
            <IndonesiaMap locations={filtered} selected={selected} onSelect={setSelected} overviewMode={type === "All" && island === "All" && !selected} />
            {selected ? <LocationSidePanel key={selected.slug} location={selected} /> : <IndonesiaOverviewPanel />}
          </div>
          <div className="mobile-location-list">
            {filtered.map((location) => (
              <button key={location.slug} type="button" onClick={() => setSelected(location)} className={selected?.slug === location.slug ? "active" : ""}>
                <img src={coverImage(location)} alt="" />
                <span>
                  <strong>{location.name}</strong>
                  <small>{location.province}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section white">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Location catalogue"
            title={`${filtered.length} investable locations in view`}
            copy="Each location has a shareable URL, summary, indicative investment metrics, gallery, advisor card, and downloadable memorandum."
          />
          <div className="feature-grid three">
            {filtered.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SegmentedControl<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (value: T) => void }) {
  return (
    <div className="segmented-control">
      {options.map((option) => (
        <button key={option} type="button" className={option === value ? "active" : ""} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

function IndonesiaMap({
  locations: visibleLocations,
  selected,
  onSelect,
  overviewMode,
}: {
  locations: TourismLocation[];
  selected: TourismLocation | null;
  onSelect: (location: TourismLocation) => void;
  overviewMode: boolean;
}) {
  const mapNode = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const indonesiaBoundsRef = useRef<L.LatLngBounds | null>(null);
  const [targetPositions, setTargetPositions] = useState<Record<string, { left: string; top: string }>>({});
  const provinceStyle = {
    color: "rgba(255, 255, 255, 0.88)",
    weight: 0.9,
    fillColor: "#5aa978",
    fillOpacity: 0.13,
  };
  const handleTargetSelect = (event: { preventDefault: () => void; stopPropagation: () => void }, location: TourismLocation) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(location);
  };

  useEffect(() => {
    if (!mapNode.current || mapRef.current) return;
    let disposed = false;
    const map = L.map(mapNode.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
      keyboard: true,
    }).setView([-2.5, 118], 5, { animate: false });

    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);
    L.tileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution:
        'Tiles &copy; Esri &mdash; Sources: Esri, Garmin, FAO, NOAA, USGS, OpenStreetMap contributors, and the GIS User Community',
      maxZoom: 19,
      minZoom: 3,
    }).addTo(map);
    fetch("/assets/maps/indonesia-province-simple.json")
      .then((response) => response.json())
      .then((geojson) => {
        if (disposed) return;
        const layer = L.geoJSON(geojson, {
          style: provinceStyle,
          onEachFeature: (feature, layerItem) => {
            const name = feature?.properties?.Propinsi || feature?.properties?.name || "Indonesia province";
            layerItem.bindTooltip(String(name), { sticky: true });
            const pathLayer = layerItem as L.Path;
            layerItem.on({
              mouseover: () => {
                pathLayer.setStyle({
                  color: "#ffffff",
                  fillColor: "#2ca66f",
                  fillOpacity: 0.26,
                  weight: 1.4,
                });
              },
              mouseout: () => {
                pathLayer.setStyle(provinceStyle);
              },
            });
          },
        }).addTo(map);
        indonesiaBoundsRef.current = layer.getBounds();
        if (!disposed) {
          map.fitBounds(indonesiaBoundsRef.current, { animate: false, padding: [22, 22] });
        }
      })
      .catch(() => {
        if (!disposed) {
          map.setView([-2.5, 118], 5, { animate: false });
        }
      });

    mapRef.current = map;
    markerLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      disposed = true;
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const markerLayer = markerLayerRef.current;
    if (!map || !markerLayer) return;

    markerLayer.clearLayers();
    visibleLocations.forEach((location) => {
      const className = [
        "pin-icon",
        location.category.includes("DSP") && location.category.includes("KEK") ? "mixed" : location.category[0] === "DSP" ? "dsp" : "kek",
        location.slug === selected?.slug ? "selected" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const openLocation = () => onSelect(location);
      const marker = L.marker(location.coordinates, {
        icon: L.divIcon({
          className: `${className} pin-${location.slug}`,
          html: `<span></span>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        }),
      })
        .addTo(markerLayer)
        .on("click", openLocation)
        .on("mousedown", openLocation)
        .on("touchstart", openLocation);
      const markerElement = marker.getElement();
      markerElement?.addEventListener("click", openLocation);
      markerElement?.addEventListener("pointerdown", openLocation);
      marker.bindTooltip(location.name, { direction: "top" });
    });
  }, [visibleLocations, onSelect, selected?.slug]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const syncTargetPositions = () => {
      const size = map.getSize();
      if (!size.x || !size.y) return;
      const nextPositions = Object.fromEntries(
        visibleLocations.map((location) => {
          const point = map.latLngToContainerPoint(L.latLng(location.coordinates[0], location.coordinates[1]));
          const left = Math.max(4, Math.min(96, (point.x / size.x) * 100));
          const top = Math.max(4, Math.min(96, (point.y / size.y) * 100));
          return [location.slug, { left: `${left}%`, top: `${top}%` }];
        }),
      );
      setTargetPositions(nextPositions);
    };

    map.whenReady(syncTargetPositions);
    map.on("move moveend zoom zoomend resize viewreset", syncTargetPositions);
    return () => {
      map.off("move moveend zoom zoomend resize viewreset", syncTargetPositions);
    };
  }, [visibleLocations]);

  useEffect(() => {
    const map = mapRef.current;
    if (map && overviewMode && indonesiaBoundsRef.current) {
      map.whenReady(() => {
        if (mapRef.current === map && indonesiaBoundsRef.current) {
          map.fitBounds(indonesiaBoundsRef.current, { animate: true, duration: 0.65, padding: [24, 24] });
        }
      });
      return;
    }
    if (map && selected) {
      map.whenReady(() => {
        if (mapRef.current === map && (map as unknown as { _mapPane?: HTMLElement })._mapPane) {
          map.setView(selected.coordinates, 7, { animate: true, duration: 0.55 });
        }
      });
    }
  }, [selected, overviewMode]);

  return (
    <div className="map-stage">
      <div className="map-hud">
        <div>
          <span className="eyebrow">Interactive map</span>
          <strong>{visibleLocations.length} locations in view</strong>
        </div>
        <div className="map-legend" aria-label="Map legend">
          <span>
            <i className="legend-dot dsp" />
            DSP
          </span>
          <span>
            <i className="legend-dot kek" />
            KEK
          </span>
          <span>
            <i className="legend-dot mixed" />
            DSP + KEK
          </span>
        </div>
      </div>
      <div className="map-canvas" ref={mapNode} aria-label="Interactive map of Indonesia tourism investment locations" />
      {overviewMode && (
        <div className="map-click-targets" aria-label="Overview map destination shortcuts">
          {visibleLocations.map((location) => {
            const position = targetPositions[location.slug];
            if (!position) return null;
            return (
              <button
                key={location.slug}
                type="button"
                data-map-target={location.slug}
                style={position}
                onPointerDown={(event) => handleTargetSelect(event, location)}
                onMouseDown={(event) => handleTargetSelect(event, location)}
                onClick={(event) => handleTargetSelect(event, location)}
                aria-label={`Select ${location.name}`}
              />
            );
          })}
        </div>
      )}
      <div className="map-visual-layer" aria-hidden="true">
        <div className="map-overview-chips">
          <span>
            <strong>5</strong>
            DSP
          </span>
          <span>
            <strong>10</strong>
            KEK signals
          </span>
          <span>
            <strong>6</strong>
            Regions
          </span>
        </div>
      </div>
      <div className="map-focus-pill" key={selected?.slug ?? "overview"}>
        <MapPin size={17} />
        <span>
          <strong>{selected ? selected.name : "Indonesia overview"}</strong>
          <small>{selected ? selected.province : "All DSP and tourism SEZ locations"}</small>
        </span>
      </div>
    </div>
  );
}

function IndonesiaOverviewPanel() {
  return (
    <aside className="side-panel overview-panel">
      <div className="overview-collage">
        <img src="/assets/images/hero/hero-01.jpg" alt="" />
        <img src="/assets/images/hero/hero-02.jpg" alt="" />
        <img src="/assets/images/hero/hero-03.jpg" alt="" />
      </div>
      <div className="side-panel-body">
        <div className="badge-row">
          <span className="badge red">National Map</span>
          <span className="badge gold">DSP + KEK</span>
        </div>
        <h2>Indonesia Tourism Investment Map</h2>
        <p>Select any pin to open a destination panel. Use filters to narrow the national map by opportunity type or island region.</p>
        <div className="metric-list">
          <div>
            <span>Locations in view</span>
            <strong>13 investable destinations</strong>
          </div>
          <div>
            <span>Priority coverage</span>
            <strong>5 DSP and tourism-oriented SEZ signals</strong>
          </div>
          <div>
            <span>Default view</span>
            <strong>Full Indonesia overview</strong>
          </div>
        </div>
        <a className="button primary full" href="/downloads/investment-guide.pdf" download>
          <Download size={18} />
          Download Investment Guide
        </a>
      </div>
    </aside>
  );
}

function LocationSidePanel({ location }: { location: TourismLocation }) {
  return (
    <aside className="side-panel">
      <img src={coverImage(location)} alt={`${location.name} overview`} />
      <div className="side-panel-body">
        <div className="badge-row">
          {location.category.map((category) => (
            <span className={category === "DSP" ? "badge red" : "badge gold"} key={category}>
              {category}
            </span>
          ))}
          <span className="badge muted">{location.province}</span>
        </div>
        <h2>{location.name}</h2>
        <p>{location.tourismType}</p>
        <div className="metric-list">
          <div>
            <span>Available land</span>
            <strong>{location.landAvailable}</strong>
          </div>
          <div>
            <span>Minimum investment</span>
            <strong>{location.minimumInvestment}</strong>
          </div>
          <div>
            <span>Revenue potential</span>
            <strong>{location.revenuePotential}</strong>
          </div>
          <div>
            <span>Indicative ROI</span>
            <strong>{location.roi}</strong>
          </div>
        </div>
        <div className="side-actions">
          <a className="button primary full" href={`#/location/${location.slug}`}>
            <ArrowRight size={18} />
            View Detail
          </a>
          <a className="button secondary full" href="https://oss.go.id" target="_blank" rel="noreferrer" title="OSS is the official government portal for integrated business licensing.">
            <ExternalLink size={18} />
            Start Investment Process
          </a>
        </div>
      </div>
    </aside>
  );
}

function LocationPage({ location }: { location: TourismLocation }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sourceImages = imageSet(location.imageSlug, location.imageCount);
  const coverIndex = Math.max(0, Math.min(sourceImages.length - 1, (location.coverImageIndex ?? 1) - 1));
  const images = coverIndex === 0 ? sourceImages : [sourceImages[coverIndex], ...sourceImages.filter((_, index) => index !== coverIndex)];
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    setActiveHero(0);
    const timer = window.setInterval(() => {
      setActiveHero((index) => (index + 1) % images.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [images.length, location.slug]);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/location/${location.slug}`;
    await navigator.clipboard.writeText(url);
  };

  return (
    <main>
      <section className="location-hero">
        {images.map((image, index) => (
          <img
            key={image}
            className={index === activeHero ? "active" : ""}
            src={image}
            alt={index === 0 ? `${location.name} investment opportunity` : ""}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="location-hero-scrim" />
        <div className="location-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="#/">Home</a>
            <span>/</span>
            <a href="#/opportunities">Investment Opportunities</a>
            <span>/</span>
            <strong>{location.name}</strong>
          </nav>
          <div className="badge-row">
            {location.category.map((category) => (
              <span className={category === "DSP" ? "badge red" : "badge gold"} key={category}>
                {category}
              </span>
            ))}
            <span className="badge muted light">{location.province}</span>
          </div>
          <h1>{location.name}</h1>
          <p>{location.tourismType}</p>
          <div className="hero-actions">
            <a className="button primary" href={location.document} download>
              <Download size={18} />
              Download Investment Memorandum
            </a>
            <a className="button ghost-light" href="https://oss.go.id" target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              Register via OSS
            </a>
          </div>
          <div className="location-hero-dots" aria-label={`${location.name} hero image indicator`}>
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={index === activeHero ? "active" : ""}
                onClick={() => setActiveHero(index)}
                aria-label={`Show ${location.name} hero image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section light">
        <div className="section-inner location-detail-grid">
          <article className="detail-main">
            <SectionHeading eyebrow="Executive summary" title={`${location.name} investment profile`} copy={location.summary} />
            <div className="stat-grid">
              {location.stats.map((stat) => (
                <div className="detail-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <small>{stat.note}</small>
                </div>
              ))}
            </div>

            <h2>Infrastructure Readiness</h2>
            <div className="check-grid">
              {location.infrastructure.map((item) => (
                <div key={item}>
                  <Check size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <h2>Investment Zones</h2>
            <div className="zone-grid">
              {location.zones.map((zone) => (
                <article key={zone.name} className="zone-card">
                  <span>{zone.area}</span>
                  <h3>{zone.name}</h3>
                  <p>{zone.use}</p>
                  <strong>{zone.capex}</strong>
                </article>
              ))}
            </div>

            <h2>Permitting and Process</h2>
            <div className="process-stack">
              {licensingSteps.slice(0, 5).map((step, index) => (
                <div key={step.title}>
                  <span>{index + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <small>
                      {step.agency} - {step.time}
                    </small>
                  </div>
                </div>
              ))}
            </div>

            <h2>Gallery</h2>
            <div className="gallery-grid">
              {images.map((image, index) => (
                <button key={image} type="button" onClick={() => setLightbox(image)} aria-label={`Open ${location.name} gallery image ${index + 1}`}>
                  <img src={image} alt={`${location.name} gallery ${index + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          </article>

          <aside className="detail-sidebar">
            <div className="sidebar-block">
              <h2>Investor Signals</h2>
              <div className="metric-list">
                <div>
                  <span>Land available</span>
                  <strong>{location.landAvailable}</strong>
                </div>
                <div>
                  <span>Minimum investment</span>
                  <strong>{location.minimumInvestment}</strong>
                </div>
                <div>
                  <span>ROI</span>
                  <strong>{location.roi}</strong>
                </div>
                <div>
                  <span>Demand driver</span>
                  <strong>{location.demand}</strong>
                </div>
              </div>
              <a className="button primary full" href={location.document} download>
                <ArrowDownToLine size={18} />
                Download Memorandum
              </a>
            </div>
            <AdvisorCard advisor={advisorForLocation(location)} locationName={location.name} />
            <div className="sidebar-block">
              <h2>Share</h2>
              <div className="share-grid">
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#/location/${location.slug}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share to LinkedIn"
                >
                  <Share2 size={18} />
                  LinkedIn
                </a>
                <a href={`mailto:?subject=${encodeURIComponent(location.seo.title)}&body=${encodeURIComponent(location.seo.description)}`} aria-label="Share by email">
                  <Mail size={18} />
                  Email
                </a>
                <button type="button" onClick={copyLink} aria-label="Copy page link">
                  <Copy size={18} />
                  Copy Link
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button type="button" className="icon-button" onClick={() => setLightbox(null)} aria-label="Close gallery">
            <X size={22} />
          </button>
          <img src={lightbox} alt={`${location.name} enlarged gallery`} />
        </div>
      )}
    </main>
  );
}

function AdvisorCard({ advisor: contact, locationName }: { advisor: Advisor; locationName: string }) {
  const subject = encodeURIComponent(contact.mailtoSubjectTemplate);
  const body = encodeURIComponent(`Hello ${contact.displayName},\n\nI would like to ask about investment opportunities in ${locationName}.\n\nThank you.`);
  const whatsapp = contact.whatsapp.replace(/[^\d]/g, "");
  const hasLocationInTemplate = contact.whatsappMessageTemplate.toLowerCase().includes(locationName.toLowerCase());
  const whatsappMessage = encodeURIComponent(
    hasLocationInTemplate ? contact.whatsappMessageTemplate : `${contact.whatsappMessageTemplate} Location of interest: ${locationName}.`,
  );

  return (
    <article className="advisor-card">
      <div className="advisor-avatar">
        <Landmark size={28} />
      </div>
      <div>
        <span className="eyebrow">Named Advisor</span>
        <h3>{contact.displayName}</h3>
        <p>{contact.role}</p>
        <div className="advisor-meta">
          <span>{contact.email}</span>
          <span>{contact.officeHours}</span>
        </div>
        <small>{contact.responseSla}</small>
      </div>
      <div className="advisor-actions">
        <a className="button secondary-blue full" href={`mailto:${contact.email}?subject=${subject}&body=${body}`}>
          <Mail size={18} />
          Send Email
        </a>
        <a className="button secondary full" href={`https://wa.me/${whatsapp}?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
          <MessageCircle size={18} />
          Chat WhatsApp
        </a>
      </div>
    </article>
  );
}

function DataPage() {
  const [view, setView] = useState<KpiView>("chart");

  const csvHref = useMemo(() => {
    const header = ["Metric", "Current Value", "YoY", "Unit", ...years, "Source"];
    const rows = kpis.map((kpi) => [kpi.label, kpi.value, `${kpi.yoy}%`, kpi.unit, ...kpi.trend.map(String), kpi.source]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    return URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="Data & Statistics"
        title="Tourism KPI dashboard for investor screening"
        copy="Six headline indicators with YoY movement, five-year trend visuals, source labels, and downloadable CSV data."
        image="/assets/images/hero/hero-05.jpg"
      />
      <section className="section light">
        <div className="section-inner">
          <div className="dashboard-toolbar">
            <div>
              <span className="eyebrow">Last updated</span>
              <strong>Q2 2026 prototype dataset</strong>
            </div>
            <SegmentedControl options={["chart", "table"] as const} value={view} onChange={setView} />
            <a className="button secondary-blue" href={csvHref} download="indonesia-tourism-kpi-placeholder.csv">
              <Database size={18} />
              Download Data
            </a>
          </div>
          {view === "chart" ? (
            <div className="kpi-dashboard-grid">
              {kpis.map((kpi) => (
                <KpiCard key={kpi.label} kpi={kpi} detailed />
              ))}
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Current</th>
                    <th>YoY</th>
                    {years.map((year) => (
                      <th key={year}>{year}</th>
                    ))}
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {kpis.map((kpi) => (
                    <tr key={kpi.label}>
                      <td>{kpi.label}</td>
                      <td>{kpi.value}</td>
                      <td className={kpi.yoy >= 0 ? "positive" : "negative"}>{kpi.yoy}%</td>
                      {kpi.trend.map((value, index) => (
                        <td key={`${kpi.label}-${years[index]}`}>{value}</td>
                      ))}
                      <td>{kpi.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function KpiCard({ kpi, detailed = false }: { kpi: (typeof kpis)[number]; detailed?: boolean }) {
  const max = Math.max(...kpi.trend);
  const min = Math.min(...kpi.trend);
  const range = max - min || 1;
  const points = kpi.trend
    .map((value, index) => {
      const x = 8 + index * 45;
      const y = 66 - ((value - min) / range) * 48;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <article className={detailed ? "kpi-card detailed" : "kpi-card"}>
      <div className="kpi-title-row">
        <h3>{kpi.label}</h3>
        <span className={kpi.yoy >= 0 ? "trend positive" : "trend negative"}>
          <TrendingUp size={16} />
          {kpi.yoy}%
        </span>
      </div>
      <strong>{kpi.value}</strong>
      <svg className="sparkline-chart" viewBox="0 0 200 78" role="img" aria-label={`${kpi.label} five year trend`}>
        <polyline points={points} fill="none" stroke="#2f44ce" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {kpi.trend.map((value, index) => {
          const x = 8 + index * 45;
          const y = 66 - ((value - min) / range) * 48;
          return <circle key={`${kpi.label}-${value}-${index}`} cx={x} cy={y} r="4" fill="#e78654" />;
        })}
      </svg>
      {detailed && (
        <div className="kpi-foot">
          <span>{kpi.unit}</span>
          <small>{kpi.source}</small>
        </div>
      )}
    </article>
  );
}

function LicensingPage() {
  const [active, setActive] = useState(2);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main>
      <PageHero
        eyebrow="Regulatory & Compliance"
        title="Licensing pathway from registration to operation"
        copy="A chronological OSS/NIB-centered process with documents, agencies, estimated timing, FAQs, and a downloadable checklist."
        image="/assets/images/hero/hero-06.jpg"
      />
      <section className="section light">
        <div className="section-inner">
          <div className="licensing-summary">
            <div>
              <CalendarClock size={28} />
              <span>Total estimated time</span>
              <strong>35-60 business days</strong>
            </div>
            <a className="button primary" href="https://oss.go.id" target="_blank" rel="noreferrer" title="OSS is the official government portal for integrated business licensing.">
              <ExternalLink size={18} />
              Register via OSS
            </a>
            <a className="button secondary-blue" href="/downloads/licensing-checklist.pdf" download>
              <Download size={18} />
              Download Checklist
            </a>
          </div>
          <div className="licensing-layout">
            <div className="timeline">
              {licensingSteps.map((step, index) => (
                <button key={step.title} type="button" className={active === index ? "active" : ""} onClick={() => setActive(index)}>
                  <span>{index + 1}</span>
                  <strong>{step.title}</strong>
                  <small>{step.time}</small>
                </button>
              ))}
            </div>
            <article className="step-detail">
              <span className="eyebrow">Step {active + 1}</span>
              <h2>{licensingSteps[active].title}</h2>
              <dl>
                <div>
                  <dt>Agency</dt>
                  <dd>{licensingSteps[active].agency}</dd>
                </div>
                <div>
                  <dt>Estimated time</dt>
                  <dd>{licensingSteps[active].time}</dd>
                </div>
                <div>
                  <dt>Documents</dt>
                  <dd>{licensingSteps[active].documents}</dd>
                </div>
              </dl>
              <a className="button primary" href={licensingSteps[active].link} target="_blank" rel="noreferrer">
                <ExternalLink size={18} />
                Continue to OSS
              </a>
            </article>
          </div>
          <div className="oss-guide">
            <h2>OSS/NIB quick guide</h2>
            <div className="process-mini">
              {["Register an OSS account", "Choose relevant tourism KBLI", "Apply for NIB"].map((item, index) => (
                <div key={item}>
                  <span>{index + 1}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <article key={faq.question} className={openFaq === index ? "open" : ""}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <strong>{faq.question}</strong>
                  <ChevronDown size={20} />
                </button>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(downloads.map((item) => item.category)))];
  const filtered = downloads.filter((item) => {
    const queryMatch = `${item.title} ${item.destination} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    const categoryMatch = category === "All" || item.category === category;
    return queryMatch && categoryMatch;
  });

  return (
    <main>
      <PageHero
        eyebrow="Resources"
        title="Investment documents ready for download"
        copy="Download the national guide, licensing checklist, DSP memoranda, and tourism SEZ overview without login for the prototype."
        image="/assets/images/hero/hero-07.jpg"
      />
      <section className="section light">
        <div className="section-inner">
          <div className="resource-toolbar">
            <label className="search-box">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documents" />
            </label>
            <SegmentedControl options={categories} value={category} onChange={setCategory} />
          </div>
          <div className="resource-grid">
            {filtered.map((item) => (
              <ResourceCard key={item.file} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ResourceCard({ item }: { item: DownloadItem }) {
  return (
    <article className="resource-card">
      <div className="pdf-cover">
        <FileText size={34} />
        <span>{item.category}</span>
      </div>
      <div>
        <span className="eyebrow">{item.destination} - {item.year}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <a className="button secondary-blue full" href={item.file} download>
          <Download size={18} />
          Download PDF
        </a>
      </div>
    </article>
  );
}

function PageHero({ eyebrow, title, copy, image }: { eyebrow: string; title: string; copy: string; image: string }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" />
      <div className="page-hero-scrim" />
      <div className="page-hero-content">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href="#/">
          <img src="/kemenpar-logo.png" alt="Ministry of Tourism logo" />
          <span>
            <strong>Invest in Indonesia Tourism</strong>
            <small>Ministry of Tourism, Republic of Indonesia</small>
          </span>
        </a>
        <p>Indonesia's tourism investment gateway for priority destinations, Special Economic Zones, investor data, and licensing guidance.</p>
      </div>
      <div className="footer-links">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <h1>Location not found</h1>
      <a className="button primary" href="#/opportunities">
        <MapPin size={18} />
        Back to Opportunities
      </a>
    </main>
  );
}

export default App;
