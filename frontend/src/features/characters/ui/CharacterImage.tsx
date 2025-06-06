import styled from 'styled-components';

export const CharacterImage = props => {
    const { src } = props;

    return (
        <div>
            <StyledImage src={src} alt='person' />
        </div>
    );
};

const StyledImage = styled.img`
    width: 100%;
`;
