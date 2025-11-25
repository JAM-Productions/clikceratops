import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

export const useGameLoop = () => {
    const { dispatch } = useGame();
    const lastTickRef = useRef<number>(Date.now());

    useEffect(() => {
        const loop = setInterval(() => {
            const now = Date.now();
            const delta = (now - lastTickRef.current) / 1000; // Delta in seconds

            if (delta >= 0.1) { // Tick at least every 100ms
                dispatch({ type: 'TICK', payload: delta });
                lastTickRef.current = now;
            }
        }, 100);

        return () => clearInterval(loop);
    }, [dispatch]);
};
