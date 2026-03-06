import { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';

const PHRASES = [
    'Я знаю всё о людях...',
    'Ещё один характер создан!',
    'Тайны раскрываются...',
    'Судьба прочитана.',
    'Вселенная не знает случайностей.',
    'Имя — это судьба.',
    'Все люди интересны по-своему.',
    'Совпадения? Не верю в них.',
    'Я вижу тебя насквозь.',
    'История продолжается...',
];

const INTERVAL = 5000;

export const AlenaCharacter = () => {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [open, setOpen] = useState(false);

    const nextPhrase = useCallback(() => {
        setVisible(false);
        setTimeout(() => {
            setPhraseIndex((i) => (i + 1) % PHRASES.length);
            setVisible(true);
        }, 400);
    }, []);

    useEffect(() => {
        if (!open) return;
        const id = setInterval(nextPhrase, INTERVAL);
        return () => clearInterval(id);
    }, [open, nextPhrase]);

    return (
        <Container>
            {open && (
                <Bubble $visible={visible}>
                    <BubbleText>{PHRASES[phraseIndex]}</BubbleText>
                    <BubbleTail />
                </Bubble>
            )}
            <AvatarButton onClick={() => setOpen((v) => !v)} aria-label='Алёна'>
                <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <defs>
                        <linearGradient id='ag1' x1='0%' y1='0%' x2='100%' y2='100%'>
                            <stop offset='0%' stopColor='#6366f1' />
                            <stop offset='100%' stopColor='#a855f7' />
                        </linearGradient>
                        <linearGradient id='ag2' x1='0%' y1='0%' x2='100%' y2='100%'>
                            <stop offset='0%' stopColor='#a855f7' />
                            <stop offset='100%' stopColor='#6366f1' />
                        </linearGradient>
                        <radialGradient id='ag3' cx='50%' cy='40%' r='50%'>
                            <stop offset='0%' stopColor='#1a1a2e' />
                            <stop offset='100%' stopColor='#0f0f1a' />
                        </radialGradient>
                    </defs>
                    {/* Body */}
                    <ellipse cx='24' cy='38' rx='13' ry='8' fill='url(#ag1)' opacity='0.15' />
                    <path d='M14 44 Q24 34 34 44' fill='url(#ag1)' opacity='0.4' />
                    {/* Robe */}
                    <path d='M16 30 Q24 26 32 30 L34 44 H14 Z' fill='url(#ag3)' stroke='url(#ag1)' strokeWidth='0.8' />
                    {/* Collar glow */}
                    <path d='M18 30 Q24 28 30 30' stroke='url(#ag1)' strokeWidth='1.2' fill='none' opacity='0.7' />
                    {/* Head */}
                    <circle cx='24' cy='19' r='10' fill='url(#ag3)' stroke='url(#ag1)' strokeWidth='1' />
                    {/* Hair */}
                    <path
                        d='M14 18 Q14 10 24 9 Q34 10 34 18 Q32 13 24 13 Q16 13 14 18Z'
                        fill='url(#ag2)'
                        opacity='0.9'
                    />
                    {/* Eyes */}
                    <ellipse cx='20' cy='19' rx='2' ry='2.5' fill='white' opacity='0.9' />
                    <ellipse cx='28' cy='19' rx='2' ry='2.5' fill='white' opacity='0.9' />
                    <circle cx='20.5' cy='19.5' r='1.2' fill='url(#ag1)' />
                    <circle cx='28.5' cy='19.5' r='1.2' fill='url(#ag1)' />
                    <circle cx='21' cy='19' r='0.4' fill='white' opacity='0.8' />
                    <circle cx='29' cy='19' r='0.4' fill='white' opacity='0.8' />
                    {/* Smile */}
                    <path d='M21 23 Q24 25.5 27 23' stroke='url(#ag1)' strokeWidth='1' fill='none' strokeLinecap='round' />
                    {/* Stars */}
                    <circle cx='10' cy='12' r='1' fill='url(#ag2)' opacity='0.7' />
                    <circle cx='38' cy='8' r='0.8' fill='url(#ag1)' opacity='0.6' />
                    <circle cx='6' cy='30' r='0.6' fill='url(#ag2)' opacity='0.5' />
                    <circle cx='42' cy='28' r='0.7' fill='url(#ag1)' opacity='0.5' />
                </svg>
                {open && <GlowRing />}
            </AvatarButton>
        </Container>
    );
};

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
`;

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(6px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const fadeOut = keyframes`
    from { opacity: 1; }
    to   { opacity: 0; }
`;

const Container = styled.div`
    position: fixed;
    bottom: 90px;
    right: clamp(12px, 4vw, 32px);
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    pointer-events: none;
`;

const AvatarButton = styled.button`
    pointer-events: all;
    position: relative;
    background: rgba(15, 15, 26, 0.85);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    animation: ${float} 3s ease-in-out infinite;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);

    &:hover {
        border-color: rgba(99, 102, 241, 0.6);
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
    }
`;

const GlowRing = styled.div`
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1.5px solid rgba(99, 102, 241, 0.5);
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
    pointer-events: none;
`;

const Bubble = styled.div<{ $visible: boolean }>`
    pointer-events: all;
    position: relative;
    background: rgba(15, 15, 26, 0.92);
    border: 1px solid rgba(99, 102, 241, 0.25);
    border-radius: 12px 12px 4px 12px;
    padding: 10px 14px;
    max-width: 180px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 4px 24px rgba(99, 102, 241, 0.15);

    ${({ $visible }) =>
        $visible
            ? css`animation: ${fadeIn} 0.4s ease forwards;`
            : css`animation: ${fadeOut} 0.3s ease forwards;`}
`;

const BubbleText = styled.p`
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-style: italic;
`;

const BubbleTail = styled.div`
    position: absolute;
    bottom: -6px;
    right: 18px;
    width: 10px;
    height: 10px;
    background: rgba(15, 15, 26, 0.92);
    border-right: 1px solid rgba(99, 102, 241, 0.25);
    border-bottom: 1px solid rgba(99, 102, 241, 0.25);
    transform: rotate(45deg);
`;
