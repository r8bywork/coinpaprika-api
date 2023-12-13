
export const ColumnsConfig = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterSearch: true,
        filterMode: "menu",
        onFilter: (value: string, record) => record.name.startsWith(value),
        // sorter: (a:string, b:string) => a.name.localeCompare(b.name),
    },
    {
        title: 'Symbol',
        dataIndex: 'symbol',
        key: 'symbol',
        sorter: (a:string, b:sring) => a.symbol.localeCompare(b.symbol),
    },
    {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
        sorter: (a:number, b:number) => a.rank - b.rank,
    },
    {
        title: 'Circulating Supply',
        dataIndex: 'circulating_supply',
        key: 'circulating_supply',
        sorter: (a:number, b:number) => a.circulating_supply - b.circulating_supply,
    },
    {
        title: 'Total Supply',
        dataIndex: 'total_supply',
        key: 'total_supply',
        sorter: (a:number, b:number) => a.total_supply - b.total_supply,
    },
    {
        title: 'Max Supply',
        dataIndex: 'max_supply',
        key: 'max_supply',
        sorter: (a:number, b:number) => a.max_supply - b.max_supply,
    },
    {
        title: 'Price (USD)',
        dataIndex: ['quotes', 'USD', 'price'],
        key: 'price_usd',
        sorter: (a:number, b:number) => a.quotes.USD.price - b.quotes.USD.price,
    },
    {
        title: 'Market Cap (USD)',
        dataIndex: ['quotes', 'USD', 'market_cap'],
        key: 'market_cap_usd',
        sorter: (a:number, b:number) => a.quotes.USD.market_cap - b.quotes.USD.market_cap,
    },
];
