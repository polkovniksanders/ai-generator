import styled from 'styled-components';
import type { User } from '../../../entities/user';

interface CharacterCardProps {
    user: User;
    onClick?: () => void;
    compact?: boolean;
    onShare?: () => void;
    onGenerateSimilar?: () => void;
    copied?: boolean;
}

export const CharacterCard = ({
    user,
    onClick,
    compact,
    onShare,
    onGenerateSimilar,
    copied,
}: CharacterCardProps) => (
    <Card onClick={onClick} $clickable={!!onClick}>
        <CardHeader>
            <Avatar>
                {user.name[0]}
                {user.surname[0]}
            </Avatar>
            <Identity>
                <FullName>
                    {user.name} {user.surname}
                </FullName>
                <Meta>
                    {user.age} лет{user.profession ? ` · ${user.profession}` : ''}
                </Meta>
            </Identity>
            {(onShare || onGenerateSimilar) && (
                <Actions onClick={e => e.stopPropagation()}>
                    {onGenerateSimilar && (
                        <ActionBtn onClick={onGenerateSimilar} title='Сгенерировать похожего'>
                            <svg
                                viewBox='0 0 24 24'
                                width='15'
                                height='15'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                                <circle cx='9' cy='7' r='4' />
                                <line x1='19' y1='8' x2='19' y2='14' />
                                <line x1='22' y1='11' x2='16' y2='11' />
                            </svg>
                            <BtnLabel>Похожий</BtnLabel>
                        </ActionBtn>
                    )}
                    {onShare && (
                        <ActionBtn onClick={onShare} title='Скопировать ссылку' $copied={copied}>
                            {copied ? (
                                <>
                                    <svg
                                        viewBox='0 0 24 24'
                                        width='15'
                                        height='15'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <polyline points='20,6 9,17 4,12' />
                                    </svg>
                                    <BtnLabel>Скопировано</BtnLabel>
                                </>
                            ) : (
                                <>
                                    <svg
                                        viewBox='0 0 24 24'
                                        width='15'
                                        height='15'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
                                        <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
                                    </svg>
                                    <BtnLabel>Поделиться</BtnLabel>
                                </>
                            )}
                        </ActionBtn>
                    )}
                </Actions>
            )}
        </CardHeader>
        {!compact && user.description && (
            <Description>{user.description}</Description>
        )}
    </Card>
);

const Card = styled.article<{ $clickable: boolean }>`
    background: ${({ theme }) => theme.colors.bgSurface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};
    padding: ${({ theme }) => theme.gaps.lg}px;
    transition: ${({ theme }) => theme.transition};
    animation: fadeInUp 0.3s ease;

    ${({ $clickable, theme }) =>
        $clickable &&
        `
        cursor: pointer;
        &:hover {
            border-color: ${theme.colors.borderHover};
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1);
        }
    `}
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.gaps.md}px;
    flex-wrap: wrap;
`;

const Avatar = styled.div`
    width: 44px;
    height: 44px;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.gradient};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.font.size.md};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: white;
    flex-shrink: 0;
    text-transform: uppercase;
`;

const Identity = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
`;

const FullName = styled.h3`
    font-size: ${({ theme }) => theme.font.size.md};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Meta = styled.span`
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textMuted};
`;

const Description = styled.p`
    margin-top: ${({ theme }) => theme.gaps.md}px;
    font-size: ${({ theme }) => theme.font.size.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-top: ${({ theme }) => theme.gaps.md}px;
`;

const Actions = styled.div`
    display: flex;
    gap: 6px;
    margin-left: auto;
    flex-shrink: 0;

    @media (max-width: 480px) {
        order: 3;
        margin-left: 0;
        width: 100%;
        padding-top: ${({ theme }) => theme.gaps.sm}px;
        border-top: 1px solid ${({ theme }) => theme.colors.border};
    }
`;

const ActionBtn = styled.button<{ $copied?: boolean }>`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    border-radius: ${({ theme }) => theme.radius.full};
    border: 1px solid
        ${({ theme, $copied }) => ($copied ? theme.colors.success : theme.colors.border)};
    background: ${({ theme, $copied }) =>
        $copied ? 'rgba(16, 185, 129, 0.08)' : theme.colors.bgElevated};
    color: ${({ theme, $copied }) =>
        $copied ? theme.colors.success : theme.colors.textMuted};
    font-size: 11px;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};
    white-space: nowrap;

    &:hover {
        border-color: ${({ theme, $copied }) =>
            $copied ? theme.colors.success : theme.colors.borderHover};
        color: ${({ theme, $copied }) =>
            $copied ? theme.colors.success : theme.colors.textPrimary};
        background: ${({ $copied }) =>
            $copied ? 'rgba(16, 185, 129, 0.12)' : 'rgba(99,102,241,0.06)'};
    }
`;

const BtnLabel = styled.span`
    @media (max-width: 380px) {
        display: none;
    }
`;
