import styled from 'styled-components';
import { GeneratorForm } from '../../features/generator/ui/GeneratorForm';

export const GeneratorPage = () => (
    <Page>
        <GeneratorForm />
    </Page>
);

const Page = styled.div`
    display: flex;
    justify-content: center;
    padding-top: ${({ theme }) => theme.gaps.xl}px;
`;
