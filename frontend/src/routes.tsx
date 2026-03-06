import { lazy, Suspense } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { Layout } from './shared/ui/Layout/Layout';
import { PageLoader } from './shared/ui/PageLoader';

const HomePage = lazy(() =>
    import('./pages/home/HomePage').then(m => ({ default: m.HomePage })),
);
const GeneratorPage = lazy(() =>
    import('./pages/generator/GeneratorPage').then(m => ({ default: m.GeneratorPage })),
);
const CharactersPage = lazy(() =>
    import('./pages/characters/CharactersPage').then(m => ({ default: m.CharactersPage })),
);
const CharacterPage = lazy(() =>
    import('./pages/characters/CharacterPage').then(m => ({ default: m.CharacterPage })),
);
const PolicyPage = lazy(() =>
    import('./pages/policy/PolicyPage').then(m => ({ default: m.PolicyPage })),
);

const wrap = (el: React.ReactNode) => <Suspense fallback={<PageLoader />}>{el}</Suspense>;

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: wrap(<HomePage />) },
            { path: 'generator', element: wrap(<GeneratorPage />) },
            { path: 'characters', element: wrap(<CharactersPage />) },
            { path: 'characters/:uuid', element: wrap(<CharacterPage />) },
            { path: 'policy', element: wrap(<PolicyPage />) },
        ],
    },
];

export const router = createBrowserRouter(routes);
