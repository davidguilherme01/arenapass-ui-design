import { Download, Share2, Bell, QrCode, MapPin, Calendar } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import { FlagIcon } from './FlagIcon';

export function MyTickets() {
  const tickets = [
    {
      id: 1,
      matchTitle: 'Brasil vs Argentina',
      homeCode: 'br',
      awayCode: 'ar',
      date: '24 Jun 2026',
      time: '16:00',
      stadium: 'MetLife Stadium',
      city: 'Nova York / Nova Jersey 🇺🇸',
      seats: 'A12, A13, A14',
      category: 'Arquibancada Superior',
      qrCode: '****-****-****-1234',
      status: 'confirmed'
    },
    {
      id: 2,
      matchTitle: 'Alemanha vs França',
      homeCode: 'de',
      awayCode: 'fr',
      date: '25 Jun 2026',
      time: '20:00',
      stadium: 'SoFi Stadium',
      city: 'Los Angeles 🇺🇸',
      seats: 'B8, B9',
      category: 'Premium',
      qrCode: '****-****-****-5678',
      status: 'confirmed'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="bg-primary text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <h1 className="text-3xl mb-1">Meus Ingressos</h1>
        <p className="text-white/80 text-sm">Gerencie seus ingressos da Copa do Mundo</p>
      </header>

      <div className="px-6 py-6 space-y-6">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200"
          >
            <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-block px-3 py-1 bg-accent text-gray-900 rounded-lg text-xs">
                    {ticket.category}
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-lg text-xs">
                    Confirmado
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <FlagIcon code={ticket.homeCode} size={40} alt={ticket.matchTitle.split(' vs ')[0]} className="h-7 w-auto shadow-sm" />
                    <span className="text-xs font-bold uppercase opacity-75">{ticket.homeCode.toUpperCase()}</span>
                    <span className="text-xl">{ticket.matchTitle.split(' vs ')[0]}</span>
                  </div>
                  <span className="text-xl">vs</span>
                  <div className="flex items-center gap-2">
                    <FlagIcon code={ticket.awayCode} size={40} alt={ticket.matchTitle.split(' vs ')[1]} className="h-7 w-auto shadow-sm" />
                    <span className="text-xs font-bold uppercase opacity-75">{ticket.awayCode.toUpperCase()}</span>
                    <span className="text-xl">{ticket.matchTitle.split(' vs ')[1]}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{ticket.date} • {ticket.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{ticket.city}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-6 border-t border-dashed border-gray-200" />

            <div className="p-6 pt-5">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estádio</p>
                  <p className="font-medium">{ticket.stadium}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Assentos</p>
                  <p className="font-medium">{ticket.seats}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mb-3 mx-auto">
                    <QrCode className="w-24 h-24 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Código do Ingresso</p>
                  <p className="font-mono text-sm mt-1">{ticket.qrCode}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center gap-2 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Download className="w-5 h-5 text-primary" />
                  <span className="text-xs">Baixar</span>
                </button>
                <button className="flex flex-col items-center gap-2 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Share2 className="w-5 h-5 text-primary" />
                  <span className="text-xs">Transferir</span>
                </button>
                <button className="flex flex-col items-center gap-2 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Bell className="w-5 h-5 text-primary" />
                  <span className="text-xs">Lembrete</span>
                </button>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2">
                <Bell className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  Chegue ao estádio com 2 horas de antecedência para evitar filas.
                </p>
              </div>
            </div>
          </div>
        ))}

        {tickets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl mb-2">Nenhum ingresso ainda</h3>
            <p className="text-gray-600 mb-6">
              Compre ingressos para ver suas partidas aqui
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors cursor-pointer">
              Explorar Partidas
            </button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
