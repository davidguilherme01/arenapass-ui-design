import { ArrowLeft, CreditCard, Smartphone, Wallet, Lock, Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';

export function PaymentScreen() {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate('/my-tickets');
    }, 2000);
  };

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
          <h1 className="text-xl">Pagamento</h1>
          <p className="text-sm text-gray-600">Finalize sua compra</p>
        </div>
      </header>

      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="mb-4">Resumo do Pedido</h2>

          <div className="space-y-3 mb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">Brasil vs Argentina</p>
                <p className="text-sm text-gray-600">24 Jun 2026 • 16:00</p>
                <p className="text-sm text-gray-600">Estádio Maracanã</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Assentos</span>
                <span className="text-sm">A12, A13, A14</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Categoria</span>
                <span className="text-sm">Arquibancada Superior</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quantidade</span>
                <span className="text-sm">3 ingressos</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>R$ 1.350,00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Taxa de serviço</span>
              <span>R$ 67,50</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="font-medium">Total</span>
              <span className="text-2xl text-primary">R$ 1.417,50</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="mb-4">Método de Pagamento</h2>

          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('credit-card')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                paymentMethod === 'credit-card'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                paymentMethod === 'credit-card' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}>
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Cartão de Crédito</p>
                <p className="text-sm text-gray-600">Visa, Mastercard, Elo</p>
              </div>
              {paymentMethod === 'credit-card' && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('pix')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                paymentMethod === 'pix'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                paymentMethod === 'pix' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}>
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Pix</p>
                <p className="text-sm text-gray-600">Aprovação instantânea</p>
              </div>
              {paymentMethod === 'pix' && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                paymentMethod === 'wallet'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                paymentMethod === 'wallet' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}>
                <Wallet className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Carteira Digital</p>
                <p className="text-sm text-gray-600">PayPal, Google Pay, Apple Pay</p>
              </div>
              {paymentMethod === 'wallet' && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          </div>

          {paymentMethod === 'credit-card' && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm mb-2">Número do Cartão</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Validade</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Nome no Cartão</label>
                <input
                  type="text"
                  placeholder="Nome completo"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3 mb-6">
          <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900 mb-1">Pagamento Seguro</p>
            <p className="text-sm text-green-700">
              Seus dados estão protegidos com criptografia de nível bancário.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-6">
        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-primary text-white py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Confirmar Pagamento
            </>
          )}
        </button>
      </div>
    </div>
  );
}
