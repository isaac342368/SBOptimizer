// import React, { useState, useEffect } from 'react';
// import Header from '../Header';

// const API_KEY = '1fb771f0913d81a83b47fa81c0099aba'; // Replace with your actual API key
// const API_BASE_URL = 'https://api.the-odds-api.com/v4/sports';

// function PlayerProps() {
//   const [selectedSport, setSelectedSport] = useState(null);
//   const [sports, setSports] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [playerProps, setPlayerProps] = useState([]);
//   const [propOptions, setPropOptions] = useState([]);
//   const [selectedGame, setSelectedGame] = useState(null);
//   const sportsKeys = [
//     'basketball_nba', 'hockey_nhl', 'americanfootball_ncaaf', 
//     'basketball_wnba', 'baseball_mlb', 'americanfootball_nfl', 
//     'basketball_ncaab'
//   ];
//   const sportPropOptions = {
//     'basketball_nba': [
//       'player_points', 'player_rebounds', 'player_assists', 
//       'player_threes', 'player_blocks', 'player_steals', 
//       'player_blocks_steals', 'player_turnovers', 
//       'player_points_rebounds_assists', 'player_points_rebounds', 
//       'player_points_assists', 'player_rebounds_assists', 
//       'player_first_basket', 'player_double_double', 'player_triple_double'
//     ],
//     'basketball_wnba': [
//       'player_points', 'player_rebounds', 'player_assists', 
//       'player_threes', 'player_blocks', 'player_steals', 
//       'player_blocks_steals', 'player_turnovers', 
//       'player_points_rebounds_assists', 'player_points_rebounds', 
//       'player_points_assists', 'player_rebounds_assists', 
//       'player_first_basket', 'player_double_double', 'player_triple_double'
//     ],
//     'basketball_ncaab': [
//       'player_points', 'player_rebounds', 'player_assists', 
//       'player_threes', 'player_blocks', 'player_steals', 
//       'player_blocks_steals', 'player_turnovers', 
//       'player_points_rebounds_assists', 'player_points_rebounds', 
//       'player_points_assists', 'player_rebounds_assists', 
//       'player_first_basket', 'player_double_double', 'player_triple_double'
//     ],
//     'americanfootball_nfl':[
//       'player_pass_tds', 'player_pass_yds','player_pass_completions',
//       'player_pass_attempts', 'player_pass_interceptions','player_pass_longest_completion',
//       'player_rush_yds','player_rush_attempts','player_rush_yds','player_rush_attempts',
//       'player_rush_longest', 'player_receptions', 'player_reception_yds','player_reception_longest',
//       'player_kicking_points', 'player_field_goals', "player_tackles_assists", 'player_1st_td',
//       'player_last_td', 'player_anytime_td'
//     ],
//     'americanfootball_ncaaf':[
//       'player_pass_tds', 'player_pass_yds','player_pass_completions',
//       'player_pass_attempts', 'player_pass_interceptions','player_pass_longest_completion',
//       'player_rush_yds','player_rush_attempts','player_rush_yds','player_rush_attempts',
//       'player_rush_longest', 'player_receptions', 'player_reception_yds','player_reception_longest',
//       'player_kicking_points', 'player_field_goals', "player_tackles_assists", 'player_1st_td',
//       'player_last_td', 'player_anytime_td'
//     ],
//     'baseball_mlb': [
//       'batter_home_runs', 'batter_hits', 'batter_total_bases',
//       'batter_rbis', 'batter_runs_scored','batter_hits_runs_rbis',
//       'batter_singles','batter_doubles','batter_triples',
//       'batter_walks','batter_strikeouts', 'batter_stolen_bases',
//       'pitcher_strikeeouts','pitcher_record_a_win','pitcher_hits_allowed',
//       'pitcher_earned_runs','pitcher_walks'
//     ]
    
//   };
  

  

 

//   useEffect(() => {
//     // Fetch sports and filter them based on the sportsKeys
//     fetch(`${API_BASE_URL}/?apiKey=${API_KEY}`)
//       .then(response => response.json())
//       .then(data => {
//         const filteredSports = data.filter(sport => sportsKeys.includes(sport.key));
//         setSports(filteredSports);
//       });
//   }, []);

//   // Fetch events for a selected sport
//   useEffect(() => {
//     if (selectedSport) {
//       fetch(`${API_BASE_URL}/${selectedSport}/odds/?apiKey=${API_KEY}&regions=us&markets=h2h`)
//         .then(response => response.json())
//         .then(data => {
//           setEvents(data);
//         });
//     }
//   }, [selectedSport]);

//   // Function to call when a sport is selected
//   const handleSportSelect = (sportKey) => {
//     setSelectedSport(sportKey);
//     setPropOptions(sportPropOptions[sportKey] || []);
   
//   };



