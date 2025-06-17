import styled from 'styled-components';

export const About = () => {
    const title = 'Что умеет это приложение?';

    const description =
        'Приложение определяет знает ли Алена этого человека или нет';

    return (
        <>
            <StyledTitle>{title}</StyledTitle>
            <StyledDescription>{description}</StyledDescription>
        </>
    );
};

const StyledTitle = styled.h2`
    font-weight: ${({ theme }) => theme.font.weight.heavy};
    color: ${({ theme }) => theme.colors.white};
`;

const StyledDescription = styled.h4`
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
`;
