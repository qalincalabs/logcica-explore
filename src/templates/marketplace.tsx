import React from "react"
import { graphql } from "gatsby"

export default function MarketplaceTemplate({ data }: any) {
  const marketplace = data.marketplace
  const stalls = data.stalls.nodes
  return (
      <div>
        <h1>{marketplace.name}</h1>
        <section>
          <h2>Étals</h2>
          <ul>
          {stalls.map((stall: any) => (
            <li>{stall.name}</li>
          ))}
          </ul>
        </section>
      </div>
  )
}

export const query = graphql`
  query ($id: String!) {
    marketplace: mongodbCounter(_id: { eq: $id }) {
        _id
        name
    }
    stalls: allMongodbCounter(filter: {marketplace: { eq: $id }}){
      nodes {
        _id
        name
      }
    }
  }
`;


/*
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
*/
