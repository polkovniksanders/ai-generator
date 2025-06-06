import styled from 'styled-components';

export const Error = ({ error }) => {
    if (!error) return null;

    return (
        <StyledError>
            <StyledText>{error?.message}</StyledText>
        </StyledError>
    );
};

const StyledError = styled.div`
    display: flex;
    align-items: center;

    padding: ${({ theme }) => `${theme.gaps.xs}px`};

    background: #2d1b1b; /* Темно-бордовый фон */
    border: 1px solid #ff5252; /* Неоново-красный */
    color: #ff8a80; /* Светло-коралловый текст */
`;

const StyledText = styled.p`
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.font.weight.heavy};
    font-size: 16px;
`;
