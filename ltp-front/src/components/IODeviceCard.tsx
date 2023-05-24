import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'


import { StaticImage } from 'gatsby-plugin-image'

const IODeviceCard = ({data}: any) => {
    console.log("data within component", data)
    return (
        <Container>
            <CustomLink to={`/io/${data.address}`}>
            <SubContainer>
            <StaticImage src='../images/xbee.webp' alt="Imagen de un Xbee" height={150} />
            <Right>
                <p><strong>Address: </strong>{data?.address}</p>
                <br />
                <p><strong>IO configuration:</strong></p>
                {
                    data.io.map((io: any, i: number) => (
                        <small key={i}>{io.pin} {`->`} {io.mode}</small>
                    ))
                }
            </Right>
            </SubContainer>
            </CustomLink>
        </Container>
    )
}

const CustomLink = styled(Link)`
    text-decoration: none;
    color: #000;
`


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

    & small {
        font-size: 1.5rem;
        color: #000;
    }

    
`

export default IODeviceCard