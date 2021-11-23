import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import './App.css';

const App = function App() {
  return (
    <div className="container">
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>     
    </Routes>
    </div>
  );
};

export default App;
