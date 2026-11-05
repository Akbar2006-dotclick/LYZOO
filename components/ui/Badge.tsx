import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'new' | 'bestseller' | 'discount' | 'stock' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  const variantStyles = {
    new: 'bg-brand-charcoal text-brand-ivory border-brand-charcoal',
    bestseller: 'bg-brand-rose text-white border-brand-rose',
    discount: 'bg-[#8F3D38] text-white border-[#8F3D38]',
    stock: 'bg-amber-100 text-amber-900 border-amber-300',
    neutral: 'bg-brand-beige/80 text-brand-charcoal border-brand-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium rounded-full border shadow-sm transition-all',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

