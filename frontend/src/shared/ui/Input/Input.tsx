import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    $hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ $hasError, ...props }, ref) => (
    <StyledInput ref={ref} $hasError={$hasError} {...props} />
));
Input.displayName = 'Input';

const StyledInput = styled.input<{ $hasError?: boolean }>`
    width: 100%;
    padding: 12px 16px;
    background: ${({ theme }) => theme.colors.bgElevated};
    border: 1px solid
        ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.border)};
    border-radius: ${({ theme }) => theme.radius.md};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.sm};
    transition: ${({ theme }) => theme.transition};
    outline: none;

    &::placeholder {
        color: ${({ theme }) => theme.colors.textMuted};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.accentFrom};
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    &:hover:not(:focus) {
        border-color: ${({ theme }) => theme.colors.borderHover};
    }
`;
