import React from "react";
import styled from "styled-components";

interface Props {
    address: string
    online: boolean
}

interface BallProps {
    online: boolean
}

const IOLive = (props: Props) => {
    return (
        <>
        <Container>
            <Header>
                <HeaderLeft>
                    <LiveBall online={props.online} />
                    <OnlineStatusText>{props.online ? "En línea" : "Desconectado"}</OnlineStatusText>
                </HeaderLeft>
                <HeaderRight>
                    <Title>Live view</Title>
                    <SubtitleAddress>{props.address}</SubtitleAddress>
                </HeaderRight>
            </Header>
        </Container>
        <Container>
            <h3>información</h3>
            <p>{JSON.stringify(props.address)}</p>
        </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    margin-top: 10px;
    background-color: var(--color-3);
`

const Header = styled.header`
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    align-items: center;
`

const HeaderRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const HeaderLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    margin: 0 10px;
`

const LiveBall = styled.div<BallProps>`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.online ? "green" : "red"};
`

const OnlineStatusText = styled.p`
    font-size: 1.5rem;
    color: var(--color-1);
`


const Title = styled.h1`
`

const SubtitleAddress = styled.h2`
    font-size: 2rem;
    color: var(--color-1);
`


export default IOLive

