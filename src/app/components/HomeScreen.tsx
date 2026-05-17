import { Search, Filter, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './ImageWithFallback';

export function HomeScreen() {
  const navigate = useNavigate();

  const matches = [
    {
      id: 1,
      homeTeam: 'Brasil',
      awayTeam: 'Argentina',
      homeFlag: '🇧🇷',
      awayFlag: '🇦🇷',
      date: '24 Jun 2026',
      time: '16:00',
      stadium: 'Estádio Maracanã',
      city: 'Rio de Janeiro',
      image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      price: 'R$ 450',
      category: 'Semifinal'
    },
    {
      id: 2,
      homeTeam: 'Alemanha',
      awayTeam: 'França',
      homeFlag: '🇩🇪',
      awayFlag: '🇫🇷',
      date: '25 Jun 2026',
      time: '20:00',
      stadium: 'Estádio do Morumbi',
      city: 'São Paulo',
      image: 'https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      price: 'R$ 420',
      category: 'Semifinal'
    },
    {
      id: 3,
      homeTeam: 'Espanha',
      awayTeam: 'Portugal',
      homeFlag: '🇪🇸',
      awayFlag: '🇵🇹',
      date: '22 Jun 2026',
      time: '18:00',
      stadium: 'Arena Fonte Nova',
      city: 'Salvador',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      price: 'R$ 380',
      category: 'Quartas'
    },
  ];

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
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 whitespace-nowrap shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filtros</span>
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl whitespace-nowrap shadow-sm hover:bg-primary/90 transition-colors cursor-pointer">
            Todos
          </button>
          <button className="px-4 py-2 bg-white rounded-xl border border-gray-200 whitespace-nowrap shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer">
            Semifinais
          </button>
          <button className="px-4 py-2 bg-white rounded-xl border border-gray-200 whitespace-nowrap shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer">
            Quartas
          </button>
        </div>

        <div className="mb-8">
          <h2 className="mb-4">Partidas em Destaque</h2>
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <ImageWithFallback
              src={matches[0].image}
              alt="Featured match"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="inline-block px-3 py-1 bg-accent text-gray-900 rounded-lg text-xs mb-3">
                {matches[0].category}
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{matches[0].homeFlag}</span>
                  <span className="font-medium">{matches[0].homeTeam}</span>
                </div>
                <span className="text-xl">vs</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{matches[0].awayFlag}</span>
                  <span className="font-medium">{matches[0].awayTeam}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {matches[0].date} • {matches[0].time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {matches[0].city}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2>Próximas Partidas</h2>
            <button className="text-primary text-sm flex items-center gap-1 hover:text-primary/70 transition-colors cursor-pointer">
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                onClick={() => navigate(`/match/${match.id}`)}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                    {match.category}
                  </span>
                  <span className="text-primary">{match.price}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{match.homeFlag}</span>
                    <span className="font-medium">{match.homeTeam}</span>
                  </div>
                  <span className="text-gray-400">vs</span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{match.awayTeam}</span>
                    <span className="text-3xl">{match.awayFlag}</span>
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
      </div>
    </div>
  );
}
