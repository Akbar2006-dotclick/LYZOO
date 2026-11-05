import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from '@/components/layout/ClientLayout';

export const metadata: Metadata = {
  title: 'LYZOO — YOUR STYLE. YOUR WORLD. | Premium E-commerce Demo',
  description:
    'Experience LYZOO: Luxury silk apparel, clean formulations, handcrafted 18K jewellery, and architectural accessories. Frontend demonstration for client presentation.',
  keywords: [
    'LYZOO',
    'luxury shopping',
    'couture',
    'fashion',
    'makeup',
    'skincare',
    'jewellery',
    'handbags',
    'watches',
    'Pakistan luxury brand',
  ],
  authors: [{ name: 'LYZOO Design Studio' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

