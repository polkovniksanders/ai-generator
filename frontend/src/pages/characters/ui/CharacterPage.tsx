import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    useCreateCharacterImageMutation,
    useLazyGetCharacterQuery,
    useLazyGetUserQuery,
} from '../../../entities/users/service/user.service';
import { CharacterCard } from '../../../features/characters/ui/CharacterCard';
import { CharacterImage } from '../../../features/characters/ui/CharacterImage';

export const CharacterPage = () => {
    const { uuid } = useParams();

    const [getUser, { data }] = useLazyGetUserQuery();

    const [getCharacter, { data: character }] = useLazyGetCharacterQuery();
    const [createCharacterImage, { data: image }] =
        useCreateCharacterImageMutation();

    useEffect(() => {
        if (uuid) {
            getUser(uuid);
            getCharacter(uuid);
        }
    }, [uuid, getUser, getCharacter]);

    useEffect(() => {
        if (character) {
            createCharacterImage(character.description);
        }
    }, [character]);

    return (
        <div
            style={{
                overflow: 'scroll',
                height: '100vh',
                paddingBottom: '90x',
            }}
        >
            <CharacterCard {...data} description={character?.description} />
            <CharacterImage src={image?.image} />
        </div>
    );
};
