import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const navItems = [
    {
        path: '/',
        label: 'Главная',
        icon: (
            <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' />
                <polyline points='9 22 9 12 15 12 15 22' />
            </svg>
        ),
    },
    {
        path: '/generator',
        label: 'Генератор',
        icon: (
            <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
            </svg>
        ),
    },
    {
        path: '/characters',
        label: 'История',
        icon: (
            <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                <circle cx='9' cy='7' r='4' />
                <path d='M23 21v-2a4 4 0 00-3-3.87' />
                <path d='M16 3.13a4 4 0 010 7.75' />
            </svg>
        ),
    },
    {
        path: '/policy',
        label: 'О проекте',
        icon: (
            <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <circle cx='12' cy='12' r='10' />
                <line x1='12' y1='8' x2='12' y2='12' />
                <line x1='12' y1='16' x2='12.01' y2='16' />
            </svg>
        ),
    },
];

export const Navigation = () => {
    const { pathname } = useLocation();

    return (
        <Nav>
            <NavInner>
                {navItems.map(({ path, label, icon }) => {
                    const active =
                        pathname === path || (path !== '/' && pathname.startsWith(path));
                    return (
                        <NavItem key={path} to={path} $active={active}>
                            <IconWrap $active={active}>{icon}</IconWrap>
                            <NavLabel $active={active}>{label}</NavLabel>
                        </NavItem>
                    );
                })}
            </NavInner>
        </Nav>
    );
};

const Nav = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0 clamp(16px, 6vw, 120px);
    padding-bottom: env(safe-area-inset-bottom, 0);
`;

const NavInner = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: rgba(15, 15, 26, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(99, 102, 241, 0.1);
    border-bottom: none;
    border-radius: 16px 16px 0 0;
    padding: 8px 16px;
    max-width: 600px;
    margin: 0 auto;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 8px 16px;
    border-radius: 10px;
    color: ${({ theme, $active }) => ($active ? theme.colors.accentFrom : theme.colors.textMuted)};
    transition: ${({ theme }) => theme.transition};
    text-decoration: none;

    &:hover {
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const IconWrap = styled.div<{ $active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ $active }) => $active && 'filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.6));'}
`;

const NavLabel = styled.span<{ $active: boolean }>`
    font-size: 10px;
    font-weight: ${({ $active }) => ($active ? '600' : '400')};
`;
