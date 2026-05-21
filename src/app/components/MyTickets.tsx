import { useState } from 'react';
import { Download, Share2, Bell, QrCode, MapPin, Calendar, Trash2, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import { FlagIcon } from './FlagIcon';

export function MyTickets() {
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [tickets, setTickets] = useState([
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
  ]);

  const ticketToCancel = tickets.find(t => t.id === cancelId);

  function confirmCancel() {
    setTickets(prev => prev.filter(t => t.id !== cancelId));
    setCancelId(null);
  }

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
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-lg text-xs"
                    role="status"
                    aria-label="Status: Confirmado"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
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

              <div
                className="bg-gray-50 rounded-2xl p-6 mb-4 flex items-center justify-center"
                role="img"
                aria-label="QR Code do ingresso. Apresente este código na entrada do estádio."
              >
                <div className="text-center">
                  <div className="w-36 h-36 bg-white rounded-xl flex items-center justify-center mb-3 mx-auto border-4 border-white shadow-sm">
                    <QrCode className="w-28 h-28 text-gray-900" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-600">Código do Ingresso</p>
                  <p className="font-mono text-sm mt-1">{ticket.qrCode}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center gap-2 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Download className="w-5 h-5 text-primary" />
                  <span className="text-xs">Baixar</span>
                </button>
                <button className="flex flex-col items-center gap-2 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Share2 className="w-5 h-5 text-primary" />
                  <span className="text-xs">Transferir</span>
                </button>
                <button className="flex flex-col items-center gap-2 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Bell className="w-5 h-5 text-primary" />
                  <span className="text-xs">Lembrete</span>
                </button>
              </div>

              <button
                onClick={() => setCancelId(ticket.id)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors cursor-pointer font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Cancelar Ingresso
              </button>

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

      {/* ── Modal cancelar ingresso ── */}
      {cancelId && ticketToCancel && (
        <div className="fixed inset-0 z-[60] flex items-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCancelId(null)} />
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl px-6 pt-6 pb-10">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Cancelar ingresso?</h2>
                <p className="text-sm text-gray-500">Esta ação não pode ser desfeita.</p>
              </div>
              <button onClick={() => setCancelId(null)} className="ml-auto w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Partida</span>
                <span className="font-medium">{ticketToCancel.matchTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Data</span>
                <span className="font-medium">{ticketToCancel.date} • {ticketToCancel.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Assentos</span>
                <span className="font-medium">{ticketToCancel.seats}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mb-4">
              O reembolso será processado em até 5 dias úteis.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 py-3.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Sim, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
