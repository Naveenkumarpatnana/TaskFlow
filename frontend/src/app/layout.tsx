import type { Metadata } from 'next';
import StyledProvider from '@/providers/StyledProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskFlow — Internal Task Management Dashboard',
  description: 'A powerful Jira-like task management and productivity dashboard for internal teams.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledProvider>{children}</StyledProvider>
      </body>
    </html>
  );
}
