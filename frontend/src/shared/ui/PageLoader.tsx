import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

export const PageLoader = () => (
    <Wrapper>
        <Spinner />
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
`;

const Spinner = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid rgba(99, 102, 241, 0.15);
    border-top-color: #6366f1;
    animation: ${spin} 0.7s linear infinite;
`;
