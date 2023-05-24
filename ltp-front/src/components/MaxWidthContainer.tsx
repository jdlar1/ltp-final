import React from "react"
import styled from "styled-components"

interface Props {
    children: React.ReactNode
}

const MaxWidthContainer = ({ children }: Props) => {
  return <MaxWidth>{children}</MaxWidth>
}

const MaxWidth = styled.div`
  align-self: center;
  max-width: 1100px;
  margin: 0 15px;
  width: clamp(calc(100vw - 30px), calc(100vw - 30px), 1100px)
`

export default MaxWidthContainer