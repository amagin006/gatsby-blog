import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import Layout from "../components/layout/"
// import Image from "../components/image"
import PostList from "../components/post-list"
import SEO from "../components/seo"

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <FontAwesomeIcon icon={faCoffee} />
    <h1>My blog</h1>
    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    <PostList postEdges={data.allMarkdownRemark.edges}/>
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
