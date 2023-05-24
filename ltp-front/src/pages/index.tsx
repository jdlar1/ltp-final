import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import MaxWidthContainer from "../components/MaxWidthContainer"
import MainDeviceCard from "../components/MainDeviceCard"
import NetDevices from "../components/NetDevices"
import NavBar from "../components/NavBar"


const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <NavBar />
      <MaxWidthContainer>
        <MainDeviceCard />
        <NetDevices />
      </MaxWidthContainer>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home</title>
