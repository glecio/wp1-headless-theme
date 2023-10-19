import {gql} from "@apollo/client"
import client from "client"
import { BlockRenderer } from "components/BlockRenderer/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

export default function Home(props) {
  console.log('props:', props)
  return (
    <div>
      <BlockRenderer blocks={props.blocks} />
    </div>
  )
}

export const getStaticProps = async() => {
  const {data} = await client.query ({
    query: gql`
    query GetHomePage {
      nodeByUri(uri: "/") {
        ... on Page {
          id
          blocks
        }
      }
    }`
  })

  return {
    props: {
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks)
    }
  }
}