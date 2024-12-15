import { useState } from 'react';

import { Stats } from '@/types/types';
import { fetchCardData } from '@/utils/api';
const useFetchStats = (abbreviation: string) => {
  const initialStats: Stats = {
    commons: '...',
    uncommons: '...',
    rares: '...',
    mythics: '...',
    total: '...',
  };

  const [stats, setStats] = useState<any>(initialStats);
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
        const fetchedStats = await fetchCardData(abbreviation);
        const formattedStats = stats
        formattedStats.commons = fetchedStats?.filter((card) => card.rarity === 'common').length
        formattedStats.uncommons = fetchedStats?.filter((card) => card.rarity === 'uncommon').length
        formattedStats.rares = fetchedStats?.filter((card) => card.rarity === 'rare').length
        formattedStats.mythics = fetchedStats?.filter((card) => card.rarity === 'mythic').length || 0
        formattedStats.total = formattedStats.commons + formattedStats.uncommons + formattedStats.rares + formattedStats.mythics
        setStats(formattedStats);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, statsVisible, handleFetchAllStats };
};

export default useFetchStats;
