//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const { getPatients, getPatientById } = require('../controllers/getPatient');
const { postPatient } = require('../controllers/postPatient');
const { putPatient } = require('../controllers/putPatient');
const { deletePatient } = require('../controllers/deletePatient');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await getPatients(req.query));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    res.status(200).json(await getPatientById(ID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {
  const { infoUser, infoPatient } = req.body;

  try {
    await postPatient(infoUser, infoPatient);

    res.status(200).send('Patient created.');
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/:ID', async (req, res) => {
  const { ID } = req.params;
  const { infoUser, infoPatient } = req.body;

  try {
    await putPatient(ID, infoUser, infoPatient);

    res.status(200).send('Patient modified.');
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
    res.status(200).send(await deletePatient(ID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

module.exports = router;
