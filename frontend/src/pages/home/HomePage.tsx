import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../shared/ui/Button/Button';

export const HomePage = () => (
    <Page>
        <Illustration>
            <svg viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle
                    cx='100'
                    cy='60'
                    r='30'
                    stroke='url(#hg1)'
                    strokeWidth='1.5'
                    strokeDasharray='4 4'
                />
                <circle
                    cx='100'
                    cy='60'
                    r='20'
                    fill='rgba(99,102,241,0.1)'
                    stroke='url(#hg1)'
                    strokeWidth='1'
                />
                <circle cx='100' cy='60' r='8' fill='url(#hg1)' />
                <path
                    d='M70 120 Q100 100 130 120 L140 170 H60 Z'
                    fill='rgba(99,102,241,0.08)'
                    stroke='url(#hg1)'
                    strokeWidth='1.5'
                />
                {(
                    [
                        [40, 80],
                        [160, 80],
                        [30, 140],
                        [170, 140],
                        [60, 50],
                        [140, 50],
                    ] as [number, number][]
                ).map(([x, y], i) => (
                    <g key={i}>
                        <circle cx={x} cy={y} r='3' fill='url(#hg2)' opacity='0.6' />
                        <line
                            x1={x}
                            y1={y}
                            x2='100'
                            y2='60'
                            stroke='rgba(99,102,241,0.15)'
                            strokeWidth='0.5'
                        />
                    </g>
                ))}
                <defs>
                    <linearGradient id='hg1' x1='0%' y1='0%' x2='100%' y2='100%'>
                        <stop offset='0%' stopColor='#6366f1' />
                        <stop offset='100%' stopColor='#a855f7' />
                    </linearGradient>
                    <linearGradient id='hg2' x1='0%' y1='0%' x2='100%' y2='100%'>
                        <stop offset='0%' stopColor='#a855f7' />
                        <stop offset='100%' stopColor='#6366f1' />
                    </linearGradient>
                </defs>
            </svg>
        </Illustration>

        <Content>
            <Badge>AI · Генератор людей</Badge>
            <Title>
                Алёна<Accent> знает</Accent>
                <br />
                всех
            </Title>
            <Description>
                Введи имя, фамилию и профессию — и ИИ создаст уникальный портрет человека.
                Все совпадения случайны.
            </Description>
            <Link to='/generator'>
                <Button $variant='primary'>Попробовать</Button>
            </Link>
        </Content>
    </Page>
);

const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.gaps.xl}px;
    min-height: calc(100vh - 180px);
    justify-content: center;
    text-align: center;
`;

const Illustration = styled.div`
    width: clamp(140px, 30vw, 200px);
    svg {
        width: 100%;
        height: auto;
        filter: drop-shadow(0 0 40px rgba(99, 102, 241, 0.3));
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.gaps.md}px;
    max-width: 480px;
`;

const Badge = styled.span`
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: ${({ theme }) => theme.colors.accentFrom};
    background: rgba(99, 102, 241, 0.1);
    padding: 4px 12px;
    border-radius: ${({ theme }) => theme.radius.full};
    border: 1px solid rgba(99, 102, 241, 0.2);
`;

const Title = styled.h1`
    font-size: clamp(36px, 8vw, 56px);
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.1;
`;

const Accent = styled.span`
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const Description = styled.p`
    font-size: ${({ theme }) => theme.font.size.md};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
`;
