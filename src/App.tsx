import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SupplyChainMap from './pages/SupplyChainMap';
import Analytics from './pages/Analytics';
import Collaboration from './pages/Collaboration';
import Blockchain from './pages/Blockchain';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/supply-chain-map" element={<SupplyChainMap />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;