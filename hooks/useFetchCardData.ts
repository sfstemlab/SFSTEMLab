import { useState, useEffect } from 'react';
import { fetchCardData } from '@/utils/api';
import { CardData } from '@/types/types';

const useFetchCardData = (set: string) => {
  const [data, setData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchCardData(set);
      if (fetchedData) {
        setData(fetchedData);
      } else {
        setError('Failed to fetch data');
      }
      setLoading(false);
    };

    fetchData();
  }, [set]);

  return { data, loading, error };
};

export default useFetchCardData;
