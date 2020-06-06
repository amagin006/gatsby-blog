import React from 'react';
import styles from './index.module.scss';

const Tags = ({ tags }) => {
  if (tags) {
    return tags.sort().map(tag => {
      let tagClass;
      switch (tag) {
        case 'React':
          tagClass = styles.react;
          break;
        case 'Gatsby':
          tagClass = styles.gatsby;
          break;
        case 'React Native':
          tagClass = styles.react_native;
          break;
        case 'VSCode':
          tagClass = styles.vscode;
          break;
        default:
          break;
      }
      const className = `${styles.tagDefalut} ${tagClass}`;
      return (
        <div key={tag} className={className}>
          {tag}
        </div>
      );
    });
  }
  return null;
};

export default Tags;
