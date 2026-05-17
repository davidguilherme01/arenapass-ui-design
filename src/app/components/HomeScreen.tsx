import { useState } from 'react';
import { Search, Filter, ChevronRight, MapPin, Calendar, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './ImageWithFallback';
import { FlagIcon } from './FlagIcon';

type Category = 'Todos' | 'Semifinal' | 'Quartas';

const ALL_MATCHES = [
  {
    id: 1,
    homeTeam: 'Brasil',    homeCode: 'br',
    awayTeam: 'Argentina', awayCode: 'ar',
    date: '24 Jun 2026',
    time: '16:00',
    stadium: 'Estádio Maracanã',
    city: 'Rio de Janeiro',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 450,
    priceLabel: 'R$ 450',
    category: 'Semifinal' as Category,
  },
  {
    id: 2,
    homeTeam: 'Alemanha',  homeCode: 'de',
    awayTeam: 'França',    awayCode: 'fr',
    date: '25 Jun 2026',
    time: '20:00',
    stadium: 'Estádio do Morumbi',
    city: 'São Paulo',
    image: 'https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 420,
    priceLabel: 'R$ 420',
    category: 'Semifinal' as Category,
  },
  {
    id: 3,
    homeTeam: 'Espanha',   homeCode: 'es',
    awayTeam: 'Portugal',  awayCode: 'pt',
    date: '22 Jun 2026',
    time: '18:00',
    stadium: 'Arena Fonte Nova',
    city: 'Salvador',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 380,
    priceLabel: 'R$ 380',
    category: 'Quartas' as Category,
  },
  {
    id: 4,
    homeTeam: 'Inglaterra', homeCode: 'gb-eng',
    awayTeam: 'Holanda',    awayCode: 'nl',
    date: '21 Jun 2026',
    time: '20:00',
    stadium: 'Arena Castelão',
    city: 'Fortaleza',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 360,
    priceLabel: 'R$ 360',
    category: 'Quartas' as Category,
  },
  {
    id: 5,
    homeTeam: 'Uruguai',  homeCode: 'uy',
    awayTeam: 'Itália',   awayCode: 'it',
    date: '20 Jun 2026',
    time: '16:00',
    stadium: 'Mineirão',
    city: 'Belo Horizonte',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 340,
    priceLabel: 'R$ 340',
    category: 'Quartas' as Category,
  },
  {
    id: 6,
    homeTeam: 'EUA',    homeCode: 'us',
    awayTeam: 'México', awayCode: 'mx',
    date: '19 Jun 2026',
    time: '18:00',
    stadium: 'Arena Amazônia',
    city: 'Manaus',
    image: 'https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 320,
    priceLabel: 'R$ 320',
    category: 'Quartas' as Category,
  },
];

const CITIES = ['Todas as cidades', 'Rio de Janeiro', 'São Paulo', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus'];

export function HomeScreen() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Todas as cidades');
  const [maxPrice, setMaxPrice] = useState(500);
  const [pendingCity, setPendingCity] = useState('Todas as cidades');
  const [pendingMaxPrice, setPendingMaxPrice] = useState(500);

  const filteredMatches = ALL_MATCHES.filter((m) => {
    const categoryMatch = activeCategory === 'Todos' || m.category === activeCategory;
    const cityMatch = selectedCity === 'Todas as cidades' || m.city === selectedCity;
    const priceMatch = m.price <= maxPrice;
    return categoryMatch && cityMatch && priceMatch;
  });

  const featuredMatch = filteredMatches[0] ?? ALL_MATCHES[0];

  const activeFiltersCount =
    (selectedCity !== 'Todas as cidades' ? 1 : 0) + (maxPrice < 500 ? 1 : 0);

  function openFilterPanel() {
    setPendingCity(selectedCity);
    setPendingMaxPrice(maxPrice);
    setShowFilterPanel(true);
  }

  function applyFilters() {
    setSelectedCity(pendingCity);
    setMaxPrice(pendingMaxPrice);
    setShowFilterPanel(false);
  }

  function clearFilters() {
    setPendingCity('Todas as cidades');
    setPendingMaxPrice(500);
    setSelectedCity('Todas as cidades');
    setMaxPrice(500);
    setShowFilterPanel(false);
  }

  const categories: Category[] = ['Todos', 'Semifinal', 'Quartas'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="bg-primary text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-1">ArenaPass</h1>
            <p className="text-white/80 text-sm">Copa do Mundo 2026</p>
          </div>
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
            <span className="text-2xl">⚽</span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar times, estádios..."
            className="w-full bg-white text-gray-900 rounded-xl pl-12 pr-4 py-3 outline-none"
          />
        </div>
      </header>

      <div className="px-6 py-6">
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button
            onClick={openFilterPanel}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border whitespace-nowrap shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer relative ${
              activeFiltersCount > 0
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-white border-gray-200'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap shadow-sm transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <h3 className="text-lg font-medium mb-2">Nenhuma partida encontrada</h3>
            <p className="text-gray-600 text-sm mb-4">Tente ajustar os filtros para ver mais partidas</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="mb-4">Partida em Destaque</h2>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <ImageWithFallback
                  src={featuredMatch.image}
                  alt="Featured match"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block px-3 py-1 bg-accent text-gray-900 rounded-lg text-xs mb-3">
                    {featuredMatch.category}
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <FlagIcon code={featuredMatch.homeCode} size={40} alt={featuredMatch.homeTeam} className="h-7 w-auto shadow-sm" />
                      <span className="text-xs font-bold uppercase opacity-80">{featuredMatch.homeCode.replace('gb-eng', 'ENG').toUpperCase()}</span>
                      <span className="font-medium">{featuredMatch.homeTeam}</span>
                    </div>
                    <span className="text-xl">vs</span>
                    <div className="flex items-center gap-2">
                      <FlagIcon code={featuredMatch.awayCode} size={40} alt={featuredMatch.awayTeam} className="h-7 w-auto shadow-sm" />
                      <span className="text-xs font-bold uppercase opacity-80">{featuredMatch.awayCode.replace('gb-eng', 'ENG').toUpperCase()}</span>
                      <span className="font-medium">{featuredMatch.awayTeam}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredMatch.date} • {featuredMatch.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {featuredMatch.city}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2>
                  {activeCategory === 'Todos' ? 'Todas as Partidas' : activeCategory}
                  <span className="ml-2 text-sm text-gray-500 font-normal">({filteredMatches.length})</span>
                </h2>
                <button className="text-primary text-sm flex items-center gap-1 hover:text-primary/70 transition-colors cursor-pointer">
                  Ver todas
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {filteredMatches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => navigate(`/match/${match.id}`)}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                        {match.category}
                      </span>
                      <span className="text-primary font-medium">{match.priceLabel}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FlagIcon code={match.homeCode} size={40} alt={match.homeTeam} className="h-6 w-auto shadow-sm rounded-sm" />
                        <span className="text-xs font-bold text-gray-500 uppercase">{match.homeCode.replace('gb-eng', 'ENG').toUpperCase()}</span>
                        <span className="font-medium">{match.homeTeam}</span>
                      </div>
                      <span className="text-gray-400 text-sm">vs</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{match.awayTeam}</span>
                        <span className="text-xs font-bold text-gray-500 uppercase">{match.awayCode.replace('gb-eng', 'ENG').toUpperCase()}</span>
                        <FlagIcon code={match.awayCode} size={40} alt={match.awayTeam} className="h-6 w-auto shadow-sm rounded-sm" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {match.date} • {match.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {match.stadium}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Filter panel overlay */}
      {showFilterPanel && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilterPanel(false)}
          />
          <div className="relative bg-white rounded-t-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Filtros</h3>
              <button
                onClick={() => setShowFilterPanel(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="font-medium mb-3">Cidade</p>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => setPendingCity(city)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                      pendingCity === city
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium">Preço máximo</p>
                <span className="text-primary font-medium">
                  {pendingMaxPrice === 500 ? 'Sem limite' : `R$ ${pendingMaxPrice}`}
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={500}
                step={20}
                value={pendingMaxPrice}
                onChange={(e) => setPendingMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>R$ 200</span>
                <span>Sem limite</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Limpar
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
