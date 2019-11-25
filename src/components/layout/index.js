import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Footer from '../footer'
import Header from '../header'
import Sidebar from '../sidebar'
import styles from './layout.module.scss'

const Layout = ({ title, location, children }) => {
  let hero;
  let rootPath = `/`;
  const isRoot = location.pathname === rootPath;
  if (isRoot) {
    hero = (
      <div className={styles.header_container}>
        <div className={styles.header_container__inner}>
          <h2 className={styles.blog_title_area}>
            <Link
              className={styles.blog_title}
              to={'/'}
            >LittleByLittle</Link>
          </h2>
        </div>
      </div>
    );
  }
  return (
    <>
      <Header siteTitle={title} />
      <div className={styles.bodyWrapper}>
        {hero}
        <div className={styles.bodyContainer}>
          <main>{children}</main>
          <aside><Sidebar /></aside>
        </div>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
