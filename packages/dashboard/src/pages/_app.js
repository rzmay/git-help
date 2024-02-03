import React from 'react';
import Layout from '../components/Layout'; // Import your Layout component
import './global.css'; 

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
