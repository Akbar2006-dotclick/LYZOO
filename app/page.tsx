import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeatureBar } from '@/components/home/FeatureBar';
import { CategorySection } from '@/components/home/CategorySection';
import { MoodBannerSection } from '@/components/home/MoodBannerSection';
import { OurStorySection } from '@/components/home/OurStorySection';
import { StayInTouchSection } from '@/components/home/StayInTouchSection';

export const metadata = {
  title: 'LYZOO — YOUR LITTLE WORLD OF LOVELY',
  description:
    'Your happy place for everyday essentials, made for the girl who dreams bigger. Skincare, makeup, hair care, fragrance, accessories, and lifestyle.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Large Hero Section */}
      <HeroSection />

      {/* 2. 4-Item Feature Bar */}
      <FeatureBar />

      {/* 3. Shop by Category (Find What You Love - 6 Circular Bubbles) */}
      <CategorySection />

      {/* 4. Full-width Mood Banner (Same girl, Different moods ♡) */}
      <MoodBannerSection />

      {/* 5. Our Story Section (More than just a store, it's a feeling ♡) */}
      <OurStorySection />

      {/* 6. Newsletter Ribbon Banner (Let's stay in touch ♡) */}
      <StayInTouchSection />
    </div>
  );
}
