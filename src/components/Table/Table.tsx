
import {ChangeEvent, useMemo, useState} from 'react';
import { Input, Table } from 'antd';
import {CoinTable} from '../../interfaces.ts';
import { columnsConfig } from "./TableConfig.tsx";

interface TableProps {
    coins: CoinTable[];
    changeSelectedCoin: (coinId: string) => void;
    tags: [];
}

const CoinTable = ({ coins, changeSelectedCoin, tags}: TableProps) => {
    console.log(coins)
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
            <Table rowKey={"id"} className={"cursor-pointer"} columns={columnsConfig(tags)} dataSource={filteredCoins} onRow={(record) => ({
                onClick: () => changeSelectedCoin(record.id),
            })} />
        </div>
    );
};

export default CoinTable;
