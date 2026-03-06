import styled from 'styled-components';
import { useGetUsersQuery } from '../../entities/user';
import { CharacterList } from '../../features/character/ui/CharacterList';
import { Skeleton } from '../../shared/ui/Skeleton/Skeleton';

export const CharactersPage = () => {
    const { data: users, isLoading } = useGetUsersQuery();

    return (
        <Page>
            <PageTitle>История персонажей</PageTitle>
            {isLoading ? (
                <SkeletonList>
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} $height='80px' $borderRadius='16px' />
                    ))}
                </SkeletonList>
            ) : (
                <CharacterList users={users ?? []} />
            )}
        </Page>
    );
};

const Page = styled.div`
    max-width: 640px;
    margin: 0 auto;
    width: 100%;
`;

const PageTitle = styled.h1`
    font-size: ${({ theme }) => theme.font.size.xl};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: ${({ theme }) => theme.gaps.lg}px;
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const SkeletonList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gaps.sm}px;
`;
