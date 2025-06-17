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

const StyledLayout = styled.div``;
