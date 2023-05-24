import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../../components/Layout"
import MaxWidthContainer from "../../components/MaxWidthContainer"
import NavBar from "../../components/NavBar"
import IONodes from "../../components/IONodes"
// Import all reach router components
import { Router } from "@reach/router"



const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <NavBar />
      <MaxWidthContainer>
        <IONodes />
      </MaxWidthContainer>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home</title>
