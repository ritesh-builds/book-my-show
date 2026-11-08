// components/AuthModal.tsx — BookMyShow Authentication Modal with JWT Sign In & Sign Up

'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { loginUserApi, registerUserApi } from '../lib/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { id: string; name: string; email: string; role: string }, token: string) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'LOGIN') {
        const data = await loginUserApi({ email, password });
        localStorage.setItem('bms_jwt_token', data.accessToken);
        localStorage.setItem('bms_user', JSON.stringify(data.user));
        onSuccess(data.user, data.accessToken);
        onClose();
      } else {
        const data = await registerUserApi({ name, email, password, phone: phone || undefined });
        localStorage.setItem('bms_jwt_token', data.accessToken);
        localStorage.setItem('bms_user', JSON.stringify(data.user));
        onSuccess(data.user, data.accessToken);
        onClose();
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCustomer = () => {
    setEmail('customer@bookmyshow.com');
    setPassword('password123');
    setError(null);
  };

  const fillDemoAdmin = () => {
    setEmail('admin@bookmyshow.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#0f1118] border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-200 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient badge */}
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-rose-600/10 dark:bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {mode === 'LOGIN' ? 'Welcome Back' : 'Create BMS Account'}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                JWT Authenticated • Distributed Sessions
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Demo Autofill Pills (Login Mode only) */}
        {mode === 'LOGIN' && (
          <div className="px-6 pt-4 pb-1">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">1-Click Demo Login:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={fillDemoCustomer}
                  className="px-2 py-1 rounded-md text-[10px] font-mono font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 cursor-pointer"
                >
                  Customer Demo
                </button>
                <button
                  type="button"
                  onClick={fillDemoAdmin}
                  className="px-2 py-1 rounded-md text-[10px] font-mono font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 hover:bg-amber-100 cursor-pointer"
                >
                  Admin Demo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'REGISTER' && (
            <div>
              <label className="block text-[11px] font-mono font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ritesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono font-semibold text-slate-600 dark:text-zinc-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-semibold text-slate-600 dark:text-zinc-400 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {mode === 'REGISTER' && (
            <div>
              <label className="block text-[11px] font-mono font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/30 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <span className="font-mono text-xs">Authenticating...</span>
            ) : (
              <>
                <span>{mode === 'LOGIN' ? 'Sign In to BookMyShow' : 'Complete Registration'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer Mode Switcher */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-zinc-900/50 border-t border-slate-100 dark:border-zinc-800/80 text-center text-xs text-slate-500 dark:text-zinc-400">
          {mode === 'LOGIN' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('REGISTER');
                  setError(null);
                }}
                className="text-rose-600 font-bold hover:underline cursor-pointer"
              >
                Sign Up Now
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('LOGIN');
                  setError(null);
                }}
                className="text-rose-600 font-bold hover:underline cursor-pointer"
              >
                Sign In Instead
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

