import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
    STATS,
    STAT_CATEGORIES,
    getStatValue,
    getBarColor,
    getValueColor,
} from '../model/stats';

// ── Icons ────────────────────────────────────────────────────────────────────

const ICONS: Record<string, React.ReactNode> = {
    strength: (
        <>
            <circle cx='5' cy='12' r='2.5' />
            <circle cx='19' cy='12' r='2.5' />
            <line x1='7.5' y1='12' x2='16.5' y2='12' />
            <line x1='5' y1='9.5' x2='5' y2='14.5' />
            <line x1='19' y1='9.5' x2='19' y2='14.5' />
        </>
    ),
    dexterity: (
        <polygon points='13,2 4.5,13.5 11,13.5 10,22 19.5,10.5 13,10.5' strokeLinejoin='round' />
    ),
    constitution: <path d='M12 22s-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10z' />,
    intelligence: (
        <>
            <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
            <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
        </>
    ),
    wisdom: (
        <>
            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
            <circle cx='12' cy='12' r='3' />
        </>
    ),
    charisma: (
        <polygon points='12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26' />
    ),
    luck: (
        <>
            <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
            <circle cx='8.5' cy='8.5' r='1.5' fill='currentColor' stroke='none' />
            <circle cx='15.5' cy='8.5' r='1.5' fill='currentColor' stroke='none' />
            <circle cx='8.5' cy='15.5' r='1.5' fill='currentColor' stroke='none' />
            <circle cx='15.5' cy='15.5' r='1.5' fill='currentColor' stroke='none' />
            <circle cx='12' cy='12' r='1.5' fill='currentColor' stroke='none' />
        </>
    ),
    perception: (
        <>
            <circle cx='11' cy='11' r='8' />
            <line x1='21' y1='21' x2='16.65' y2='16.65' />
        </>
    ),
    persuasion: (
        <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
    ),
    deception: (
        <>
            <circle cx='12' cy='12' r='10' />
            <path d='M8 9l2 2M10 9l-2 2' />
            <circle cx='15' cy='9' r='1' fill='currentColor' stroke='none' />
            <path d='M9 15c1 2 6 2 7 0' />
        </>
    ),
    willpower: (
        <>
            <line x1='12' y1='19' x2='12' y2='5' />
            <polyline points='5,12 12,5 19,12' />
        </>
    ),
    initiative: (
        <>
            <circle cx='12' cy='12' r='10' />
            <polyline points='12,6 12,12 16,14' />
        </>
    ),
    stealth: (
        <>
            <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94' />
            <path d='M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19' />
            <line x1='1' y1='1' x2='23' y2='23' />
        </>
    ),
    bartering: (
        <>
            <line x1='12' y1='1' x2='12' y2='23' />
            <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
        </>
    ),
    fire: (
        <path d='M12 2c0 0-7 6.5-7 13a7 7 0 0 0 14 0c0-6.5-7-13-7-13zm0 16a3 3 0 0 1-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 0 1-3 3z' />
    ),
    cold: (
        <>
            <line x1='12' y1='2' x2='12' y2='22' />
            <line x1='2' y1='12' x2='22' y2='12' />
            <line x1='5.64' y1='5.64' x2='18.36' y2='18.36' />
            <line x1='18.36' y1='5.64' x2='5.64' y2='18.36' />
            <circle cx='12' cy='12' r='2' />
        </>
    ),
    lightning: (
        <polygon points='13,2 4.5,13.5 11,13.5 10,22 19.5,10.5 13,10.5' strokeLinejoin='round' />
    ),
    poison: (
        <>
            <circle cx='12' cy='9' r='6' />
            <path d='M9 15h6l1 6H8z' />
            <circle cx='9.5' cy='8.5' r='1.5' fill='currentColor' stroke='none' />
            <circle cx='14.5' cy='8.5' r='1.5' fill='currentColor' stroke='none' />
        </>
    ),
    darkness: <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />,
    magic: (
        <>
            <path d='M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z' />
            <path d='M19 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z' />
            <path d='M5.5 16l.5 1.5 1.5.5-1.5.5L5.5 20l-.5-1.5-1.5-.5 1.5-.5z' />
        </>
    ),
};