//   // Function to fetch player props for an event
//   const fetchPlayerPropsForEvent = (eventId) => {
//     fetch(`${API_BASE_URL}/${selectedSport}/events/${eventId}/odds/?apiKey=${API_KEY}&regions=us&markets=player_points&oddsFormat=american`)
//       .then(response => response.json())
//       .then(data => {
//         setPlayerProps(data);
//       });
//   };

//   return (
//     <div>
//     <Header />
//     {/* Sports Grid */}
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Adjust the height as needed */}
//   <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
//     Select Your Sport:
//   </div>
// </div>
//     <div className="events-grid">
//       {sports.map((sport, index) => (
//         <div key={index} className="event-card" onClick={() => handleSportSelect(sport.key)}>
//           <div className="event-title">{sport.title}</div>
//         </div>
//       ))}
//     </div>

//     {selectedSport && (
//         <div className="evnt-grid">
//           {propOptions.map((propOption, index) => (
//             <div key={index} className="event-card">
//               <div className="event-title">{propOption.replace('player_', '').split('_').join(' ')}</div>
//             </div>
//           ))}
//         </div>
//       )}

   
      
//     <div className="events-gird">
//   {events.map((event, index) => (
//     <div key={index} className="event-card" onClick={() => fetchPlayerPropsForEvent(event.id)}>
//       <div style={{color:'white'}}>{event.home_team} vs {event.away_team}</div>
//     </div>
//   ))}
// </div>

// {/* Display player props */}
// {console.log(playerProps)}
// <div className="event-grid">
//       {playerProps.map((prop, index) => (
//         <div key={index} className="events-card">
//           <div className="event-title">{prop.name}</div> {/* prop.name should be replaced with your actual data field */}
//           <div >
//             {/* Display additional details of the prop here */}
//             <div>Odds: {prop.odds}</div> {/* Example */}
//             {/* Include more prop details as needed */}
//           </div>
//         </div>
//       ))}
//     </div>
// </div>
//   );
// }

// export default PlayerProps;

import React, { useState, useEffect } from 'react';
import Header from '../Header';
import '../MoneyLinePage.css';
import '../PlayerProps.css';

const API_KEY = '5997ce1f6f512de3504e3053f2f36d92';
const API_BASE_URL = 'https://api.the-odds-api.com/v4/sports';

import Footer from './footer';

