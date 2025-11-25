import React from 'react';
import { useGame } from '../../context/GameContext';
import clsx from 'clsx';
import { Egg, Dna, Footprints, Bone, Skull } from 'lucide-react';

import { translations } from '../../utils/translations';

export const DinoClicker: React.FC = () => {
    const { state, dispatch } = useGame();
    const currentTheme = state.themes.find((t) => t.id === state.currentThemeId) || state.themes[0];
    const t = translations[state.language];

    const [clicks, setClicks] = React.useState<{ id: number; x: number; y: number; val: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newClick = { id: Date.now(), x, y, val: state.clickPower };
        setClicks((prev) => [...prev, newClick]);

        // Cleanup click after animation
        setTimeout(() => {
            setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
        }, 1000);

        dispatch({ type: 'CLICK' });
    };

    const getDinoIcon = () => {
        switch (state.evolutionStage) {
            case 'Egg': return <Egg size={120} />;
            case 'Hatchling': return <Dna size={120} />; // Placeholder
            case 'Juvenile': return <Footprints size={120} />; // Placeholder
            case 'Adult': return <Bone size={120} />; // Placeholder
            case 'Ancient': return <Skull size={120} />; // Placeholder
            default: return <Egg size={120} />;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 relative">
            <h2 className="text-2xl font-bold mb-8">{t[state.evolutionStage as keyof typeof t] || state.evolutionStage}</h2>

            <button
                onClick={handleClick}
                className={clsx(
                    'p-12 rounded-full transition-all duration-100 transform active:scale-95 hover:scale-105 shadow-2xl relative',
                    currentTheme.colors.primary,
                    currentTheme.colors.text
                )}
            >
                {getDinoIcon()}
                {clicks.map((click) => (
                    <span
                        key={click.id}
                        className="absolute text-2xl font-bold pointer-events-none animate-float-up"
                        style={{ left: click.x, top: click.y }}
                    >
                        +{click.val}
                    </span>
                ))}
            </button>

            <div className="mt-8 text-center space-y-2">
                <p className="text-lg">{t.clickPower}: {state.clickPower}</p>
                <p className="text-sm opacity-60">{t.autoPower}: {state.autoClickPower}/s</p>
            </div>

            {/* Evolution Logic Placeholder - Simple threshold check for demo */}
            {state.evolutionStage === 'Egg' && state.points >= 1000 && (
                <button
                    onClick={() => dispatch({ type: 'EVOLVE', payload: 'Hatchling' })}
                    className="mt-4 px-6 py-2 bg-yellow-500/20 text-yellow-200 border border-yellow-500/50 rounded-lg hover:bg-yellow-500/30 transition-colors animate-pulse"
                >
                    {t.evolve} Hatchling!
                </button>
            )}
            {state.evolutionStage === 'Hatchling' && state.points >= 5000 && (
                <button
                    onClick={() => dispatch({ type: 'EVOLVE', payload: 'Juvenile' })}
                    className="mt-4 px-6 py-2 bg-yellow-500/20 text-yellow-200 border border-yellow-500/50 rounded-lg hover:bg-yellow-500/30 transition-colors animate-pulse"
                >
                    {t.evolve} Juvenile!
                </button>
            )}
            {state.evolutionStage === 'Juvenile' && state.points >= 20000 && (
                <button
                    onClick={() => dispatch({ type: 'EVOLVE', payload: 'Adult' })}
                    className="mt-4 px-6 py-2 bg-yellow-500/20 text-yellow-200 border border-yellow-500/50 rounded-lg hover:bg-yellow-500/30 transition-colors animate-pulse"
                >
                    {t.evolve} Adult!
                </button>
            )}
        </div>
    );
};
