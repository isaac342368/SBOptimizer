const moneyLineBtn = document.getElementById("moneyLineBtn");
const spreadBtn = document.getElementById("spreadBtn");
const playerPropsBtn = document.getElementById("playerPropsBtn");
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
                    homeTeamOdds.push(outcomes[0].price); // Away team's odds
                    awayTeamOdds.push(outcomes[1].price); // Home team's odds
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

