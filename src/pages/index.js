import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout/"
import PostList from "../components/post-list"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    return (
      <Layout title={this.props.data.site.siteMetadata.title} location={this.props.location}>
        <SEO title="Home" />
        <h4>{this.props.data.allMarkdownRemark.totalCount} Posts</h4>
        <PostList postEdges={this.props.data.allMarkdownRemark.edges} />
      </Layout>
    )
  }
}

export default BlogIndex;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
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
