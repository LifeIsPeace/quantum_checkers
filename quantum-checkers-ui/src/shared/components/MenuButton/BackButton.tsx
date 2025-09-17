import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'; // Ensure this path is correct

const BackButton = () => {
  let navigate = useNavigate();

  const goBack = () => {
    navigate('/test'); // Adjust the navigate path as needed
  };

  return (
    <div className="backButton-container">
      <button onClick={goBack}>Back to Main Menu</button>
    </div>
  );
};

export default BackButton;
