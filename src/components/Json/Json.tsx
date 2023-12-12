import ReactJson from "react-json-view";
import './Json.css'
interface CoinInfoProps {
    coinInfo: never[];
}
const Json = ({coinInfo}:CoinInfoProps) => {
    return (
        <div className={"Json"}>
            <ReactJson src={coinInfo} collapsed/>
        </div>
    )
}
export default Json;