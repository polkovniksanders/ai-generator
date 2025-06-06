import type { ReactNode } from 'react';

export interface ButtonProps {
    children: ReactNode;
    disabled: boolean;

    onClick?: () => void;
}
