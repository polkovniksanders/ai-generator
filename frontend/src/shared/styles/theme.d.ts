import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            bgPrimary: string;
            bgSurface: string;
            bgElevated: string;
            border: string;
            borderHover: string;
            accentFrom: string;
            accentTo: string;
            gradient: string;
            textPrimary: string;
            textSecondary: string;
            textMuted: string;
            success: string;
            error: string;
            white: string;
        };
        gaps: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>;
        font: {
            family: string;
            size: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', string>;
            weight: Record<'normal' | 'medium' | 'semibold' | 'bold', number>;
        };
        radius: Record<'sm' | 'md' | 'lg' | 'xl' | 'full', string>;
        transition: string;
    }
}
