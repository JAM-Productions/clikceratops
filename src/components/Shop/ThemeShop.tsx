import React from 'react';
import { useGame } from '../../context/GameContext';
import clsx from 'clsx';
import { Lock, Check } from 'lucide-react';
import { translations } from '../../utils/translations';

export const ThemeShop: React.FC = () => {
  const { state, dispatch } = useGame();
  const t = translations[state.language];

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t.themes}</h2>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/30">
          <span className="text-sm font-bold text-purple-400">{state.gems} {t.gems}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {state.themes.map((theme) => {
          const isCurrent = state.currentThemeId === theme.id;
          const canAfford = state.gems >= theme.cost;

          return (
            <button
              key={theme.id}
              onClick={() => {
                if (theme.owned) {
                  dispatch({ type: 'SET_THEME', payload: theme.id });
                } else {
                  dispatch({ type: 'BUY_THEME', payload: theme.id });
                }
              }}
              disabled={!theme.owned && !canAfford}
              className={clsx(
                'w-full p-4 rounded-xl text-left transition-all border relative overflow-hidden',
                isCurrent ? 'border-white/40 bg-white/5' : 'border-transparent bg-black/20',
                !theme.owned && !canAfford && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className={clsx('absolute inset-0 opacity-10', theme.colors.background)} />

              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                  <div className={clsx('w-8 h-8 rounded-full border-2 border-white/20', theme.colors.primary)} />
                  <div>
                    <span className="font-bold block">{t[theme.id as keyof typeof t] || theme.name}</span>
                    <span className="text-xs opacity-60">
                      {theme.owned ? t.owned : `${theme.cost} ${t.gems}`}
                    </span>
                  </div>
                </div>

                {isCurrent ? (
                  <Check className="text-green-400" size={20} />
                ) : theme.owned ? (
                  <span className="text-xs px-2 py-1 rounded bg-white/10">Select</span>
                ) : (
                  <Lock size={16} className="opacity-40" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
