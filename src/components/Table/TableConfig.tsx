import { Tag } from "antd";
import { CoinTable } from "../../interfaces.ts";

export const columnsConfig = (
	parsedTags: { text: string; value: string }[]
) => [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		sorter: (a: CoinTable, b: CoinTable) => a.name.localeCompare(b.name),
	},
	{
		title: "Symbol",
		dataIndex: "symbol",
		key: "symbol",
		sorter: (a: CoinTable, b: CoinTable) => a.symbol.localeCompare(b.symbol),
	},
	{
		title: "Rank",
		dataIndex: "rank",
		key: "rank",
		sorter: (a: CoinTable, b: CoinTable) => a.rank - b.rank,
	},
	{
		title: "Circulating Supply",
		dataIndex: "circulating_supply",
		key: "circulating_supply",
		sorter: (a: CoinTable, b: CoinTable) =>
			a.circulating_supply - b.circulating_supply,
	},
	{
		title: "Total Supply",
		dataIndex: "total_supply",
		key: "total_supply",
		sorter: (a: CoinTable, b: CoinTable) => a.total_supply - b.total_supply,
	},
	{
		title: "Max Supply",
		dataIndex: "max_supply",
		key: "max_supply",
		sorter: (a: CoinTable, b: CoinTable) => a.max_supply - b.max_supply,
	},
	{
		title: "Price (USD)",
		dataIndex: ["quotes", "USD", "price"],
		key: "price_usd",
		sorter: (a: CoinTable, b: CoinTable) =>
			a.quotes.USD.price - b.quotes.USD.price,
	},
	{
		title: "Market Cap (USD)",
		dataIndex: ["quotes", "USD", "market_cap"],
		key: "market_cap_usd",
		sorter: (a: CoinTable, b: CoinTable) =>
			a.quotes.USD.market_cap - b.quotes.USD.market_cap,
	},
	{
		title: "Tags",
		dataIndex: "tags",
		key: "tags",
		render: (tags: { id: string; name: string }[]) => (
			<>
				{tags.map((tag) => (
					<Tag color="blue" key={tag.id}>
						{tag.name}
					</Tag>
				))}
			</>
		),
		filters: [...parsedTags],
		filterSearch: true,
		// onFilter: (value: string, record: CoinTable) =>
		//     record.tags.some(tag => tag.id === value),
		// onFilter: (value: string, record: CoinTable) =>
		// 	record.tags.some((tag) => tag.id === value),
	},
];