function PlayerProps() {
  const [selectedSport, setSelectedSport] = useState(null);
  const [sports, setSports] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [playerProps, setPlayerProps] = useState([]);
  const [selectedProp, setSelectedProp] = useState(null);

  // Add your sportPropOptions here
  const sportPropOptions = {
        'basketball_nba': [
          'player_points', 'player_rebounds', 'player_assists', 
          'player_threes', 'player_blocks', 'player_steals', 
          'player_blocks_steals', 'player_turnovers', 
          'player_points_rebounds_assists', 'player_points_rebounds', 
          'player_points_assists', 'player_rebounds_assists', 
          'player_first_basket', 'player_double_double', 'player_triple_double'
        ],
        'basketball_wnba': [
          'player_points', 'player_rebounds', 'player_assists', 
          'player_threes', 'player_blocks', 'player_steals', 
          'player_blocks_steals', 'player_turnovers', 
          'player_points_rebounds_assists', 'player_points_rebounds', 
          'player_points_assists', 'player_rebounds_assists', 
          'player_first_basket', 'player_double_double', 'player_triple_double'
        ],
        'basketball_ncaab': [
          'player_points', 'player_rebounds', 'player_assists', 
          'player_threes', 'player_blocks', 'player_steals', 
          'player_blocks_steals', 'player_turnovers', 
          'player_points_rebounds_assists', 'player_points_rebounds', 
          'player_points_assists', 'player_rebounds_assists', 
          'player_first_basket', 'player_double_double', 'player_triple_double'
        ],
        'americanfootball_nfl':[
          'player_pass_tds', 'player_pass_yds','player_pass_completions',
          'player_pass_attempts', 'player_pass_interceptions','player_pass_longest_completion',
          'player_rush_yds','player_rush_attempts','player_rush_yds','player_rush_attempts',
          'player_rush_longest', 'player_receptions', 'player_reception_yds','player_reception_longest',
          'player_kicking_points', 'player_field_goals', "player_tackles_assists", 'player_1st_td',
          'player_last_td', 'player_anytime_td'
        ],
        'americanfootball_ncaaf':[
          'player_pass_tds', 'player_pass_yds','player_pass_completions',
          'player_pass_attempts', 'player_pass_interceptions','player_pass_longest_completion',
          'player_rush_yds','player_rush_attempts','player_rush_yds','player_rush_attempts',
          'player_rush_longest', 'player_receptions', 'player_reception_yds','player_reception_longest',
          'player_kicking_points', 'player_field_goals', "player_tackles_assists", 'player_1st_td',
          'player_last_td', 'player_anytime_td'
        ],
        'baseball_mlb': [
          'batter_home_runs', 'batter_hits', 'batter_total_bases',
          'batter_rbis', 'batter_runs_scored','batter_hits_runs_rbis',
          'batter_singles','batter_doubles','batter_triples',
          'batter_walks','batter_strikeouts', 'batter_stolen_bases',
          'pitcher_strikeeouts','pitcher_record_a_win','pitcher_hits_allowed',
          'pitcher_earned_runs','pitcher_walks'
        ]
      }

  useEffect(() => {
    // Fetch sports and filter them based on keys
    fetch(`${API_BASE_URL}/?apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const filteredSports = data.filter(sport => Object.keys(sportPropOptions).includes(sport.key));
        setSports(filteredSports);
      });
  }, []);

  useEffect(() => {
    // Fetch events when a sport is selected
    if (selectedSport) {
      fetch(`${API_BASE_URL}/${selectedSport}/odds/?apiKey=${API_KEY}&regions=us&markets=h2h`)
        .then(response => response.json())
        .then(data => {
          setEvents(data);
        });
    }
  }, [selectedSport]);

  const handleSportSelect = (sportKey) => {
    setSelectedSport(sportKey);
    setSelectedEventId(null);
    setSelectedProp(null);
    setPlayerProps([]);
  };
 const  groupPropsByPlayer = (playerProps) => {
  const groupedProps = {};
  playerProps.forEach((prop) => {
    const playerName = prop.description;
    if (!groupedProps[playerName]){
      groupedProps[playerName] = [];
    }
    groupedProps[playerName].push(prop)
  }
  )
  return groupedProps;

 }

 const convertOddsToProbability = (odds) => {
  if (odds > 0) {
    return (100 / (odds + 100)) * 100;
  } else {
    return (-odds / (-odds + 100)) * 100;
  }
};

  const handleEventSelect = (eventId) => {
    setSelectedEventId(eventId);
    setSelectedProp(null);
    setPlayerProps([]);
  };

  const handlePropSelect = (propKey) => {
    setSelectedProp(propKey);
    if (selectedEventId) {
      fetchPlayerPropsForEvent(selectedEventId, propKey);
    }
  };

  const fetchPlayerPropsForEvent = (eventId, propKey) => {
    fetch(`${API_BASE_URL}/${selectedSport}/events/${eventId}/odds/?apiKey=${API_KEY}&regions=us&markets=${propKey}&oddsFormat=american`)
      .then(response => response.json())
      .then(data => {
        // Check if there are bookmakers and markets
        if (data.bookmakers && data.bookmakers.length > 0 && data.bookmakers[0].markets) {
          // Assuming you want to get the outcomes from the first market
          const outcomes = data.bookmakers[0].markets[0].outcomes;
          if (outcomes) {
            const groupedProps = groupPropsByPlayer(outcomes);
            setPlayerProps(groupedProps); // utcomes' should be an array you can map over
          } else {
            setPlayerProps([]); // If there are no outcomes, set an empty array
          }
        } else {
          setPlayerProps([]); // If the structure is not as expected, set an empty array
        }
      })
      .catch(error => {
        console.error('Error fetching player props:', error);
        setPlayerProps([]); // In case of error, set an empty array
      });
  };
  

  return (
    <div>
   

      <Header />
      <div>

  
      <div className="events-grid">
        {sports.map((sport, index) => (
          <button key={index} className = 'event-card' onClick={() => handleSportSelect(sport.key)}>
            <div className ="event-title"> {sport.title}</div>
          </button>
        ))}
      </div>
    

      {selectedSport && !selectedEventId && (
        <div className = "events-grid">
          {events.map((event, index) => (
            <button key={index} className = 'event-selection' onClick={() => handleEventSelect(event.id)}>
             {event.home_team} vs {event.away_team}
            </button>
          ))}
        </div>
      )}

      {selectedEventId && !selectedProp && (
        <div className='events-grid'>
          {sportPropOptions[selectedSport].map((propKey, index) => (
            <button key={index} className = 'event-selection' onClick={() => handlePropSelect(propKey)}>
              {propKey.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      )}

     
     
     
{console.log(playerProps)}
{selectedProp && playerProps && (
  <div className="events-grid">
    {Object.entries(playerProps).map(([playerName, props], index) => (
      <div key={index} className="event-card">
        <div className="event-title">{playerName}</div>
        {props.map((prop, propIndex) => {
          // Convert odds to probability
          const probability = convertOddsToProbability(prop.price);
          // Determine the class for the probability
          let probabilityClass = '';
          if (probability >= 65) {
            probabilityClass = 'high-probability';
          } else if (probability >= 50) {
            probabilityClass = 'med-probability';
          } else {
            probabilityClass = 'low-probability';
          }
          // Render the prop details with probability bar
          return (
            <div key={propIndex} style={{ color: "#C0C0C0"}}>
              <p>{prop.name}: {prop.point}</p>
             
              <p>Probability: {probability.toFixed(2)}%</p>
              <div className={`probability-bar ${probabilityClass}`}></div>
            </div>
          );
        })}
      </div>
    ))}
  </div>
)}


    </div>
 
   </div> 
  );
}

export default PlayerProps;
