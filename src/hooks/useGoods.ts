import { useEffect, useState } from 'react';
import { readItems } from '@directus/sdk';
import client from '../lib/directus';

interface Good {
  id: number;
  [key: string]: unknown;
}

export function useGoods() {
  const [goods, setGoods] = useState<Good[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .request(readItems('goods'))
      .then((data) => setGoods(data as Good[]))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { goods, loading, error };
}