const StatIcon = ({ id, color }: { id: string; color: string }) => (
    <svg
        viewBox='0 0 24 24'
        width='18'
        height='18'
        fill='none'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
    >
        {ICONS[id]}
    </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

interface CharacterStatsProps {
    uuid: string;
}

export const CharacterStats = ({ uuid }: CharacterStatsProps) => {
    const [tooltip, setTooltip] = useState<string | null>(null);

    return (
        <Container>
            <SheetHeader>
                <SheetTitle>Лист персонажа</SheetTitle>
                <SheetLine />
            </SheetHeader>

            {STAT_CATEGORIES.map(cat => (
                <Section key={cat.id}>
                    <CatLabel>{cat.label}</CatLabel>
                    <Grid>
                        {STATS.filter(s => s.category === cat.id).map(stat => {
                            const value = getStatValue(uuid, stat.id);
                            const isTooltipOpen = tooltip === stat.id;

                            return (
                                <StatItem
                                    key={stat.id}
                                    onPointerEnter={() => setTooltip(stat.id)}
                                    onPointerLeave={() => setTooltip(null)}
                                    onClick={() =>
                                        setTooltip(t => (t === stat.id ? null : stat.id))
                                    }
                                    $active={isTooltipOpen}
                                >
                                    <StatRow>
                                        <StatLeft>
                                            <IconWrap $color={stat.iconColor}>
                                                <StatIcon id={stat.id} color={stat.iconColor} />
                                            </IconWrap>
                                            <StatName>{stat.name}</StatName>
                                        </StatLeft>
                                        <StatRight>
                                            <BarTrack>
                                                <BarFill
                                                    $width={(value / 20) * 100}
                                                    $color={getBarColor(value)}
                                                />
                                            </BarTrack>
                                            <StatValue $color={getValueColor(value)}>
                                                {value}
                                            </StatValue>
                                        </StatRight>
                                    </StatRow>

                                    {isTooltipOpen && (
                                        <Tooltip>
                                            <TooltipDesc>{stat.description}</TooltipDesc>
                                            <TooltipTip>{stat.tip}</TooltipTip>
                                        </Tooltip>
                                    )}
                                </StatItem>
                            );
                        })}
                    </Grid>
                </Section>
            ))}
        </Container>
    );
};

// ── Animations ────────────────────────────────────────────────────────────────

const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const fillBar = keyframes`
    from { width: 0; }
`;

// ── Styled components ─────────────────────────────────────────────────────────

const Container = styled.div`
    margin-top: ${({ theme }) => theme.gaps.lg}px;
    background: ${({ theme }) => theme.colors.bgSurface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};
    padding: ${({ theme }) => theme.gaps.lg}px;
    animation: ${fadeInUp} 0.4s ease;
`;

const SheetHeader = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.gaps.md}px;
    margin-bottom: ${({ theme }) => theme.gaps.lg}px;
`;

const SheetTitle = styled.h3`
    font-size: ${({ theme }) => theme.font.size.sm};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.12em;
    white-space: nowrap;
    margin: 0;
`;

const SheetLine = styled.div`
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
`;

const Section = styled.div`
    & + & {
        margin-top: ${({ theme }) => theme.gaps.lg}px;
    }
`;

const CatLabel = styled.p`
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 ${({ theme }) => theme.gaps.sm}px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 6px;

    @media (min-width: 480px) {
        grid-template-columns: 1fr 1fr;
    }

    /* Нужно, чтобы абсолютный тултип мог выходить за пределы ячейки */
    overflow: visible;
`;

const StatItem = styled.div<{ $active: boolean }>`
    position: relative;
    padding: 8px 10px;
    border-radius: ${({ theme }) => theme.radius.md};
    border: 1px solid
        ${({ theme, $active }) => ($active ? theme.colors.borderHover : 'transparent')};
    background: ${({ theme, $active }) =>
        $active ? theme.colors.bgElevated : 'transparent'};
    cursor: default;
    transition: ${({ theme }) => theme.transition};
    user-select: none;

    &:hover {
        background: ${({ theme }) => theme.colors.bgElevated};
        border-color: ${({ theme }) => theme.colors.border};
    }
`;

const StatRow = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.gaps.sm}px;
`;

const StatLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;
`;

const IconWrap = styled.div<{ $color: string }>`
    width: 30px;
    height: 30px;
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ $color }) => $color}22;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

const StatName = styled.span`
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
`;

const StatRight = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
`;

const BarTrack = styled.div`
    width: 64px;
    height: 5px;
    background: ${({ theme }) => theme.colors.bgElevated};
    border-radius: 99px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.border};

    @media (min-width: 480px) {
        width: 52px;
    }
`;

const BarFill = styled.div<{ $width: number; $color: string }>`
    height: 100%;
    width: ${({ $width }) => $width}%;
    background: ${({ $color }) => $color};
    border-radius: 99px;
    animation: ${fillBar} 0.6s ease;
`;

const StatValue = styled.span<{ $color: string }>`
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ $color }) => $color};
    width: 22px;
    text-align: right;
    font-variant-numeric: tabular-nums;
`;

const Tooltip = styled.div`
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 20;
    padding: 10px 12px;
    background: ${({ theme }) => theme.colors.bgElevated};
    border: 1px solid ${({ theme }) => theme.colors.borderHover};
    border-radius: ${({ theme }) => theme.radius.md};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    animation: ${fadeInUp} 0.15s ease;
    pointer-events: none;
`;

const TooltipDesc = styled.p`
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
    margin: 0 0 6px;
`;

const TooltipTip = styled.p`
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
    margin: 0;
`;