const moneyLineBtn = document.getElementById("moneyLineBtn");
const spreadBtn = document.getElementById("spreadBtn");
//const playerPropsBtn = document.getElementById("playerPropsBtn");
const contentDiv = document.getElementById("content");



function displayContent(option) {
    // Clear previous content
    contentDiv.innerHTML = "";

    // Display content based on the selected option
    if (option === "moneyLine") {
        contentDiv.innerHTML = "<p>Display Money Line content here.</p>";
    } else if (option === "spread") {
        contentDiv.innerHTML = "<p>Display Spread content here.</p>";
    } else if (option === "playerProps") {
        contentDiv.innerHTML = "<p>Display Player Props content here.</p>";
    }
}


const moneyLineContent = document.getElementById("moneyLineContent");

moneyLineBtn.addEventListener("click", function() {
    fetchAndDisplayMoneyLine(moneyLineContent);
});


// ... (other event listeners)




const keyDiv = document.createElement("div");
keyDiv.innerHTML = `
    <h3>Key:</h3>
    <div class="key-item">
        <div class="color-box red-bar"></div>
        <span>Highly Recommended (Implied Probability >= 72%)</span>
    </div>
    <div class="key-item">
        <div class="color-box yellow-bar"></div>
        <span>Moderately Recommended (Implied Probability > 60% and < 72%)</span>
    </div>
    <div class="key-item">
        <div class="color-box faint-yellow-bar"></div>
        <span>Recommended (Implied Probability >= 50% and <= 60%)</span>
    </div>
`;
//contentDiv.appendChild(keyDiv);







