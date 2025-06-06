import { GeneratorForm } from '../../features/generator/GeneratorForm';
import styled from 'styled-components';

export const GeneratorPage = () => {
    return (
        <StyledWrapper>
            <GeneratorForm />
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
