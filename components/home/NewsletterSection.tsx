'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-24 bg-brand-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-brand-border/70 shadow-luxury">
          <div className="w-12 h-12 rounded-full bg-brand-rose-light text-brand-rose mx-auto flex items-center justify-center mb-4">
            <Mail className="w-6 h-6" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-brand-rose font-semibold">
            The LYZOO Private Salon
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-brand-charcoal mt-2">
            Receive Our Private Journal
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-brand-muted max-w-lg mx-auto font-light leading-relaxed">
            Be the first to explore limited capsule launches, private runway drops, and salon invitations. Enjoy Rs. 1,000 welcome courtesy on your inaugural order.
          </p>

          {submitted ? (
            <div className="mt-8 p-6 bg-brand-rose-light/50 border border-brand-rose/40 rounded-2xl max-w-md mx-auto text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-8 h-8 text-brand-rose mx-auto" />
              <h4 className="font-serif text-xl font-medium text-brand-charcoal">
                Welcome to Our Private Society
              </h4>
              <p className="text-xs text-brand-charcoal/80 leading-relaxed font-light">
                An invitation confirmation with your private welcome voucher code has been registered to{' '}
                <strong className="font-semibold">{email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your private email address"
                  className="flex-1 px-4 py-3.5 rounded-xl border border-brand-border text-xs text-brand-charcoal placeholder-brand-muted/70 bg-brand-ivory/50 focus:outline-none focus:border-brand-charcoal"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-brand-charcoal text-white hover:bg-brand-rose rounded-xl text-xs uppercase tracking-widest font-semibold transition shadow-md shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Join Salon</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-brand-muted/80">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-rose" />
                <span>We respect your sanctuary. Never shared, zero spam.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

