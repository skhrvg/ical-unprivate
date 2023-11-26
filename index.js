import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.ICAL_UNPRIVATE_PORT || 80;

app.use(express.json());

app.all('/', async (req, res) => {
    const { endpoint } = req.query;

    if (!endpoint) {
        return res.status(400).json({ error: 'Missing endpoint parameter' });
    }

    try {
        const response = await axios.request({
            method: req.method,
            url: endpoint,
            headers: {
                ...req.headers,
                host: new URL(endpoint).host,
            },
        });
        const modifiedData = typeof response.data === 'string' ? response.data.replace(/CLASS:PRIVATE/g, 'CLASS:PUBLIC') : response.data;
        res.set(response.headers).send(modifiedData);
    } catch (error) {
        res.status(500).json({ error: 'Proxy error', details: error.message });
    }
});

app.listen(port, () => {
    console.log('iCal Unprivate proxy service is running');
});
