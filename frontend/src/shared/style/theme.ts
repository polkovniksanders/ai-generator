import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    colors: {
        primary: '#ff6b4a',
        primaryBorder: '#ff4500',
        white: '#ffffff',
        black: '#333333',
        grey: '#767676',
        success: '#009702',
        error: '#9f3434',
    },
    gaps: {
        xs: 5,
        sm: 10,
        md: 15,
        lg: 20,
    },
    font: {
        size: 14,
        weight: {
            normal: 400,
            bold: 500,
            heavy: 700,
        },
    },
};
