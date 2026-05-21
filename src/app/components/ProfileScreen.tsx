import { useState } from 'react';
import {
  User, Settings, Bell, CreditCard, Globe, HelpCircle,
  LogOut, ChevronRight, X, Plus, Trash2, Check,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNavigation } from './BottomNavigation';
import { AccessibilitySettings } from './AccessibilitySettings';

type ModalId = 'dados' | 'pagamento' | 'notificacoes' | 'idioma' | 'ajuda' | 'configuracoes' | null;

export function ProfileScreen() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalId>(null);
  const [notifPush, setNotifPush]   = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS]     = useState(false);
  const [idioma, setIdioma]         = useState('Português (BR)');

  const stored = localStorage.getItem('arenapass_user');
  const currentUser = stored
    ? JSON.parse(stored) as { name: string; email: string }
    : { name: 'Usuário', email: '' };

  const initials = currentUser.name
    .split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

  function handleLogout() {
    localStorage.removeItem('arenapass_user');
    navigate('/login', { replace: true });
  }

  const menuItems: { icon: typeof User; label: string; value: string; id: ModalId }[] = [
    { icon: User,        label: 'Dados Pessoais',      value: currentUser.name,  id: 'dados'         },
    { icon: CreditCard,  label: 'Formas de Pagamento', value: '2 cartões salvos', id: 'pagamento'     },
    { icon: Bell,        label: 'Notificações',        value: notifPush ? 'Ativadas' : 'Desativadas', id: 'notificacoes' },
    { icon: Globe,       label: 'Idioma',              value: idioma,             id: 'idioma'        },
    { icon: HelpCircle,  label: 'Ajuda e Suporte',     value: '',                 id: 'ajuda'         },
    { icon: Settings,    label: 'Configurações',       value: '',                 id: 'configuracoes' },
  ];


  const idiomas = ['Português (BR)', 'English (US)', 'Español'];

  const faq = [
    { q: 'Como faço para cancelar um ingresso?',    a: 'Acesse "Meus Ingressos", selecione o ingresso e toque em "Cancelar". O reembolso é processado em até 5 dias úteis.' },
    { q: 'Os ingressos são transferíveis?',          a: 'Sim. Você pode transferir para outra conta ArenaPass em "Meus Ingressos" → "Transferir".' },
    { q: 'Posso comprar para outra pessoa?',         a: 'Sim, informe os dados do beneficiário no momento da compra.' },
    { q: 'Qual o prazo de entrega do ingresso?',     a: 'Os ingressos são digitais e ficam disponíveis imediatamente após a confirmação do pagamento.' },
    { q: 'Como entro em contato com o suporte?',     a: 'Envie um e-mail para suporte@arenapass.com.br ou use o chat dentro do app.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">

      {/* ── Header ── */}
      <header className="bg-primary text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-gray-900">{initials}</span>
          </div>
          <div>
            <h1 className="text-2xl mb-1">{currentUser.name}</h1>
            <p className="text-white/80 text-sm">{currentUser.email}</p>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        <div className="mb-6"><AccessibilitySettings /></div>

        {/* ── Menu ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setActiveModal(item.id)}
              className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{item.label}</p>
                {item.value && <p className="text-sm text-gray-500">{item.value}</p>}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </button>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>ArenaPass v1.0.0</p>
          <p>Copa do Mundo 2026</p>
        </div>
      </div>

      <BottomNavigation />

      {/* ── Modais ── */}
      {activeModal && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh]">

            {/* Handle + header */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="flex items-center justify-between px-6 pt-3 pb-4 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-bold">
                {activeModal === 'dados'         && 'Dados Pessoais'}
                {activeModal === 'pagamento'     && 'Formas de Pagamento'}
                {activeModal === 'notificacoes'  && 'Notificações'}
                {activeModal === 'idioma'        && 'Idioma'}
                {activeModal === 'ajuda'         && 'Ajuda e Suporte'}
                {activeModal === 'configuracoes' && 'Configurações'}
              </h2>
              <button onClick={() => setActiveModal(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5">

              {/* ── Dados Pessoais ── */}
              {activeModal === 'dados' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <span className="text-xl font-bold text-white">{initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{currentUser.name}</p>
                      <p className="text-sm text-gray-500">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">Nome completo</p>
                      <p className="font-medium">{currentUser.name}</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">E-mail</p>
                      <p className="font-medium">{currentUser.email || '—'}</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">Membro desde</p>
                      <p className="font-medium">Maio 2026</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Formas de Pagamento ── */}
              {activeModal === 'pagamento' && (
                <div className="space-y-3">
                  {[
                    { band: 'Visa', last: '4832', exp: '08/27', color: 'from-blue-600 to-blue-800' },
                    { band: 'Mastercard', last: '7291', exp: '03/26', color: 'from-gray-700 to-gray-900' },
                  ].map(card => (
                    <div key={card.last} className={`bg-gradient-to-r ${card.color} text-white rounded-2xl p-5 flex items-center justify-between shadow-lg`}>
                      <div>
                        <p className="text-xs opacity-70 mb-1">{card.band}</p>
                        <p className="text-lg font-bold tracking-widest">•••• {card.last}</p>
                        <p className="text-xs opacity-70 mt-1">Validade {card.exp}</p>
                      </div>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                    <Plus className="w-5 h-5" />
                    Adicionar cartão
                  </button>
                </div>
              )}

              {/* ── Notificações ── */}
              {activeModal === 'notificacoes' && (
                <div className="space-y-1">
                  {[
                    { label: 'Notificações push',    sub: 'Alertas em tempo real no celular', val: notifPush,  set: setNotifPush  },
                    { label: 'Notificações por e-mail', sub: 'Confirmações e promoções',      val: notifEmail, set: setNotifEmail },
                    { label: 'SMS',                  sub: 'Avisos importantes por mensagem',  val: notifSMS,   set: setNotifSMS   },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.sub}</p>
                      </div>
                      <button
                        onClick={() => item.set(v => !v)}
                        className={`w-12 h-6 rounded-full transition-colors cursor-pointer relative ${item.val ? 'bg-primary' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${item.val ? 'left-6' : 'left-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Idioma ── */}
              {activeModal === 'idioma' && (
                <div className="space-y-2">
                  {idiomas.map(lang => (
                    <button
                      key={lang}
                      onClick={() => { setIdioma(lang); setActiveModal(null); }}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-green-50 transition-colors cursor-pointer"
                    >
                      <span className="font-medium">{lang}</span>
                      {idioma === lang && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}

              {/* ── Ajuda e Suporte ── */}
              {activeModal === 'ajuda' && (
                <div className="space-y-3">
                  {faq.map((item, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-4">
                      <p className="font-semibold text-sm mb-2">{item.q}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                  <div className="mt-4 p-4 bg-primary/5 rounded-xl text-center">
                    <p className="text-sm text-gray-600">Não encontrou o que procura?</p>
                    <p className="text-sm font-semibold text-primary mt-1">suporte@arenapass.com.br</p>
                  </div>
                </div>
              )}

              {/* ── Configurações ── */}
              {activeModal === 'configuracoes' && (
                <div className="space-y-1">
                  {[
                    { label: 'Compartilhar localização', sub: 'Para sugestões de sedes próximas' },
                    { label: 'Salvar histórico de busca', sub: 'Facilita encontrar partidas recentes' },
                    { label: 'Modo offline',              sub: 'Baixar ingressos para uso sem internet' },
                  ].map((item, i) => (
                    <ToggleRow key={i} label={item.label} sub={item.sub} />
                  ))}
                  <div className="pt-4 border-t border-gray-100 mt-2">
                    <button className="w-full py-3 text-sm text-red-500 hover:text-red-700 transition-colors cursor-pointer">
                      Limpar dados do aplicativo
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleRow({ label, sub }: { label: string; sub: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>
      <button
        onClick={() => setOn(v => !v)}
        className={`w-12 h-6 rounded-full transition-colors cursor-pointer relative ${on ? 'bg-primary' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${on ? 'left-6' : 'left-0.5'}`} />
      </button>
    </div>
  );
}
