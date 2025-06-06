import { Outlet, RouterProvider } from 'react-router-dom';
import { store } from './store';
import { theme } from './shared/style/theme';
import { GlobalStyle } from './shared/style/global';
import { router } from './routes';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <RouterProvider router={router} />
                <Outlet />
            </ThemeProvider>
        </Provider>
    );
};

export default App;
