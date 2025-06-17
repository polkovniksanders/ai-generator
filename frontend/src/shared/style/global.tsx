import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;

    }
    * {
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
    }
    a {
        text-decoration: none;
    }
    
    body {
        width: 100vw;
        margin: 0;
        font-family: "Zen Maru Gothic", sans-serif;
        background-color: #333;
        background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        background-size: 80px 80px;
        padding: 100px clamp(16px, 6vw, 160px);

    }
    
    p, h4 {margin: 0}

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    select {
        /* for Firefox */
        -moz-appearance: none;
        /* for Chrome */
        -webkit-appearance: none;
    }

    /* For IE10 */
    select::-ms-expand {
        display: none;
    }

`;
