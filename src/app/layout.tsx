import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'निश्चित | Nishchit - AI for Rural Village Service Centres (CSC)',
  description:
    'Rural-first AI assistant for Indian village service centres & CSC operators. Converts speech to structured forms and safely stops when ambiguous.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
