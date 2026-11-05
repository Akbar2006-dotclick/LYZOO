export interface Testimonial {
  id: string;
  name: string;
  location: string;
  title: string;
  quote: string;
  rating: number;
  productName: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ayla S. Rahman',
    location: 'Lahore, Pakistan',
    title: 'Exquisite Silk Craftsmanship',
    quote: 'The Aurora Silk Midi Dress exceeded my highest expectations. The drape, the 22mm Mulberry silk weight, and the hand-finished French seams rival couture houses I usually shop in London and Paris. Truly exceptional.',
    rating: 5,
    productName: 'Aurora Silk Charmeuse Midi Dress',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-2',
    name: 'Zainab Tariq',
    location: 'Karachi, Pakistan',
    title: 'Flawless Radiant Finish',
    quote: 'The Radiance Elixir foundation melts into the skin like morning dew. No heavy masking, just pure luminous skin. The packaging alone looks stunning on my vanity table. LYZOO has truly set a new standard.',
    rating: 5,
    productName: 'Radiance Elixir Skin Glow Foundation',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-3',
    name: 'Mahnoor Khan',
    location: 'Islamabad, Pakistan',
    title: 'Heirloom Baroque Pearl',
    quote: 'I ordered the Solstice Baroque Pearl necklace for my sister’s engagement. The organic luster of the natural pearl paired with the 18K vermeil chain caught everyone’s eye. Presentation in the velvet box made it unforgettable.',
    rating: 5,
    productName: 'Solstice Baroque Pearl 18K Necklace',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  },
];

export const BRAND_VALUES = [
  {
    title: 'Artisanal Integrity',
    description: 'Every silhouette and formulation is crafted in partnership with master generational workshops across Florence, Como, and Grasse.',
    icon: 'Sparkles',
  },
  {
    title: 'Pure Formulations',
    description: 'Clean, cruelty-free cosmetic and skincare elixirs created without parabens, synthetic fillers, or compromising ethics.',
    icon: 'Leaf',
  },
  {
    title: 'Bespoke Packaging',
    description: 'Each order arrives cocooned in FSC-certified tactile ivory paper, signature grosgrain ribbons, and debossed gold monograms.',
    icon: 'Gift',
  },
  {
    title: 'White-Glove Delivery',
    description: 'Complimentary expedited delivery across Pakistan with tamper-evident packaging and tracked concierge service.',
    icon: 'ShieldCheck',
  },
];

