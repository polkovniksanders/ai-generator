import React from 'react';
import styled from 'styled-components';

interface IconProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Компонент иконки (SVG)
    size?: number; // Размер иконки в пикселях, например 24
    color?: string; // Цвет иконки
    route?: string; // Опционально — если иконка ведёт на маршрут (например, для <a> или <Link>)
}

export const Icon: React.FC<IconProps> = ({
    icon: IconComponent,
    size = 24,
    color = 'black',
    route,
}) => {
    const iconElement = (
        <StyledIcon as={IconComponent} size={size} color={color} />
    );

    if (route) {
        // Если есть маршрут, оборачиваем иконку в ссылку (можно заменить на Link из react-router-dom)
        return <a href={route}>{iconElement}</a>;
    }

    return iconElement;
};

const StyledIcon = styled.svg<{ size: number; color: string }>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    fill: ${({ color }) => color};
    cursor: pointer;
`;
