'use client';

import React from 'react';
import Link from 'next/link';

export function OurStorySection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Card on Silk Image (5 cols) */}
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[1/1] bg-[#FAF0F2] shadow-sm p-8 flex items-center justify-center border border-brand-border/60">
              {/* Background texture photo */}
              <img
                src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80"
                alt="LYZOO Pink Aesthetic"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-[#FCEEF0]/60 backdrop-blur-[2px]" />

              {/* Pink envelope / Card */}
              <div className="relative z-10 bg-[#FCD8DF] p-6 sm:p-8 rounded-2xl shadow-md border border-white/60 text-center max-w-[280px] w-full transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <span className="font-serif text-2xl tracking-[0.2em] font-medium text-brand-berry block mb-1">
                  LYZOO♥
                </span>
                <span className="text-[7.5px] uppercase tracking-widest text-brand-muted block mb-4">
                  YOUR LITTLE WORLD OF LOVELY
                </span>
                <p className="font-script text-xl text-brand-charcoal">
                  More than just a store,
                  <br />
                  it&apos;s a feeling ♡
                </p>
              </div>
            </div>
          </div>

          {/* Right Text Column (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-muted font-medium">
              OUR STORY
            </span>

            <h3 className="font-serif text-2xl sm:text-4xl text-brand-charcoal font-medium leading-tight">
              More than just a store,
              <br />
              it&apos;s a feeling.
            </h3>

            <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light max-w-lg pt-1">
              LYZOO was created for every girl who believes in dreams, self-love and little luxuries. We bring you carefully curated essentials that fit your lifestyle, your vibe and your beautiful journey.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-berry hover:bg-brand-berry-dark text-white text-xs tracking-wider font-medium transition shadow-xs"
              >
                <span>Learn More</span>
                <span className="text-sm">→</span>
              </Link>
            </div>

            {/* Floral Sketch & Script Sign-off */}
            <div className="pt-6 flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-brand-berry/70">
                <path d="M12 2C9 5 5 8 5 12C5 16 9 20 12 22C15 20 19 16 19 12C19 8 15 2 12 2Z"/>
                <path d="M12 2V22"/>
                <path d="M8 8C10 10 14 10 16 8"/>
                <path d="M7 14C9.5 15.5 14.5 15.5 17 14"/>
              </svg>
              <span className="font-script text-2xl text-brand-charcoal/80">
                Good Things Ahead ♡
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

