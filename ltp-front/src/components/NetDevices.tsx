import React from 'react'
import styled from 'styled-components'
import useSWRImmutable from 'swr/immutable'
import NetDeviceCard from './NetDeviceCard'


const NetDevices = () => {

    const { data, isLoading } = useSWRImmutable("/devices/network")
    console.log(data)

    return (
        <Container>
            <h2>Nodos secundarios</h2>
            {
                data
                    ? data.map((dev: any, i: number) => (
                        <NetDeviceCard data={dev} key={i}/>
                    ))
                    : <h2>Cargando..</h2>
            }
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    margin-top: 10px;
    background-color: var(--color-3);

    & h2 {
        text-align: center;
    }
`

export default NetDevices