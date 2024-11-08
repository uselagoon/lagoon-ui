import { NotFoundGoBack } from '@/components/404/NotFoundGoBack';

import styles from '../../../../styles/404.module.css';

export default function NotFound() {
  return (
    <section className={styles.notfound}>
      <NotFoundGoBack title="Bulk Deployment not found" />
    </section>
  );
}
