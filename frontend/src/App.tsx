import { RouterProvider } from 'react-router-dom';
import { Providers } from './app/providers';
import { router } from './routes';

const App = () => (
    <Providers>
        <RouterProvider router={router} />
    </Providers>
);

export default App;
