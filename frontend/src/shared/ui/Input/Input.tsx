import styled from 'styled-components';
import type { FieldProps } from '../../../features/generator/types/generator.types.ts';

interface InputProps extends FieldProps {
    onBlur: () => void;
    onChange: () => void;
    ref: () => void;
}
export const Input = (props: InputProps) => {
    return <StyledInput {...props} />;
};

const StyledInput = styled.input`
    padding: 10px 12px;
    font-size: 16px;
    border: 2px solid ${({ theme }) => theme.colors.grey};
    border-radius: 6px;
    outline: none;

    color: ${({ theme }) => theme.colors.grey};
    font-weight: 700;

    transition:
        border-color 0.2s,
        box-shadow 0.2s;

    &:hover {
        border-color: ${({ theme }) => theme.colors.grey};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.grey};
        background: ${({ theme }) => theme.colors.white};
    }
`;
