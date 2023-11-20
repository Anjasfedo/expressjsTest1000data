const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let dummyData = [];

app.get('/api/data', (req, res) => {
  try {
    // Read data from MOCK_DATA.json
    const rawData = fs.readFileSync('MOCK_DATA.json');
    dummyData = JSON.parse(rawData);

    // Handle search query
    const searchTerm = req.query.search;
    if (searchTerm) {
      const filteredData = dummyData.filter(item =>
        item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      res.json(filteredData);
    } else {
      res.json([]); // If no search term, return an empty array
    }
  } catch (error) {
    console.error('Error reading MOCK_DATA.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
