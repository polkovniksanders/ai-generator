import { type RouteObject } from 'react-router';
import { GeneratorPage } from '../../pages/generator/GeneratorPage.tsx';
import { HomePage } from '../../pages/home/HomePage.tsx';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />,
        children: [{ path: 'generator', element: <GeneratorPage /> }],
    },
];

export default routes;
