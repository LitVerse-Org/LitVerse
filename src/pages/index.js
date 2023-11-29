
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
  }, []);

  return null; // you can also return some loading text here if you want
};

export default IndexPage;
