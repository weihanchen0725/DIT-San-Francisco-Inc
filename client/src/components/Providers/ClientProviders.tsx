"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const ClientProviders = ({ children }: ProvidersProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Perform any necessary side effects here
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  //
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="dit-theme"
    >
      {children}
    </ThemeProvider>
  );
};

export default ClientProviders;
