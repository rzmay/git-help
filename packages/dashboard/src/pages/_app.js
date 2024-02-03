import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard'; // Import your Dashboard component
import QuickStart from './quickstart'; // Import your QuickStart component
import Layout from '../components/Layout'; // Import your Layout component

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
