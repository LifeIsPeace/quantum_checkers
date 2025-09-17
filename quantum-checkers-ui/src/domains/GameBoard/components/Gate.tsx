import React from 'react';
import axios from 'axios';
import './Gate.css';
import { motion } from "framer-motion";


interface GateProps {
    gateType: 'x' | 'z' | 'h' | 'cz' | 'cx';
    isEnabled: boolean;
    sessionId?: number;
    qubitIdx?: number;
    onUpdate?: (position?: 'left' | 'right') => void;
    position?: 'left' | 'right';
    onClick: () => void;
}

const Gate: React.FC<GateProps> = ({gateType, isEnabled, sessionId, qubitIdx, onUpdate, position,onClick}) => {
    const applyGate = async () => {
        if (!isEnabled) return;
        
        try {
            const response = await axios.post(`http://localhost:8000/api/applygate/${sessionId}/`, {
                gate_type: gateType,
                qubit_idx: qubitIdx,
            });
            
            console.log('Gate applied successfully:', response.data);
            
            if (onUpdate) {
                if (position) {
                    onUpdate(position);
                } else {
                    onUpdate();
                }
            }
        } catch (error) {
            console.error('Error applying gate:', error);
        }
    };
    
    return (
        <>
            {!isEnabled && (
                <button className={`gate-button ${isEnabled ? '' : 'disabled'}`} disabled={!isEnabled} onClick={onClick}>
                    <div className="gate-type">{gateType.toUpperCase()}</div>
                    <div className="gate-label">GATE</div>
                </button>
            )}
            {isEnabled && (
                <motion.button
                    className={`gate-button ${isEnabled ? '' : 'disabled'}`}
                    disabled={!isEnabled}
                    onClick={() => {
                        onClick();
                        applyGate();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <motion.div
                        className="gate-type"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {gateType.toUpperCase()}
                    </motion.div>
                    <motion.div
                        className="gate-label"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        GATE
                    </motion.div>
                </motion.button>
            )}
        </>
    );
};


export default Gate;
