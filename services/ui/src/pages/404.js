import Head from 'next/head';
import Link from 'next/link';
import StatusLayout from 'layouts/StatusLayout';

// Statically generated 404 page
export default function FourOhFour() {
  return <>
    <StatusLayout>
      <Head>
        <title>404 Page Not Found | Lagoon</title>
      </Head>
      <h1>404 - Page Not Found</h1>
         <Link href="/projects">
      <a>
        Go back home
      </a>
    </Link>
    </StatusLayout>
  </>
}