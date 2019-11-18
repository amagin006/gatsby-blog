import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout/"
import Hero from "../components/hero"
import PostList from "../components/post-list"
import SEO from "../components/seo"

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Hero />
    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    <PostList postEdges={data.allMarkdownRemark.edges} />
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            thumbnail {
              name
            }
          }
          excerpt
        }
      }
    }
  }
`
