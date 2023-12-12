
import { Card, Avatar, Tag, List } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

type TagType = {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
}

type TeamMember = {
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

interface NormalViewProps {
    coin: Coin;
}
const NormalView = ({ coin }:NormalViewProps) => {
    return (
        <div className={"centered"}>
        <Card cover={<img alt={coin.name} style={{width: 200}} src={coin.logo} />}>
            <Card.Meta
                avatar={<Avatar icon={<AntDesignOutlined />} />}
                title={coin.name}
                description={coin.description}
            />

            <p>{`Rank: ${coin.rank}`}</p>
            <p>{`Symbol: ${coin.symbol}`}</p>

            <h3>Tags</h3>
            {coin.tags.map(tag => (
                <Tag color="blue" key={tag.id}>{tag.name}</Tag>
            ))}

            <h3>Team</h3>
            <List
                itemLayout="horizontal"
                dataSource={coin.team}
                renderItem={(member: Member) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={<AntDesignOutlined />} />}
                            title={member.name}
                            description={member.position}
                        />
                    </List.Item>
                )}
            />

            <h3>Links</h3>
            {coin.links.website.map((url, index) => (
                <a href={url} target="_blank" rel="noreferrer" key={index}>Website {index+1}</a>
            ))}
            {coin.links.source_code.map((url, index) => (
                <a href={url} target="_blank" rel="noreferrer" key={index}>Source Code {index+1}</a>
            ))}
            {coin.links.youtube.map((url, index) => (
                <a href={url} target="_blank" rel="noreferrer" key={index}>YouTube {index+1}</a>
            ))}

            <p>Started at: {new Date(coin.started_at).toLocaleDateString()}</p>
       </Card>
        </div>
    )
}

export default NormalView;
