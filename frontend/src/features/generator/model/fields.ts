import {
    agePlaceholders,
    namePlaceholders,
    professionPlaceholders,
    surnamePlaceholders,
} from './vocabulary';

const rand = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateFields = () => [
    {
        name: 'name' as const,
        label: 'Имя',
        placeholder: rand(namePlaceholders),
        type: 'text',
    },
    {
        name: 'surname' as const,
        label: 'Фамилия',
        placeholder: rand(surnamePlaceholders),
        type: 'text',
    },
    {
        name: 'age' as const,
        label: 'Возраст',
        placeholder: rand(agePlaceholders),
        type: 'number',
    },
    {
        name: 'profession' as const,
        label: 'Профессия (необязательно)',
        placeholder: rand(professionPlaceholders),
        type: 'text',
    },
];
