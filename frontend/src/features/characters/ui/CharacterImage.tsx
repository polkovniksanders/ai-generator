import styled from 'styled-components';
import type { FC } from 'react';

export const CharacterImage: FC<{ src: string }> = ({ src }) => {
    if (!src) return;

    return (
        <div
            style={{
                paddingBottom: '100px',
            }}
        >
            <StyledImage src={src} alt='person' />
        </div>
    );
};

const StyledImage = styled.img`
    width: 100%;
`;
