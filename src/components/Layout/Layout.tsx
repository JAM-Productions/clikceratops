import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { SettingsModal } from '../Settings/SettingsModal';
import { ThemeShopModal } from '../Shop/ThemeShopModal';
import { Settings, Palette } from 'lucide-react';
import clsx from 'clsx';
import { translations } from '../../utils/translations';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { state } = useGame();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isThemeShopOpen, setIsThemeShopOpen] = useState(false);
    const currentTheme = state.themes.find((t) => t.id === state.currentThemeId) || state.themes[0];
    const t = translations[state.language];

    return (
        <div className={clsx('min-h-screen w-full transition-colors duration-500', currentTheme.colors.background, currentTheme.colors.text)}>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <header className="mb-8 text-center relative">
                    <button
                        onClick={() => setIsThemeShopOpen(true)}
                        className="absolute top-0 left-0 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Palette size={24} />
                    </button>

                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="absolute top-0 right-0 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Settings size={24} />
                    </button>

                    <h1 className={clsx('text-4xl font-bold mb-2', currentTheme.colors.accent)}>CLIKCERATOPS</h1>
                    <div className="flex justify-center gap-4 text-sm opacity-80">
                        <span>{t.points}: {Math.floor(state.points)}</span>
                        <span>{t.gems}: {state.gems}</span>
                    </div>
                </header>
                <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {children}
                </main>
            </div>
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <ThemeShopModal isOpen={isThemeShopOpen} onClose={() => setIsThemeShopOpen(false)} />
        </div>
    );
};
