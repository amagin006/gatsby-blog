import React from "react";
// import PropTypes from 'prop-types';
import PostPreveiew from '../post-preview'
import styles from "./index.module.scss"

class Postlist extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        thumbnail: postEdge.node.frontmatter.thumbnail,
        excerpt: postEdge.node.excerpt,
        id: postEdge.node.id,
        slug: postEdge.node.fields.slug
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div className={styles.postWrapper}>
        {postList.map(post => (
          <PostPreveiew
            key={post.id}
            post={post}
          />
        ))}
      </div>
    );
  }
}
export default Postlist;