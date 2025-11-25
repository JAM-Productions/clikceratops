import React from 'react';
import { useGame } from '../../context/GameContext';
import clsx from 'clsx';
import { Zap, Clock } from 'lucide-react';

import { translations } from '../../utils/translations';

export const UpgradesPanel: React.FC = () => {
    const { state, dispatch } = useGame();
    const t = translations[state.language];

    return (
        <div className="flex flex-col p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 h-[600px]">
            <h2 className="text-2xl font-bold mb-6">{t.upgrades}</h2>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {state.upgrades.map((upgrade) => {
                    const cost = Math.floor(upgrade.cost * Math.pow(upgrade.costMultiplier, upgrade.owned));
                    const canAfford = state.points >= cost;

                    return (
                        <button
                            key={upgrade.id}
                            onClick={() => dispatch({ type: 'BUY_UPGRADE', payload: upgrade.id })}
                            disabled={!canAfford}
                            className={clsx(
                                'w-full p-4 rounded-xl text-left transition-all border',
                                canAfford
                                    ? 'hover:bg-white/10 border-white/20'
                                    : 'opacity-50 cursor-not-allowed border-transparent bg-black/20'
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold">{t[upgrade.id as keyof typeof t] || upgrade.name}</span>
                                <span className={clsx('text-sm px-2 py-1 rounded', canAfford ? 'bg-white/20' : 'bg-black/20')}>
                                    {cost} pts
                                </span>
                            </div>
                            <p className="text-sm opacity-70 mb-2">{t[`${upgrade.id}_desc` as keyof typeof t] || upgrade.description}</p>
                            <div className="flex items-center gap-4 text-xs opacity-60">
                                <span className="flex items-center gap-1">
                                    {upgrade.type === 'click' ? <Zap size={12} /> : <Clock size={12} />}
                                    +{upgrade.effect} {upgrade.type === 'click' ? 'click' : '/s'}
                                </span>
                                <span>{t.owned}: {upgrade.owned}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
