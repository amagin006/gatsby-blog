import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import kebabCase from 'lodash/kebabCase'

import styles from './index.module.scss'

export default () => (
  <StaticQuery
    query={graphql`
      query tagQuery {
        allMarkdownRemark {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => (
      <div>
        <div className={styles.tagTitleText}>Tag一覧</div>
        <ul>
          {data.allMarkdownRemark.group.map(tag => (
            <li className={styles.tagList} key={tag.fieldValue} >
              <Link
                to={`/tags/${kebabCase(tag.fieldValue)}/`}
                className={styles.tagText}
              >
                <FontAwesomeIcon className={styles.tagIcon} icon={faTag} />{tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  />
)

