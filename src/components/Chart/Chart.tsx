import { Button } from 'antd';
import axios from 'axios';
import { IChartApi, ISeriesApi, LineData, Time, createChart } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import './Chart.css';

type Timeframes = '1d' | '7d' | '30d';
const TIMEFRAMES: Timeframes[] = ['1d', '7d', '30d'];

interface ChartProps {
  selectedCoinId: string;
}

interface ChartData {
  time: number;
  value: number;
}

interface Entry {
  timestamp: string;
  price: number;
}

const Chart = ({ selectedCoinId }: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframes>('1d');

  const initChart = () => {
    if (!chartRef.current && chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        height: 400,
      });
      seriesRef.current = chartRef.current.addLineSeries();
    }
  };

  useEffect(initChart, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.coinpaprika.com/v1/tickers/${selectedCoinId}/historical?start=2023-01-01&interval=${selectedTimeframe}`,
      );
      const chartData: ChartData[] = (Object.values(result.data) as Entry[]).map((entry: Entry) => {
        return {
          time: new Date(entry.timestamp).getTime() / 1000,
          value: entry.price,
        };
      });
      seriesRef.current && seriesRef.current.setData(chartData as LineData<Time>[]);
    };

    fetchData();
  }, [selectedCoinId, selectedTimeframe]);

  return (
    <div className='Chart'>
      {TIMEFRAMES.map((timeframe: Timeframes) => (
        <Button
          key={timeframe}
          type={selectedTimeframe === timeframe ? 'dashed' : 'default'}
          onClick={() => setSelectedTimeframe(timeframe)}
        >
          {timeframe}
        </Button>
      ))}
      <div
        ref={chartContainerRef}
        className={'w600px h400px'}
      />
    </div>
  );
};

export default Chart;
