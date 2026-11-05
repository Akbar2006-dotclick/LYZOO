'use client';

import React, { useState } from 'react';
import { Heart, CheckCircle2 } from 'lucide-react';

export function StayInTouchSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
  };

  return (
    <section className="w-full bg-[#FCEEF1] border-b border-brand-border/60 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left Script */}
          <div className="lg:w-1/4">
            <h3 className="font-script text-3xl sm:text-4xl text-brand-charcoal">
              Let&apos;s stay in touch ♡
            </h3>
          </div>

          {/* Center Input Form */}
          <div className="lg:w-2/4 w-full max-w-md mx-auto">
            <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light mb-3">
              Be the first to know about new arrivals, exclusive offers and more.
            </p>

            {isSubmitted ? (
              <div className="bg-white/80 border border-brand-berry/30 rounded-full py-2.5 px-4 text-xs text-brand-berry flex items-center justify-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-brand-berry" />
                <span>Thank you for joining our lovely circle! ♡</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 pl-5 pr-14 rounded-full bg-white text-xs text-brand-charcoal placeholder-brand-muted/70 focus:outline-none focus:ring-1 focus:ring-brand-berry border border-brand-border shadow-xs"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 w-8 h-8 rounded-full bg-brand-berry hover:bg-brand-berry-dark text-white flex items-center justify-center transition shadow-xs"
                >
                  <span className="text-sm">→</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Script & Heart */}
          <div className="lg:w-1/4 flex items-center justify-center lg:justify-end gap-2 text-brand-charcoal">
            <Heart className="w-4 h-4 text-brand-berry fill-brand-berry/20" />
            <span className="font-script text-2xl text-brand-charcoal/80">
              Little updates, Big joy ♡
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

