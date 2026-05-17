import { Search, MapPin, Calendar, Trophy } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import { ImageWithFallback } from './ImageWithFallback';

export function ExploreScreen() {
  const stadiums = [
    {
      name: 'Estádio Maracanã',
      city: 'Rio de Janeiro',
      capacity: '78.838',
      matches: 8,
      image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    },
    {
      name: 'Estádio do Morumbi',
      city: 'São Paulo',
      capacity: '66.822',
      matches: 7,
      image: 'https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    },
    {
      name: 'Arena Fonte Nova',
      city: 'Salvador',
      capacity: '50.000',
      matches: 6,
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    },
  ];

  const teams = [
    { name: 'Brasil', flag: '🇧🇷', group: 'Grupo A' },
    { name: 'Argentina', flag: '🇦🇷', group: 'Grupo B' },
    { name: 'Alemanha', flag: '🇩🇪', group: 'Grupo C' },
    { name: 'França', flag: '🇫🇷', group: 'Grupo D' },
    { name: 'Espanha', flag: '🇪🇸', group: 'Grupo E' },
    { name: 'Portugal', flag: '🇵🇹', group: 'Grupo F' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="bg-primary text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <h1 className="text-3xl mb-1">Explorar</h1>
        <p className="text-white/80 text-sm">Descubra estádios e seleções</p>

        <div className="relative mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar estádios, cidades, times..."
            className="w-full bg-white text-gray-900 rounded-xl pl-12 pr-4 py-3 outline-none"
          />
        </div>
      </header>

      <div className="px-6 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2>Estádios</h2>
            <button className="text-primary text-sm">Ver todos</button>
          </div>

          <div className="space-y-4">
            {stadiums.map((stadium) => (
              <div
                key={stadium.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200"
              >
                <div className="relative h-40">
                  <ImageWithFallback
                    src={stadium.image}
                    alt={stadium.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl mb-1">{stadium.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {stadium.city}
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {stadium.matches} partidas
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Capacidade: {stadium.capacity}</span>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                    Ver Partidas
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2>Seleções</h2>
            <button className="text-primary text-sm">Ver todas</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {teams.map((team) => (
              <div
                key={team.name}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col items-center text-center"
              >
                <span className="text-5xl mb-3">{team.flag}</span>
                <h3 className="font-medium mb-1">{team.name}</h3>
                <span className="text-sm text-gray-600">{team.group}</span>
                <button className="mt-4 w-full py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                  Ver Partidas
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
