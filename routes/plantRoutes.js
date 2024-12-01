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
// Route untuk mendapatkan tanaman berdasarkan nama penyakit
router.get('/disease/:disease_name', plantController.getPlantByDiseaseName);
// Route untuk mendapatkan tanaman berdasarkan nama tanaman
router.get('/name/:plant_name', plantController.getPlantByName);
router.post('/', plantController.addPlant);
router.put('/:class', plantController.updatePlant);
router.delete('/:class', plantController.deletePlant);

module.exports = router;
