import {Card, Avatar, Tag, List, Collapse} from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import {NormalViewProps, TeamMember} from "../../interfaces.ts";
const {Panel} = Collapse;
import {v4} from "uuid"
const NormalView = ({ coin }:NormalViewProps) => {
    return (
        <div className={"centered"}>
        <Card cover={<img alt={coin.name} style={{width: 200}} src={coin.logo} />}>
            <Card.Meta
                avatar={<Avatar icon={<AntDesignOutlined />} />}
                title={coin.name}
                description={coin.description}
            />
            <div className={"mb-3"}>
                <p>{`Rank: ${coin.rank}`}</p>
                <p>{`Symbol: ${coin.symbol}`}</p>
            </div>
            <div className={"mb-3"}>
                <h3 className={"font-bold mb-1.5"}>Tags</h3>
                {coin.tags.map(tag => (
                    <Tag color="blue" key={tag.id}>{tag.name}</Tag>
                ))}
            </div>

            <Collapse className={"mb-3"}>
                {/*<Panel header={"Tags"} key={v4()}>*/}
                {/*    {coin.tags.map(tag => (*/}
                {/*        <Tag color="blue" key={tag.id}>{tag.name}</Tag>*/}
                {/*    ))}*/}
                {/*</Panel>*/}
                <Panel header="Team" key={v4()}>
                    <List
                        itemLayout="horizontal"
                        dataSource={coin.team}
                        renderItem={(member: TeamMember) => (
                            <List.Item key={member.id}>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<AntDesignOutlined />} />}
                                    title={member.name}
                                    description={member.position}
                                />
                            </List.Item>
                        )}
                    />
                </Panel>
            </Collapse>
            <div className={"mb-3"}>
                <h3 className={"font-bold"}>Links</h3>
                {coin.links.website.map((url, index) => (
                    <a href={url} target="_blank" rel="noreferrer" key={index}>Website</a>
                ))}
                {coin.links.source_code.map((url, index) => (
                    <a href={url} target="_blank" rel="noreferrer" key={index}>Source Code</a>
                ))}
                {coin.links.youtube.map((url, index) => (
                    <a href={url} target="_blank" rel="noreferrer" key={index}>YouTube</a>
                ))}
            </div>
            <p>Started at: {new Date(coin.started_at).toLocaleDateString()}</p>
       </Card>
        </div>
    )
}

export default NormalView;
