import ReactJson from "react-json-view";
import './Json.css'
import {Coin } from "../../interfaces.ts";
interface CoinInfoProps {
    coinInfo: Coin;
}
const Json = ({coinInfo}:CoinInfoProps) => {
    return (
        <div className={"Json"}>
            <ReactJson src={coinInfo} collapsed/>
        </div>
    )
}
export default Json;