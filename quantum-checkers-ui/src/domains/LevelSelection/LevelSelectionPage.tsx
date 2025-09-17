import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './LevelSelectionPage.css';
import MenuButton from "../../shared/components/MenuButton/MenuButton";
import BackButton from '../../shared/components/MenuButton/BackButton';


interface GameLevel {
    id: number;
    level: number;
}

interface LevelSelectionProps {
    setSelectedLevel: (level: number) => void;
}


const LevelSelection: React.FC<LevelSelectionProps> = ({setSelectedLevel}) => {
    const [levels, setLevels] = useState<GameLevel[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/gamelevels/')
            .then(response => {
                const sortedLevels = response.data.sort((a: GameLevel, b: GameLevel) => a.level - b.level);
                setLevels(sortedLevels);
            })
            .catch(error => console.error('Error fetching levels:', error));
    }, []);
    
    const handleLevelSelect = (levelNumber: number) => {
        navigate(`/game/${levelNumber}`);
    };
    
    return (
        <div style={{ height: '150vh', backgroundColor: 'var(--color-background)', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100vw', overflowX: 'hidden' }} >
            <div className="level-selection-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="level-selection">
                    <div style={{ paddingTop: 50}}>
                        <h1>Select Level</h1>
                    </div>
                    
                    <div style={{ 
                        transform: 'scale(0.8)', 
                        display: "flex", 
                        flexDirection: "row", 
                        alignItems: "center", 
                        flexWrap: "wrap",  // Enables wrapping behavior
                        justifyContent: "center", 
                        gap: "2vh", 
                        width: "80%", 
                        backgroundColor: "#a8731d", 
                        padding: "1vw", 
                        borderRadius: "8px",
                        margin: "0 auto"  // Ensures centering within its parent container
                    }}>
                        {levels.map((level) => (
                            <MenuButton
                                key={level.id}
                                to={`/game/${level.level}`}
                                onClick={() => handleLevelSelect(level.level)}
                            >
                                Level {level.level}
                            </MenuButton>
                        ))}
                    </div>
                </div>
                <div style={{marginBottom: "10vh"}}>
                    <BackButton />
                </div>
            </div>
        </div>
    );
};

export default LevelSelection;