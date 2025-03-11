const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

app.get('/get-instagram-followers', async (req, res) => {
  const username = req.query.username;
  const response = await fetch(`https://www.instagram.com/${username}/`);
  const html = await response.text();
  
  const regex = /"edge_followed_by":{"count":(\d+)}/;
  const match = html.match(regex);
  
  if (match) {
    const followers = match[1];
    res.json({ followers });
  } else {
    res.status(404).json({ error: 'Followers not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
