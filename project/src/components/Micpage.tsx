import React from 'react';
import styles from './Micpage.module.css';

export default function MicPage() {
  return (
    <div className={styles.container}>
      <div className={styles.mic}>
        <i className={styles.micIcon}></i>
        <div className={styles.micShadow}></div>
      </div>
    </div>
  );
}
