import React from 'react';
import { Link } from 'react-router-dom';
import './MenuButton.css';

interface MenuButtonProps {
    to: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;  
}

const MenuButton: React.FC<MenuButtonProps> = ({ to, className, onClick, children, disabled }) => (
    <Link 
        to={to} 
        className={`menu-button ${className || ''}`}  
        style={disabled ? { opacity: 0.5, pointerEvents: "none", cursor: "not-allowed" } : {}}
        onClick={disabled ? (e) => e.preventDefault() : onClick}  // Prevent click if disabled
    >
        {children}
    </Link>
);

export default MenuButton;
