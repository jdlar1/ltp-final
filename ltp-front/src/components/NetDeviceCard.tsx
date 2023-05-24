import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

const NetDeviceCard = ({data}: any) => {
    console.log("data within component", data)
    return (
        <Container>
            <SubContainer>
            <StaticImage src='../images/xbee.webp' alt="Imagen de un Xbee" height={150} />
            <Right>
                <p><strong>Address: </strong>{data?.address}</p>
                <p><strong>Rol: </strong>{data?.role}</p>
            </Right>
            </SubContainer>
        </Container>
    )
}

const Container = styled.article`
    display: flex;
    flex-direction: column;
    background-color: var(--color-4);
    padding: 10px 15px;
    margin: 0 10px;
    margin-bottom: 10px;
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
        color: #000;
    }
    
`

export default NetDeviceCard