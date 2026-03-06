import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
`;

interface SkeletonProps {
    $height?: string;
    $width?: string;
    $borderRadius?: string;
}

export const Skeleton = styled.div<SkeletonProps>`
    height: ${({ $height }) => $height ?? '16px'};
    width: ${({ $width }) => $width ?? '100%'};
    border-radius: ${({ theme, $borderRadius }) => $borderRadius ?? theme.radius.sm};
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 25%,
        rgba(255, 255, 255, 0.08) 50%,
        rgba(255, 255, 255, 0.03) 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
`;
