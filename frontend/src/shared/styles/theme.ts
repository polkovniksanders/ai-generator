import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    colors: {
        bgPrimary: '#080810',
        bgSurface: '#0f0f1a',
        bgElevated: '#16162a',
        border: 'rgba(99, 102, 241, 0.15)',
        borderHover: 'rgba(99, 102, 241, 0.4)',
        accentFrom: '#6366f1',
        accentTo: '#a855f7',
        gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
        textPrimary: '#f1f5f9',
        textSecondary: '#94a3b8',
        textMuted: '#475569',
        success: '#10b981',
        error: '#ef4444',
        white: '#ffffff',
    },
    gaps: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    font: {
        family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        size: {
            xs: '12px',
            sm: '14px',
            md: '16px',
            lg: '20px',
            xl: '28px',
            xxl: '40px',
        },
        weight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    },
    radius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
    },
    transition: 'all 0.2s ease',
};
