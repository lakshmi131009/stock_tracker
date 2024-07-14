const axios = require('axios');
const path = require('path');
const Price = require(path.join(__dirname, '..', 'models', 'Price'));

let latestPrices = {};

const coins = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'dogecoin'];
const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`;

async function fetchPrices() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return {};
  }
}

async function savePricesToDB(prices) {
  for (const [coin, data] of Object.entries(prices)) {
    const price = new Price({
      coin: coin,
      price: data.usd
    });

    try {
      const savedPrice = await price.save();
      console.log(`Saved price for ${coin}: ${savedPrice}`);
    } catch (error) {
      console.error(`Error saving price for ${coin}:`, error);
    }
  }
}


function startPriceFetching() {
  setInterval(async () => {
    latestPrices = await fetchPrices();
    console.log('Prices updated:', latestPrices);
    await savePricesToDB(latestPrices);
  }, 60000);
}

function getLatestPrices() {
  return latestPrices;
}



async function checkLatestEntries() {
  try {
    const latestEntries = await Price.find().sort('-timestamp').limit(20);
    console.log('Latest entries:', latestEntries);
    return latestEntries;
  } catch (error) {
    console.error('Error checking latest entries:', error);
  }
}

async function getRecentStockData(coin) {
  try {
    const recentData = await Price.find({ coin: coin})
      .sort('-timestamp')
      .limit(20);
    return recentData;
  } catch (error) {
    console.error(`Error fetching recent data for ${stockSymbol}:`, error);
    
  }
}



module.exports = {
  startPriceFetching,
  getLatestPrices,
  checkLatestEntries,
  getRecentStockData,
};