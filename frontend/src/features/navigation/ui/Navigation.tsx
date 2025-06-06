import {
    IoHomeOutline,
    IoListOutline,
    IoRocketOutline,
    IoDocumentOutline,
} from 'react-icons/io5';
import styled from 'styled-components';
import { Icon } from './Icon';
import { useWindowWidth } from '../../../shared/hooks/useWindowWidth';

export const Navigation = () => {
    const width = useWindowWidth();

    const iconSettings = {
        size: 40,
        color: '#ffffff',
    };

    const icons = [
        {
            id: 0,
            icon: IoHomeOutline,
            route: '/',
        },
        {
            id: 1,
            icon: IoRocketOutline,
            route: '/generator',
        },
        {
            id: 2,
            icon: IoListOutline,
            route: '/characters',
        },
        {
            id: 3,
            icon: IoDocumentOutline,
            route: '/policy',
        },
    ];

    return (
        <StyledWrapper $width={width}>
            {icons.map(({ id, icon: IconComponent, route }) => (
                <Icon
                    key={id}
                    icon={IconComponent}
                    size={iconSettings.size}
                    color={iconSettings.color}
                    route={route}
                />
            ))}
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div<{ $width: number }>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: ${({ theme }) => `${theme.gaps.lg + 10}px`};
    background: #444;
    width: ${props => `${props.$width}px`};
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;
    padding: ${({ theme }) => `${theme.gaps.lg}px`};
`;
