
import {ChangeEvent, useMemo, useState} from 'react';
import { Input, Table } from 'antd';
import { NormalViewProps } from '../../interfaces.ts';
import { ColumnsConfig } from "./TableConfig.ts";

interface TableProps {
    coins: NormalViewProps[];
}

const CoinTable = ({ coins }: TableProps) => {
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
            <Table rowKey={"id"} columns={ColumnsConfig} dataSource={filteredCoins} />
        </div>
    );
};

export default CoinTable;
