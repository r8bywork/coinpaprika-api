type TagType = {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
}

export type TeamMember = {
    id: string;
    name: string;
    position: string;
}

type LinkType = {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
}

type LinkExtendedType = {
    url: string;
    type: string;
    stats?: {
        subscribers?: number;
        contributors?: number;
        stars?: number;
        followers?: number;
    }
}

type WhitepaperType = {
    link: string;
    thumbnail: string;
}

type Coin =  {
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
}

export interface NormalViewProps {
    coin: Coin;
}