async function fetchAndDisplayMoneyLine() {
    clearContent();
    
    try {
        const response = await fetch(
            "https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=62ecb41efc6195b8f07ba217cf7a5b47&regions=us&markets=h2h"
        );

        const data = await response.json();
       
            const moneyLineContent = document.getElementById("moneyLineContent");
            moneyLineContent.innerHTML = "<h2>Money Line Odds</h2>";
        
            for (const event of data) {
                const homeTeamName = event.home_team;
                const awayTeamName = event.away_team;
                const bookmakers = event.bookmakers;
        
                const homeTeamOdds = [];
                const awayTeamOdds = [];
        
                for (const bookmaker of bookmakers) {
                   
                    const outcomes = bookmaker.markets[0].outcomes;
                    const homeTeamIndex = outcomes.findIndex(outcome => outcome.name === homeTeamName);
                    const awayTeamIndex = outcomes.findIndex(outcome => outcome.name === awayTeamName);
                
                    homeTeamOdds.push(outcomes[homeTeamIndex].price);
                    awayTeamOdds.push(outcomes[awayTeamIndex].price);
                }
        
                const homeTeamAvgOdds = homeTeamOdds.reduce((sum, odd) => sum + odd, 0) / homeTeamOdds.length;
                const awayTeamAvgOdds = awayTeamOdds.reduce((sum, odd) => sum + odd, 0) / awayTeamOdds.length;
        
                const homeTeamImpliedProbability = 1 / homeTeamAvgOdds;
                const awayTeamImpliedProbability = 1 / awayTeamAvgOdds;
        
                let teamWithHigherProbability = "";
                let higherImpliedProbability = 0;
                let colorBarClass = "";
        
                if (homeTeamImpliedProbability > awayTeamImpliedProbability) {
                    teamWithHigherProbability = homeTeamName;
                    higherImpliedProbability = homeTeamImpliedProbability;
                } else {
                    teamWithHigherProbability = awayTeamName;
                    higherImpliedProbability = awayTeamImpliedProbability;
                }
        
                if (higherImpliedProbability >= 0.72) {
                    colorBarClass = "red-bar";
                } else if (higherImpliedProbability > 0.6 && higherImpliedProbability < 0.72) {
                    colorBarClass = "yellow-bar";
                } else {
                    colorBarClass = "faint-yellow-bar";
                }
        
                moneyLineContent.innerHTML += `
                    <p>${event.sport_title}: ${homeTeamName} vs ${awayTeamName}</p>
                    <p>Team with higher implied probability: ${teamWithHigherProbability}</p>
                    <p>Higher Implied Probability: ${higherImpliedProbability.toFixed(2)}</p>
                    <div class="color-bar ${colorBarClass}"></div>
                    <hr>
                `;
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
        
    
      

       


function clearContent() {
    contentDiv.innerHTML = "";
    moneyLineContent.innerHTML = ""; // Clear money line content
}














spreadBtn.addEventListener("click", fetchAndDisplaySpread);

async function fetchAndDisplaySpread() {
    clearContent();
    
    try {
        const response = await fetch(
            "https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=62ecb41efc6195b8f07ba217cf7a5b47&regions=us&markets=spreads&oddsFormat=american"
        );

        const data = await response.json();
                //console.log(data);
       
            const spreadContent = document.getElementById("spreadContent");
            spreadContent.innerHTML = "<h2>Spread Odds</h2>";

            for (const event of data) {
                // Extract data from the API response
              
                const homeTeamName = event.home_team;
             
                const awayTeamName = event.away_team;
                const bookmakers = event.bookmakers;
                
                // Create arrays to hold data for each team's spreads
                if (bookmakers.length > 0){
                const homeTeamSpreads = [];
                const awayTeamSpreads = [];
                
            
                // Loop through bookmakers to gather spread data


                for (const bookmaker of bookmakers) {
                    const outcomes = bookmaker.markets[0].outcomes;
                    console.log(outcomes);
                    // Find the team's spread based on its name
                    const homeTeamSpread = outcomes.find(outcome => outcome.name === homeTeamName);
                    const awayTeamSpread = outcomes.find(outcome => outcome.name === awayTeamName);
            
                    // Push the spread and odds to the respective arrays
                    homeTeamSpreads.push({ spread: homeTeamSpread.point, odds: homeTeamSpread.price });
                    awayTeamSpreads.push({ spread: awayTeamSpread.point, odds: awayTeamSpread.price });
                }
            
                // Calculate the implied probabilities for each spread
                const homeTeamImpliedProbabilities = homeTeamSpreads.map(spread => calculateImpliedProbability(spread.odds));
               
                const awayTeamImpliedProbabilities = awayTeamSpreads.map(spread => calculateImpliedProbability(spread.odds));
            
                // Find the minimum spread that covers other higher spreads
                const homeTeamMinSpread = findMinSpreadCoveringHigher(homeTeamSpreads);
                const awayTeamMinSpread = findMinSpreadCoveringHigher(awayTeamSpreads);
            
                // Calculate the implied probability for each team based on the minimum spread
                let homeTeamImpliedProbability;
                let awayTeamImpliedProbability
                const homeTeamImpliedProbabilityIndex = homeTeamSpreads.findIndex(spread => spread.spread === homeTeamMinSpread);
                if (homeTeamImpliedProbabilityIndex !== -1) {
                     homeTeamImpliedProbability = homeTeamImpliedProbabilities[homeTeamImpliedProbabilityIndex];
                  
                } else {
                    moneyLineContent.innerHTML += `
                        <p>${event.sport_title}: ${homeTeamName} vs ${awayTeamName}</p>
                        <p>No implied probability data available for this spread.</p>
                        <hr>
                    `;
                }
                const awayTeamImpliedProbabilityIndex = awayTeamSpreads.findIndex(spread => spread.spread === awayTeamMinSpread);
                if (awayTeamImpliedProbabilityIndex !== -1) {
                     awayTeamImpliedProbability = awayTeamImpliedProbabilities[awayTeamImpliedProbabilityIndex];
                    // Rest of your code
                } else {
                    moneyLineContent.innerHTML += `
                        <p>${event.sport_title}: ${awayTeamName} vs ${awayTeamName}</p>
                        <p>No implied probability data available for this spread.</p>
                        <hr>
                    `;
                }


              
                
            
                // Determine the color bar class based on implied probability
                const colorBarClass = homeTeamImpliedProbability !== undefined
        ? getColorBarClass(homeTeamImpliedProbability, awayTeamImpliedProbability)
        : '';
            
                // Display the data on the UI
                moneyLineContent.innerHTML += `
                    <p>${event.sport_title}: ${homeTeamName} vs ${awayTeamName}</p>
                    <p>Team with higher implied probability: ${homeTeamImpliedProbability > awayTeamImpliedProbability ? homeTeamName : awayTeamName}</p>
                    <p>Higher Implied Probability: ${Math.max(homeTeamImpliedProbability, awayTeamImpliedProbability).toFixed(2)}</p>
                    <div class="color-bar ${colorBarClass}"></div>
                    <hr>
                `;
            }
            else {
                moneyLineContent.innerHTML += `
                <p>${event.sport_title}: ${homeTeamName} vs ${awayTeamName}</p>
                <p>No spread data available for this event.</p>
                <hr>
            `;
        } 

        }
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


function calculateImpliedProbability(odds) {
    
    if (odds > 0) {
        
        return 100 / (odds + 100);
    } else {
        
        return -odds / (-odds + 100);
    }
}

function findMinSpreadCoveringHigher(spreads) {

    let minSpread = spreads[0].spread;
    
    for (const spread of spreads) {
        if (spread.spread < minSpread) {
            if (spreads.some(otherSpread => otherSpread.spread >= spread.spread)) {
                minSpread = spread.spread;
            }
        }
    }
    
    return minSpread;
}

function getColorBarClass(homeTeamImpliedProbability, awayTeamImpliedProbability) {
    const higherImpliedProbability = Math.max(homeTeamImpliedProbability, awayTeamImpliedProbability);
    
    if (higherImpliedProbability >= 0.72) {
        return "red-bar";
    } else if (higherImpliedProbability > 0.6 && higherImpliedProbability < 0.72) {
        return "yellow-bar";
    } else {
        return "faint-yellow-bar";
    }
}






       


