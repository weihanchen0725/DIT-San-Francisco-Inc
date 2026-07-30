import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const CLIENT_NAMESPACES = [
  'Common',
  'Header',
  'CTABar',
  'NavBar',
  'Language',
  'Calculator',
  'OpenIndicator',
  'Contact',
  'Theme',
  'Incoterms',
] as const;

const ServerProviders = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.flatMap((namespace) =>
      namespace in messages ? [[namespace, messages[namespace]]] : []
    )
  );

  return <NextIntlClientProvider messages={clientMessages}>{children}</NextIntlClientProvider>;
};

export default ServerProviders;
