import React from 'react';
import styles from './Banner.module.css';

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className={styles.banner}>
      <img
        src='https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80'
        alt='banner'
      />
    </div>
  );
};

export default Banner;
