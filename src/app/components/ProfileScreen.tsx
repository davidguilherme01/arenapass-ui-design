import { User, Settings, Bell, CreditCard, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import { AccessibilitySettings } from './AccessibilitySettings';

export function ProfileScreen() {
  const menuItems = [
    { icon: User, label: 'Dados Pessoais', value: 'João Silva' },
    { icon: CreditCard, label: 'Formas de Pagamento', value: '2 cartões salvos' },
    { icon: Bell, label: 'Notificações', value: 'Ativadas' },
    { icon: Globe, label: 'Idioma', value: 'Português (BR)' },
    { icon: HelpCircle, label: 'Ajuda e Suporte', value: '' },
    { icon: Settings, label: 'Configurações', value: '' },
  ];

  const stats = [
    { label: 'Ingressos', value: '12' },
    { label: 'Partidas', value: '8' },
    { label: 'Gastos', value: 'R$ 5.2k' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="bg-primary text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl mb-1">João Silva</h1>
            <p className="text-white/80 text-sm">joao.silva@email.com</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-2xl mb-1">{stat.value}</p>
              <p className="text-white/80 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="px-6 py-6">
        <div className="mb-6">
          <AccessibilitySettings />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{item.label}</p>
                {item.value && <p className="text-sm text-gray-600">{item.value}</p>}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h3 className="font-medium mb-2">⭐ Programa de Fidelidade</h3>
          <p className="text-sm text-gray-700 mb-3">
            Você tem 850 pontos! Troque por descontos em ingressos.
          </p>
          <button className="w-full py-2 bg-accent text-gray-900 rounded-lg">
            Ver Recompensas
          </button>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </button>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>ArenaPass v1.0.0</p>
          <p>Copa do Mundo 2026</p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
