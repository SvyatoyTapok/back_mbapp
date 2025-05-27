import express from 'express';
import { db } from './db.js';

const app = express();
const port = 3000;

app.use(express.json());


app.post('/', async (req, res) => {
  console.log(`Попытка входа с ключом: ${req.body.ApiKey}`, new Date().toLocaleString(), `IP: ${req.ip}`);
  try {
    const response = await db.execute('SELECT * FROM staff WHERE api_key = ?',
      [req.body.ApiKey]
    );
    if (response[0].length === 1) {
      res.status(200).json({ data: response[0][0] });
    }
    else {
      res.status(401).json({
        status: 'error',
        message: 'Invalid API key',
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});