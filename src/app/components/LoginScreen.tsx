import { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

type Mode = 'login' | 'register';

export function LoginScreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('arenapass_user')) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  function validate(): string | null {
    if (!email.trim()) return 'Informe seu e-mail.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'E-mail inválido.';
    if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
    if (mode === 'register') {
      if (!name.trim()) return 'Informe seu nome completo.';
      if (password !== confirm) return 'As senhas não coincidem.';
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    setTimeout(() => {
      const displayName = mode === 'register' ? name.trim() : email.split('@')[0];
      localStorage.setItem('arenapass_user', JSON.stringify({ name: displayName, email }));
      navigate('/', { replace: true });
    }, 1000);
  }

  function handleGoogleLogin() {
    setError('');
    setLoadingGoogle(true);
    setTimeout(() => {
      localStorage.setItem('arenapass_user', JSON.stringify({
        name: 'Usuário Google',
        email: 'usuario@gmail.com',
        provider: 'google',
      }));
      navigate('/', { replace: true });
    }, 1200);
  }

  function switchMode(m: Mode) {
    setMode(m);
    setError('');
    setName('');
    setPassword('');
    setConfirm('');
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[480px] mx-auto w-full">

      {/* ── Hero ── */}
      <div className="relative bg-primary flex flex-col items-center justify-center pt-10 pb-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-white/5 -mr-28 -mt-28 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/5 -ml-20 -mb-20 pointer-events-none" />

        <div className="relative text-center text-white px-6">
          <div className="w-28 h-28 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-black/20">
            <span className="text-6xl">⚽</span>
          </div>
          <h1 className="text-5xl font-bold mb-2 tracking-tight">ArenaPass</h1>
          <p className="text-white/80 text-lg">Copa do Mundo FIFA 2026</p>
          <p className="text-white/50 text-sm mt-1">🇺🇸 🇨🇦 🇲🇽 · 16 cidades · 48 seleções</p>
        </div>
      </div>

      {/* ── Form card ── */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-8 relative z-10 shadow-2xl px-6 pt-7 pb-10">

        {/* Tab switcher */}
        <div className="flex bg-gray-100 rounded-2xl p-1 mb-5">
          {(['login', 'register'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                mode === m
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {m === 'login' ? 'Entrar' : 'Criar Conta'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          {mode === 'register' && (
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Nome completo</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  autoComplete="name"
                  className="w-full pl-11 pr-4 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-gray-900 text-base placeholder:text-[#9CA3AF]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoComplete="email"
                className="w-full pl-11 pr-4 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-gray-900 text-base placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={mode === 'register' ? 'Mínimo 6 caracteres' : 'Sua senha'}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="w-full pl-11 pr-12 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-gray-900 text-base placeholder:text-[#9CA3AF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Confirmar senha</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Repita a senha"
                  autoComplete="new-password"
                  className="w-full pl-11 pr-12 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-gray-900 text-base placeholder:text-[#9CA3AF]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                  aria-label={showConfirm ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700" role="alert">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {error}
            </div>
          )}

          {mode === 'login' && (
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/70 transition-colors cursor-pointer"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-semibold text-lg rounded-2xl shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {mode === 'login' ? 'Entrar' : 'Criar Conta'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">ou continue com</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loadingGoogle || loading}
          className="w-full flex items-center justify-center gap-3 py-4 bg-[#ffffff] border border-[#D1D5DB] rounded-2xl hover:bg-[#F9FAFB] active:scale-95 transition-all cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loadingGoogle ? (
            <span className="w-5 h-5 border-2 border-gray-300 border-t-[#4285F4] rounded-full animate-spin" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84-.84-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          <span className="text-base font-semibold text-gray-700">
            {loadingGoogle ? 'Conectando...' : 'Continuar com Google'}
          </span>
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === 'login' ? (
            <>
              Não tem conta?{' '}
              <button
                onClick={() => switchMode('register')}
                className="text-primary font-semibold hover:text-primary/70 transition-colors cursor-pointer"
              >
                Criar conta grátis
              </button>
            </>
          ) : (
            <>
              Já tem conta?{' '}
              <button
                onClick={() => switchMode('login')}
                className="text-primary font-semibold hover:text-primary/70 transition-colors cursor-pointer"
              >
                Fazer login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
