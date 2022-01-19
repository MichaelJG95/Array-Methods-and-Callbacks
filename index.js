const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const finals2014 = fifaData.filter(function(item){
    return item.Year === 2014 && item.Stage === 'Final';
});
console.log('task 1', finals2014);
//(a) Home Team name for 2014 world cup final
console.log('task 1a', finals2014[0]['Home Team Name']);
//(b) Away Team name for 2014 world cup final
console.log('task 1b', finals2014[0]['Away Team Name']);
//(c) Home Team goals for 2014 world cup final
console.log('task 1c', finals2014[0]['Home Team Goals']);
//(d) Away Team goals for 2014 world cup final
console.log('task 1d', finals2014[0]['Away Team Goals']);
//(e) Winner of 2014 world cup final */
console.log('task 1e', finals2014[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/
//1 param of data
function getFinals(array) {
const newArray = array.filter(item => item.Stage === 'Final');
return newArray;
}
//console.log('task 2', getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, callback) {
    const years = callback(array).map(item => item.Year);
    return years;
}

//console.log(getYears(fifaData, getFinals));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, callback) {
    const winners = callback(array).map((item) => {
        if(item['Home Team Goals'] > item['Away Team Goals']){
            return item['Home Team Name'];
        } else {
            return item['Away Team Name'];
        }
      });
      return winners;
}

//console.log(getWinners(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Receive a callback function getYears from task 3
4. Receive a callback function getWinners from task 4
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, callback1, callback2, callback3) {
    const years = callback2(array, callback1);
    const winners = callback3(array, callback1);
    const winnersByYear = [];
    years.forEach((year, index) => {
        winnersByYear.push(`In ${year}, ${winners[index]} won the world cup!`);
    });
    return winnersByYear;
}

//console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(callback) {
   const goalsPerMatch = callback.map(item => item['Home Team Goals'] + item['Away Team Goals'])
   const sumGoals = goalsPerMatch.reduce((acc, item) => item + acc)
   return (Math.round((sumGoals / goalsPerMatch.length) * 100) / 100) + "";
}

//console.log(getAverageGoals(getFinals(fifaData)));



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials, callback) {
    const wins = callback(data).reduce((acc, item) => {
        if(item['Home Team Initials'] === teamInitials && item['Home Team Goals'] > item['Away Team Goals']){
            return acc + 1;
        }else if(item['Away Team Initials'] === teamInitials && item['Away Team Goals'] > item['Home Team Goals']){
            return acc + 1;
        }else{
            return acc;
        }
    }, 0);
    return teamInitials + ': ' + wins;
}

console.log(getCountryWins(fifaData, 'BRA', getFinals));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data, callback) {
    const goalData = callback(data)
    const goalsPerMatch = {};
    const appearances = {};
    goalData.forEach(item => {
        goalsPerMatch[item['Home Team Name']] = 0;
        appearances[item['Home Team Name']] = 0
        goalsPerMatch[item['Away Team Name']] = 0;
        appearances[item['Away Team Name']] = 0;

    });

    goalData.forEach(item => {
        goalsPerMatch[item['Home Team Name']] += item['Home Team Goals'];
        appearances[item['Home Team Name']] += 1;

        goalsPerMatch[item['Away Team Name']] += item['Away Team Goals'];
        appearances[item['Away Team Name']] += 1;
    });
    console.log('goals: ', goalsPerMatch);
    console.log('apperances: ', appearances);
    const countries = Object.keys(goalsPerMatch);
    let topScorer = countries[0];
    let mostGoals = 0

    countries.forEach(country => {
        if((goalsPerMatch[country] / appearances[country]) > mostGoals){
            mostGoals = goalsPerMatch[country] / appearances[country];
            topScorer = country;
        } else if((goalsPerMatch[country] / appearances[country]) === mostGoals) {
            topScorer = topScorer + ' ' + country;
        }
    })
    return topScorer;
}

console.log(getGoals(fifaData, getFinals));


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
