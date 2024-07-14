const { getLatestPrices } = require('../services/priceService');
const { checkLatestEntries } = require('../services/priceService');
const { getRecentStockData } = require('../services/priceService');
const path = require('path');
const Price = require(path.join(__dirname, '..', 'models', 'Price'));

exports.home = (req, res) => {
  res.send('<h1>Welcome to my Node.js App!</h1><p>hellllo.</p>');
};

exports.getLatestPrices = (req, res) => {
  res.json(getLatestPrices());
};

exports.displayPrices = (req, res) => { 
  const latestPrices = getLatestPrices();
  let html = '<h1>Latest Cryptocurrency Prices</h1><ul>';

  for (const [coin, data] of Object.entries(latestPrices)) {
    html += `<li>${coin}: $${data.usd}</li>`;
  }

  html += '</ul>';
  res.send(html);
};



 exports.checkLatestEntries = async (req, res) => {
    try {
      const latestEntries = await checkLatestEntries();
      res.json(latestEntries);
    } catch (error) {
      console.error('Error in checkLatestEntries controller:', error);
      res.status(500).json({ error: 'An error occurred while fetching the latest entries' });
    }
  };

  exports.getRecentStockData = async (req, res) => {
    const { stock } = req.params;
    
    try {
      const recentData = await getRecentStockData(stock);
      res.json(recentData);
    } catch (error) {
      console.error('Error in getRecentStockData controller:', error);
      res.status(500).json({ error: 'An error occurred while fetching recent stock data' });
    }
  };