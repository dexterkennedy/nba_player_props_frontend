import React from 'react';
import './App.css'
import './About.css';

function About() {
    return (
        <div className="main-tab-content">
            <h1>About the Model</h1>
            <p>This is a predictive NBA model used to estimate player performance for today's NBA games. It uses specific matchups between players and the defenses they are going up against to predict the total amount of points, rebounds, and assists (PRA) that the player will put up today. The model considers how opposing teams defend each position as well as how they defend each archetype of player to guage how much a specific player might overperform or underperform on a given night.</p>
            <h1>How to Use</h1>
            <div className="about-list">
                <ol>
                    <li>Navigate to the "Generate Bets" tab</li>
                    <li>Click on the ___ button and wait for the model to calculate its recommendations</li>
                    <li>The recommended bets will appear in the table with the player's name, bet type, and betting line</li>
                    <li>Additionally, the table includes the best sportbook on which to place the bet for the best line at the best odds</li>
                    <li>The margin field is a confidence metric. The higher the margin, the more confident the model is in that pick. However, be cautious. Margins that are too big to be true are sometimes caused by information that is not known to the model. Do your own research.</li>
                    <li>Place the bets you like for Over/Under total PRA on the corresponding sportsbooks</li>
                    <li>Good Luck! *this is in no way meant to be taken as financial advice*</li>
                </ol>
            </div>
        </div>

    );
}

export default About;