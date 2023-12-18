
import {AutoComplete, Tabs, Modal, Input, Button} from "antd";
import Json from "./components/Json/Json.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import NormalView from "./components/NormalView/NormalView.tsx";
import {Coin, CoinTable} from "./interfaces.ts";
import Table from "./components/Table/Table.tsx";

interface SelectedCoin {
    id: string;
    name: string;
}
const App = () => {
  const [coins, setCoins] = useState<CoinTable[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<SelectedCoin>({id: "btc-bitcoin", name:"bitcoin"});
  const coinOptions = coins.map(coin => ({value: coin.id, label: coin.name}));
  const [coinInfo, setCoinInfo] = useState<Coin>()
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("2");
  const [tags, setTags] = useState()
  const fetchCoinInfo = async (coinId?: string) => {
    await axios.get(`https://api.coinpaprika.com/v1/coins/${coinId || 'btc-bitcoin'}`)
      .then(response => {
        setCoinInfo(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchCoinsAndTags = async () => {
      const coinsResponse = await axios.get(`https://api.coinpaprika.com/v1/tickers`);
      const tagsResponse = await axios.get(`https://api.coinpaprika.com/v1/tags/`, {
          params: {
              additional_fields: 'coins'
          }
      });
  
      const coins = coinsResponse.data;
      const tags = tagsResponse.data;
  
      const mergedData = coins.map(coin => {
          const coinTags = tags.filter(tag => tag.coins.includes(coin.id));
          return {
              ...coin,
              tags: coinTags
          };
      });
  
      setCoins(mergedData);
  };
  
  useEffect(() => {
      fetchCoinsAndTags()
  }, [])

  useEffect(() => {
      fetchCoinInfo(selectedCoin.id);
  }, [selectedCoin])

  const handleSubmitPassword = () => {
        if (password !== "matrix2023") return;
        setVisible(false);
  };

  const changeSelectedCoin = (coinId: string) => {
    const selected = coins.find((coin) => coin.id === coinId);
    if (selected) {
        setSelectedCoin({ id: selected.id, name: selected.name });
        setActiveTab("1")
    }
  };

  return (
    <div className="App">
      <Modal
          title="Please enter password"
          open={visible}
          closable={false}
          maskClosable={false}
          onOk={handleSubmitPassword}
          footer={null}
      >
        <Input.Password
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPressEnter={handleSubmitPassword}
        />
        <Button
            onClick={handleSubmitPassword}
            disabled={!password}
        >
            Submit
        </Button>
      </Modal>
      {!visible && (
        <>
        <AutoComplete
          style={{ width: 250 }}
          options={coinOptions}
          placeholder="Coin Name"
          filterOption={(inputValue: string, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={(value: string) => {
            changeSelectedCoin(value);
          }}
        />
        {selectedCoin && coinInfo && <Tabs onChange={setActiveTab} activeKey={activeTab} items={[
            {
                key: '0',
                label: 'JsonView',
                children: <Json coinInfo={coinInfo}/>,
            },
            {
                key: '1',
                label: 'NormalView',
                children: <NormalView selectedCoin={selectedCoin} coin={coinInfo}/>,
            },
            {
                key: '2',
                label: 'Table',
                children: <Table changeSelectedCoin={changeSelectedCoin} coins={coins}/>,
            },
        ]} />}
        </>
      )}
    </div>
  )
}

export default App;
