import styled from 'styled-components';

export const PolicyPage = () => (
    <Page>
        <Title>О проекте</Title>

        <Section>
            <SectionTitle>Что это?</SectionTitle>
            <Text>
                Приложение генерирует описание и портрет человека на основе имени, фамилии,
                возраста и профессии. Вся информация создаётся с помощью ИИ и носит
                исключительно развлекательный характер. Все совпадения случайны.
            </Text>
        </Section>

        <Section>
            <SectionTitle>Ограничения</SectionTitle>
            <Text>
                Каждый пользователь может создать до 3 персонажей за одну сессию. После
                этого генерация будет доступна через 4 часа.
            </Text>
        </Section>

        <Section>
            <SectionTitle>Технологии</SectionTitle>
            <TechGrid>
                {(
                    [
                        ['Frontend', 'React 19, Vite, styled-components, Redux Toolkit'],
                        ['Backend', 'Node.js 20, Express 5, TypeScript, Prisma'],
                        ['База данных', 'PostgreSQL 16'],
                        ['AI', 'GPTunnel (text + image)'],
                        ['Деплой', 'Docker, VPS, GitHub Actions'],
                    ] as [string, string][]
                ).map(([name, value]) => (
                    <TechItem key={name}>
                        <TechName>{name}</TechName>
                        <TechValue>{value}</TechValue>
                    </TechItem>
                ))}
            </TechGrid>
        </Section>

        <Disclaimer>
            ⚠️ Вся информация носит развлекательный характер. Генерации случайны и не
            связаны с реальными людьми.
        </Disclaimer>
    </Page>
);

const Page = styled.div`
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gaps.xl}px;
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.font.size.xl};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gaps.sm}px;
`;

const SectionTitle = styled.h2`
    font-size: ${({ theme }) => theme.font.size.md};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const Text = styled.p`
    font-size: ${({ theme }) => theme.font.size.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.7;
`;

const TechGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gaps.xs}px;
`;

const TechItem = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.gaps.md}px;
    padding: ${({ theme }) => theme.gaps.sm}px ${({ theme }) => theme.gaps.md}px;
    background: ${({ theme }) => theme.colors.bgSurface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
`;

const TechName = styled.span`
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.accentFrom};
    min-width: 100px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const TechValue = styled.span`
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Disclaimer = styled.div`
    padding: ${({ theme }) => theme.gaps.md}px;
    background: rgba(99, 102, 241, 0.05);
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
`;
