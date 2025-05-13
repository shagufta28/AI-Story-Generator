import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', sans-serif;
  }

  body {
    margin: 0;
    overflow: hidden;
  }
  

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
