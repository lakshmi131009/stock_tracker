const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');
const { getRecentStockData } = require('../controllers/priceController');


router.get('/', priceController.home);
router.get('/api/prices', priceController.getLatestPrices);
router.get('/prices', priceController.displayPrices);
router.get('/check-latest', priceController.checkLatestEntries);
router.get('/api/stock/:stock', getRecentStockData);

module.exports = router;