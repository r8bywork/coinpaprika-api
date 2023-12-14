
import {AutoComplete, Tabs} from "antd";
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
  const [selectedCoin, setSelectedCoin] = useState<SelectedCoin | null>({id: "btc-bitcoin", name:"bitcoin"});
  const coinOptions = coins.map(coin => ({value: coin.id, label: coin.name}));
  const [coinInfo, setCoinInfo] = useState<Coin>()
  const fetchCoinInfo = (coinId: string) => {
    axios.get(`http://localhost:5001/coin/${coinId}`)
      .then(response => {
        setCoinInfo(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const fetchCoins = async () => {
    await axios.get("http://localhost:5001/coins/table")
        .then(response => {
          setCoins(response.data)
        })
        .catch(error => {
          console.error(error)
        });
  };

  useEffect(() => {
      Promise.all([
          fetchCoinInfo('btc-bitcoin'),
          fetchCoins(),
      ]).catch(e => console.log('Error fetching data:', e));
  },[])

  useEffect(() => {
    console.log(selectedCoin)
  }, [coins, selectedCoin]);

  return (
    <div className="App">
      <AutoComplete
        style={{ width: 250 }}
        options={coinOptions}
        placeholder="Coin Name"
        filterOption={(inputValue: string, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onSelect={async (value: string) => {
          const selected = coins.find((coin) => coin.id === value) || null;
          setSelectedCoin(selected);
          selected ? fetchCoinInfo(selected.id) : null;
        }}
      />
      <Tabs defaultActiveKey="1" items={[
        {
          key: '0',
          label: 'JsonView',
          children: coinInfo && <Json coinInfo={coinInfo}/>,
        },
        {
          key: '1',
          label: 'NormalView',
          children: <NormalView selectedCoin={selectedCoin} coin={coinInfo}/>,
        },
        {
          key: '2',
          label: 'Table',
          children: <Table coins={coins}/>,
        },
      ]} />
    </div>
  )
}

export default App;
