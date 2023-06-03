import React from 'react';

import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <section className={styles.root}>
      <h2>Не найдено!</h2>
      <p>К сожелению данная страница отсутствует, попбробуйте заново.</p>
    </section>
  );
}

export default NotFoundBlock;
