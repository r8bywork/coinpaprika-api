import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const port = 5000;

app.get('/coins/list', async (req, res) => {
    const result = await axios.get('https://api.coinpaprika.com/v1/coins')
    return res.json(result.data);
});


app.get('/coin/:id', async (req, res) => {
    const result = await axios.get(`https://api.coinpaprika.com/v1/coins/${req.params.id}`)
    return res.json(result.data);
});
app.use(express.json());

app.get('/coin/chart/:id', async (req, res) => {
    const id = req.params.id;
    const {start, interval} = req.query;
    const result = await axios.get(`https://api.coinpaprika.com/v1/tickers/${id}/historical?start=${start || '2023-01-01'}&interval=${interval}`)
    return res.json(result.data)
});

app.listen(port, () => console.log(`Server running on port ${port}`));
