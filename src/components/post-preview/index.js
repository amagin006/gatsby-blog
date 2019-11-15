import React from 'react';
import { Link } from 'gatsby'

import Image from '../image';
import styles from './index.module.css';


class PostPreview extends React.Component {
  render() {
    const {
      slug,
      title,
      excerpt,
      thumbnail,
    } = this.props.post;

    return (
      <article key={slug} className={styles.content}>
        <Link className={styles.title_link} to={slug}>
          <div className={styles.content_thumbnail}>
            <Image
              className={styles.content_thumbnail_image}
              filename={thumbnail.name}
              alt={'thumbnail'}
            />
          </div>
          <div className={styles.content_post_info}>
            <h3 className={styles.title} >
                {title}
            </h3>
            <p
              className={styles.content_text}
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          </div>
        </Link>
      </article>
    );
  }
}

export default PostPreview;