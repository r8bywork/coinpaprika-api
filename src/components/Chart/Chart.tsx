
import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import axios from 'axios';
import { Button } from 'antd';
import './Chart.css'
type Timeframes = '1d' | '7d' | '30d';
const TIMEFRAMES: Timeframes[] = ['1d', '7d', '30d'];
interface ChartProps {
    selectedCoinId: string;
}
const Chart = ({selectedCoinId}:ChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);
    const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframes>('1d');

    useEffect(() => {
        if (!chartRef.current && chartContainerRef.current) {
            chartRef.current = createChart(chartContainerRef.current, { width: 600, height: 400 });
            seriesRef.current = chartRef.current.addLineSeries();
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:5001/coin/chart/${selectedCoinId}?start=${'2023-01-01'}&interval=${selectedTimeframe}`);
            const chartData = Object.values(result.data).map((entry: any) => {
                return {
                    time: new Date(entry.timestamp).getTime() / 1000,
                    value: entry.price
                };
            });
            seriesRef.current && seriesRef.current.setData(chartData as any);
        };
        fetchData();
    }, [selectedCoinId, selectedTimeframe]);

    return (
        <div className="Chart">
            {TIMEFRAMES.map((timeframe: Timeframes) => (
                <Button
                    key={timeframe}
                    type={selectedTimeframe === timeframe ? 'primary' : 'default'}
                    onClick={() => setSelectedTimeframe(timeframe)}
                >
                    {timeframe}
                </Button>
            ))}
            <div ref={chartContainerRef} className={"w600px h400px"}/>
        </div>
    )
}

export default Chart;
