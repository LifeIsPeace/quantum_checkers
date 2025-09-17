import React from 'react';
import './AboutPage.css';
import BackButton from '../../../shared/components/MenuButton/BackButton';
import  '../../../shared/components/MenuButton/BackButton.css';

const AboutPage: React.FC = () => (
  <div className="about">
    <h2>What Is Quantum Checkers?</h2>
    <p>
        Quantum Checkers is a puzzle game at its heart. The game revolves
        around applying quantum gates to multiple qubits who make up a
        quantum circuit. We represent various aspects of each qubit, as
        well as their interactions through color. You will see a
        monochrome colorscale which show the value of each aspect of the
        given qubit and their interactions' values. The goal is to check
        the goal for the level, and apply quantum gates to make your
        circuit match that of the goal.
    </p>

    <BackButton />
  </div>
);

export default AboutPage;
