import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import styles from './footer.module.scss'

const Footer = () => (
  <footer>
    <div className={styles.footerWrapper}>
      <div className={styles.homeLink}>
        <Link to='/'>
          <FontAwesomeIcon icon={faHome} /><span>HOME</span>
        </Link>
      </div>
      <div className={styles.copyRight}>
        © {new Date().getFullYear()}
        {` `}
        LittleByLittle All right reserved.
    </div>
    </div>
  </footer>
)


export default Footer;