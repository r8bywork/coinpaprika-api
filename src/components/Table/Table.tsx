
import {ChangeEvent, useMemo, useState} from 'react';
import { Input, Table } from 'antd';
import {CoinTable} from '../../interfaces.ts';
import { ColumnsConfig } from "./TableConfig.tsx";

interface TableProps {
    coins: CoinTable[];
    changeSelectedCoin: (coinId: string) => void;
}

const CoinTable = ({ coins, changeSelectedCoin}: TableProps) => {
    const [searchText, setSearchText] = useState('');
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const filteredCoins = useMemo(() => {
        if (!searchText) return coins;
        return coins.filter((coin) => coin.name.toLowerCase().includes(searchText.toLowerCase()));
    }, [searchText, coins]);

    return (
        <div>
            <Input
                type="text"
                placeholder="Search by name"
                value={searchText}
                onChange={handleSearch}
            />
            <Table rowKey={"id"} className={"cursor-pointer"} columns={ColumnsConfig} dataSource={filteredCoins} onRow={(record) => ({
                onClick: () => changeSelectedCoin(record.id),
            })} />
        </div>
    );
};

export default CoinTable;
