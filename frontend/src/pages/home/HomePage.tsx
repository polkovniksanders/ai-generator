import { About } from '../../features/home/ui/About';
import { TryButton } from '../../features/home/ui/TryButton';
import styled from 'styled-components';

export const HomePage = () => {
    return (
        <StyledWrapper>
            <About />
            <TryButton />
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
`;
