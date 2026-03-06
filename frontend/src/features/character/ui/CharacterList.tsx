import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import type { User } from '../../../entities/user';
import { CharacterCard } from './CharacterCard';

const PAGE_SIZE = 10;

interface CharacterListProps {
    users: User[];
}

export const CharacterList = ({ users }: CharacterListProps) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const sorted = [...users].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const visible = sorted.slice(0, page * PAGE_SIZE);
    const hasMore = visible.length < sorted.length;

    useEffect(() => {
        if (!hasMore || !sentinelRef.current) return;
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) setPage(p => p + 1);
            },
            { threshold: 0.1 },
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasMore, page]);

    if (users.length === 0) {
        return (
            <Empty>
                <EmptySvg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1'>
                    <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M23 21v-2a4 4 0 00-3-3.87' />
                    <path d='M16 3.13a4 4 0 010 7.75' />
                </EmptySvg>
                <EmptyText>Персонажей пока нет</EmptyText>
                <EmptySub>Создай первого в генераторе</EmptySub>
            </Empty>
        );
    }

    return (
        <Wrap>
            <Grid>
                {visible.map(user => (
                    <CharacterCard
                        key={user.uuid}
                        user={user}
                        compact
                        onClick={() => navigate(user.uuid)}
                    />
                ))}
            </Grid>

            {hasMore && (
                <Sentinel ref={sentinelRef}>
                    <ScrollHint>
                        <HintDots>
                            <Dot $delay={0} />
                            <Dot $delay={0.15} />
                            <Dot $delay={0.3} />
                        </HintDots>
                        <HintText>Прокрути вниз, чтобы загрузить ещё</HintText>
                        <ChevronIcon viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <polyline points='6 9 12 15 18 9' />
                        </ChevronIcon>
                    </ScrollHint>
                </Sentinel>
            )}

            {!hasMore && users.length > PAGE_SIZE && (
                <EndLabel>Все {users.length} персонажей загружены</EndLabel>
            )}
        </Wrap>
    );
};

const Wrap = styled.div`
    position: relative;
`;

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gaps.sm}px;
`;

const Sentinel = styled.div`
    margin-top: ${({ theme }) => theme.gaps.md}px;
`;

const bounce = keyframes`
    0%, 100% { transform: translateY(0); opacity: 0.4; }
    50% { transform: translateY(4px); opacity: 1; }
`;

const ScrollHint = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: ${({ theme }) => theme.gaps.md}px;
    color: ${({ theme }) => theme.colors.textMuted};
`;

const HintDots = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`;

const dotBounce = keyframes`
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
    40% { transform: scale(1); opacity: 1; }
`;

const Dot = styled.span<{ $delay: number }>`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accentFrom};
    animation: ${dotBounce} 1.2s ease-in-out infinite;
    animation-delay: ${({ $delay }) => $delay}s;
`;

const HintText = styled.span`
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textMuted};
`;

const ChevronIcon = styled.svg`
    width: 18px;
    height: 18px;
    animation: ${bounce} 1.4s ease-in-out infinite;
    color: ${({ theme }) => theme.colors.accentFrom};
    opacity: 0.6;
`;

const EndLabel = styled.p`
    text-align: center;
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textMuted};
    padding: ${({ theme }) => theme.gaps.md}px;
    opacity: 0.6;
`;

const Empty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.gaps.sm}px;
    padding: ${({ theme }) => theme.gaps.xxl}px;
    color: ${({ theme }) => theme.colors.textMuted};
    text-align: center;
`;

const EmptySvg = styled.svg`
    width: 48px;
    height: 48px;
    opacity: 0.4;
`;

const EmptyText = styled.h3`
    font-size: ${({ theme }) => theme.font.size.lg};
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptySub = styled.p`
    font-size: ${({ theme }) => theme.font.size.sm};
`;