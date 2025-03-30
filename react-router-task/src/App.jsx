import React from "react";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Meals from "./components/Meals";
import Cocktails from "./components/Cocktails";
import HarryPotter from "./components/HarryPotter";
import IndianBanks from "./components/IndianBanks";
import CharacterDetails from "./components/CharacterDetails";

function App() {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-item">
          <Link to="/" className="color">Meals</Link>
        </div> 
        <div className="nav-item">
          <Link to="/cocktails" className="color">Cocktails</Link>
        </div> 
        <div className="nav-item">
          <Link to="/harrypotter" className="color">Harry Potter</Link>
        </div>
        <div className="nav-item">
          <Link to="/indianbanks" className="color">Indian Banks</Link>
        </div>
      </nav>
     
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/harrypotter" element={<HarryPotter />} />
          <Route path="/indianbanks" element={<IndianBanks />} /> 
          <Route path="/character/:name" element={<CharacterDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;