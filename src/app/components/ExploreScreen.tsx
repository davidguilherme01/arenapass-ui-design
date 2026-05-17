import { useState, useEffect, useRef } from 'react';
import {
  MapPin, Trophy, ChevronRight, X, Bus, Hotel, Camera,
  Sun, Utensils, Shield, Calendar, Users,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNavigation } from './BottomNavigation';
import { ImageWithFallback } from './ImageWithFallback';
import { FlagIcon } from './FlagIcon';

// ─── Hero slides ──────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  { city: 'Nova York', country: '🇺🇸', subtitle: 'Final da Copa • MetLife Stadium', image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { city: 'Los Angeles', country: '🇺🇸', subtitle: 'Semifinal • SoFi Stadium', image: 'https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { city: 'Cidade do México', country: '🇲🇽', subtitle: 'Clássico das Américas • Estadio Azteca', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { city: 'Vancouver', country: '🇨🇦', subtitle: 'Quartas de Final • BC Place', image: 'https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
];

// ─── City cards (featured 7) ──────────────────────────────────────────────────
const CITIES = [
  { name: 'Nova York / NJ', countryCode: 'us', stadium: 'MetLife Stadium',   matches: 8, highlight: '🏆 Final da Copa',        climate: '☀️ 28°C' },
  { name: 'Los Angeles',    countryCode: 'us', stadium: 'SoFi Stadium',       matches: 6, highlight: '⭐ Semifinal',             climate: '☀️ 30°C' },
  { name: 'Cidade do México', countryCode: 'mx', stadium: 'Estadio Azteca',   matches: 5, highlight: '🌎 Clássico das Américas', climate: '⛅ 18°C' },
  { name: 'Dallas',         countryCode: 'us', stadium: 'AT&T Stadium',       matches: 6, highlight: '⭐ Quartas de Final',      climate: '☀️ 35°C' },
  { name: 'Miami',          countryCode: 'us', stadium: 'Hard Rock Stadium',  matches: 5, highlight: '🌊 Praia + Futebol',       climate: '☀️ 32°C' },
  { name: 'Vancouver',      countryCode: 'ca', stadium: 'BC Place',           matches: 4, highlight: '🏔️ Montanhas + Copa',      climate: '🌤️ 20°C' },
  { name: 'Toronto',        countryCode: 'ca', stadium: 'BMO Field',          matches: 5, highlight: '🏙️ Metrópole',             climate: '🌤️ 22°C' },
];

