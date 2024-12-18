'use client';

import styles from '../styles/error.module.css';

export default function GlobalError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <section className={styles.error}>
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
        </section>
      </body>
    </html>
  );
}
