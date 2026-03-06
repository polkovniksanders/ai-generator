import styled, { css } from 'styled-components';

type Variant = 'primary' | 'ghost' | 'danger';

export interface ButtonProps {
    $variant?: Variant;
    $fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: ${({ theme }) => theme.radius.md};
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.sm};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    cursor: pointer;
    border: none;
    transition: ${({ theme }) => theme.transition};
    white-space: nowrap;
    width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

    ${({ $variant = 'primary', theme }) =>
        $variant === 'primary' &&
        css`
            background: ${theme.colors.gradient};
            color: ${theme.colors.white};
            &:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);
            }
            &:active:not(:disabled) {
                transform: translateY(0);
            }
        `}

    ${({ $variant, theme }) =>
        $variant === 'ghost' &&
        css`
            background: transparent;
            color: ${theme.colors.textSecondary};
            border: 1px solid ${theme.colors.border};
            &:hover:not(:disabled) {
                border-color: ${theme.colors.borderHover};
                color: ${theme.colors.textPrimary};
                background: rgba(99, 102, 241, 0.05);
            }
        `}

    ${({ $variant, theme }) =>
        $variant === 'danger' &&
        css`
            background: transparent;
            color: ${theme.colors.error};
            border: 1px solid rgba(239, 68, 68, 0.3);
            &:hover:not(:disabled) {
                background: rgba(239, 68, 68, 0.1);
            }
        `}

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
    }
`;
