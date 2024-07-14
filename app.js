const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const priceRoutes = require('./routes/priceRoutes');
const { startPriceFetching } = require('./services/priceService');

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

// Connect to MongoDB
const m_url = 'mongodb://localhost/crypto_prices';
mongoose.connect(m_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Routes
app.use('/', priceRoutes);

// Start fetching prices
startPriceFetching();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});