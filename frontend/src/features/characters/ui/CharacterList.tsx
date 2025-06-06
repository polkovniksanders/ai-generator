import { type FC } from 'react';

import type { UserProps } from '../../../entities/users/service/users.types';
import styled from 'styled-components';
import { CharacterCard } from './CharacterCard';
import { useNavigate } from 'react-router-dom';

interface UserListProps {
    users: UserProps[];
}

export const UserList: FC<UserListProps> = ({ users }) => {
    const navigate = useNavigate();

    const viewCharacter = (uuid: string) => {
        navigate(`${uuid}`);
    };

    return (
        <StyledWrapper>
            {users.map(user => (
                <div key={user.uuid} onClick={() => viewCharacter(user.uuid)}>
                    <CharacterCard {...user} />
                </div>
            ))}
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => `${theme.gaps.md}px`};
`;
