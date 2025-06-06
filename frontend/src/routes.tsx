import { type RouteObject } from 'react-router';

import { HomePage } from './pages/home/HomePage';
import { GeneratorPage } from './pages/generator/GeneratorPage';
import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/home/MainPage';
import { PolicyPage } from './pages/policy/PolicyPage';
import { CharacterPage } from './pages/characters/ui/CharacterPage';
import { CharactersPage } from './pages/characters/ui/CharactersPage';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainPage />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: 'generator', element: <GeneratorPage /> },

            { path: 'characters', element: <CharactersPage /> },
            { path: 'characters/:uuid', element: <CharacterPage /> },

            { path: 'policy', element: <PolicyPage /> },
        ],
    },
];

export const router = createBrowserRouter(routes);
