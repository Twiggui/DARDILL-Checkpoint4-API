const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const animalsController = require('../controllers/animals');

// router.get('/', asyncHandler(animalsController.getAllAnimals));

router.get('/', asyncHandler(animalsController.getAllAnimalsFiltered));
router.get('/:animalId', asyncHandler(animalsController.getOneAnimalById));

module.exports = router;
