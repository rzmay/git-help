import React from 'react';
import Layout from '../components/Layout';
import './global.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
