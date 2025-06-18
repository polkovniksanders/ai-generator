import styled from 'styled-components';
import { Navigation } from '../features/navigation/ui/Navigation';
import { Outlet } from 'react-router-dom';

export const CommonLayout = () => {
    return (
        <StyledLayout>
            <Navigation />
            <Outlet />
        </StyledLayout>
    );
};

const StyledLayout = styled.div``;
