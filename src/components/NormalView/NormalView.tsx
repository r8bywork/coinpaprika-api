import { AntDesignOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Collapse, List, Row, Spin, Tag, Tooltip } from 'antd';
import { v4 } from 'uuid';
import { Coin, TeamMember } from '../../interfaces.ts';
import Chart from '../Chart/Chart.tsx';
const { Panel } = Collapse;
interface NormalViewProps {
  coin: Coin | null;
  selectedCoin: { id: string; name: string };
}
const NormalView = ({ coin, selectedCoin }: NormalViewProps) => {
  return (
    <Row
      className={'centered md:flex-row flex-col'}
      gutter={50}
    >
      <Col
        md={8}
        xs={24}
        className={'md:order-first order-last'}
      >
        {coin && (
          <Card
            cover={
              <img
                alt={coin.name}
                style={{ width: 200 }}
                src={coin.logo}
              />
            }
          >
            <Card.Meta
              className={'pb-3'}
              avatar={<Avatar icon={<AntDesignOutlined />} />}
              title={coin.name}
              description={coin.description}
            />
            <div className={'mb-3'}>
              <p>{`Rank: ${coin.rank}`}</p>
              <p>{`Symbol: ${coin.symbol}`}</p>
            </div>
            <div className={'mb-3'}>
              <h3 className={'font-bold mb-1.5'}>Tags</h3>
              {coin.tags.map((tag) => (
                <Tooltip
                  title={`Coin Counter: ${tag.coin_counter}, ICO Counter: ${tag.ico_counter}`}
                  key={tag.id}
                >
                  <Tag
                    className={'cursor-pointer'}
                    color='blue'
                  >
                    {tag.name}
                  </Tag>
                </Tooltip>
              ))}
            </div>
            {coin.id.length > 0 && (
              <Collapse className={'mb-3'}>
                <Panel
                  header='Team'
                  key={v4()}
                >
                  <List
                    itemLayout='horizontal'
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
            )}
            <div className='mb-3'>
              <h3 className='font-bold'>Links</h3>
              {Object.entries(coin?.links).map(([key, values]) =>
                values.map((url, index) => (
                  <Button
                    href={url}
                    target='_blank'
                    rel='noreferrer'
                    key={`${key}-${index}`}
                    type='link'
                  >
                    {key}
                  </Button>
                )),
              )}
            </div>
            <p>Started at: {new Date(coin?.started_at).toLocaleDateString()}</p>
          </Card>
        )}
      </Col>
      <Col
        md={16}
        xs={24}
        className={'md:mt-0 mt-10'}
      >
        {selectedCoin ? (
          <Chart selectedCoinId={selectedCoin.id} />
        ) : (
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 24 }}
                spin
              />
            }
          />
        )}
      </Col>
    </Row>
  );
};

export default NormalView;
