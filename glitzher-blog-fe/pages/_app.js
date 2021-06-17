import Layout from '../components/Layout';
import '../styles/globals.css';
import { useRouter } from 'next/router';

// GA
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let location = router.pathname;
  useEffect(() => {
    ReactGA.initialize('UA-194144958-1');
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }, [location]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
