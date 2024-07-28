import { useState, useEffect } from 'react';
import { fetchCardData } from '@/utils/api';
import { CardData } from '@/types/types';

const useFetchCardData = (setName: string) => {
  const [data, setData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchCardData(setName);
      if (fetchedData) {
        setData(fetchedData);
      } else {
        setError('Failed to fetch data');
      }
      setLoading(false);
    };

    fetchData();
  }, [setName]);

  return { data, loading, error };
};

export default useFetchCardData;
