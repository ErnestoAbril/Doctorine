//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const { getMedic } = require('../controllers/controllersMedics/getMedic');
const { postMedic } = require('../controllers/controllersMedics/postMedic');
const { putMedic } = require('../controllers/controllersMedics/putMedic');
const { deleteMedic } = require('../controllers/controllersMedics/deleteMedic');

const { validateInfoUser } = require('../controllers/validators/User');
const { validateInfoMedic } = require('../controllers/validators/Medic');
const { validateModelID } = require('../controllers/validators/ModelID');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await getMedic());
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    await validateModelID('Medic', ID);
    res.status(200).json(await getMedic(ID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {
  const { infoUser, infoMedic, ClinicID } = req.body;

  try {
    await validateInfoUser('POST', infoUser);
    await validateInfoMedic('POST', infoMedic);
    res.status(200).json(await postMedic(infoUser, infoMedic, ClinicID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/:ID', async (req, res) => {
  const { ID } = req.params;
  const { infoUser, infoMedic, ClinicID } = req.body;

  try {
    await validateInfoUser('PUT', infoUser);
    await validateInfoMedic('PUT', infoMedic);
    await validateModelID('Medic', ID);
    await validateModelID('Clinic', ClinicID);
    res.status(200).json(await putMedic(ID, infoUser, infoMedic, ClinicID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    await validateModelID('Medic', ID);
    res.status(200).send(await deleteMedic(ID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

module.exports = router;
