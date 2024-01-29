import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MoneyLine from './Components/MoneyLine';
import Spread from './Components/Spread';
import PlayerProps from './Components/PlayerProps';
import ContactUs from './Components/ContactUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moneyline" element={<MoneyLine />} />
        <Route path="/spread" element={<Spread />} />
        <Route path="/playerprops" element={<PlayerProps />} />
        <Route path="/contactus" element={<ContactUs />} />
        {/* Add other routes here if necessary */}
      </Routes>
    </Router>
  );
}

export default App;

