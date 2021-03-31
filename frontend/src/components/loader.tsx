import React from 'react';
import styles from '../styles/loader.module.css';
function Loader() {
  return (
  <div className={styles.loader}>
    <img className={styles.loader__img} src="Loader/random_veryfast.gif"/>
    <div className={styles.loader__title}>
      정보를 받아오고 있습니다..
    </div>
  </div>
  
  );
};
      

export default Loader;