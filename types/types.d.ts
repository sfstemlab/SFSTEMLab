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

export interface CardProps {
  rarity?: string;
  cardName: string;
  cardImage: string | null;
  cardArt?: string;
  cardTreatment?: string;
  prices: {
      usd: string;
      eur: string;
      tix: string;
  };
  setCode?: string;
  edhrec_link: string;
}

export interface CardData {
  name: string;
  prices: {
      usd: string;
      eur: string;
      tix: string;
  };
  set: string;
  related_uris: {
      edhrec: string;
  };
  rarity: string;
  cardImage: string;
}

export interface Stats {
  commons: string;
  uncommons: string;
  rares: string;
  mythics: string;
  total: string;
}

interface StatsDisplayProps {
  stats: Stats;
  loading: boolean;
  error: string | null;
}



export interface CardImageProps {
  cardImage: string | null;
  cardName: string;
  edhrec_link: string;
  doubleFaced: boolean;
  flipCard: () => void;
}

export interface CardInfoProps {
  cardName: string;
  cardArt?: string;
  cardTreatment?: string;
  prices: {
      usd: string;
      eur: string;
      tix: string;
  };
  setCode?: string;
}

export interface SetCardHeaderProps {
  name: string;
  abbreviation: string;
  type: string;
  releaseDate: string;
  description?: string;
  icon: string;
  tags: string[];
}