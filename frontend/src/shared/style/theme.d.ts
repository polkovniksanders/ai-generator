declare module 'styled-components' {
    interface DefaultTheme {
        gaps: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            [key: string]: number;
        };
        colors: {
            primary: string;
            primaryBorder: string;
            white: string;
            black: string;
            grey: string;
            [key: string]: string;
        };
        font: {
            size: number;
            weight: {
                normal: number;
                bold: number;
                heavy: number;
                [key: string]: number;
            };
        };
    }
}