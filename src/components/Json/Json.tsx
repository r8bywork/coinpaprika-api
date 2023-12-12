import ReactJson from "react-json-view";
import './Json.css'
import {NormalViewProps} from "../../interfaces.ts";
interface CoinInfoProps {
    coinInfo: NormalViewProps;
}
const Json = ({coinInfo}:CoinInfoProps) => {
    return (
        <div className={"Json"}>
            <ReactJson src={coinInfo} collapsed/>
        </div>
    )
}
export default Json;