import { useState } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole, email: string, name: string) => void;
  onNavigateRegister: () => void;
}

const DEMO_ACCOUNTS = [
  { role: 'buyer' as UserRole, email: 'marcus@tillmanfarm.com', password: 'farm2024', name: 'Marcus Tillman' },
  { role: 'admin' as UserRole, email: 'admin@agroforge.com', password: 'admin2024', name: 'Sarah Chen' },
];

export default function LoginPage({ onLogin, onNavigateRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setKata Sandi] = useState('');
  const [showKata Sandi, setShowKata Sandi] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 1200));

    const account = DEMO_ACCOUNTS.find(
      a => a.email === email && a.password === password
    );

    if (account) {
      onLogin(account.role, account.email, account.name);
    } else {
      setError('Invalid email or password. Try a demo account below.');
    }
    setIsLoading(false);
  };

  const useDemoAccount = (role: UserRole) => {
    const account = DEMO_ACCOUNTS.find(a => a.role === role)!;
    setEmail(account.email);
    setKata Sandi(account.password);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-[52%] bg-primary relative overflow-hidden flex-col justify-between p-12">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grain" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="white" />
                <circle cx="30" cy="25" r="0.5" fill="white" />
                <circle cx="50" cy="10" r="1.5" fill="white" />
                <circle cx="20" cy="45" r="1" fill="white" />
                <circle cx="45" cy="40" r="0.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grain)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M8 8c.5-1.5 2-3 4-3" />
                <circle cx="12" cy="12" r="2" />
                <path d="M12 14v8" />
                <path d="M8 20c1-1.5 2.5-2 4-2s3 .5 4 2" />
              </svg>
            </div>
            <span className="font-display text-xl font-semibold text-white">AgroForge</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <h1 className="font-display text-5xl font-semibold text-white leading-tight">
              The premium<br />agri-marketplace
            </h1>
            <p className="text-white/70 text-lg mt-4 leading-relaxed max-w-sm">
              Source certified machinery, precision tools, and farming equipment from trusted suppliers worldwide.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: '12,400+', label: 'Products listed' },
              { value: '$2.1B', label: 'GMV traded' },
              { value: '98.4%', label: 'Satisfaction rate' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-2xl font-semibold text-white">{value}</p>
                <p className="text-white/60 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&h=900&fit=crop&auto=format"
            alt="Farm landscape"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-up">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M8 8c.5-1.5 2-3 4-3" /><circle cx="12" cy="12" r="2" /><path d="M12 14v8" /></svg>
            </div>
            <span className="font-display text-lg font-semibold text-primary">AgroForge</span>
          </div>

          <h2 className="font-display text-3xl font-semibold text-foreground">Welcome back</h2>
          <p className="text-muted-foreground mt-2 text-sm">Masuk ke akun Anda to continue</p>

          {/* Role selector */}
          <div className="flex gap-2 mt-6 p-1 bg-muted rounded-xl">
            {(['buyer', 'admin'] as UserRole[]).map(role => (
              <button
                key={role}
                onClick={() => { setSelectedRole(role); useDemoAccount(role); }}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
                  selectedRole === role
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {role === 'buyer' ? '👤 Buyer' : '🛡️ Admin'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-3.5 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showKata Sandi ? 'text' : 'password'}
                  value={password}
                  onChange={e => setKata Sandi(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-3 pr-11 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowKata Sandi(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showKata Sandi
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  }
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-error-bg border border-error/20 rounded-xl px-3.5 py-3 animate-fade-in">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-error shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
            >
              {isLoading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                  Signing in…
                </>
              ) : 'Masuk'}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 p-4 bg-muted rounded-xl border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Demo accounts</p>
            <div className="flex flex-col gap-2">
              {DEMO_ACCOUNTS.map(({ role, email, password }) => (
                <button
                  key={role}
                  onClick={() => useDemoAccount(role)}
                  className="text-left px-3 py-2.5 bg-card rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold capitalize ${role === 'admin' ? 'text-accent' : 'text-primary'}`}>{role}</span>
                    <span className="text-muted-foreground group-hover:text-primary text-[10px]">Click to fill →</span>
                  </div>
                  <p className="text-muted-foreground mt-0.5">{email} / {password}</p>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Belum punya akun?{' '}
            <button onClick={onNavigateRegister} className="text-primary font-semibold hover:underline">
              Create one free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
