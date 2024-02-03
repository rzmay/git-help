import { useRouter } from 'next/router';
import React from 'react';
import useUser from './useUser';

export default function useLogin(requireAccount) {
  const router = useRouter();
  const user = useUser();

  React.useEffect(() => {
    if (user.error?.response.status === 401) {
      router.push('/login');
    }

    if (user && requireAccount && !user.accounts?.length) {
      router.push('/onboarding');
    }
  }, [user, router, requireAccount]);
}
