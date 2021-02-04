const path = require('path');
const Animals = require('../models/animals');

module.exports.getAllAnimals = async (req, res) => {
  const animals = await Animals.getAllAnimals();
  return res.status(201).send(animals);
};

module.exports.getOneAnimalById = async (req, res) => {
  const animalId = parseInt(req.params.animalId, 10);
  const animal = await Animals.getOneAnimalById(animalId);
  return res.status(201).send(animal);
};

module.exports.getAllAnimalsFiltered = async (req, res) => {
  const animals = await Animals.getAllAnimalsFiltered(req);
  return res.status(201).send(animals);
};

module.exports.getAnimalImages = async (req, res) => {
  const images = await Animals.getAnimalImages(req);
  return res.status(201).send(images);
};
