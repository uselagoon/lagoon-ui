'use client';

import NotFound from './not-found';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  // 🤮 a hacky workaround to use the not-found.tsx in the SAME directory instead of a global one with notFound().
  console.error(error);
  return <NotFound />;
}
