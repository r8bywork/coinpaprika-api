
import {AutoComplete, Tabs} from "antd";
import Chart from "./components/Chart/Chart.tsx";
import Json from "./components/Json/Json.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import NormalView from "./components/NormalView/NormalView.tsx";
import {NormalViewProps} from "./interfaces.ts";
import Table from "./components/Table/Table.tsx";

interface CoinList{
 id: string;
 is_active: boolean;
 is_new: boolean;
 name: string;
 rank: number;
 symbol: string;
 type: string;
}

const App = () => {
  const [coins, setCoins] = useState<CoinList[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<{ id: string, name: string } | null>(null);
  const coinOptions = coins.map(coin => ({value: coin.id, label: coin.name}));
  const [coinInfo, setCoinInfo] = useState<NormalViewProps>()

  const fetchCoinInfo = async (coinId: string) => {
    const result = await axios.get(`http://localhost:5001/coin/${coinId}`);
    setCoinInfo(result.data)
    console.log(result.data)
  };

  // const fetchTableInfo = async () => {
  //   const result = await axios.get('http://localhost:5001/coins/table');
  //   setCoinInfo(result.data)
  //   console.log(result.data)
  // }

  useEffect(() => {
    const fetchCoins = async () => {
      await axios.get("http://localhost:5001/coins/table")
          .then(res => setCoins(res.data))
          .catch(err => console.error(err));
    }
    fetchCoinInfo('btc-bitcoin')
    fetchCoins()
  },[])

  useEffect(() => {
    console.log(coins)
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
          selected ? await fetchCoinInfo(selected.id) : null;
        }}
      />
      <Tabs defaultActiveKey="3" items={[
        {
          key: '0',
          label: 'Chart',
          children: <Chart selectedCoinId={selectedCoin?.id || ''}/>,
        },
        {
          key: '1',
          label: 'JsonView',
          children: <Json coinInfo={coinInfo}/>,
        },
        {
          key: '2',
          label: 'NormalView',
          children: <NormalView coin={coinInfo}/>,
        },
        {
          key: '3',
          label: 'Table',
          children: <Table coins={coins}/>,
        },
      ]} />
    </div>
  )
}

export default App;
