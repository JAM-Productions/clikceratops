import type { Upgrade, Theme } from '../types/game';

export const INITIAL_UPGRADES: Upgrade[] = [
    {
        id: 'sharp_claws',
        name: 'Sharp Claws',
        description: 'Increase click power by 1',
        cost: 10,
        costMultiplier: 1.5,
        effect: 1,
        type: 'click',
        owned: 0,
    },
    {
        id: 'nest_warmer',
        name: 'Nest Warmer',
        description: 'Automatically generate 1 point per second',
        cost: 50,
        costMultiplier: 1.2,
        effect: 1,
        type: 'auto',
        owned: 0,
    },
    {
        id: 'hunting_lessons',
        name: 'Hunting Lessons',
        description: 'Increase click power by 5',
        cost: 250,
        costMultiplier: 1.5,
        effect: 5,
        type: 'click',
        owned: 0,
    },
    {
        id: 'dino_friends',
        name: 'Dino Friends',
        description: 'Automatically generate 10 points per second',
        cost: 1000,
        costMultiplier: 1.2,
        effect: 10,
        type: 'auto',
        owned: 0,
    },
];

export const INITIAL_THEMES: Theme[] = [
    {
        id: 'default',
        name: 'Jurassic Jungle',
        colors: {
            background: 'bg-stone-900',
            primary: 'bg-emerald-600',
            secondary: 'bg-stone-800',
            accent: 'text-emerald-400',
            text: 'text-stone-100',
        },
        cost: 0,
        owned: true,
    },
    {
        id: 'volcanic',
        name: 'Volcanic Ash',
        colors: {
            background: 'bg-slate-900',
            primary: 'bg-red-600',
            secondary: 'bg-slate-800',
            accent: 'text-red-400',
            text: 'text-slate-100',
        },
        cost: 5,
        owned: false,
    },
    {
        id: 'ice_age',
        name: 'Ice Age',
        colors: {
            background: 'bg-sky-950',
            primary: 'bg-cyan-600',
            secondary: 'bg-sky-900',
            accent: 'text-cyan-300',
            text: 'text-sky-50',
        },
        cost: 10,
        owned: false,
    },
];
