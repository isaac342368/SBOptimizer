import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import Header from './Header';
import Footer from './Components/footer';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
    <Header />
    <div className="home-container">
      {/* Background logo that fades in */}
      <div className="background-logo"></div> 

      <h1>The SB Optimizer</h1>
      
      {/* Navigation buttons */}
      <div className="options">
        <button onClick={() => navigate('/moneyline')}>Money Line</button>
        <button onClick={() => navigate('/spread')}>Spread</button>
        <button onClick={() => navigate('/playerprops')}>Player Props</button>
      

        
      </div>

    </div>
    < Footer/>

    </div>
  );
}

export default Home;

