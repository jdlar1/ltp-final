import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import useSWRImmutable from 'swr/immutable'


const MainDeviceCard = () => {
    const {data, isLoading} = useSWRImmutable("/devices/me")

    return (
        <Container>
            <h2>Nodo principal</h2>
            <SubContainer>
            <StaticImage src='../images/xbee.webp' alt="Imagen de un Xbee" height={150} />
            <Right>
                <p><strong>Node ID: </strong>{data?.node_id}</p>
                <p><strong>Rol: </strong>{data?.role}</p>
                <p><strong>Hardware: </strong>{data?.hardware_version}</p>
            </Right>
            </SubContainer>
        </Container>
    )
}

const Container = styled.article`
    display: flex;
    flex-direction: column;
    background-color: var(--color-2);
    padding: 10px 15px;
    border-radius: 15px;
    margin-top: 20px;

    & h2 {
        text-align: center;
    }
`

const SubContainer = styled.div`
    display:flex;
    flex-direction: row;
`

const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & p,strong {
        font-size: 2rem;
    }
    
`

export default MainDeviceCard