/* const express = require('express');
const { analyzeImage } = require('../controllers/plantController');
const router = express.Router();

router.post('/analyze', analyzeImage);

module.exports = router;
   */

const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

router.get('/', plantController.getAllPlants);
router.get('/:class', plantController.getPlantByClass);
router.post('/', plantController.addPlant);
router.put('/:class', plantController.updatePlant);
router.delete('/:class', plantController.deletePlant);

module.exports = router;
