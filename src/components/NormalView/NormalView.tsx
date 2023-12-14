import {Card, Avatar, Tag, List, Collapse} from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import {Coin, TeamMember} from "../../interfaces.ts";
const {Panel} = Collapse;
import {v4} from "uuid"
interface NormalViewProps {
    coin: Coin;
}
const NormalView = ({ coin }: NormalViewProps) => {
    return (
        <div className={"centered"}>
        <Card cover={<img alt={coin.name} style={{width: 200}} src={coin.logo} />}>
            <Card.Meta
                className={"pb-3"}
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

            {coin.team.length > 0 && <Collapse className={"mb-3"}>
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
            </Collapse>}
            <div className="mb-3">
              <h3 className="font-bold">Links</h3>
              {
               Object.entries(coin?.links).map(([key, values]) => (
                  values.map((url, index) => (
                      <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          key={`${key}-${index}`}
                          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
                  {key}
                  </a>
                  ))
               ))
              }
            </div>
            <p>Started at: {new Date(coin?.started_at).toLocaleDateString()}</p>
       </Card>
        </div>
    )
}

export default NormalView;
