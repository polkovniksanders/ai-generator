import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface CooldownTimerProps {
    cooldownUntil: number;
    onExpire?: () => void;
}

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TOTAL_MS = 4 * 60 * 60 * 1000;

export const CooldownTimer = ({ cooldownUntil, onExpire }: CooldownTimerProps) => {
    const [remaining, setRemaining] = useState(Math.max(0, cooldownUntil - Date.now()));

    useEffect(() => {
        if (remaining <= 0) {
            onExpire?.();
            return;
        }
        const id = setInterval(() => {
            const r = Math.max(0, cooldownUntil - Date.now());
            setRemaining(r);
            if (r <= 0) {
                clearInterval(id);
                onExpire?.();
            }
        }, 1000);
        return () => clearInterval(id);
    }, [cooldownUntil, onExpire, remaining]);

    const hours = Math.floor(remaining / 3_600_000);
    const minutes = Math.floor((remaining % 3_600_000) / 60_000);
    const seconds = Math.floor((remaining % 60_000) / 1_000);
    const progress = remaining / TOTAL_MS;
    const dashOffset = CIRCUMFERENCE * (1 - progress);

    return (
        <Wrapper>
            <svg width='100' height='100' viewBox='0 0 100 100'>
                <circle
                    cx='50'
                    cy='50'
                    r={RADIUS}
                    fill='none'
                    stroke='rgba(99, 102, 241, 0.1)'
                    strokeWidth='6'
                />
                <circle
                    cx='50'
                    cy='50'
                    r={RADIUS}
                    fill='none'
                    stroke='url(#timerGrad)'
                    strokeWidth='6'
                    strokeLinecap='round'
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={dashOffset}
                    transform='rotate(-90 50 50)'
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
                <defs>
                    <linearGradient id='timerGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
                        <stop offset='0%' stopColor='#6366f1' />
                        <stop offset='100%' stopColor='#a855f7' />
                    </linearGradient>
                </defs>
            </svg>
            <TimeText>
                {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
                {String(seconds).padStart(2, '0')}
            </TimeText>
            <TimerLabel>перезарядка</TimerLabel>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    svg {
        filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.4));
    }
`;

const TimeText = styled.span`
    font-size: ${({ theme }) => theme.font.size.lg};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-variant-numeric: tabular-nums;
    margin-top: -8px;
`;

const TimerLabel = styled.span`
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.1em;
`;
