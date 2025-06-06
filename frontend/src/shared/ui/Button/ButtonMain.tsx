import { type FC } from 'react';
import styled from 'styled-components';
import type { ButtonProps } from './button.types';

export const ButtonMain: FC<ButtonProps> = ({
    children,
    onClick,
    disabled,
}) => {
    return (
        <StyledButton disabled={disabled} onClick={onClick} type='submit'>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    color: white;
    background: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primaryBorder};

    padding: 10px 5px;

    font-size: 20px;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;

    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
        background: #ccc;
        border: 2px solid #cfcfcf;
    }
`;
