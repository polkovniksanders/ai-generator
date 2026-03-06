import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { User } from '../../../entities/user';
import { CharacterCard } from './CharacterCard';

interface CharacterListProps {
    users: User[];
}

export const CharacterList = ({ users }: CharacterListProps) => {
    const navigate = useNavigate();

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
        <Grid>
            {users.map(user => (
                <CharacterCard
                    key={user.uuid}
                    user={user}
                    compact
                    onClick={() => navigate(user.uuid)}
                />
            ))}
        </Grid>
    );
};

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gaps.sm}px;
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
