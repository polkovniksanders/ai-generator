import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonMain } from '../../../shared/ui/Button/ButtonMain.tsx';

export const TryButton = () => {
    const navigate = useNavigate();

    const tryGenerator = () => {
        navigate('generator');
    };

    return <ButtonMain onClick={tryGenerator}>Попробовать</ButtonMain>;
};
