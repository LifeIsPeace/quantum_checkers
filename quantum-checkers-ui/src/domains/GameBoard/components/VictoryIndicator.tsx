import React from 'react';
import Circle from "./Circle";
import Square from './BackgroundSquare';
import './VictoryIndicator.css';


interface WinCondition {
    row: number;
    column: number;
    exact: number;
}

interface VictoryIndicatorProps {
    winConditions: WinCondition[];
}

interface CircleData {
    key: string;
    probability: number | null;
    row: number;
    column: number;
}

const VictoryIndicator: React.FC<VictoryIndicatorProps> = ({ winConditions }) => {
  // Predefine all circles with null probability
  const circlesMap: Record<string, CircleData> = {
    "circle11": { key: "circle11", probability: null, row: 1, column: 1 },
    "circle12": { key: "circle12", probability: null, row: 1, column: 2 },
    "circle21": { key: "circle21", probability: null, row: 2, column: 1 },
    "circle22": { key: "circle22", probability: null, row: 2, column: 2 },
    "circle23": { key: "circle23", probability: null, row: 2, column: 3 },
    "circle31": { key: "circle31", probability: null, row: 3, column: 1 },
    "circle32": { key: "circle32", probability: null, row: 3, column: 2 },
    "circle33": { key: "circle33", probability: null, row: 3, column: 3 },
  };
  
  // Update the circlesMap with winConditions values
  winConditions.forEach((condition) => {
    const key = `circle${condition.row}${condition.column}`;
    if (circlesMap[key]) {
      circlesMap[key].probability = condition.exact ?? null; // Set probability if available
    }
  });
  
  // Convert to an array for rendering
  const circles: CircleData[] = Object.values(circlesMap);
  
  
  return (
    <div className="victory-indicator">
      <div className="victory-game-board" style={{ transform: 'rotate(45deg) scale(0.50)' }}>
        <Square row={1} column={1} className="victory-orange-square"/>
        <Square row={1} column={2} className="victory-orange-square"/>
        <Square row={2} column={3} className="victory-orange-square"/>
        <Square row={3} column={3} className="victory-orange-square"/>
        <Square row={2} column={1} className="victory-dark-orange-square"/>
        <Square row={2} column={2} className="victory-dark-orange-square"/>
        <Square row={3} column={1} className="victory-dark-orange-square"/>
        <Square row={3} column={2} className="victory-dark-orange-square"/>
        {circles.map(({ key, probability, row, column }) => (
          <Circle key={key} probability={probability} row={row} column={column} />
        ))}
      </div>
    </div>
  );
};

export default VictoryIndicator;

