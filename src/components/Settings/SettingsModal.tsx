import React from 'react';
import { useGame } from '../../context/GameContext';
import { translations } from '../../utils/translations';
import { X, Globe, Trash2 } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { state, dispatch } = useGame();
    const t = translations[state.language];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-stone-800 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    {t.settings}
                </h2>

                <div className="space-y-6">
                    {/* Language Selection */}
                    <div>
                        <h3 className="text-sm font-bold uppercase opacity-60 mb-3 flex items-center gap-2">
                            <Globe size={16} /> {t.language}
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {(['en', 'es', 'ca'] as const).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => dispatch({ type: 'SET_LANGUAGE', payload: lang })}
                                    className={`p-2 rounded-lg border transition-all ${state.language === lang
                                            ? 'bg-white/20 border-white/40 font-bold'
                                            : 'bg-black/20 border-transparent hover:bg-white/5'
                                        }`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Reset Progress */}
                    <div>
                        <h3 className="text-sm font-bold uppercase opacity-60 mb-3 flex items-center gap-2 text-red-400">
                            <Trash2 size={16} /> {t.reset}
                        </h3>
                        <button
                            onClick={() => {
                                if (window.confirm(t.resetConfirm)) {
                                    dispatch({ type: 'RESET_GAME' });
                                    onClose();
                                }
                            }}
                            className="w-full p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                        >
                            {t.reset}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
