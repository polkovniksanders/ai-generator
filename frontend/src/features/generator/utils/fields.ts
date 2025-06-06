import {
    agePlaceholders,
    namePlaceholders,
    professionPlaceholders,
    surnamePlaceholders,
} from './vocabulary.ts';

const getRandomItem = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

export const generateFields = () => {
    const lengthOptions = {
        maxLength: 50,
        minLength: 2,
    };

    return [
        {
            name: 'name',
            label: 'Имя',
            placeholder: getRandomItem(namePlaceholders),
            type: 'text',
            ...lengthOptions,
        },
        {
            name: 'surname',
            label: 'Фамилия',
            placeholder: getRandomItem(surnamePlaceholders),
            type: 'text',
            ...lengthOptions,
        },
        {
            name: 'age',
            label: 'Возраст',
            placeholder: getRandomItem(agePlaceholders),
            type: 'number',
            maxLength: 3,
            minLength: 1,
        },
        {
            name: 'profession',
            label: 'Профессия',
            placeholder: getRandomItem(professionPlaceholders),
            type: 'text',
            ...lengthOptions,
        },
    ];
};
