const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

router.get('/', plantController.getAllPlants);
router.get('/:class', plantController.getPlantByClass);
// router.post('/', plantController.addPlant);
// router.put('/:class', plantController.updatePlant);
// router.delete('/:class', plantController.deletePlant);

module.exports = router;
