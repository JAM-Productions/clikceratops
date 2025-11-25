export type EvolutionStage = 'Egg' | 'Hatchling' | 'Juvenile' | 'Adult' | 'Ancient';

export interface Upgrade {
    id: string;
    name: string;
    description: string;
    cost: number;
    costMultiplier: number;
    effect: number; // Points per click or per second increase
    type: 'click' | 'auto';
    owned: number;
}

export interface Theme {
    id: string;
    name: string;
    colors: {
        background: string;
        primary: string;
        secondary: string;
        accent: string;
        text: string;
    };
    cost: number; // In gems
    owned: boolean;
}

export interface GameState {
    points: number;
    gems: number;
    totalClicks: number;
    clickPower: number;
    autoClickPower: number;
    evolutionStage: EvolutionStage;
    upgrades: Upgrade[];
    themes: Theme[];
    currentThemeId: string;
    lastSaveTime: number;
    language: 'en' | 'es' | 'ca';
}

export interface GameContextType {
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
}

export type GameAction =
    | { type: 'CLICK' }
    | { type: 'BUY_UPGRADE'; payload: string }
    | { type: 'BUY_THEME'; payload: string }
    | { type: 'SET_THEME'; payload: string }
    | { type: 'TICK'; payload: number } // Payload is time delta in seconds
    | { type: 'LOAD_GAME'; payload: GameState }
    | { type: 'RESET_GAME' }
    | { type: 'EVOLVE'; payload: EvolutionStage }
    | { type: 'SET_LANGUAGE'; payload: 'en' | 'es' | 'ca' };
