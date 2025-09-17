


import React, { useState, useEffect } from 'react';
import './RankingList.css'; // Ensure the CSS file exists and is correctly linked
import BackButton from '../../../shared/components/MenuButton/BackButton';
import '../../../shared/components/MenuButton/BackButton.css';

interface RankingItem {
  username: string;
  score: number;
}

const RankingList: React.FC = () => {
  const [rankings, setRankings] = useState<RankingItem[]>([]);

  useEffect(() => {
    // Simulating data fetching
    const mockData: RankingItem[] = [
      { username: 'John_009', score: 300 },
      { username: '王朋', score: 250 },
      { username: 'suefei12', score: 249 },
      { username: 'Desire_Smith', score: 193 },
      { username: 'Noah', score: 155 },
      { username: 'Joe', score: 125 },
      // Add more mock users as needed
    ];
    setRankings(mockData);
  }, []);

  return (
    <div className="ranking-container">
      <h1 className="scoreboardTitle" >Scoreboard</h1>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Usernames</th>
            <th>Scores</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '25px' }}>
        <BackButton />
      </div>
    </div>
  );
};

export default RankingList;
