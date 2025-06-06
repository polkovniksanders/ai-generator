import type { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Navigation } from '../features/navigation/ui/Navigation';

export const CommonLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <StyledLayout>
            {children}
            <Navigation />
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #333;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 80px 80px;
    padding: 10px calc(10px + 10vw);
`;
