import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './index.module.scss';

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <div className={styles.headerWrapper}>
      <h1 className={styles.title}>
        <Link to='/'>{siteTitle}</Link>
      </h1>
      <div className={styles.subTitle}>step by step from tiny things</div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
