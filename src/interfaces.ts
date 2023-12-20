type TagType = {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
};

export type TeamMember = {
  id: string;
  name: string;
  position: string;
};

type LinkType = {
  explorer: string[];
  facebook: string[];
  reddit: string[];
  source_code: string[];
  website: string[];
  youtube: string[];
};

type LinkExtendedType = {
  url: string;
  type: string;
  stats?: {
    subscribers?: number;
    contributors?: number;
    stars?: number;
    followers?: number;
  };
};

type WhitepaperType = {
  link: string;
  thumbnail: string;
};

export type Coin = {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: TagType[];
  team: TeamMember[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: LinkType;
  links_extended: LinkExtendedType[];
  whitepaper: WhitepaperType;
  first_data_at: string;
  last_data_at: string;
};

export interface NormalViewProps {
  coin: Coin;
}

export interface CoinTable {
  id: string;
  name: string;
  symbol: string;
  beta_value: number;
  circulating_supply: number;
  first_data_at: string;
  last_updated: string;
  max_supply: number;
  rank: number;
  total_supply: number;
  tags: { id: string; name: string }[];
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
