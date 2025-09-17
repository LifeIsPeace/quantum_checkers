import React, { useEffect, useState } from 'react';
import './HowToPlayPage.css';
import BackButton from '../../../shared/components/MenuButton/BackButton';


const HowToPlayPage: React.FC = () => {
    // STATES FOR MODALS
    const [showGoalModal,  setShowGoalModal] = useState(false);
    const [showQubitModal, setShowQubitModal] = useState(false);
    const [showGateModal,  setShowGateModal] = useState(false);
    
    // QUBIT MODAL FUNCTIONS
    const handleCloseGoalModal = () => { // Handle closing the goal modal
        setShowGoalModal(false);
    };
    const handleOpeningGoalModal = () => { // Handle opening the goal modal
        setShowGoalModal(true);
    };
    
    // QUBIT MODAL FUNCTIONS
    const handleCloseQubitModal = () => { // Handle closing the qubit modal
        setShowQubitModal(false);
    };
    const handleOpeningQubitModal = () => { // Handle opening the qubit modal
        setShowQubitModal(true);
    };
    
    // GATE MODAL FUNCTIONS
    const handleCloseGateModal = () => { // Handle closing the gate modal
        setShowGateModal(false);
    };
    const handleOpeningGateModal = () => { // Handle opening the gate modal
        setShowGateModal(true);
    };
    
    
    return (
        <div className="howtoplay">
            <h2>How to Play</h2>
            <p>Check out some of our FAQ below for clarification on important game related topics!</p>
            
            <button className="modal-button" onClick={handleOpeningGoalModal}>
                What is the goal?
            </button>
            
            <button className="modal-button" onClick={handleOpeningQubitModal}>
                What is a Qubit?
            </button>
            
            <button className="modal-button" onClick={handleOpeningGateModal}>
                What is a Logic Gate?
            </button>
            
            <div style={{ paddingTop: '3vw' }}>
                <BackButton/>
            </div>
            
            
            {showGoalModal && (
                <div className="modal">
                    <h2>What Is The Goal?</h2>
                    <p>The goal of the game is to apply gates on the given circuit until it matches that of the goal circuit shown to you.</p>
                    <button className="info-modal-button" onClick={handleCloseGoalModal}>Close</button>
                </div>
            )}
            {showQubitModal && (
                <div className="modal">
                    <h2>What Is A Qubit?</h2>
                    <p>A qubit is a tiny particle that is like a computer bit, but it can be more things than just 0 or 1. Unlike regular bits, qubits can be in a state called a “superposition”, a state in between 0 and 1. In this game, a qubit with a value of 0 is represented as a white qubit, a 1 is a black qubit. A grey qubit is a qubit that is in a superposition. We can change the value of a qubit using logic gates!</p>
                    <button className="info-modal-button" onClick={handleCloseQubitModal}>Close</button>
                </div>
            )}
            {showGateModal && (
                <div className="modal">
                    <h2>What Is A Logic Gate?</h2>
                    <p>A logic gate is similar to a math operation. When you apply a logic gate to a qubit, you are able to change the qubit in a predictable way. Just like how you can use addition or subtraction to change the outcome of two numbers, you can use logic gates to change the outcome of one or more qubits! You will encounter five different logic gates in this game, the “X”, “Y”, “Z”, “H”, and “CZ” gates. The specifics of these gates will be explained before the levels you will play.</p>
                    <button className="info-modal-button" onClick={handleCloseGateModal}>Close</button>
                </div>
            )}
        </div>
    );
};

export default HowToPlayPage;