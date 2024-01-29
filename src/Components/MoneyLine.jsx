import React, { useState, useEffect } from 'react';
import '../MoneyLinePage.css';
import Header from "../Header";
import Footer from './footer';
function MoneyLine() {
  const [moneyLineData, setMoneyLineData] = useState([]);

  useEffect(() => {
    const fetchMoneyLineData = async () => {
      const API_URL = "https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=1fb771f0913d81a83b47fa81c0099aba&regions=us&markets=h2h";
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const processedData = data.map(event => {
          const { sport_title, home_team, away_team, bookmakers } = event;
          let homeImpliedProbability = 0;
          let awayImpliedProbability = 0;

          if (bookmakers.length > 0 && bookmakers[0].markets.length > 0) {
            const outcomes = bookmakers[0].markets[0].outcomes;
            outcomes.forEach(outcome => {
              const impliedProbability = 1 / outcome.price;
              if (outcome.name === home_team) {
                homeImpliedProbability = impliedProbability;
              } else if (outcome.name === away_team) {
                awayImpliedProbability = impliedProbability;
              }
            });
          }

          const higherImpliedProbability = Math.max(homeImpliedProbability, awayImpliedProbability);
          const teamWithHigherProbability = homeImpliedProbability > awayImpliedProbability ? home_team : away_team;

          return {
            league: sport_title,
            matchup: `${home_team} vs ${away_team}`,
            teamWithHigherProbability,
            higherImpliedProbability: higherImpliedProbability.toFixed(2)
          };
        });

        setMoneyLineData(processedData);
      } catch (error) {
        console.error("Error fetching money line data:", error);
      }
    };

    fetchMoneyLineData();
  }, []);

  const getProbabilityClass = (probability) => {
    if (probability >= 0.72) {
      return 'high-probability';
    } else if (probability > 0.6) {
      return 'med-probability';
    } else {
      return 'low-probability';
    }
  };

  return (
    <div>

   <Header/>
    <div className="money-line-container">
      <h2  style={{color: 'white'}}>Money Line Odds</h2>
      <div className="events-grid">
        {moneyLineData.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-title">{event.league}</div>
            <div style={{ color: "#C0C0C0"}}>{event.matchup}</div>
            <div className="probability-info">
              Team with higher implied probability: {event.teamWithHigherProbability}
              <div className={`probability-bar ${getProbabilityClass(event.higherImpliedProbability)}`}></div>
              Higher Implied Probability: {event.higherImpliedProbability}
            </div>
          </div>
        ))}
      </div>
      <div className="key-container">
        {/* ... key items ... */}
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default MoneyLine;