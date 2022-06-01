'use strict';

//|> SEQUELIZE
const { Turn, Medic, Clinic } = require('../../db');

// based on controllersTurns/ PostTurn/GetTurn
async function validateTurnCollisions(
  infoTurn,
  TurnID = null, // for update options.
  Turns = [], // for Frontend redux-store
  officeHours = [] // for Frontend redux-store
) {
  //|> PRELOADS
  if (!Turns.length)
    Turns = (await Turn.findAll()).map(turn => turn.dataValues);

  if (TurnID) {
    const oldInfoTurn = (await Turn.findByPk(TurnID)).dataValues;
    infoTurn = {
      ...oldInfoTurn,
      ...infoTurn,
    };
  }

  if (!officeHours.length) {
    const getMedic = (await Medic.findByPk(infoTurn.MedicID)).dataValues;
    const getClinic = (await Clinic.findByPk(getMedic.ClinicID)).dataValues;
    officeHours = JSON.parse(getClinic.officeHours);
  }

  //|> ERRORS
  let validation = true;
  const Errors = {};

  //|> VALIDATIONS
  if (!validateTurn(infoTurn, Turns, officeHours)) validation = false;

  if (!validateTurnInOfficeHours(infoTurn, officeHours))
    Errors.officeHours = 'The turn is out of office hours.';

  if (!validateTurnBetweenTurnsInADAy(infoTurn, Turns))
    Errors.time = 'The turn time and duration collide with another turn.';

  //|> RESULTS
  if (Object.keys(Errors).length) validation = false;

  return [validation, Errors];
}

//|> VALIDATE TURN INTO OFFICE-HOURS
function validateTurnInOfficeHours(turn, officeHours) {
  const turnDay = new Date(turn.date).getUTCDay();
  const officeDay = officeHours[turnDay];
  const turnMin = turn.time;
  const turnMax = turn.time + turn.duration;

  for (let i = 0; i < officeDay.length; i++) {
    if (turnMin >= officeDay[i].min && turnMax <= officeDay[i].max) return true;
  }

  return false;
}

//|> VALIDATE TURN BETWEEN TURNS IN THE SAME DAY
function validateTurnBetweenTurnsInADAy(turn, turns) {
  for (let i = 0; i < turns.length; i++) {
    if (
      (turn.time >= turns[i].time ||
        turn.time + turn.duration > turns[i].time) &&
      turn.time < turns[i].time + turns[i].duration
    )
      return false;
  }

  return true;
}

//|> VALIDATE TURN
function validateTurn(turn, turns, officeHours) {
  turns = turns.filter(turnX => turnX.date === turn.date);

  if (!validateTurnInOfficeHours(turn, officeHours)) return false;
  if (!validateTurnBetweenTurnsInADAy(turn, officeHours)) return false;

  return true;
}

module.exports = { validateTurnCollisions };
