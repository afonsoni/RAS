import React from 'react';
import './App.css';
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<Login/>}/>

      </Routes>
    </Router>
       
  );
}

export default App;