// ─── Stadium cards ─────────────────────────────────────────────────────────────
const STADIUMS = [
  { name: 'MetLife Stadium',   city: 'Nova York / NJ',   country: '🇺🇸', capacity: '82.500', matches: 8, highlight: '🏆 Final da Copa',      image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { name: 'Estadio Azteca',    city: 'Cidade do México', country: '🇲🇽', capacity: '87.523', matches: 5, highlight: '⚽ Maior da Copa',       image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { name: 'AT&T Stadium',      city: 'Dallas',           country: '🇺🇸', capacity: '80.000', matches: 6, highlight: '🎸 Cowboys Country',     image: 'https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { name: 'SoFi Stadium',      city: 'Los Angeles',      country: '🇺🇸', capacity: '70.240', matches: 6, highlight: '🎬 Hollywood Vibes',     image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { name: 'Hard Rock Stadium', city: 'Miami',            country: '🇺🇸', capacity: '65.326', matches: 5, highlight: '🌴 Tropical Vibes',      image: 'https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
];

// ─── Popular matches (Netflix-style) ─────────────────────────────────────────
const POPULAR_MATCHES = [
  { id: 1, home: 'Brasil',  homeCode: 'br', away: 'Argentina', awayCode: 'ar', date: '14 Jul', time: '16:00', stadium: 'MetLife Stadium', city: 'Nova York',        price: 'R$ 450', tickets: 234, badge: '🔥 Mais procurado' },
  { id: 2, home: 'França',  homeCode: 'fr', away: 'Alemanha',  awayCode: 'de', date: '10 Jul', time: '20:00', stadium: 'SoFi Stadium',     city: 'Los Angeles',      price: 'R$ 420', tickets: 89,  badge: '⭐ Semifinal' },
  { id: 3, home: 'Espanha', homeCode: 'es', away: 'Portugal',  awayCode: 'pt', date: '05 Jul', time: '18:00', stadium: 'AT&T Stadium',     city: 'Dallas',           price: 'R$ 380', tickets: 45,  badge: '⚽ Clássico Ibérico' },
  { id: 4, home: 'EUA',     homeCode: 'us', away: 'México',    awayCode: 'mx', date: '02 Jul', time: '18:00', stadium: 'Estadio Azteca',   city: 'Cidade do México', price: 'R$ 320', tickets: 12,  badge: '🌎 Américas' },
];

// ─── Quick category chips ─────────────────────────────────────────────────────
const QUICK_CATEGORIES = [
  '🔥 Mais procurados',
  '💸 Mais baratos',
  '⭐ Semifinais',
  '🏆 Final',
  '🌎 Internacionais',
  '🇧🇷 Brasil',
];

// ─── City guide data ──────────────────────────────────────────────────────────
type CityGuide = { transport: string[]; hotels: string[]; safety: string; climate: string; tourism: string[]; restaurants: string[] };

const CITY_GUIDES: Record<string, CityGuide> = {
  'Nova York / NJ': {
    transport: ['NJ Transit + PATH até Newark Penn Station', 'MetLife Link Express Bus (dias de jogo)', 'Uber/Lyft: ~45 min do centro NY', 'Carro: NJ Turnpike, saída 16W'],
    hotels: ['Meadowlands Plaza Hotel (5 km)', 'Westin Jersey City (8 km)', 'Times Square NY Hotels (15 km)', 'Newark Airport Marriott (10 km)'],
    safety: 'Área segura para turistas. Atenção nas estações de metrô à noite. Use transporte por aplicativo.',
    climate: '☀️ Julho: 28–33°C, pouca chuva, umidade alta. Leve protetor solar.',
    tourism: ['Estátua da Liberdade 🗽', 'Times Square 🌃', 'Central Park 🌳', 'Brooklyn Bridge 🌉', 'Empire State Building 🏙️'],
    restaurants: ['Shake Shack', "Katz's Deli", "Joe's Pizza", 'Peter Luger Steak House', 'Di Fara Pizza'],
  },
  'Los Angeles': {
    transport: ['Metro Rail C Line até Downtown Inglewood', 'Shuttle oficial FIFA nos dias de jogo', 'Uber/Lyft: ~20 min do centro LA', 'Carro: I-405 Sul, saída Manchester'],
    hotels: ['Courtyard Marriott Hawthorne (3 km)', 'Hilton Garden Inn Inglewood (4 km)', 'Beverly Hills Hotels (25 km)', 'Santa Monica Beachfront (30 km)'],
    safety: 'Região turística segura. Cuidado com pertences em praias. Evite Downtown à noite.',
    climate: '☀️ Julho: 28–32°C, ensolarado, clima seco. Névoa matinal possível.',
    tourism: ['Hollywood Sign 🎬', 'Santa Monica Pier 🎡', 'Universal Studios 🎢', 'Getty Center 🖼️', 'Beverly Hills 💎'],
    restaurants: ['In-N-Out Burger', 'Nobu Malibu', 'Grand Central Market', 'Bestia', 'Gjelina'],
  },
  'Cidade do México': {
    transport: ['Metrô Linha 2 – Tasqueña até Estadio Azteca', 'Metrobús disponível na Insurgentes', 'Táxi/Uber regulamentado', 'Ônibus especial FIFA nos dias de jogo'],
    hotels: ['Camino Real Pedregal (5 km)', 'Presidente Intercontinental CDMX (12 km)', 'Four Seasons Polanco (15 km)', 'Hotéis da Zona Rosa (13 km)'],
    safety: 'Fique em Polanco, Roma Norte e Condesa. Evite andar sozinho à noite em áreas desconhecidas.',
    climate: '⛅ Julho: 18–23°C, temporada de chuvas à tarde. Leve guarda-chuva leve.',
    tourism: ['Templo Mayor 🏛️', 'Bosque de Chapultepec 🌲', 'Pirâmides de Teotihuacán', 'Zócalo 🏛️', 'Museu Frida Kahlo 🎨'],
    restaurants: ['El Cardenal', 'Pujol (fine dining) ⭐', 'Contramar', 'Mercado Roma', 'Taqueria El Califa'],
  },
  'Dallas': {
    transport: ['DART + Trinity Railway Express até Arlington', 'AT&T Stadium Shuttle Express', 'Uber/Lyft recomendado', 'Carro: I-30, saída Nolan Ryan Expy'],
    hotels: ['Loews Arlington Hotel (1 km)', 'Sheraton Arlington (2 km)', 'Omni Dallas Hotel (30 km)', 'Marriott Dallas Uptown'],
    safety: 'Cidade segura nas áreas principais. Use transporte por aplicativo à noite.',
    climate: '☀️ Julho: 33–38°C, muito quente e seco. Hidrate-se bastante e use protetor solar!',
    tourism: ['Dealey Plaza 📖', 'AT&T Discovery District', 'Deep Ellum (música ao vivo) 🎸', 'Dallas Arboretum 🌸', 'Perot Museum 🔬'],
    restaurants: ['Pecan Lodge BBQ 🍖', "Al Biernat's", 'Uchi Dallas', "Ellen's Southern Kitchen", 'Lockhart Smokehouse'],
  },
  'Miami': {
    transport: ['Metrorail + Metromover', 'Shuttle Hard Rock Stadium nos dias de jogo', 'Uber/Lyft recomendado', 'Carro: I-95, saída NW 199th St'],
    hotels: ['Hilton Miami Airport (5 km)', 'Fontainebleau Miami Beach (20 km)', 'W South Beach', 'Intercontinental Miami'],
    safety: 'Área turística segura. Cuidado com calor extremo e sol forte. Atenção a itens pessoais na praia.',
    climate: '☀️ Julho: 32–35°C, alta umidade, chuvas rápidas à tarde. Use roupas leves.',
    tourism: ['South Beach 🏖️', 'Wynwood Walls 🎨', 'Art Deco Historic District', 'Everglades 🐊', 'Little Havana 🎺'],
    restaurants: ["Joe's Stone Crab 🦀", 'Versailles Restaurant 🇨🇺', 'Mandolin Aegean Bistro', 'KYU', 'Zuma Miami'],
  },
  'Vancouver': {
    transport: ['Canada Line SkyTrain até Stadium-Chinatown', 'BC Place está a pé do centro', 'SeaBus + ônibus disponíveis', 'Carro: Cambie St Bridge'],
    hotels: ['JW Marriott Parq Vancouver (0.5 km) ⭐', 'Fairmont Pacific Rim (1 km)', 'Rosewood Hotel Georgia (1.5 km)', 'Westin Grand Vancouver (2 km)'],
    safety: 'Uma das cidades mais seguras do mundo. Excelente para turistas. Muito walkable.',
    climate: '🌤️ Julho: 18–23°C, agradável, poucas chuvas no verão. Clima perfeito!',
    tourism: ['Stanley Park 🌲', 'Granville Island Market 🛍️', 'Capilano Suspension Bridge', 'Grouse Mountain 🏔️', 'Gastown 🕰️'],
    restaurants: ['Hawksworth Restaurant ⭐', 'Miku Sushi 🍣', "Vij's Indian", "The Salmon n' Bannock 🐟", 'Chambar Restaurant'],
  },
  'Toronto': {
    transport: ['TTC Subway Linha 1 até Exhibition', 'Streetcar 509/511 até BMO Field', 'Walk 15 min do centro', 'Uber/Lyft disponível'],
    hotels: ['Novotel Toronto Centre (3 km)', 'Radisson Blu Toronto Downtown (2 km)', 'Sheraton Centre Toronto', 'The Drake Hotel (3 km)'],
    safety: 'Cidade muito segura e diversa. Excelente para turistas de todas as culturas.',
    climate: '🌤️ Julho: 22–27°C, agradável, sol com poucas chuvas. Ideal para explorar.',
    tourism: ['CN Tower 🏙️', "Ripley's Aquarium 🦈", 'Distillery District 🍺', 'Kensington Market 🎨', 'Royal Ontario Museum 🏛️'],
    restaurants: ['Canoe Restaurant ⭐', 'Pai Thai 🍜', 'Alo (fine dining) ⭐⭐', 'St. Lawrence Market 🥩', 'Bar Isabel'],
  },
};

// ─── FIFA 2026 host venues (real lat/lng for Google Maps) ────────────────────
const FIFA_MAP_VENUES = [
  { displayName: 'Vancouver',        stadium: 'BC Place',                  lat: 49.2767,  lng: -123.1119, guide: 'Vancouver'        },
  { displayName: 'Seattle',          stadium: 'Lumen Field',               lat: 47.5952,  lng: -122.3316, guide: null               },
  { displayName: 'São Francisco',    stadium: "Levi's Stadium",            lat: 37.4032,  lng: -121.9699, guide: null               },
  { displayName: 'Los Angeles',      stadium: 'SoFi Stadium',              lat: 33.9535,  lng: -118.3392, guide: 'Los Angeles'      },
  { displayName: 'Kansas City',      stadium: 'Arrowhead Stadium',         lat: 39.0489,  lng: -94.4839,  guide: null               },
  { displayName: 'Dallas',           stadium: 'AT&T Stadium',              lat: 32.7480,  lng: -97.0931,  guide: 'Dallas'           },
  { displayName: 'Houston',          stadium: 'NRG Stadium',               lat: 29.6847,  lng: -95.4107,  guide: null               },
  { displayName: 'Atlanta',          stadium: 'Mercedes-Benz Stadium',     lat: 33.7553,  lng: -84.4006,  guide: null               },
  { displayName: 'Miami',            stadium: 'Hard Rock Stadium',         lat: 25.9580,  lng: -80.2388,  guide: 'Miami'            },
  { displayName: 'Filadélfia',       stadium: 'Lincoln Financial Field',   lat: 39.9007,  lng: -75.1675,  guide: null               },
  { displayName: 'Nova York / NJ',   stadium: 'MetLife Stadium',           lat: 40.8135,  lng: -74.0745,  guide: 'Nova York / NJ'  },
  { displayName: 'Boston',           stadium: 'Gillette Stadium',          lat: 42.0909,  lng: -71.2643,  guide: null               },
  { displayName: 'Toronto',          stadium: 'BMO Field',                 lat: 43.6331,  lng: -79.4188,  guide: 'Toronto'          },
  { displayName: 'Guadalajara',      stadium: 'Estadio Akron',             lat: 20.6869,  lng: -103.4729, guide: null               },
  { displayName: 'Monterrey',        stadium: 'Estadio BBVA',              lat: 25.6690,  lng: -100.2462, guide: null               },
  { displayName: 'Cidade do México', stadium: 'Estadio Azteca',            lat: 19.3031,  lng: -99.1506,  guide: 'Cidade do México' },
];

type GuideTab = 'transporte' | 'hoteis' | 'turismo' | 'clima';

// ─────────────────────────────────────────────────────────────────────────────

export function ExploreScreen() {
  const navigate = useNavigate();
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [guideTab, setGuideTab] = useState<GuideTab>('transporte');

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const guide = selectedCity ? CITY_GUIDES[selectedCity] ?? null : null;

  function openCityGuide(cityName: string) {
    setSelectedCity(cityName);
    setGuideTab('transporte');
  }

  // ── Google Maps ──────────────────────────────────────────────────────────────
  const mapDivRef = useRef<HTMLDivElement>(null);
  const openGuideRef = useRef(openCityGuide);
  openGuideRef.current = openCityGuide;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiKey: string = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) ?? '';
    if (!apiKey || !mapDivRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    function initMap() {
      if (!mapDivRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const maps = (window as any).google?.maps;
      if (!maps) return;

      const map = new maps.Map(mapDivRef.current, {
        center: { lat: 37.5, lng: -96 },
        zoom: 3,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControlOptions: { position: 9 },
      });

      FIFA_MAP_VENUES.forEach(venue => {
        const marker = new maps.Marker({
          position: { lat: venue.lat, lng: venue.lng },
          map,
          title: venue.displayName,
          icon: {
            path: maps.SymbolPath.CIRCLE,
            scale: venue.guide ? 9 : 6,
            fillColor: '#F5C518',
            fillOpacity: 1,
            strokeColor: venue.guide ? '#1E7F43' : '#999999',
            strokeWeight: venue.guide ? 2.5 : 1,
          },
        });

        const infoWindow = new maps.InfoWindow({
          content: `<div style="font-family:sans-serif;font-size:13px;line-height:1.5;padding:2px 4px">
            <strong>${venue.displayName}</strong><br/>
            <span style="color:#555;font-size:12px">${venue.stadium}</span>
            ${venue.guide ? '<br/><span style="color:#1E7F43;font-size:11px;font-weight:600">▶ Ver guia da cidade</span>' : ''}
          </div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open({ anchor: marker, map });
          if (venue.guide) openGuideRef.current(venue.guide);
        });
      });
    }

    if (win.google?.maps) {
      initMap();
      return;
    }

    if (document.getElementById('google-maps-api')) {
      const poll = setInterval(() => {
        if (win.google?.maps) { clearInterval(poll); initMap(); }
      }, 100);
      return () => clearInterval(poll);
    }

    const script = document.createElement('script');
    script.id = 'google-maps-api';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">

      {/* ── Hero banner (auto-rotating) ── */}
      <div className="relative h-56 overflow-hidden">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.city}
            className={`absolute inset-0 transition-opacity duration-700 ${i === heroSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <ImageWithFallback src={slide.image} alt={slide.city} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />
          </div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Copa do Mundo 2026</p>
          <h1 className="text-white text-2xl font-bold mb-0.5">
            {HERO_SLIDES[heroSlide].country} {HERO_SLIDES[heroSlide].city}
          </h1>
          <p className="text-white/80 text-sm">{HERO_SLIDES[heroSlide].subtitle}</p>
        </div>

        {/* Slide indicator dots */}
        <div className="absolute bottom-5 right-6 flex gap-1.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === heroSlide ? 'w-5 bg-accent' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">

        {/* ── Quick category chips ── */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 scrollbar-none">
          {QUICK_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap border transition-colors cursor-pointer shrink-0 ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-white/10 text-gray-700 dark:text-[#c8c8c8] hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Explorar por cidade ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2>Explorar por Cidade</h2>
            <button className="text-primary text-sm flex items-center gap-1 hover:text-primary/70 transition-colors cursor-pointer">
              Ver todas <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-none">
            {CITIES.map(city => (
              <button
                key={city.name}
                onClick={() => openCityGuide(city.name)}
                className="shrink-0 w-44 bg-white dark:bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-white/10 text-left cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="bg-gradient-to-br from-primary to-primary/80 p-4">
                  <FlagIcon code={city.countryCode} size={40} alt="" className="h-7 w-auto shadow-sm mb-2" />
                  <p className="text-white font-semibold text-sm leading-tight">{city.name}</p>
                  <p className="text-white/70 text-xs mt-0.5">{city.climate}</p>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-[#9a9a9a] mb-1.5">
                    <Trophy className="w-3.5 h-3.5 shrink-0" />
                    <span>{city.matches} partidas</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-[#9a9a9a] mb-3">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{city.stadium}</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 bg-accent/15 text-[#92400e] dark:text-[#fbbf24] text-[10px] rounded-lg font-medium">
                    {city.highlight}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Partidas populares da semana (Netflix-style) ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2>🔥 Partidas da Semana</h2>
            <button
              onClick={() => navigate('/')}
              className="text-primary text-sm flex items-center gap-1 hover:text-primary/70 transition-colors cursor-pointer"
            >
              Ver todas <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-none">
            {POPULAR_MATCHES.map(match => (
              <button
                key={match.id}
                onClick={() => navigate(`/match/${match.id}`)}
                className="shrink-0 w-56 bg-[#14532D] rounded-2xl p-4 text-left cursor-pointer hover:shadow-lg transition-shadow border border-[#166534]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 bg-accent text-[#14532D] text-[10px] font-bold rounded-lg whitespace-nowrap">
                    {match.badge}
                  </span>
                  <span className="text-accent font-bold text-sm ml-2 shrink-0">{match.price}</span>
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 mb-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <FlagIcon code={match.homeCode} size={40} alt={match.home} className="h-6 w-auto shadow-md shrink-0" />
                    <span className="text-white font-semibold text-sm truncate">{match.home}</span>
                  </div>
                  <span className="text-[#86EFAC] font-bold text-xs px-1">vs</span>
                  <div className="flex items-center gap-1.5 justify-end min-w-0">
                    <span className="text-white font-semibold text-sm truncate">{match.away}</span>
                    <FlagIcon code={match.awayCode} size={40} alt={match.away} className="h-6 w-auto shadow-md shrink-0" />
                  </div>
                </div>

                <div className="text-[#D1FAE5] text-xs space-y-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 shrink-0" />
                    {match.date} • {match.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{match.stadium}</span>
                  </div>
                  {match.tickets < 100 && (
                    <p className="text-orange-300 font-medium">⚠️ {match.tickets} ingressos restantes</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Explorar por estádio ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2>Estádios</h2>
            <button className="text-primary text-sm flex items-center gap-1 hover:text-primary/70 transition-colors cursor-pointer">
              Ver todos <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {STADIUMS.map(stadium => (
              <div
                key={stadium.name}
                className="bg-white dark:bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-white/10 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate('/')}
              >
                <div className="relative h-36">
                  <ImageWithFallback src={stadium.image} alt={stadium.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-base leading-tight">{stadium.name}</h3>
                        <div className="flex items-center gap-1 text-white/75 text-xs mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {stadium.country} {stadium.city}
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-accent text-[#14532D] text-[10px] font-bold rounded-lg whitespace-nowrap shrink-0">
                        {stadium.highlight}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-gray-600 dark:text-[#9a9a9a]">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      {stadium.capacity}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4" />
                      {stadium.matches} partidas
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-primary text-white text-xs rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
                    Ver Ingressos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Google Maps das 16 sedes ── */}
        <section>
          <h2 className="mb-3">🗺️ Mapa das Sedes</h2>
          {(import.meta.env.VITE_GOOGLE_MAPS_API_KEY) ? (
            <div
              ref={mapDivRef}
              className="w-full rounded-2xl overflow-hidden shadow-lg"
              style={{ height: 340 }}
            />
          ) : (
            <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] dark:from-[#1a2e1a] dark:to-[#0d1f0d] flex flex-col items-center justify-center gap-4 px-6 text-center" style={{ height: 220 }}>
              <MapPin className="w-10 h-10 text-primary/60" />
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Google Maps desativado</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Crie um arquivo <code className="bg-white/70 dark:bg-black/30 px-1.5 py-0.5 rounded font-mono text-xs">.env</code> na raiz do projeto com:<br/>
                  <code className="bg-white/70 dark:bg-black/30 px-1.5 py-0.5 rounded font-mono text-xs">VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui</code>
                </p>
              </div>
            </div>
          )}
          <p className="text-xs text-gray-500 dark:text-[#6e6e6e] text-center mt-2">
            🌎 16 cidades-sede · Marcadores maiores têm guia de viagem
          </p>
        </section>

      </div>

      {/* ── City Guide Bottom Sheet ── */}
      {selectedCity && guide && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end" role="dialog" aria-modal="true" aria-label={`Guia de ${selectedCity}`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCity(null)} />

          <div className="relative bg-white dark:bg-[#1e1e1e] rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh]">

            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 bg-gray-300 dark:bg-white/20 rounded-full" />
            </div>

            <div className="flex items-center justify-between px-6 pt-2 pb-3 shrink-0">
              <div className="flex items-center gap-3">
                {CITIES.find(c => c.name === selectedCity) && (
                  <FlagIcon code={CITIES.find(c => c.name === selectedCity)!.countryCode} size={40} alt="" className="h-8 w-auto rounded-sm" />
                )}
                <div>
                  <h3 className="font-bold text-lg leading-tight">{selectedCity}</h3>
                  <p className="text-xs text-gray-500 dark:text-[#9a9a9a]">
                    {CITIES.find(c => c.name === selectedCity)?.stadium} · {CITIES.find(c => c.name === selectedCity)?.matches} partidas
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCity(null)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#3a3a3a] transition-colors cursor-pointer"
                aria-label="Fechar guia"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab bar */}
            <div className="flex gap-2 px-6 pb-3 shrink-0 overflow-x-auto scrollbar-none">
              {([
                { id: 'transporte', icon: Bus,      label: 'Transporte' },
                { id: 'hoteis',     icon: Hotel,    label: 'Hotéis' },
                { id: 'turismo',    icon: Camera,   label: 'Turismo' },
                { id: 'clima',      icon: Sun,      label: 'Clima & Segurança' },
              ] as { id: GuideTab; icon: typeof Bus; label: string }[]).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setGuideTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    guideTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-[#9a9a9a] hover:bg-gray-200 dark:hover:bg-[#3a3a3a]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="w-full h-px bg-gray-100 dark:bg-white/10 shrink-0" />

            <div className="overflow-y-auto flex-1 px-6 py-5">

              {guideTab === 'transporte' && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-500 dark:text-[#9a9a9a] uppercase tracking-wide mb-4">Como chegar ao estádio</p>
                  {guide.transport.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Bus className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-[#c8c8c8] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {guideTab === 'hoteis' && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-500 dark:text-[#9a9a9a] uppercase tracking-wide mb-4">Hotéis próximos ao estádio</p>
                  {guide.hotels.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                      <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Hotel className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-[#c8c8c8] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {guideTab === 'turismo' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-[#9a9a9a] uppercase tracking-wide mb-3">Pontos turísticos</p>
                    <div className="space-y-2">
                      {guide.tourism.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                          <Camera className="w-4 h-4 text-primary shrink-0" />
                          <p className="text-sm text-gray-700 dark:text-[#c8c8c8]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-[#9a9a9a] uppercase tracking-wide mb-3">Restaurantes</p>
                    <div className="space-y-2">
                      {guide.restaurants.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                          <Utensils className="w-4 h-4 text-primary shrink-0" />
                          <p className="text-sm text-gray-700 dark:text-[#c8c8c8]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {guideTab === 'clima' && (
                <div className="space-y-4">
                  <div className="p-4 bg-sky-50 dark:bg-[#0d1f2d] border border-sky-100 dark:border-sky-900/40 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      <p className="font-semibold text-sky-800 dark:text-sky-300 text-sm">Clima em Julho</p>
                    </div>
                    <p className="text-sm text-sky-700 dark:text-sky-400 leading-relaxed">{guide.climate}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-[#0d1f15] border border-emerald-100 dark:border-emerald-900/40 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">Segurança</p>
                    </div>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">{guide.safety}</p>
                  </div>
                </div>
              )}

            </div>

            <div className="shrink-0 px-6 pt-3 pb-8 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#1e1e1e]">
              <button
                onClick={() => { setSelectedCity(null); navigate('/'); }}
                className="w-full py-4 rounded-2xl bg-primary text-white font-semibold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-95 transition-all cursor-pointer"
              >
                Ver Ingressos em {selectedCity}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
