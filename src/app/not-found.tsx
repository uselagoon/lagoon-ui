import Link from 'next/link';

import { Client404 } from '../components/404/404Client';
import styles from '../styles/404.module.css';

/**
 * The global not found page - can be overridden by specific error components in src/components/errors
 */
export default function NotFound() {
  return (
    <section className={styles.notfound}>
      <Client404 navLink={<Link href="/projects">Return To Projects</Link>} />
    </section>
  );
}
