import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface CircleProps {
    probability: number | null;
    row: number;
    column: number;
}

const Circle: React.FC<CircleProps> = ({probability, row, column}) => {
    const [showProbability, setShowProbability] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [prevProb, setPrevProb] = useState(probability);
    
    const getGreyScale = (prob: number) => {
        const scaleValue = Math.floor(prob * 255);
        return `rgb(${scaleValue}, ${scaleValue}, ${scaleValue})`;
    };
    
    const textColor = probability !== null && probability > 0.5 ? 'white' : 'black';
    const backgroundColor = probability === 1 ? 'black' : probability === 0 ? 'white' : probability === null ? 'transparent' : getGreyScale(probability);
    
    // Base circle style without border considerations
    const baseCircleStyle: React.CSSProperties = {
        backgroundColor: backgroundColor,
        color: textColor,
        width: '80%',
        height: '80%',
        margin: 'auto',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        boxSizing: 'border-box',
        gridRow: 4 - row,
        gridColumn: column,
        zIndex: 2,
        transformStyle: 'preserve-3d',
    };
    
    useEffect(() => {
        if (
            prevProb !== null &&
            probability !== null &&
            (prevProb === 0 || prevProb === 1) &&
            (probability === 0 || probability === 1) &&
            prevProb !== probability
        ) {
            setFlipped(true);
            setTimeout(() => setFlipped(false), 500);
        }
        setPrevProb(probability);
    }, [probability]);
    
    
    return (
        <AnimatePresence mode="wait">
            {probability === null ? (
                // Null probability case - with fade animation
                <motion.div
                    style={{
                        ...baseCircleStyle,
                        backgroundColor: 'transparent',
                        border: '4px solid white',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            ) : (
                // Non-null probability case - animated circle
                <motion.div
                    key={`${row}-${column}`}
                    style={{
                        ...baseCircleStyle,
                        transformOrigin: 'center center',  // Ensure rotation happens around center
                        transformStyle: 'preserve-3d',     // Maintain 3D perspective
                    }}
                    onMouseEnter={() => setShowProbability(true)}
                    onMouseLeave={() => setShowProbability(false)}
                    initial={{ opacity: 0, rotateY: 0 }}
                    animate={{
                        opacity: 1,
                        rotateY: flipped ? 90 : 0,
                        rotateX: flipped ? 45 : 0,
                        backgroundColor,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                        duration: 0.2,
                        rotateY: { type: 'spring', damping: 5, stiffness: 100 } // Smoother rotation
                    }}
                >
                    <div style={{ 
                        transform: 'rotate(-45deg)',
                        backfaceVisibility: 'hidden'     // Cleaner flip animation
                    }}>
                        {showProbability && probability.toFixed(2)}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


export default Circle;
