import { useState } from 'react';
import { fetchAllStats } from '@/utils/api';
import { Stats } from '@/types/types';

const useFetchStats = (abbreviation: string) => {
  const initialStats: Stats = {
    commons: '...',
    uncommons: '...',
    rares: '...',
    mythics: '...',
    total: '...',
  };

  const [stats, setStats] = useState<Stats>(initialStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const handleFetchAllStats = async () => {
    if (statsVisible) {
      setStatsVisible(false);
      return;
    }
    setLoading(true);
    setStatsVisible(true);
    try {
      const fetchedStats = await fetchAllStats(abbreviation);
      setStats(fetchedStats);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, statsVisible, handleFetchAllStats };
};

export default useFetchStats;
