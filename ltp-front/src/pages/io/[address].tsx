import React, { useCallback, useEffect, useMemo, useState } from "react";


import _ from "lodash"
import styled from "styled-components";
import useSWRImmutable from 'swr/immutable'
import Layout from "../../components/Layout";
import IOLive from "../../components/IOLive";
import MaxWidthContainer from "../../components/MaxWidthContainer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Switch } from "@rebass/forms";

interface Props {
    params: { address: string }
}

const USE_LAST_N_MESSAGES = 20


const DetailIO = ({ params }: Props) => {

    const [online, setOnline] = useState(false)
    const [messages, setMessages] = useState<never[]>([])

    const { address } = params

    const ws = useMemo(
        () => new WebSocket(`${process.env.GATSBY_BASE_URL_WS}/io/live/${address}`),
        [address]
    )


    ws.onopen = () => {
        console.log("Connection opened")
        setOnline(true)
    }

    ws.onmessage = (e) => {
        console.log("Message received", e.data)
        const json = JSON.parse(e.data)
        // @ts-ignore
        setMessages((prev) => {
            if (prev.length >= USE_LAST_N_MESSAGES) {
                return [...prev.slice(1), json]
            }
            if (prev.length == 0) {
                // repeat the first message USE_LAST_N_MESSAGES times
                return [...Array(USE_LAST_N_MESSAGES).fill(json)]
            }
            return [...prev, json]
        })
    }

    ws.onclose = () => {
        console.log("Connection closed")
        setOnline(false)
    }


    const grouped_messages = useMemo(
        () => {
            if (messages.length <= 0) {
                return {}
            }

            const keys = _.keys(messages[0])

            return _.fromPairs(
                keys.map((key) => {
                    return [key, messages.map((message) => message[key])]
                })
            )
        }
        , [messages]
    )

    const send = useCallback(
        (message: string) => {
            ws.send(JSON.stringify(message))
        },
        [address]
    )


    return (
        <Layout>
            <MaxWidthContainer>
                <IOLive address={address} online={online} />
                {
                    Object.entries(grouped_messages).map(([key, values]) => {
                        return (
                            <DataDisplayCard key={`${key}${values}`} data={{ pin: key, messages: values }} send={send} />
                        )
                    })
                }
            </MaxWidthContainer>
        </Layout>
    )
}


const DataDisplayCard = ({ data, send }: any) => {
    const { pin, messages } = data
    const { mode } = messages[0]

    const [switchState, setSwitchState] = useState(data.value ?? false)


    if (mode == "ADC") {
        return (
            <MessagesContainer>
                <h3>{pin}</h3>
                <h4>Mode: {mode}</h4>
                <LineChart width={800} height={400} data={messages}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/> 
                    <XAxis color="black" dataKey="date" tick={{ fill: 'black' }}/>
                    <YAxis color="black" tick={{ fill: 'black' }} />
                    <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                </LineChart>
            </MessagesContainer>
        )
    }

    if (mode == "DIGITAL_IN") {
        return (
            <MessagesContainer>
                <h3>{pin}</h3>
                <h4>Mode: {mode}</h4>
                <p>
                    Status: {(messages.slice(-1)[0].value ? "HIGH" : "LOW") ?? "Unknown"}
                </p>
            </MessagesContainer>
        )
    }



    return (
        <MessagesContainer>
                <h3>{pin}</h3>
                <h4>Mode: {mode}</h4>
                <Switch 
                    checked={switchState} 
                    onClick={() => {
                        send({
                            "pin": pin,
                            "value": !switchState
                        })
                        setSwitchState(!switchState)
                    }}
                />
        </MessagesContainer>
    )
}



const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-2);
    margin-top: 10px;
    border-radius: 15px;
    padding: 15px 10px;

    h3 {
        margin: 0;
        padding: 0;
        font-size: 2rem;
    }

    h4 {
        margin: 0;
        padding: 0;
        font-size: 1.5rem;
    }
`

const ItemUI = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-2);
    margin-top: 10px;
    border-radius: 15px;
`


export default DetailIO