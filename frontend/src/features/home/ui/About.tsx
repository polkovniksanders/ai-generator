import styled from 'styled-components';

export const About = () => {
    const title = 'Что умеет это приложение?';

    const description =
        'Приложение генерирует описания и фотографии людей по их имени, фамилии и профессии. Результат не гарантирован. Вся информация предоставляется с помощью ИИ-помощников. Все совпадения случайны';

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
