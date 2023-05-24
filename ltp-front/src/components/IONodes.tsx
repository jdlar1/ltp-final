import React from 'react'
import styled from 'styled-components'
import useSWRImmutable from 'swr/immutable'
import IODeviceCard from './IODeviceCard'


const IONodes= () => {

    const { data, isLoading } = useSWRImmutable("/io/configure")
    const devices = data?.devices

    return (
        <Container>
            <h2>Nodos secundarios</h2>
            {
                devices?.length
                    ? devices.map((dev: any, i: number) => (
                        <IODeviceCard data={dev} key={i} />
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

export default IONodes