import Link from 'next/link';

import { Client404 } from '../components/404/404Client';
import styles from '../styles/404.module.css';

export default function NotFound() {
  return (
    <section className={styles.notfound}>
      <Client404 navLink={<Link href="/projects">Return To Projects</Link>} />
    </section>
  );
}
