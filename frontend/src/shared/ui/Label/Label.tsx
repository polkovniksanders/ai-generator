import styled from 'styled-components';

interface LabelProps {
    text: string;
    htmlFor?: string;
}

export const Label = ({ text, htmlFor }: LabelProps) => (
    <StyledLabel htmlFor={htmlFor}>{text}</StyledLabel>
);

const StyledLabel = styled.label`
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;
