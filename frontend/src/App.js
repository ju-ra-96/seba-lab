import * as React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/header/header';
import Clusters from "./pages/clusters/clusters";
import Overview from "./pages/overview/overview";

import './App.css'

export default function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/clusters"  element={<Clusters/>}/>
        <Route path="/overview/:id"  element={<Overview/>}>
        </Route>
      </Routes>
    </Router>
  );
}
