//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLER
const {
  getAllClinics,
  getClinicById,
  createClinic,
} = require('../controllers/clinic');

//|> RUTE

//#region <>-------------------- GET --------------------<>
// const {} = require('./controllersGET');

router.get('/', async (req, res) => {
  try {
    let allClinics = await getAllClinics();
    return res.status(200).json(allClinics);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    let clinic = await getClinicById(id);
    res.status(200).json(clinic);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//#endregion
//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {
  try {
    await createClinic(req.body);
    res.status(201).json({ msg: 'successfully created clinic' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//#endregion
module.exports = router;
