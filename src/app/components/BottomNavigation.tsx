import { Home, Ticket, Compass, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: Ticket, label: 'Ingressos', path: '/my-tickets' },
    { icon: Compass, label: 'Explorar', path: '/explore' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50"
      aria-label="Navegação principal"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center h-16" role="tablist">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                role="tab"
                aria-selected={isActive}
                aria-label={`${item.label}${isActive ? ', selecionado' : ''}`}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                  isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-6 h-6" aria-hidden="true" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
