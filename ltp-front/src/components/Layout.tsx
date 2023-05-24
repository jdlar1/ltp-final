import React from 'react'
import styled from 'styled-components'
import { SWRConfig } from 'swr'



import GlobalStyle from './GlobalStyle'

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <SWRConfig
            value={{
                refreshInterval: 10000,
                fetcher: (resource, init) =>
                    fetch(`${process.env.GATSBY_BASE_URL}${resource}`, init)
                        .then(res => res.json())
            }}
        >
            <GlobalStyle />
            <MainContainer>
                {children}
            </MainContainer>
        </SWRConfig>
    )
}

const MainContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    background-color: var(--color-4);
`

export default Layout