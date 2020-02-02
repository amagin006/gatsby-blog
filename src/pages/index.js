import React from "react"
import { graphql, Link } from 'gatsby'

import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout/"
import PostList from "../components/post-list"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    return (
      <Layout title={this.props.data.site.siteMetadata.title} location={this.props.location}>
        <SEO title="Home" />
        <PostList postEdges={this.props.data.allMarkdownRemark.edges} />
        <ul>
          {this.props.data.allMarkdownRemark.group.map(tag => (
            <li key={tag.fieldValue} >
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Layout >
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            tags
            thumbnail {
              name
            }
          }
          excerpt(truncate: true, pruneLength: 60)
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
