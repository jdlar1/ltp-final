import React from "react"


import { Link } from "gatsby"
import styled from "styled-components"

import MaxWidthContainer from "./MaxWidthContainer"


const LINKS = [
    {
        to: "/",
        text: "Dispositivos",
    },
    {
        to: "/io",
        text: "Entradas/Salidas",
    }
]


const NavBar = () => {
    return (
        <>
            <Contaniner>
                <MaxWidthContainer>
                    <StyledUl>
                        {LINKS.map((link, index) => (
                            <NavComponent key={index} to={link.to} text={link.text} />
                        ))}
                    </StyledUl>
                </MaxWidthContainer>
            </Contaniner>
        </>
    )
}

const NavComponent = ({ to, text }: { to: string, text: string }) => {
    return (
        <NavItem>
            <StyledLink to={to}>{text}</StyledLink>

        </NavItem>
    )
}

const NavItem = styled.li`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`


const StyledUl = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    height: 100%;
    gap: 20px;
`


const StyledLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    font-size: 1.8rem;
    border-radius: 5px;
    padding: 5px 10px;
    transition: all 0.3s ease-in-out;


    &:hover {
        background-color: var(--color-4);
        color: var(--color-1);
    }
`


const Contaniner = styled.nav`
    display: flex;
    justify-content: center;
    background-color: var(--color-3);
    padding: 5px 0;
`

export default NavBar