import type { RouteObject } from 'react-router';

import ProfilePage from 'pages/profile';

const routes: RouteObject[] = [
    {
        path: ':id/profile',
        element: <ProfilePage />,
    },
];

export default routes;
