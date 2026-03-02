'use client';

import { useEffect } from 'react';
import LuxuryError from '@/components/ui/luxury-error';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <LuxuryError
      variant="500"
      title="Something went wrong!"
      message="An unexpected error occurred. Please try again or contact support if the problem persists."
      onRetry={reset}
      showRetry={true}
      showHome={true}
      showBack={false}
    />
  );
}
