import React from 'react';
import './MainMenuPage.css';
import MenuButton from '../../shared/components/MenuButton/MenuButton';

const MainMenuPage: React.FC = () => (


    <div id="container">
        <h1 className="menuTitle">Quantum Checkers</h1>
        <div className="button-container">
            <MenuButton to="/level-selection">Start Game</MenuButton>
            <MenuButton to="/about">About</MenuButton>
            <MenuButton to="/how-to-play">How to Play</MenuButton>
            <MenuButton disabled={true} to="/ranking-list">Scoreboard</MenuButton>
            <p style={{color: "#000", opacity: "60%", fontStyle: "italic"}}>Scoreboard Coming Soon!</p>
        </div>
    </div>

);

export default MainMenuPage;
