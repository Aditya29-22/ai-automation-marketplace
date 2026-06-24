import { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { UserIcon as User, MailIcon as Mail, LockIcon as Lock, EyeIcon as Eye, EyeOffIcon as EyeOff } from '@animateicons/react/lucide';
import { useStore } from '../store/useStore';

export default function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, authMode, setAuthMode, login } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login' || authMode === 'signup') {
      login(name || email.split('@')[0], email);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={() => setAuthModalOpen(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0f] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-scale border border-white/[0.06]">
          {/* Header */}
          <div className="relative px-8 pt-8 pb-4">
            <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-white/[0.03] rounded-lg transition-colors text-slate-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-[4px] opacity-60" />
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg overflow-hidden group/avatar p-[2px]">
                  <div className="absolute inset-0 -z-10">
                    <div 
                      className="absolute top-1/2 left-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                      style={{ animation: 'spin-center 4s linear infinite' }}
                    />
                  </div>
                  <div className="w-full h-full rounded-full bg-[#0a0a0f] overflow-hidden flex items-center justify-center">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vineet&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full object-cover scale-110" />
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Create Account' : 'Reset Password'}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {authMode === 'login' ? 'Sign in to access your automations' : authMode === 'signup' ? 'Join 500+ automation users' : 'We\'ll send you a reset link'}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8">
            {authMode !== 'forgot' && (
              <div className="space-y-2 mb-6">
                <button type="button" onClick={() => login('Google User', 'user@gmail.com')} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm font-medium text-slate-300 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
                <button type="button" onClick={() => login('GitHub User', 'user@github.com')} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm font-medium text-slate-300 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Continue with GitHub
                </button>
              </div>
            )}

            {authMode !== 'forgot' && (
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.06]" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-[#0a0a0f] px-3 text-slate-600">or continue with email</span></div>
              </div>
            )}

            <div className="space-y-3">
              {authMode === 'signup' && (
                <div className="relative group/input">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/input:text-pink-500 transition-colors" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-pink-500/30 focus:ring-1 focus:ring-pink-500/10 transition-all" />
                </div>
              )}

              <div className="relative group/input">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/input:text-pink-500 transition-colors" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-pink-500/30 focus:ring-1 focus:ring-pink-500/10 transition-all" />
              </div>

              {authMode !== 'forgot' && (
                <div className="relative group/input">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/input:text-pink-500 transition-colors" />
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                    className="w-full pl-10 pr-10 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-pink-500/30 focus:ring-1 focus:ring-pink-500/10 transition-all" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 bottom-[14px] text-slate-600 hover:text-slate-400 group-focus-within/input:text-pink-500">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            {authMode === 'login' && (
              <button type="button" onClick={() => setAuthMode('forgot')} className="text-xs text-pink-500 mt-2 hover:text-pink-400 transition-colors">
                Forgot password?
              </button>
            )}

            <button type="submit" className="relative w-full mt-5 flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-lg overflow-hidden group/btn text-[15px]">
              <div className="absolute inset-0 -z-10">
                <div 
                  className="absolute top-1/2 left-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                  style={{ animation: 'spin-center 4s linear infinite' }}
                />
              </div>
              <div className="absolute inset-[1px] bg-[#0a0a0f] rounded-[11px] -z-10" />
              <span className="relative z-10 group-hover/btn:scale-105 transition-transform duration-300">{authMode === 'login' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
            </button>

            <p className="text-center text-xs text-slate-600 mt-4">
              {authMode === 'login' ? (
                <>Don&apos;t have an account? <button type="button" onClick={() => setAuthMode('signup')} className="text-pink-500 font-medium hover:text-pink-400 transition-colors">Sign up</button></>
              ) : authMode === 'signup' ? (
                <>Already have an account? <button type="button" onClick={() => setAuthMode('login')} className="text-pink-500 font-medium hover:text-pink-400 transition-colors">Sign in</button></>
              ) : (
                <button type="button" onClick={() => setAuthMode('login')} className="text-pink-500 font-medium hover:text-pink-400 transition-colors">Back to login</button>
              )}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
