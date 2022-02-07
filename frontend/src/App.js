import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header/header'
import Clusters from './pages/clusters/clusters'
import Pods from './pages/pods/pods'
import Graphs from './pages/charts/overview'
import SampleDashboard from './pages/grafana-integration/grafana-integration'
import { Navigate } from 'react-router-dom'

import './App.css'
import AlertNotify from './components/alert/AlertNotify'

export default function App() {
  return (
    <Router>
      <Header />
      <AlertNotify />
      <Routes>
        <Route path='/clusters' element={<Clusters />} />
        <Route path='/pods/:id' element={<Pods />} />
        <Route path='/dashboard/:id' element={<SampleDashboard />} />
        <Route path='/overview' element={<Graphs />} />
        <Route path='/' element={<Navigate to='/overview' />} />
      </Routes>
    </Router>
  )
}
