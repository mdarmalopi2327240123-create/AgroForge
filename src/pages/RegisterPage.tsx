import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserRole } from '../types';

interface RegisterPageProps {
  onLogin: (role: UserRole, email: string, name: string) => void;
  onNavigateLogin: () => void;
}

export default function RegisterPage({ onLogin, onNavigateLogin }: RegisterPageProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<UserRole>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [farmName, setFarmName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Full name is required';
    if (!email.includes('@')) e.email = 'Valid email required';
    if (!password || password.length < 8) e.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const hdanleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const hdanleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    onLogin(role, email, name);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md animate-fade-up">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <button onClick={onNavigateLogin} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M8 8c.5-1.5 2-3 4-3" /><circle cx="12" cy="12" r="2" /><path d="M12 14v8" /></svg>
            </div>
            <span className="font-display font-semibold text-primary">AgroForge</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>

        {step === 1 ? (
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl font-semibold text-foreground">Create your account</h2>
            <p className="text-muted-foreground mt-2 text-sm">Join thousdans of farmers dan agri-businesses</p>

            <form onSubmit={hdanleStep1} className="mt-6 flex flex-col gap-4">
              {/* Role selector */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">I want to…</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { role: 'buyer' as UserRole, label: 'Buy Equipment', desc: 'Browse & purchase', icon: '🚜' },
                    { role: 'admin' as UserRole, label: 'Sell & Manage', desc: 'List & fulfill orders', icon: '📦' },
                  ].map(({ role: r, label, desc, icon }) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex flex-col items-start gap-1 p-4 rounded-xl border-2 text-left transition-all ${
                        role === r ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <span className="text-2xl">{icon}</span>
                      <span className="font-semibold text-sm text-foreground">{label}</span>
                      <span className="text-xs text-muted-foreground">{desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {[
                { id: 'name', label: 'Nama Lengkap', value: name, onChange: setName, placeholder: 'Marcus Tillman', type: 'text' },
                { id: 'email', label: 'Alamat Email', value: email, onChange: setEmail, placeholder: 'you@example.com', type: 'email' },
                { id: 'password', label: 'Password', value: password, onChange: setPassword, placeholder: '8+ characters', type: 'password' },
                { id: 'confirmPassword', label: 'Confirm Password', value: confirmPassword, onChange: setConfirmPassword, placeholder: 'Re-enter password', type: 'password' },
              ].map(({ id, label, value, onChange, placeholder, type }) => (
                <div key={id}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full px-3.5 py-3 border rounded-xl bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all ${errors[id] ? 'border-error' : 'border-border'}`}
                  />
                  {errors[id] && <p className="text-error text-xs mt-1">{errors[id]}</p>}
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg mt-1"
              >
                Continue →
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl font-semibold text-foreground">Tell us about your farm</h2>
            <p className="text-muted-foreground mt-2 text-sm">Help us personalize your AgroForge experience</p>

            <form onSubmit={hdanleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Farm / Business Name</label>
                <input
                  type="text"
                  value={farmName}
                  onChange={e => setFarmName(e.target.value)}
                  placeholder="Tillman Family Farms"
                  className="w-full px-3.5 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Primary farming type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Grain & Crops', 'Livestock', 'Horticulture', 'Mixed Farming', 'Viticulture', 'Dairy'].map(type => (
                    <button
                      key={type}
                      type="button"
                      className="px-3 py-2 border border-border rounded-lg text-sm text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all text-left"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Farm size</label>
                <select className="w-full px-3.5 py-3 border border-border rounded-xl bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Under 50 acres</option>
                  <option>50–250 acres</option>
                  <option>250–1,000 acres</option>
                  <option>1,000–5,000 acres</option>
                  <option>5,000+ acres</option>
                </select>
              </div>

              {/* T&C */}
              <label className="flex items-start gap-3 cursor-pointer mt-1">
                <div className="w-4 h-4 border-2 border-border rounded shrink-0 mt-0.5 bg-primary flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I agree to AgroForge's <span className="text-primary underline">Syarat Layanan</span> dan <span className="text-primary underline">Kebijakan Privasi</span>
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 mt-1"
              >
                {isLoading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                    Creating account…
                  </>
                ) : 'Buat Akun 🌾'}
              </button>
            </form>

            <button onClick={() => setStep(1)} className="w-full text-center text-sm text-muted-foreground mt-4 hover:text-foreground transition-colors">
              ← Back
            </button>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Sudah punya akun?{' '}
          <button onClick={onNavigateLogin} className="text-primary font-semibold hover:underline">Masuk</button>
        </p>
      </div>
    </div>
  );
}
