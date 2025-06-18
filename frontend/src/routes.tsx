import { type RouteObject } from 'react-router';

import { HomePage } from './pages/home/HomePage';
import { GeneratorPage } from './pages/generator/GeneratorPage';
import { createBrowserRouter } from 'react-router-dom';
import { PolicyPage } from './pages/policy/PolicyPage';
import { CharacterPage } from './pages/characters/ui/CharacterPage';
import { CharactersPage } from './pages/characters/ui/CharactersPage';
import { CommonLayout } from './layouts/CommonLayout';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <CommonLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'generator', element: <GeneratorPage /> },
            { path: 'characters', element: <CharactersPage /> },
            { path: 'characters/:uuid', element: <CharacterPage /> },
            { path: 'policy', element: <PolicyPage /> },
        ],
    },
];

export const router = createBrowserRouter(routes);
