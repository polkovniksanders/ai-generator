import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Navigation } from '../../../features/navigation/ui/Navigation';
import { AlenaCharacter } from '../AlenaCharacter/AlenaCharacter';

export const Layout = () => (
    <Wrapper>
        <Main>
            <Outlet />
        </Main>
        <AlenaCharacter />
        <Navigation />
    </Wrapper>
);

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Main = styled.main`
    flex: 1;
    padding: clamp(24px, 5vw, 64px) clamp(16px, 6vw, 120px);
    padding-bottom: 100px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
`;
