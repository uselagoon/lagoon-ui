import Link from 'next/link';

import styles from '../../../styles/error.module.css';

export default async function AuthErrorPage(props: { searchParams: Promise<{ error?: string }> }) {
  const params = await props.searchParams;

  const { error } = params;

  return (
    <section className={styles.authErr}>
      <h2>Auth Error</h2>

      {error && error !== 'undefined' ? <p>Error type: {error}</p> : <p>You might be offline</p>}

      <Link href="/projects">Return To Projects</Link>
    </section>
  );
}
