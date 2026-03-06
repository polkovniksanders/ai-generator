import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import {
    useGetUserQuery,
    useGetCharacterQuery,
    useGenerateImageMutation,
} from '../../entities/user';
import { CharacterCard } from '../../features/character/ui/CharacterCard';
import { CharacterImage } from '../../features/character/ui/CharacterImage';
import { CharacterStats } from '../../features/character/ui/CharacterStats';
import { Skeleton } from '../../shared/ui/Skeleton/Skeleton';

export const CharacterPage = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const { data: user, isLoading: userLoading } = useGetUserQuery(uuid!, { skip: !uuid });
    const { data: character, isLoading: charLoading } = useGetCharacterQuery(uuid!, {
        skip: !uuid,
    });
    const [generateImage, { data: freshImage, isLoading: imageLoading }] =
        useGenerateImageMutation();

    const handleShare = useCallback(() => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    const handleGenerateSimilar = useCallback(() => {
        if (!user) return;
        const params = new URLSearchParams({
            name: user.name,
            surname: user.surname,
            age: String(user.age),
            ...(user.profession ? { profession: user.profession } : {}),
        });
        navigate(`/generator?${params}`);
    }, [user, navigate]);

    useEffect(() => {
        if (uuid && user && !user.image) {
            generateImage(uuid);
        }
    }, [uuid, user, generateImage]);

    if (userLoading || charLoading) {
        return (
            <Page>
                <Skeleton $height='100px' $borderRadius='16px' />
                <div style={{ marginTop: '16px' }}>
                    <Skeleton $height='400px' $borderRadius='16px' />
                </div>
            </Page>
        );
    }

    if (!user) {
        return (
            <Page>
                <NotFound>Персонаж не найден</NotFound>
            </Page>
        );
    }

    const imageSrc = user.image ?? freshImage?.image;

    return (
        <Page>
            <CharacterCard
                user={{ ...user, description: character?.description }}
                onShare={handleShare}
                onGenerateSimilar={handleGenerateSimilar}
                copied={copied}
            />
            <CharacterStats uuid={user.uuid} />
            {imageLoading && !imageSrc ? (
                <ImageLoadingWrap>
                    <Skeleton $height='400px' $borderRadius='16px' />
                    <LoadingLabel>Генерируется изображение...</LoadingLabel>
                </ImageLoadingWrap>
            ) : (
                <CharacterImage src={imageSrc} />
            )}
        </Page>
    );
};

const Page = styled.div`
    max-width: 640px;
    margin: 0 auto;
    width: 100%;
    padding-bottom: ${({ theme }) => theme.gaps.xxl}px;
`;

const NotFound = styled.p`
    color: ${({ theme }) => theme.colors.textMuted};
    text-align: center;
    padding: ${({ theme }) => theme.gaps.xxl}px;
`;

const ImageLoadingWrap = styled.div`
    position: relative;
    margin-top: ${({ theme }) => theme.gaps.lg}px;
`;

const LoadingLabel = styled.p`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.font.size.sm};
    margin: 0;
`;
