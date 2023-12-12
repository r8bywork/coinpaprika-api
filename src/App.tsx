
import {AutoComplete, Tabs} from "antd";
import Chart from "./components/Chart/Chart.tsx";
import Json from "./components/Json/Json.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import NormalView from "./components/NormalView/NormalView.tsx";
import {NormalViewProps} from "./interfaces.ts";

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
    const result = await axios.get(`http://localhost:5000/coin/${coinId}`);
    setCoinInfo(result.data)
    console.log(result.data)
  };

  useEffect(() => {
    const fetchCoins = async () => {
      await axios.get("http://localhost:5000/coins/list")
          .then(res => setCoins(res.data))
          .catch(err => console.error(err));
    }
    fetchCoins()
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
          selected ? await fetchCoinInfo(selected.id) : null;
        }}
      />
      <Tabs defaultActiveKey="0" items={[
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
      ]} />
    </div>
  )
}

export default App;
