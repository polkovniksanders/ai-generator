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
        height: 100vh;
        width: 100vw;
        margin: 0;
        overflow: hidden;
        font-family: "Zen Maru Gothic", sans-serif;
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
