import React from 'react';
import './globals.css';

export const metadata = {
  title: 'AI-Powered Site',
  description: 'Generated with ai-site',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
