const db = require('../db');

const getAllAnimals = async () => {
  const allAnimals = db.query('SELECT * from animals');
  return allAnimals;
};

const getOneAnimalById = async (req) => {
  const oneAnimal = db.query('SELECT * from animals WHERE id = ?', [req]);
  return oneAnimal;
};

const getAllAnimalsFiltered = async (req) => {
  // console.log('req.query : ', req.query);
  let sqlBasic = 'SELECT * FROM animals';
  let sqlQuery = '';
  const reqQuery = req.query;
  const queryArray = [];
  const queryArrayValues = [];

  for (const query in reqQuery) {
    if (reqQuery[query] !== '') {
      queryArray.push(query);
    }
  }

  if (queryArray.length !== 0) {
    sqlQuery += ' WHERE ';
    if (queryArray[0] === 'age') {
      sqlQuery += `${queryArray[0]} <= ?`;
    } else {
      sqlQuery += `${queryArray[0]} = ?`;
    }

    queryArrayValues.push(req.query[queryArray[0]]);
    for (let i = 1; i < queryArray.length; i += 1) {
      if (queryArray[i] === 'age') {
        sqlQuery += ` AND ${queryArray[i]} <= ?`;
      } else {
        sqlQuery += ` AND ${queryArray[i]} = ?`;
      }
      queryArrayValues.push(req.query[queryArray[i]]);
    }
  }

  sqlBasic += sqlQuery;

  // console.log('sqlBasic', sqlBasic);

  const allAnimals = db.query(sqlBasic, queryArrayValues);
  //   const allAnimals = db.query('SELECT * FROM animals WHERE sex = ?', [
  //     'Femelle',
  //   ]);
  return allAnimals;
};

const getAnimalImages = async (req) => {
  const animalImages = db.query(
    'SELECT image1, gallery1, gallery2, gallery3, gallery4, gallery5 from animals WHERE id = ?',
    [parseInt(req.params.animalId, 10)]
  );
  return animalImages;
};

const createAnimalInDatabase = async (newAttributes) => {
  const {
    name,
    sex,
    birthday,
    color,
    race,
    vaccine,
    tatoo,
    health1,
    health2,
    temper1,
    temper2,
    temper3,
    temper4,
  } = newAttributes;

  console.log('new attributes', newAttributes);
  const adoptionDepositDate = new Date(Date.now());

  function getAge(date) {
    const newDate = new Date(date);
    const diff = Date.now() - newDate.getTime();
    const age = new Date(diff);

    console.log('dateNow', Date.now());
    console.log('date.getTime', newDate.getTime());

    return Math.abs(age.getUTCFullYear() - 1970);
  }
  const age = getAge(birthday);

  let medical = 'Sans';
  if (temper1 || temper2) {
    medical = 'Avec';
  }

  const res = await db.query(
    'INSERT INTO animals (name, sex, birthday, age, color, race, vaccine, tatoo, health1, health2, medical, temper1, temper2, temper3, temper4, adoptionDepositDate ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )',
    [
      name,
      sex,
      birthday,
      age,
      color,
      race,
      vaccine,
      tatoo,
      health1,
      health2,
      medical,
      temper1,
      temper2,
      temper3,
      temper4,
      adoptionDepositDate,
    ]
  );

  return { name, id: res.insertId };
};

module.exports = {
  getAllAnimals,
  getAllAnimalsFiltered,
  getAnimalImages,
  getOneAnimalById,
  createAnimalInDatabase,
};
