import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Circle from './components/Circle';
import './GameBoardPage.css';
import Square from './components/BackgroundSquare';
import {useParams} from "react-router-dom";
import Gate from './components/Gate';
import MenuButton from "../../shared/components/MenuButton/MenuButton";
import VictoryIndicator from "./components/VictoryIndicator";


// Info Modal Description List
const randomWordsList = [
    'This level will make use of the "X" gate. The X gate is similar to the NOT gate of classical computing in that it will invert the given state of a the given qubit. In laymans terms, this means that it will turn a black qubit white and vice versa!',
    'This level also uses the X gate, but in a different way. (Hint: other side)',
    'This level combines the last two levels into one, try not to overthink this and remember that the interactions between the qubits have an effect on the colors you see.',
    'This level introduces a new gate; the "H" gate. The H gate, short for Hadamard gate, produces a superposition within the qubit it is enacted upon. To keep things interesting, we represent this as a swapping of the X and Z rows on the gameboard.',
    'This level lets you use the H gate more before the levels get more complicated and is very similar to the last level. (Hint: other side)',
    'Similar to level 3, this level combines the last two levels into one. Make full use of both H gates!',
    'This level is where things start to get more complicated. You must make use of two gates at once in order to reach the goal. As a small hint, you only need to apply one gate to each side.',
    'This level is very similar to the last level in that you must apply two gates, but this is a parity shift of the last; try the other side.',
    'Similar to the last two levels, in this level you must apply two gates to reach your goal. This time you must make use of the "Z" gate, which works like the X gate but in the Z row instead of the X row.',
    'Just as you did in the last level, you must make use of the Z and H gates, but this time in a different way.',
    'Test your understanding of the X, Z, and H gates!',
    'The CZ gate can flip the observed visualization of the circuit, try to use it to beat this level.',
    'Do what you did in the last level, but try another gate you did not use last time',
    'For this level, you should do what you did last time but apply the gate on the other side',
    'This is a puzzle level. You should have a good understanding of how the gates work to complete this level!',
    'This level is much easier than the last. Here, you will use the control-x gate, which will flip the other sides x region circle colors if and only if the other sides circle is black, i.e. its state value is |1> or 1.0',
    'In this level, you will see the usecase of the CX gate when both qubits are not along the computational basis.'
];

interface GameLevelDetails {
    id: number;
    level: number;
    
    // [key: string]: number | null | boolean;
    
    circle11: number | null;
    circle12: number | null;
    circle21: number | null;
    circle22: number | null;
    circle23: number | null;
    circle31: number | null;
    circle32: number | null;
    circle33: number | null;
    gate_z: boolean;
    gate_h: boolean;
    gate_x: boolean;
    gate_cz: boolean;
    gate_cx: boolean;
    win_conditions: WinCondition[];
    perfectscore: number;
}

interface GameLevel {
    id: number;
    level: number;
}

interface WinCondition {
    row: number;
    column: number;
    exact: number;
    min?: number;
    max?: number;
}

