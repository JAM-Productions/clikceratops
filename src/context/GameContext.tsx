import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import type { GameState, GameAction, GameContextType } from '../types/game';
import { INITIAL_UPGRADES, INITIAL_THEMES } from '../data/initialData';

const INITIAL_STATE: GameState = {
    points: 0,
    gems: 0,
    totalClicks: 0,
    clickPower: 1,
    autoClickPower: 0,
    evolutionStage: 'Egg',
    upgrades: INITIAL_UPGRADES,
    themes: INITIAL_THEMES,
    currentThemeId: 'default',
    lastSaveTime: Date.now(),
    language: 'en',
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'CLICK': {
            // 1% chance to get a gem on click
            const gemEarned = Math.random() < 0.01 ? 1 : 0;
            return {
                ...state,
                points: state.points + state.clickPower,
                gems: state.gems + gemEarned,
                totalClicks: state.totalClicks + 1,
            };
        }
        case 'BUY_UPGRADE': {
            const upgradeIndex = state.upgrades.findIndex((u) => u.id === action.payload);
            if (upgradeIndex === -1) return state;

            const upgrade = state.upgrades[upgradeIndex];
            const cost = Math.floor(upgrade.cost * Math.pow(upgrade.costMultiplier, upgrade.owned));

            if (state.points < cost) return state;

            const newUpgrades = [...state.upgrades];
            newUpgrades[upgradeIndex] = {
                ...upgrade,
                owned: upgrade.owned + 1,
            };

            return {
                ...state,
                points: state.points - cost,
                upgrades: newUpgrades,
                clickPower: upgrade.type === 'click' ? state.clickPower + upgrade.effect : state.clickPower,
                autoClickPower: upgrade.type === 'auto' ? state.autoClickPower + upgrade.effect : state.autoClickPower,
            };
        }
        case 'BUY_THEME': {
            const themeIndex = state.themes.findIndex((t) => t.id === action.payload);
            if (themeIndex === -1) return state;

            const theme = state.themes[themeIndex];
            if (theme.owned || state.gems < theme.cost) return state;

            const newThemes = [...state.themes];
            newThemes[themeIndex] = { ...theme, owned: true };

            return {
                ...state,
                gems: state.gems - theme.cost,
                themes: newThemes,
            };
        }
        case 'SET_THEME':
            return {
                ...state,
                currentThemeId: action.payload,
            };
        case 'TICK':
            return {
                ...state,
                points: state.points + state.autoClickPower * action.payload,
            };
        case 'EVOLVE':
            return {
                ...state,
                evolutionStage: action.payload,
            };
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.payload,
            };
        case 'LOAD_GAME':
            return action.payload;
        case 'RESET_GAME':
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

    // Load game from local storage on mount
    useEffect(() => {
        const savedState = localStorage.getItem('clikceratops_save');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                // Merge with initial state to ensure new fields are present if schema changes
                dispatch({ type: 'LOAD_GAME', payload: { ...INITIAL_STATE, ...parsedState } });
            } catch (e) {
                console.error('Failed to load save game', e);
            }
        }
    }, []);

    // Save game to local storage periodically
    // Use a ref to access current state inside interval without re-running effect
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        const saveInterval = setInterval(() => {
            localStorage.setItem('clikceratops_save', JSON.stringify({ ...stateRef.current, lastSaveTime: Date.now() }));
        }, 5000); // Save every 5 seconds

        return () => clearInterval(saveInterval);
    }, []);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
