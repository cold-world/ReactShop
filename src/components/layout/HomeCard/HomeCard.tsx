import React, { memo } from 'react';
import Card from '../../ui/Card/Card';
import styles from './HomeCard.module.css';

type Props = {};

const HomeCard = (props: Props) => {
  return (
    <Card className={styles.card}>
      <h2>Everything you wanted to</h2>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>
          Quam eos eius consequuntur totam facilis omnis, deleniti provident eligendi vel libero
          deserunt vitae voluptatum animi saepe iure perferendis doloribus, alias repellat.
        </p>
      </div>
    </Card>
  );
};

export default memo(HomeCard);
