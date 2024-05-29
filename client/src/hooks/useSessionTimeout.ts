import { useEffect } from 'react';

const useSessionTimeout = (sessionMaxAge: number | null) => {
  useEffect(() => {
    if (sessionMaxAge === null) return;

    const timeout = setTimeout(() => {
      window.location.reload();
    }, sessionMaxAge);

    console.log(`Page will refresh in ${sessionMaxAge / 1000 / 60 / 60} hours.`);

    return () => clearTimeout(timeout);
  }, [sessionMaxAge]);
};

export default useSessionTimeout;
