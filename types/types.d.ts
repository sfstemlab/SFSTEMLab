export interface Set {
  key: number;
  name: string;
  abbreviation: string;
  description?: string;
  icon: string;
  tags: string[];
  releaseDate: string;
  type: string;
}

export interface CardData {
  name: string;
  prices: {
      usd: string;
      eur: string;
      tix?: string;
  };
  set: string;
  related_uris: {
      edhrec: string;
  };
  rarity: string;
  cardImage: string | null;
  colors: string; 
  type_line: string;
  doubleFaced?: boolean;
}

interface Stats {
  commons: string;
  uncommons: string;
  rares: string;
  mythics: string;
  total: string;
}

export interface StatsDisplayProps {
  set: string;
  stats: Stats;
  loading: boolean;
  error: string | null;
}