import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>My blog</h1>
    <h4>{data.allMarkdownRemark.totalCount} Post</h4>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <span>
          {node.frontmatter.title}{" "}
            - {node.frontmatter.date}
        </span>
        <p>{node.excerpt}</p>
      </div>
    ))}
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export const query = graphql`
    query {
      allMarkdownRemark {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
            }
            
          }
        }
      }
    }
`

export default IndexPage
