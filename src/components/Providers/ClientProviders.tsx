'use client';

import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

const ClientProviders = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="dit-theme"
      // The theme script only needs to run from the server HTML. When a locale switch remounts this
      // provider, mark the client copy as inert data so React 19 doesn't warn about a client <script>.
      scriptProps={typeof window === 'undefined' ? undefined : { type: 'application/json' }}
    >
      {children}
    </ThemeProvider>
  );
};

export default ClientProviders;
