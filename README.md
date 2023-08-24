# SBOptimizer
SportsBook Optimizer is a user friendly which helps sports betters make gthe best decisions!
Currently, there are 3 options:
1. The Money Line:
   The app fetches upcoming sports events and their associated money line odds from an API. It then calculates the implied probabilities for each team's victory based on    the odds provided by multiple bookmakers. The app color-codes the teams' implied probabilities to highlight highly recommended, moderately recommended, and recommended bets. Users can easily identify favorable betting opportunities based on the calculated probabilities.
   We use odds from various sportsbooks and calculate our implied probability which helps users make a decision based on our predicted liklihood.
2. The spread:
   The app fetches upcoming events' spread odds and calculates implied probabilities for both the home and away teams. By analyzing the spread data, users can determine which team has a higher implied probability of covering the spread. The app presents this information alongside a color-coded indicator, aiding users in making well-informed spread betting choices.
    User choses which sportsbook they are using. We take into account not only odds, but a compairson between the spread of the chosen sports book for that event compared to the average 
    of all other sports book spread. The implied probability is calculated from this.
4. Player props (totals):
The app fetches player props data and calculates the implied probabilities for different outcomes, such as "Over" or "Under" a specified value. Users can see the implied probabilities along with color-coded indicators to quickly assess the attractiveness of different prop bets.
  First the user choses a sports event, then we :
   Calculate the average odds for a chosen sports event by summing up the odds from different bookmakers and dividing by the number of bookmakers.
   We compare each bookmaker's implied probability to the implied probability based on the average odds. This comparison helps us determine if a particular bookmaker's odds are higher or lower than the average.
   Based on this comparison, we can adjust the implied probabilities. For instance, if a bookmaker's odds are significantly higher than the average, we might increase their implied probability slightly. Conversely, if the odds are lower, you might decrease the implied probability.
   The sportsbook witht the significantly lower/higher odds is displayed to the user as well as the probability and prop to chose.
   FOR NOW: THE ONLY PROP AVAILABLE IS THE TOTALS, SOON OTHER OPTION MAY BE ADDED SUCH AS POINTS SCORED, YARDS, etc.

Website:
https://isaac342368.github.io/SBOptimizer/




