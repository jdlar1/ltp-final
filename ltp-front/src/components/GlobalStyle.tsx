import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 62.5%;
    }
    
    :root {
        --color-1: #2C3333;
        --color-2: #2E4F4F;
        --color-3: #0E8388;
        --color-4: #CBE4DE;
    }
    
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #fff; 
    }

    h1 {
        font-size: 3.5rem;
    }
    h2 {
        font-size: 2.5rem;
    }
    h3 {
        font-size: 2rem;
    }
    p {
        font-size: 1.6rem;
    & strong {
        font-size: 1.6rem;
    }
    }
`

export default GlobalStyle