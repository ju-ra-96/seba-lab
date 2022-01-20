import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/header';
import Clusters from "./pages/clusters/clusters";
import Overview from "./pages/overview/overview";
import Charts from "./pages/charts/charts";
import SampleDashboard from './pages/grafana-integration/grafana-integration';
import  { Navigate } from 'react-router-dom'

import './App.css'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/clusters" element={<Clusters />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/overview/:id" element={<Overview />} />
        <Route path="/dashboard" element={<SampleDashboard />} />
        <Route path="/" element={<Navigate to ="/clusters" />}/>
      </Routes>
    </Router>
  );
}
