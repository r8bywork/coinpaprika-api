import { AutoComplete, Tabs } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalWindow from './components/ModalWindow/ModalWindow.tsx';
import NormalView from './components/NormalView/NormalView.tsx';
import Table from './components/Table/Table.tsx';
import { Coin, CoinTable } from './interfaces.ts';

interface SelectedCoin {
  id: string;
  name: string;
}

const App = () => {
  const [coins, setCoins] = useState<CoinTable[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<SelectedCoin>({
    id: 'btc-bitcoin',
    name: 'bitcoin',
  });
  const coinOptions = coins.map((coin) => ({ value: coin.id, label: coin.name }));
  const [coinInfo, setCoinInfo] = useState<Coin>();
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [tags, setTags] = useState<{ name: string; id: string }[]>([]);

  const fetchCoinInfo = async (coinId?: string) => {
    await axios
      .get(`https://api.coinpaprika.com/v1/coins/${coinId || 'btc-bitcoin'}`)
      .then((response) => {
        setCoinInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCoinsAndTags = async () => {
    const coinsResponse = await axios.get('https://api.coinpaprika.com/v1/tickers');
    const tagsResponse = await axios.get('https://api.coinpaprika.com/v1/tags/', {
      params: {
        additional_fields: 'coins',
      },
    });

    const coins: CoinTable[] = coinsResponse.data;
    const tags = tagsResponse.data;

    const mergedData = coins.map((coin) => {
      const coinTags = tags.filter((tag: { coins: string }) => tag.coins.includes(coin.id));
      return {
        ...coin,
        tags: coinTags,
      };
    });

    setCoins(mergedData);
    setTags(tags);
  };

  useEffect(() => {
    fetchCoinsAndTags();
  }, []);

  useEffect(() => {
    fetchCoinInfo(selectedCoin.id);
  }, [selectedCoin]);

  const changeSelectedCoin = (coinId: string) => {
    const selected = coins.find((coin) => coin.id === coinId);
    if (selected) {
      setSelectedCoin({ id: selected.id, name: selected.name });
      setActiveTab('0');
    }
  };

  return (
    <div className='App'>
      <ModalWindow
        visible={visible}
        setVisible={setVisible}
      />
      {!visible && (
        <>
          <AutoComplete
            style={{ width: 250 }}
            options={coinOptions}
            placeholder='Coin Name'
            filterOption={(inputValue: string, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={(value: string) => {
              changeSelectedCoin(value);
            }}
          />
          {selectedCoin && coinInfo && (
            <Tabs
              onChange={setActiveTab}
              activeKey={activeTab}
              items={[
                {
                  key: '0',
                  label: 'NormalView',
                  children: (
                    <NormalView
                      selectedCoin={selectedCoin}
                      coin={coinInfo}
                    />
                  ),
                },
                {
                  key: '1',
                  label: 'Table',
                  children: (
                    <Table
                      tags={tags}
                      changeSelectedCoin={changeSelectedCoin}
                      coins={coins}
                    />
                  ),
                },
              ]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
