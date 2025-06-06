import { useEffect } from 'react';
import { useLazyGetUsersQuery } from '../../../entities/users/service/user.service';
import { UserList } from '../../../features/characters/ui/CharacterList';

export const CharactersPage = () => {
    const [getUsers, { data: characters }] = useLazyGetUsersQuery();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div
            style={{
                overflow: 'scroll',
                height: '100%',
                paddingBottom: '90px',
            }}
        >
            <UserList users={characters ?? []} />
        </div>
    );
};
