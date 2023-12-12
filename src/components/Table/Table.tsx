
import { Table } from 'antd';
import {NormalViewProps} from "../../interfaces.ts";
import {ColumnsConfig} from "./TableConfig.ts";

interface TableProps {
    coins: NormalViewProps;
}

const CoinTable = ({ coins }:TableProps) => {
    return <Table columns={ColumnsConfig} dataSource={coins} />;
};
export default CoinTable;
