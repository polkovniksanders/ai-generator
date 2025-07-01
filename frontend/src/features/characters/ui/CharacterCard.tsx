import { Fragment } from 'react';
import styled from 'styled-components';

export const CharacterCard = ({
    uuid,
    name,
    surname,
    age,
    profession,
    description,
}) => {
    return (
        <StyledUserCard>
            <StyledWrapper>
                <StyledNames>
                    <StyledTitle>{name}</StyledTitle>
                    <StyledTitle>{surname}</StyledTitle>
                </StyledNames>

                <StyledNames>
                    <StyledTitle>Возраст: </StyledTitle>
                    <StyledText>{age}</StyledText>

                    {profession && (
                        <Fragment>
                            <StyledTitle>Профессия: </StyledTitle>
                            <StyledText>{profession}</StyledText>
                        </Fragment>
                    )}
                </StyledNames>

                {description && (
                    <StyledDescription>
                        <StyledTitle>О {name}: </StyledTitle>
                        <StyledText>{description}</StyledText>
                    </StyledDescription>
                )}
            </StyledWrapper>
        </StyledUserCard>
    );
};

const StyledDescription = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledNames = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => `${theme.gaps.xs}px`};
`;

const StyledText = styled.p``;

const StyledTitle = styled.h4`
    font-weight: ${({ theme }) => theme.font.weight.heavy};
`;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => `${theme.gaps.md}px`};
`;

const StyledUserCard = styled.div`
    background: #ffffff;
    padding: ${({ theme }) => `${theme.gaps.md}px`};
    border-radius: 5px;
    cursor: pointer;
`;