const GameBoard: React.FC = () => {
    const [gameData, setGameData] = useState<GameLevelDetails | null>(null);
    const {levelId} = useParams();
    const [showWinModal, setShowWinModal] = useState(false);
    const [showInfoModal, setInfoModal] = useState(false); // Boolean variable to dictate showing info to user
    const [isWin, setIsWin] = useState(false);
    const numericLevelId = Number(levelId!);
    const [steps, setSteps] = useState(0);
    const [showLossModal, setShowLossModal] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [lastTopCircleValue, setLastTopCircleValue] = useState<number | null>(null);
    
    // Handle closing the information modal
    const handleCloseInfoModal = () => {
        setInfoModal(false);
    };
    
    const fetchGameData = () => {
        axios.get(`http://localhost:8000/api/gamelevels/${levelId}/`)
            .then(response => {
                console.log("Data fetched:", response.data);
                setGameData(response.data);
                setSteps(0);  // Reset steps when fetching new data
                setShowWinModal(false);
                setShowLossModal(false);
            })
            .catch(error => {
                console.error('Error fetching game data:', error);
                setGameData(null);
            });
    };
    
    useEffect(() => {
        fetchGameData();
        setInfoModal(true); // Set showInfoModal to true when component mounts
        console.log("CX Gate Enabled:", gameData?.gate_cx); // Debugging
    }, [levelId]);
    
    const resetGame = () => {
        console.log("Resetting game data...");
        fetchGameData();
    };
    
    const handleGateClick = (gateType: 'x' | 'z' | 'h' | 'cz' | 'cx', position: 'left' | 'right') => {
        if (!gameData) return; // If there's no game data, return nothing
        setSteps(prev => prev + 1); // Increment the steps for the step tracking mechanic
        let updatedGameData = {...gameData}; // Bring in the game data
        
        if (gameData["circle31"] !== null) { // Ensures that only non-null values will be replacing the variable's last value
            setLastTopCircleValue(gameData["circle31"]); // Set the last value for the top circle
        }
        
        if (gateType === 'x' && position === 'left') {
            const keysToUpdate = ['circle12', 'circle22', 'circle32'];
            updatedGameData = updateProbability(updatedGameData, keysToUpdate, "flip");
        } else if (gateType === 'x' && position === 'right') {
            const keysToUpdate = ['circle21', 'circle22', 'circle23'];
            updatedGameData = updateProbability(updatedGameData, keysToUpdate, "flip");
        } else if (gateType === 'z' && position === 'left') {
            if (gameData['circle31'] !== null) { // If the top circle has a value
                const keysToUpdate = ['circle11', 'circle21', 'circle31']; // flip them all
                updatedGameData = updateProbability(updatedGameData, keysToUpdate, "flip");
            } else {
                const keysToUpdate = ['circle11', 'circle21']; // flip the first two
                updatedGameData = updateProbability(updatedGameData, keysToUpdate, "flip");
                // manually flip the last known value for (3,1)
                if (lastTopCircleValue == 0) {
                    setLastTopCircleValue(1);
                } else if (lastTopCircleValue == 1) {
                    setLastTopCircleValue(0);
                } // Do nothing if the last value was null
            }
        } else if (gateType === 'z' && position === 'right') {
            if (gameData['circle31'] !== null) { // If the top circle has a value
                const keysToUpdate = ['circle31', 'circle32', 'circle33']; // flip them all
                updatedGameData = updateProbability(updatedGameData, keysToUpdate, "flip");
            } else {
                const keysToUpdate = ['circle32', 'circle33']; // flip the first two
                updatedGameData = updateProbability(updatedGameData, keysToUpdate, "flip");
                // manually flip the last known value for (3,1)
                if (lastTopCircleValue == 0) {
                    setLastTopCircleValue(1);
                } else if (lastTopCircleValue == 1) {
                    setLastTopCircleValue(0);
                } // Do nothing if the last value was null
            }
        } else if (gateType === 'h') {
            if (position === 'left') {
                updatedGameData = swapCircles(updatedGameData, [['circle11', 'circle12'], ['circle21', 'circle22'], ['circle31', 'circle32']]);
            } else if (position === 'right') {
                updatedGameData = swapCircles(updatedGameData, [['circle23', 'circle33'], ['circle22', 'circle32'], ['circle21', 'circle31']]);
            }
        } else if (gateType === 'cz') {
            // Swap the outer circles if they're there
            updatedGameData = swapCircles(updatedGameData, [['circle11', 'circle21'], ['circle32', 'circle33']]);
            console.log("Updated Game Data: ", updatedGameData)
            
            if (gameData["circle11"] !== null && gameData["circle33"] !== null) { // If the z region circles on either side have a value
                const keysToUpdate = ['circle31']; // Delete the value in the top middle circle
                updatedGameData = updateProbability(updatedGameData, keysToUpdate, "null");
            }
            if (gameData["circle21"] !== null && gameData["circle32"] !== null) { // when (2,1) and (3,2) are not equal to null, replace (3,1) with lastTopCircleValue
                updatedGameData["circle31"] = lastTopCircleValue;
            }
        } else if (gateType === 'cx') { // Control X Gate
            let leftXRegionQubitValue = gameData["circle12"]; // Inner left circle
            let rightXRegionQubitValue = gameData["circle23"]; // Inner right circle
            if (position === 'left' && leftXRegionQubitValue == 1) { // Apply the same thing as if the x gate was called on the right side
                const keysToUpdate = ['circle21', 'circle22', 'circle23'];
                updatedGameData = updateProbability(updatedGameData, keysToUpdate, "flip");
            } else if (position === 'right' && rightXRegionQubitValue == 1) { // Apply the same thing as if the x gate was called on the left side
                const keysToUpdate = ['circle12', 'circle22', 'circle32'];
                updatedGameData = updateProbability(updatedGameData, keysToUpdate, "flip");
            }
        }
        
        setGameData(updatedGameData);
        
        if (checkWinCondition(updatedGameData)) {
            setShowWinModal(true);
        }
        
        if (steps >= 4 * gameData.perfectscore) {
            setShowLossModal(true);
        }
    };
    
    type CircleKey =
        | 'circle11' | 'circle12' | 'circle21' | 'circle22' | 'circle23'
        | 'circle31' | 'circle32' | 'circle33';
    
    const checkWinCondition = (gameData: GameLevelDetails): boolean => {
        if (!gameData) return false;
        
        return gameData.win_conditions.every(condition => {
            const circleKey = `circle${condition.row}${condition.column}`;
            const probability = gameData[circleKey as keyof GameLevelDetails] as number | null;
            
            if (condition.exact !== undefined) {
                return probability !== null && probability === condition.exact;
            } else if (condition.min !== undefined && condition.max !== undefined) {
                return probability !== null && probability >= condition.min && probability <= condition.max;
            }
            return false;
        });
    };
    
    function updateProbability(gameData: GameLevelDetails, keysToUpdate: string[], flipOrNull: string): GameLevelDetails {
        const updatedGameData = {...gameData};
        
        if (flipOrNull === "flip") {
            keysToUpdate.forEach(key => {
                const currentProbability = updatedGameData[key as keyof typeof updatedGameData];
                if (typeof currentProbability === 'number') {
                    (updatedGameData as any)[key] = 1 - currentProbability; // Flip the probability
                }
            });
        } else if (flipOrNull === "null") {
            keysToUpdate.forEach(key => {
                const currentProbability = updatedGameData[key as keyof typeof updatedGameData];
                if (typeof currentProbability === 'number') {
                    (updatedGameData as any)[key] = null; // Replace value with null
                }
            });
        }
        
        return updatedGameData;
    }
    
    function swapCircles(gameData: GameLevelDetails, pairs: [CircleKey, CircleKey][]): GameLevelDetails {
        let updatedGameData = {...gameData};
        
        pairs.forEach(([circleAKey, circleBKey]) => {
            const temp = updatedGameData[circleAKey];
            updatedGameData[circleAKey] = updatedGameData[circleBKey];
            updatedGameData[circleBKey] = temp;
        });
        
        return updatedGameData;
    } 
    
    useEffect(() => {
        setIsDisabled(showWinModal || showLossModal || showInfoModal);
    }, [showWinModal, showLossModal, showInfoModal]);
    
    
    return (
        <div className={"outer-container" + (showWinModal ? " modal-open" : "")}>
            <div className={"game-board-container" + (showWinModal || showInfoModal ? " blurred" : "")}>
                {/* Game Data Container */}
                <div className="game-info">
                    <div className="level-info-container">
                        <div className="level-info">
                            <div className="level-text">Level {gameData?.level}</div>
                            <div className="steps-info">
                                <span className="your-step">Your Steps: {steps}</span>
                                <span className="best-step">Perfect Steps: {gameData?.perfectscore}</span>
                            </div>
                        </div>
                    </div>
                    <div className="victory-indicator-container">
                        <span className="victory-indicator-text">Goal</span>
                        <VictoryIndicator winConditions={gameData?.win_conditions ?? []} />
                    </div>
                </div>
                
                {/* Main Container */}
                <div className="main-container">
                    <div className="gates-row-top" style={{transform: 'scale(0.80)'}}>
                        <Gate gateType="cz" isEnabled={gameData?.gate_cz ?? false} position="left"
                            onClick={() => handleGateClick('cz', 'left')}/>
                    </div>
                    <div className={"game-board"}>
                        {gameData ? (
                            <>
                                <Square row={1} column={1} className="orange-square"/>
                                <Square row={1} column={2} className="orange-square"/>
                                <Square row={2} column={3} className="orange-square"/>
                                <Square row={3} column={3} className="orange-square"/>
                                <Square row={2} column={1} className="dark-orange-square"/>
                                <Square row={2} column={2} className="dark-orange-square"/>
                                <Square row={3} column={1} className="dark-orange-square"/>
                                <Square row={3} column={2} className="dark-orange-square"/>
                                <Circle probability={gameData.circle11} row={1} column={1}/>
                                <Circle probability={gameData.circle12} row={1} column={2}/>
                                <Circle probability={gameData.circle21} row={2} column={1}/>
                                <Circle probability={gameData.circle22} row={2} column={2}/>
                                <Circle probability={gameData.circle23} row={2} column={3}/>
                                <Circle probability={gameData.circle31} row={3} column={1}/>
                                <Circle probability={gameData.circle32} row={3} column={2}/>
                                <Circle probability={gameData.circle33} row={3} column={3}/>
                            </>
                        ) : null}
                    </div>
                    <div className="gates-row-bottom" style={{transform: 'scale(0.80)'}}>
                        <div className="left-gates">
                            <Gate  gateType="cx" isEnabled={isDisabled ? false : gameData?.gate_cx ?? false} position="left"
                                onClick={() => handleGateClick('cx', 'left')}/>
                            <Gate  gateType="z" isEnabled={isDisabled ? false : gameData?.gate_z ?? false} position="left"
                                onClick={() => handleGateClick('z', 'left')}/>
                            <Gate gateType="h" isEnabled={isDisabled ? false : gameData?.gate_h ?? false} position="left"
                                onClick={() => handleGateClick('h', 'left')}/>
                            <Gate gateType="x" isEnabled={isDisabled ? false : gameData?.gate_x ?? false} position="left"
                                onClick={() => handleGateClick('x', 'left')}/>
                        </div>
                        <div className="right-gates">
                            <Gate gateType="x" isEnabled={isDisabled ? false : gameData?.gate_x ?? false} position="right"
                                onClick={() => handleGateClick('x', 'right')}/>
                            <Gate gateType="h" isEnabled={isDisabled ? false : gameData?.gate_h ?? false} position="left"
                                onClick={() => handleGateClick('h', 'right')}/>
                            <Gate gateType="z"isEnabled={isDisabled ? false : gameData?.gate_z ?? false} position="right"
                                onClick={() => handleGateClick('z', 'right')}/>
                            <Gate  gateType="cx" isEnabled={isDisabled ? false : gameData?.gate_cx ?? false} position="right"
                                onClick={() => handleGateClick('cx', 'right')}/>
                        </div>
                    </div>
                    
                    {/* Bottom buttons during gameplay */}
                    <div className="flexRow">
                        <MenuButton
                            key={0}
                            to={`/game/${numericLevelId}`}
                            className="button"
                            onClick={resetGame}
                            disabled={isDisabled}  // Disable the button based on isDisabled
                        >
                            Reset Circuit
                        </MenuButton>
                        <MenuButton
                            key={0}
                            to={`/test`}
                            className="button"
                            disabled={isDisabled}  // Disable the button based on isDisabled
                        >
                            Main Menu
                        </MenuButton>
                        <MenuButton
                            key={0}
                            to={`/level-selection`}
                            className="button"
                            disabled={isDisabled}  // Disable the button based on isDisabled
                        >
                            Levels
                        </MenuButton>
                    </div>
                </div>
            </div>
            
            {/* Info. Modal */}
            {showInfoModal && (
                <div className="info-modal">
                    <div className="info-content">
                        <h2>Level {numericLevelId}</h2>
                        <p>{randomWordsList[numericLevelId - 1]}</p>
                    </div>
                    <button className="info-modal-button" onClick={handleCloseInfoModal}>Start Level</button>
                </div>
            )}
            
            {/* Win Modal for levels 1-15 */}
            {( showWinModal && (gameData?.level !== undefined && gameData.level < 17) ) && (
                <div className="win-modal">
                    <div className="win-message">Congratulations, you've won the level!</div>
                    <div className="win-buttons-container">
                        <MenuButton
                            key={numericLevelId}
                            to={`/game/${Number(levelId) + 1}`} // Cast levelId to number before incrementing
                            className="button"
                            onClick={() => {}}
                        >
                            Next
                        </MenuButton>
                        <MenuButton
                            key={numericLevelId}
                            to={`/level-selection`}
                            className="button"
                            onClick={() => {
                            }}
                        >
                            Levels
                        </MenuButton>
                        <MenuButton
                            key={numericLevelId}
                            to={`/test`}
                            className="button"
                            onClick={() => {
                            }}
                        >
                            Menu
                        </MenuButton>
                    </div>
                </div>
            )}
            
            {/* Win Modal for level 16 */}
            {( showWinModal && (gameData?.level !== undefined && gameData.level == 17) ) && (
                <div className="win-modal">
                    <div className="win-message">Congratulations, you've won the last level!</div>
                    <div className="win-buttons-container">
                        <MenuButton
                            key={numericLevelId}
                            to={`/level-selection`}
                            className="button"
                            onClick={() => {
                            }}
                        >
                            Levels
                        </MenuButton>
                        <MenuButton
                            key={numericLevelId}
                            to={`/test`}
                            className="button"
                            onClick={() => {
                            }}
                        >
                            Menu
                        </MenuButton>
                    </div>
                </div>
            )}
            
            {/* Loss Modal*/}
            {showLossModal && (
                <div className="loss-modal">
                    <div className="loss-message">Sorry, you lost the level!</div>
                    <MenuButton
                        key={Date.now()}
                        to={`/game/${numericLevelId}`}
                        className="button"
                        onClick={resetGame}
                    >
                        Try Again
                    </MenuButton>
                    <MenuButton
                        to={`/level-selection`}
                        className="button"
                        onClick={() => {
                        }}
                    >
                        Levels
                    </MenuButton>
                    <MenuButton
                        key={numericLevelId}
                        to={`/test`}
                        className="button"
                        onClick={() => {
                        }}
                    >
                        Menu
                    </MenuButton>
                </div>
            )}
        </div>
    );
};

export default GameBoard;
