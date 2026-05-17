import { ArrowLeft, Calendar, MapPin, Users, Info } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { ImageWithFallback } from './ImageWithFallback';
import { FlagIcon } from './FlagIcon';

export function MatchDetails() {
  const navigate = useNavigate();
  const { matchId } = useParams();

  const ticketCategories = [
    { id: 1, name: 'VIP', price: 850, available: 12, color: 'bg-purple-500' },
    { id: 2, name: 'Premium', price: 650, available: 45, color: 'bg-primary' },
    { id: 3, name: 'Arquibancada Superior', price: 450, available: 234, color: 'bg-blue-500' },
    { id: 4, name: 'Arquibancada Inferior', price: 280, available: 567, color: 'bg-green-500' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Stadium"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="inline-block px-3 py-1 bg-accent text-gray-900 rounded-lg text-xs mb-3">
            Semifinal
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-3">
              <FlagIcon code="br" size={40} alt="Brasil" className="h-8 w-auto shadow-md" />
              <span className="text-xs font-bold opacity-75">BR</span>
              <span className="text-xl">Brasil</span>
            </div>
            <span className="text-2xl">vs</span>
            <div className="flex items-center gap-3">
              <FlagIcon code="ar" size={40} alt="Argentina" className="h-8 w-auto shadow-md" />
              <span className="text-xs font-bold opacity-75">AR</span>
              <span className="text-xl">Argentina</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-6 py-6 flex-1">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Data e Hora</span>
            </div>
            <p className="font-medium">24 Jun, 16:00</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Estádio</span>
            </div>
            <p className="font-medium">MetLife Stadium</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">Capacidade</span>
            </div>
            <p className="font-medium">82.500</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Info className="w-4 h-4" />
              <span className="text-sm">Cidade</span>
            </div>
            <p className="font-medium">Nova York / Nova Jersey 🇺🇸</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-4">Sobre a Partida</h2>
          <p className="text-gray-600 leading-relaxed">
            O clássico sul-americano volta à Copa do Mundo em uma semifinal histórica. Brasil e Argentina se enfrentam no MetLife Stadium, em Nova York / Nova Jersey (EUA), uma das maiores arenas da Copa do Mundo 2026, que pela primeira vez é realizada em 3 países: Estados Unidos, Canadá e México.
          </p>
        </div>

        <div>
          <h2 className="mb-4">Categorias de Ingressos</h2>
          <div className="space-y-3">
            {ticketCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-primary text-lg">R$ {category.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{category.available} ingressos disponíveis</span>
                  {category.available < 50 && (
                    <span className="text-orange-500">Últimos ingressos!</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pb-6">
          <button
            onClick={() => navigate(`/seat-selection/${matchId}`)}
            className="w-full bg-primary text-white py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-colors"
          >
            Selecionar Assentos
          </button>
        </div>
      </div>
    </div>
  );
}
