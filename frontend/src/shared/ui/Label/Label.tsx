import { type FC } from 'react';
import styled from 'styled-components';

export const Label: FC<{ text: string }> = ({ text }) => {
    return <StyledLabel>{text}</StyledLabel>;
};

const StyledLabel = styled.p`
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.font.weight.heavy};
    font-size: 16px;
`;
