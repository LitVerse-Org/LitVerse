import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import de from 'javascript-time-ago/locale/de.json'; // Import other locales as needed

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(de); // Add other locales as needed

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
  );
}

export default MyApp;
