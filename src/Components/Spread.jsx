import React, { useState, useEffect } from 'react';
import '../SpreadPage.css'; 
import '../MoneyLinePage.css';
import Header from '../Header';
import Footer from './footer';

function Spread() {
  const [spreadData, setSpreadData] = useState([]);
  const API_KEY = "62ecb41efc6195b8f07ba217cf7a5b47"

  useEffect(() => {
    const fetchSpreadData = async () => {
      try {
        const response = await fetch(`https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=1fb771f0913d81a83b47fa81c0099aba&regions=us&markets=spreads&oddsFormat=american`);
        const data = await response.json();

        const processedData = data.map(event => {
          const { sport_title, home_team, away_team, bookmakers } = event;
          let homeSpread = null;
          let awaySpread = null;
          let homeImpliedProbability = 0;
          let awayImpliedProbability = 0;

          if (bookmakers.length > 0) {
            const spreads = bookmakers[0].markets.find(market => market.key === 'spreads');
            if (spreads && spreads.outcomes.length > 0) {
              spreads.outcomes.forEach(outcome => {
                const impliedProbability = calculateImpliedProbability(outcome.price);
                if (outcome.name === home_team) {
                  homeSpread = outcome.point;
                  homeImpliedProbability = impliedProbability;
                } else if (outcome.name === away_team) {
                  awaySpread = outcome.point;
          awayImpliedProbability = impliedProbability;
                }

               
              });
            }
          }

          const higherImpliedProbability = Math.max(homeImpliedProbability, awayImpliedProbability).toFixed(2);
          const teamWithHigherProbability = homeImpliedProbability > awayImpliedProbability ? home_team : away_team;
          const colorBarClass = getColorBarClass(higherImpliedProbability);

          return {
            league: sport_title,
            matchup: `${home_team} vs ${away_team}`,
            homeTeam: home_team,
            awayTeam: away_team,
            homeSpread,
            awaySpread,
            teamWithHigherProbability,
            higherImpliedProbability,
            colorBarClass
          };
        });

        setSpreadData(processedData);
      } catch (error) {
        console.error("Error fetching spread data:", error);
      }
    };

    fetchSpreadData();
  }, []);

  const getColorBarClass = (probability) => {
    if (probability >= 0.72) {
      return 'high-probability';
    } else if (probability > 0.6 && probability < 0.72) {
      return 'med-probability';
    } else {
      return 'low-probability';
    }
  };

  function calculateImpliedProbability(odds) {
    if (odds >= 100) {
      // Positive odds
      return 100 / (odds + 100);
    } else {
      // Negative odds
      return Math.abs(odds) / (Math.abs(odds) + 100);
    }
  }

  return (

<div>
    <div>

      < Header />
      <h2>Spread Odds</h2>
      <div className="events-grid">
        {spreadData.map((event, index) => (
          <div key={index} className="event-card">
            {(event.homeSpread === null && event.awaySpread === null || event.homeSpread === 0) ? (
              // No spread data available
                <>
                <div className="event-title">{event.league}</div>
                <div style={{ color: "#C0C0C0" }}>{event.matchup}</div>
                <div style={{ color: "#C0C0C0" }}>No spread data available for this event.</div>
                </>
              
            ) : (
              // Spread data available
              <>
                <div className="event-title">{event.league}</div>
                <div style={{ color: "#C0C0C0" }}>{event.matchup}</div>
                <div className="probability-info">
                  <div>{event.homeSpread !== null ? `${event.homeSpread} (${event.homeTeam})` : 'N/A'}</div>
                  <div>{event.awaySpread !== null ? `${event.awaySpread} (${event.awayTeam})` : 'N/A'}</div>
                  <div>Team with higher implied probability: {event.teamWithHigherProbability}</div>
                  <div className={`probability-bar ${event.colorBarClass}`}></div>
                  <div>Higher Implied Probability: {event.higherImpliedProbability}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Footer/>
    </div>

    
    </div>
    

  );
  
}

export default Spread;
