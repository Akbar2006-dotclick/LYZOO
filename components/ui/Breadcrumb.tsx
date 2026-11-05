import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-brand-muted tracking-wider uppercase mb-6">
      <Link href="/" className="hover:text-brand-charcoal transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-brand-muted/60" />
          {item.href && index < items.length - 1 ? (
            <Link href={item.href} className="hover:text-brand-charcoal transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-charcoal font-medium truncate max-w-[200px] sm:max-w-md">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

