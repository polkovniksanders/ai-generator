import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
    useCreateCharacterImageMutation,
    useLazyGetCharacterQuery,
    useLazyGetUserQuery,
} from '../../../entities/users/service/user.service';
import { CharacterCard } from '../../../features/characters/ui/CharacterCard';
import { CharacterImage } from '../../../features/characters/ui/CharacterImage';

export const CharacterPage = () => {
    const { uuid } = useParams();

    const [getUser, { data: user }] = useLazyGetUserQuery();
    const [getCharacter, { data: character }] = useLazyGetCharacterQuery();
    const [createCharacterImage, { data: image }] =
        useCreateCharacterImageMutation();

    useEffect(() => {
        if (uuid) {
            getUser(uuid, true);
            getCharacter(uuid, true);
        }
    }, [uuid, getUser, getCharacter]);

    useEffect(() => {
        if (character?.description) {
            createCharacterImage(character.description);
        }
    }, [character, createCharacterImage]);

    return (
        <div
            style={{
                overflow: 'scroll',
                height: '100vh',
                paddingBottom: '90px',
            }}
        >
            <CharacterCard {...user} description={character?.description} />
            <CharacterImage src={image?.image} />
        </div>
    );
};
