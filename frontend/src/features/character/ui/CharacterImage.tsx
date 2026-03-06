import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Skeleton } from '../../../shared/ui/Skeleton/Skeleton';

interface CharacterImageProps {
    src?: string;
}

export const CharacterImage = ({ src }: CharacterImageProps) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    if (!src) return null;

    if (error) {
        return (
            <ErrorWrap>
                <svg
                    width='48'
                    height='48'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1'
                >
                    <rect x='3' y='3' width='18' height='18' rx='2' />
                    <circle cx='8.5' cy='8.5' r='1.5' />
                    <polyline points='21 15 16 10 5 21' />
                </svg>
                <span>Изображение недоступно</span>
            </ErrorWrap>
        );
    }

    return (
        <ImageWrap>
            {!loaded && <Skeleton $height='400px' $borderRadius='16px' />}
            <StyledImage
                src={src}
                alt='Сгенерированный персонаж'
                $visible={loaded}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
            />
        </ImageWrap>
    );
};

const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.98); }
    to   { opacity: 1; transform: scale(1); }
`;

const ImageWrap = styled.div`
    border-radius: ${({ theme }) => theme.radius.lg};
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.border};
    margin-top: ${({ theme }) => theme.gaps.lg}px;
`;

const StyledImage = styled.img<{ $visible: boolean }>`
    width: 100%;
    display: ${({ $visible }) => ($visible ? 'block' : 'none')};
    animation: ${fadeIn} 0.4s ease;
`;

const ErrorWrap = styled.div`
    margin-top: ${({ theme }) => theme.gaps.lg}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.gaps.sm}px;
    padding: ${({ theme }) => theme.gaps.xl}px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.font.size.sm};
`;
