import { useState, useRef } from 'react';
import { Search, Filter, ChevronRight, MapPin, Calendar, X, Check, SlidersHorizontal, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './ImageWithFallback';
import { FlagIcon } from './FlagIcon';

type Category = 'Todos' | 'Semifinal' | 'Quartas';

const ALL_MATCHES = [
  {
    id: 1,
    homeTeam: 'Brasil',    homeCode: 'br',
    awayTeam: 'Argentina', awayCode: 'ar',
    date: '14 Jul 2026',
    time: '16:00',
    stadium: 'MetLife Stadium',
    city: 'Nova York / Nova Jersey',
    country: '🇺🇸 EUA',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 450,
    priceLabel: 'R$ 450',
    category: 'Semifinal' as Category,
  },
  {
    id: 2,
    homeTeam: 'Alemanha',  homeCode: 'de',
    awayTeam: 'França',    awayCode: 'fr',
    date: '10 Jul 2026',
    time: '20:00',
    stadium: 'SoFi Stadium',
    city: 'Los Angeles',
    country: '🇺🇸 EUA',
    image: 'https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 420,
    priceLabel: 'R$ 420',
    category: 'Semifinal' as Category,
  },
  {
    id: 3,
    homeTeam: 'Espanha',   homeCode: 'es',
    awayTeam: 'Portugal',  awayCode: 'pt',
    date: '05 Jul 2026',
    time: '18:00',
    stadium: 'AT&T Stadium',
    city: 'Dallas',
    country: '🇺🇸 EUA',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 380,
    priceLabel: 'R$ 380',
    category: 'Quartas' as Category,
  },
  {
    id: 4,
    homeTeam: 'Inglaterra', homeCode: 'gb-eng',
    awayTeam: 'Holanda',    awayCode: 'nl',
    date: '04 Jul 2026',
    time: '20:00',
    stadium: 'Hard Rock Stadium',
    city: 'Miami',
    country: '🇺🇸 EUA',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 360,
    priceLabel: 'R$ 360',
    category: 'Quartas' as Category,
  },
  {
    id: 5,
    homeTeam: 'Uruguai',  homeCode: 'uy',
    awayTeam: 'Itália',   awayCode: 'it',
    date: '03 Jul 2026',
    time: '16:00',
    stadium: 'BC Place',
    city: 'Vancouver',
    country: '🇨🇦 Canadá',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 340,
    priceLabel: 'R$ 340',
    category: 'Quartas' as Category,
  },
  {
    id: 6,
    homeTeam: 'EUA',    homeCode: 'us',
    awayTeam: 'México', awayCode: 'mx',
    date: '02 Jul 2026',
    time: '18:00',
    stadium: 'Estadio Azteca',
    city: 'Cidade do México',
    country: '🇲🇽 México',
    image: 'https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 320,
    priceLabel: 'R$ 320',
    category: 'Quartas' as Category,
  },
];

const CITIES = [
  'Todas as cidades',
  // 🇨🇦 Canadá
  'Toronto',
  'Vancouver',
  // 🇲🇽 México
  'Cidade do México',
  'Guadalajara',
  'Monterrey',
  // 🇺🇸 EUA
  'Atlanta',
  'Boston',
  'Dallas',
  'Filadélfia',
  'Houston',
  'Kansas City',
  'Los Angeles',
  'Miami',
  'Nova York / Nova Jersey',
  'São Francisco',
  'Seattle',
];

export function HomeScreen() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Todas as cidades');
  const [maxPrice, setMaxPrice] = useState(500);
  const [pendingCity, setPendingCity] = useState('Todas as cidades');
  const [pendingMaxPrice, setPendingMaxPrice] = useState(500);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const stored = localStorage.getItem('arenapass_user');
  const currentUser = stored
    ? (JSON.parse(stored) as { name: string; email: string })
    : { name: 'Usuário', email: '' };
  const initials = currentUser.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

  function handleLogout() {
    localStorage.removeItem('arenapass_user');
    navigate('/login', { replace: true });
  }

  const filteredMatches = ALL_MATCHES.filter((m) => {
    const categoryMatch = activeCategory === 'Todos' || m.category === activeCategory;
    const cityMatch = selectedCity === 'Todas as cidades' || m.city === selectedCity;
    const priceMatch = m.price <= maxPrice;
    const q = searchQuery.toLowerCase().trim();
    const searchMatch =
      !q ||
      m.homeTeam.toLowerCase().includes(q) ||
      m.awayTeam.toLowerCase().includes(q) ||
      m.stadium.toLowerCase().includes(q) ||
      m.city.toLowerCase().includes(q);
    return categoryMatch && cityMatch && priceMatch && searchMatch;
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
      <header className="bg-primary text-white px-6 py-5 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl mb-0.5">ArenaPass</h1>
            <p className="text-white/80 text-sm">Copa do Mundo 2026</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(v => !v)}
              className="w-14 h-14 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 active:scale-95 transition-all cursor-pointer shadow-md"
              aria-label="Menu do usuário"
              aria-expanded={showUserMenu}
            >
              {initials ? (
                <span className="text-primary font-bold text-lg leading-none">{initials}</span>
              ) : (
                <User className="w-6 h-6 text-primary" />
              )}
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 top-14 z-50 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm truncate">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium">Sair da Conta</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => searchInputRef.current?.focus()}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 dark:text-[#9a9a9a] hover:text-primary hover:bg-primary/20 active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="Buscar"
          >
            <Search className="w-6 h-6" />
          </button>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar times, estádios, cidades..."
            className="w-full bg-white text-gray-900 rounded-xl pl-14 pr-10 py-3.5 text-base outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            aria-label="Buscar partidas"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Limpar busca"
            >
              <X className="w-3.5 h-3.5 text-gray-600" />
            </button>
          )}
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

              {/* Card verde FIFA elegante */}
              <div
                className="relative rounded-2xl overflow-hidden border border-[#166534] bg-[#14532D] cursor-pointer"
                onClick={() => navigate(`/match/${featuredMatch.id}`)}
              >
                {/* Imagem como textura de fundo */}
                <ImageWithFallback
                  src={featuredMatch.image}
                  alt="Featured match"
                  className="absolute inset-0 w-full h-full object-cover opacity-10"
                />
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-5 bg-[radial-gradient(circle,#86EFAC,transparent)] translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-5 bg-[radial-gradient(circle,#86EFAC,transparent)] -translate-x-1/3 translate-y-1/3" />

                <div className="relative p-6">
                  {/* Topo: categoria + preço */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#FACC15] text-[#14532D]">
                      {featuredMatch.category}
                    </span>
                    <span className="text-lg font-bold text-[#FACC15]">
                      {featuredMatch.priceLabel}
                    </span>
                  </div>

                  {/* Times */}
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mb-5">
                    <div className="flex items-center gap-2 justify-end min-w-0">
                      <div className="min-w-0 text-right">
                        <p className="text-xs font-bold text-[#D1FAE5]">
                          {featuredMatch.homeCode.replace('gb-eng', 'ENG').toUpperCase()}
                        </p>
                        <p className="font-semibold text-white truncate">{featuredMatch.homeTeam}</p>
                      </div>
                      <FlagIcon code={featuredMatch.homeCode} size={40} alt={featuredMatch.homeTeam} className="h-8 w-auto shadow-md shrink-0" />
                    </div>
                    <span className="text-3xl font-bold text-center px-3 text-[#86EFAC]">vs</span>
                    <div className="flex items-center gap-2 min-w-0">
                      <FlagIcon code={featuredMatch.awayCode} size={40} alt={featuredMatch.awayTeam} className="h-8 w-auto shadow-md shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#D1FAE5]">
                          {featuredMatch.awayCode.replace('gb-eng', 'ENG').toUpperCase()}
                        </p>
                        <p className="font-semibold text-white truncate">{featuredMatch.awayTeam}</p>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé: data + local */}
                  <div className="flex items-center justify-between text-sm text-[#D1FAE5]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredMatch.date} • {featuredMatch.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {featuredMatch.stadium}
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

              <div className="space-y-3">
                {filteredMatches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => navigate(`/match/${match.id}`)}
                    className="bg-white dark:bg-[#1e1e1e] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-5 cursor-pointer transition-colors duration-150 hover:bg-[#F9FAFB] dark:hover:bg-[#2a2a2a] shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                  >
                    {/* Topo: categoria + preço */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-lg text-xs font-medium bg-[#F3F4F6] dark:bg-[#2a2a2a] text-[#374151] dark:text-[#c8c8c8]">
                        {match.category}
                      </span>
                      <span className="font-semibold text-sm text-[#16A34A]">
                        {match.priceLabel}
                      </span>
                    </div>

                    {/* Times */}
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mb-3">
                      <div className="flex items-center gap-2 justify-end min-w-0">
                        <span className="font-semibold truncate text-[#111827] dark:text-[#e6e6e6] text-right">{match.homeTeam}</span>
                        <span className="text-xs font-bold uppercase shrink-0 text-[#6B7280] dark:text-[#8a8a8a]">
                          {match.homeCode.replace('gb-eng', 'ENG').toUpperCase()}
                        </span>
                        <FlagIcon code={match.homeCode} size={40} alt={match.homeTeam} className="h-6 w-auto shadow-sm rounded-sm shrink-0" />
                      </div>
                      <span className="text-lg font-bold text-center px-3 text-[#9CA3AF] dark:text-[#6b7280]">vs</span>
                      <div className="flex items-center gap-2 min-w-0">
                        <FlagIcon code={match.awayCode} size={40} alt={match.awayTeam} className="h-6 w-auto shadow-sm rounded-sm shrink-0" />
                        <span className="text-xs font-bold uppercase shrink-0 text-[#6B7280] dark:text-[#8a8a8a]">
                          {match.awayCode.replace('gb-eng', 'ENG').toUpperCase()}
                        </span>
                        <span className="font-semibold truncate text-[#111827] dark:text-[#e6e6e6]">{match.awayTeam}</span>
                      </div>
                    </div>

                    {/* Rodapé: data + estádio */}
                    <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-[#8a8a8a]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {match.date} • {match.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
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

      {/* Filter panel overlay — z-[60] para cobrir a navbar */}
      {showFilterPanel && (
        <div
          className="fixed inset-0 z-[60] flex flex-col justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Filtros de partidas"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowFilterPanel(false)}
          />

          <div className="relative bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[88vh]">

            {/* Drag handle visual */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-3 pb-4 shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Filtros</h3>
                {(pendingCity !== 'Todas as cidades' || pendingMaxPrice < 500) && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {[pendingCity !== 'Todas as cidades' ? 1 : 0, pendingMaxPrice < 500 ? 1 : 0].reduce((a, b) => a + b, 0)} ativo(s)
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowFilterPanel(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                aria-label="Fechar filtros"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full h-px bg-gray-100 shrink-0" />

            {/* Conteúdo com scroll */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-7">

              {/* Seção Cidade */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-800">Cidade</p>
                  {pendingCity !== 'Todas as cidades' && (
                    <span className="text-xs text-primary font-medium">
                      Selecionada: {pendingCity}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((city) => {
                    const isSelected = pendingCity === city;
                    return (
                      <button
                        key={city}
                        onClick={() => setPendingCity(city)}
                        aria-pressed={isSelected}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-md scale-105'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary/40 hover:bg-primary/5'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        {city}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seção Preço */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-800">Preço máximo</p>
                  <span className={`text-sm font-semibold ${pendingMaxPrice < 500 ? 'text-primary' : 'text-gray-400'}`}>
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
                  className="w-full accent-primary h-2 cursor-pointer"
                  aria-label="Preço máximo do ingresso"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>R$ 200</span>
                  <span>Sem limite</span>
                </div>
                {pendingMaxPrice < 500 && (
                  <p className="text-xs text-primary/80 mt-2">
                    Mostrando ingressos até R$ {pendingMaxPrice}
                  </p>
                )}
              </div>
            </div>

            {/* Rodapé fixo com botões — pb extra para não sobrepor navbar */}
            <div className="shrink-0 px-6 pt-4 pb-8 border-t border-gray-100 bg-white space-y-3">

              {/* Resumo da seleção pendente */}
              {(pendingCity !== selectedCity || pendingMaxPrice !== maxPrice) && (
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  Clique em "Confirmar" para aplicar a seleção
                </div>
              )}

              <button
                onClick={clearFilters}
                className="w-full py-3 rounded-xl text-gray-500 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                aria-label="Limpar todos os filtros"
              >
                Limpar filtros
              </button>

              <button
                onClick={applyFilters}
                className="w-full py-4 rounded-2xl bg-primary text-white font-semibold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-95 transition-all cursor-pointer"
                aria-label={
                  pendingCity !== 'Todas as cidades'
                    ? `Confirmar cidade: ${pendingCity}`
                    : 'Aplicar filtros'
                }
              >
                {pendingCity !== 'Todas as cidades'
                  ? `Confirmar: ${pendingCity}`
                  : 'Aplicar filtros'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
