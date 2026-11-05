import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Our Story | LYZOO — YOUR LITTLE WORLD OF LOVELY',
  description: 'More than just a store, it’s a feeling. The story and heart behind LYZOO.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF6F4] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Our Story' }]} />

        {/* Hero */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-muted font-medium">
            OUR STORY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-brand-charcoal">
            More than just a store,
            <br />
            it&apos;s a feeling.
          </h1>
          <div className="text-brand-berry text-xs">♥</div>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-brand-border shadow-xs space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-brand-blush text-brand-berry mx-auto flex items-center justify-center">
            <Heart className="w-7 h-7 fill-brand-berry/20" />
          </div>

          <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed font-light max-w-xl mx-auto">
            LYZOO was created for every girl who believes in dreams, self-love and little luxuries. We bring you carefully curated essentials that fit your lifestyle, your vibe and your beautiful journey.
          </p>

          <p className="font-script text-3xl text-brand-berry pt-2">
            Same girl, Different moods ♡
          </p>

          <div className="pt-4 border-t border-brand-border/60">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-berry hover:bg-brand-berry-dark text-white text-xs tracking-wider font-medium transition shadow-xs"
            >
              <span>Explore Our Curations</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
