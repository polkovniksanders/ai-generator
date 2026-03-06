import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../../shared/store';
import { theme } from '../../shared/styles/theme';
import { GlobalStyle } from '../../shared/styles/global';

interface ProvidersProps {
    children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    </Provider>
);
