import React from 'react';
import { IntlProvider } from 'react-intl';
import { polyfill } from '../polyfills';

import App from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import createCache from '@emotion/cache';
import theme from '../src/theme';

export const cache = createCache({ key: 'css', prepend: true });

function MyApp({ Component, pageProps, locale, messages }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
      <CacheProvider value={cache}>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </IntlProvider>
  );
}

/**
 * Get the messages and also do locale negotiation. A multi-lingual user
 * can specify locale prefs like ['ja', 'en-GB', 'en'] which is interpreted as
 * Japanese, then British English, then English
 * @param locales list of requested locales
 * @returns {[string, Promise]} A tuple containing the negotiated locale
 * and the promise of fetching the translated messages
 */
function getMessages(locales: string | string[] = ['en']) {
  if (!Array.isArray(locales)) {
    locales = [locales];
  }
  let langBundle;
  let locale;
  for (let i = 0; i < locales.length && !locale; i++) {
    locale = locales[i];
    switch (locale) {
      case 'fr':
        langBundle = import('../compiled-lang/fr.json');
        break;
      case 'en-GB':
        langBundle = import('../compiled-lang/en-GB.json');
        break;
      case 'zh-Hans-CN':
        langBundle = import('../compiled-lang/zh-Hans-CN.json');
        break;
      case 'zh-Hant-HK':
        langBundle = import('../compiled-lang/zh-Hant-HK.json');
        break;
      default:
        break;
      // Add more languages
    }
  }
  if (!langBundle) {
    return ['en', import('../compiled-lang/en.json')];
  }
  return [locale, langBundle];
}

const getInitialProps: typeof App.getInitialProps = async (appContext) => {
  const {
    ctx: { req },
  } = appContext;
  const requestedLocales: string | string[] =
    (req as any)?.locale ||
    (typeof navigator !== 'undefined' && navigator.languages) ||
    // IE11
    (typeof navigator !== 'undefined' && (navigator as any).userLanguage) ||
    (typeof window !== 'undefined' && (window as any).LOCALE) ||
    'en';

  const [supportedLocale, messagePromise] = getMessages(requestedLocales);

  const [, messages, appProps] = await Promise.all([
    polyfill(supportedLocale),
    messagePromise,
    App.getInitialProps(appContext),
  ]);

  return {
    ...(appProps as any),
    locale: supportedLocale,
    messages: messages.default,
  };
};

MyApp.getInitialProps = getInitialProps;

export default MyApp;
