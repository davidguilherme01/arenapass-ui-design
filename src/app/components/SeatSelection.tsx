import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useState } from 'react';

const CATEGORY_PRICES: Record<string, { name: string; price: number }> = {
  '1': { name: 'VIP',                   price: 850 },
  '2': { name: 'Premium',               price: 650 },
  '3': { name: 'Arquibancada Superior', price: 450 },
  '4': { name: 'Arquibancada Inferior', price: 280 },
};

export function SeatSelection() {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const categoryId = searchParams.get('category') ?? '3';
  const category = CATEGORY_PRICES[categoryId] ?? CATEGORY_PRICES['3'];

  const rows = 12;
  const seatsPerRow = 20;
  const unavailableSeats = new Set([5, 6, 7, 23, 24, 45, 67, 89, 102, 134, 156, 178, 189, 201]);

  const toggleSeat = (seatNumber: number) => {
    if (unavailableSeats.has(seatNumber)) return;
    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const totalPrice = selectedSeats.length * category.price;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white px-6 py-4 border-b border-gray-200 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl">Seleção de Assentos</h1>
          <p className="text-sm text-gray-600">
            {category.name} · R$ {category.price}/ingresso
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="mb-6 bg-gradient-to-b from-gray-200 to-gray-100 rounded-t-full h-12 flex items-center justify-center">
          <span className="text-sm text-gray-600">CAMPO</span>
        </div>

        <div className="mb-8">
          <div className="space-y-2">
            {Array.from({ length: rows }, (_, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                <div className="w-8 flex items-center justify-center text-xs text-gray-500">
                  {String.fromCharCode(65 + rowIndex)}
                </div>
                {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                  const seatNumber = rowIndex * seatsPerRow + seatIndex;
                  const isUnavailable = unavailableSeats.has(seatNumber);
                  const isSelected = selectedSeats.includes(seatNumber);

                  return (
                    <button
                      key={seatNumber}
                      onClick={() => toggleSeat(seatNumber)}
                      disabled={isUnavailable}
                      className={`w-6 h-6 rounded-t-lg transition-colors ${
                        isUnavailable
                          ? 'bg-gray-300 cursor-not-allowed'
                          : isSelected
                          ? 'bg-accent border-2 border-accent'
                          : 'bg-primary border border-primary hover:bg-primary/80'
                      }`}
                      aria-label={`Seat ${seatNumber}`}
                    />
                  );
                })}
                <div className="w-8 flex items-center justify-center text-xs text-gray-500">
                  {String.fromCharCode(65 + rowIndex)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded-t-lg" />
            <span>Disponível</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-accent rounded-t-lg" />
            <span>Selecionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-300 rounded-t-lg" />
            <span>Indisponível</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-6">
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Assentos Selecionados</span>
            <span className="font-semibold text-gray-800">{selectedSeats.length} assento{selectedSeats.length !== 1 ? 's' : ''}</span>
          </div>

          {selectedSeats.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedSeats.sort((a, b) => a - b).map(seat => {
                const row = String.fromCharCode(65 + Math.floor(seat / seatsPerRow));
                const seatNum = (seat % seatsPerRow) + 1;
                return (
                  <span key={seat} className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
                    {row}{seatNum}
                  </span>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-gray-600">Total</span>
            <span className="text-2xl text-primary">R$ {totalPrice.toLocaleString('pt-BR')}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/payment/${matchId}`)}
          disabled={selectedSeats.length === 0}
          className="w-full bg-primary text-white py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {selectedSeats.length === 0 ? 'Selecione os assentos' : 'Prosseguir para Pagamento'}
        </button>
      </div>
    </div>
  );
}
