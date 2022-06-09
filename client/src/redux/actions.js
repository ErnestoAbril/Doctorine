import axios from 'axios';
import Swal from 'sweetalert2'; //Esto tambien del login
export const ENTER_HOME = 'ENTER_HOME';
export const GET_PATIENT = 'GET_PATIENT';
export const POST_PATIENT = 'POST_PATIENT';
export const GET_STUDIES = 'GET_STUDIES';
export const GET_BUDGETS = 'GET_BUDGETS';
export const GET_BUDGETS_DNI = 'GET_BUDGETS_DNI';
export const GET_BUDGETS_NAME = 'GET_BUDGETS_NAME';
export const POST_BUDGET = 'POST_BUDGET';
export const ORDER_BUDGETS_BY_NAME_ASC = 'ORDER_BUDGETS_BY_NAME_ASC';
export const ORDER_BUDGETS_BY_NAME_DES = 'ORDER_BUDGETS_BY_NAME_DES';
export const ORDER_BUDGETS_BY_DATE_ASC = 'ORDER_BUDGETS_BY_DATE_ASC';
export const ORDER_BUDGETS_BY_DATE_DES = 'ORDER_BUDGETS_BY_DATE_DES';
export const ORDER_BUDGETS_BY_PRICE_ASC = 'ORDER_BUDGETS_BY_PRICE_ASC';
export const ORDER_BUDGETS_BY_PRICE_DES = 'ORDER_BUDGETS_BY_PRICE_DES';
export const FILTER_BUDGETS_BY_PENDING = 'FILTER_BUDGETS_BY_PENDING';
export const FILTER_BUDGETS_BY_COMPLETED = 'FILTER_BUDGETS_BY_COMPLETED';
export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export const UPDATE_MEDIC_INFO = 'UPDATE_MEDIC_INFO';
export const POST_MEDIC_LOGIN = 'POST_MEDIC_LOGIN';
export const POST_PATIENT_LOGIN = 'POST_PATIENT_LOGIN';
//export const GET_EVOLUTION = 'GET_EVOLUTION';
export const GET_EVOLUTIONS = 'GET_EVOLUTIONS';
export const POST_EVOLUTION = 'POST_EVOLUTION';
//export const GET_STUDY = 'GET_STUDY';
export const GET_PATIENT_NAME = 'GET_PATIENT_NAME';
export const GET_PATIENT_DNI2 = 'GET_PATIENT_DNI2';
export const GET_PATIENT_DNI = 'GET_PATIENT_DNI';

export const CLEAR = 'CLEAR';
export const POST_TURN = 'POST_TURN';
export const GET_TURNS = 'GET_TURNS';
export const GET_ALL_PATIENTS = 'GET_ALL_PATIENTS';
export const GET_CLINICAL_HISTORY = 'GET_CLINICAL_HISTORY';
export const POST_CLINICAL_HISTORY = 'POST_CLINICAL_HISTORY';
export const GET_CLINICAL_HISTORY_FOR_CREATE =
  'GET_CLINICAL_HISTORY_FOR_CREATE';
export const POST_CLINIC = 'POST_CLINIC';
export const GET_MEDICS = 'GET_MEDICS';
export const GET_TOOTH = 'GET_TOOTH';
//login
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const AUTH_SWITCH = 'AUTH_SWITCH';
export const GET_USERS = 'GET_USERS';
export const USER_TO_ADMIN = 'USER_TO_ADMIN';
export const DELETE_USER = 'DELETE_USER';
export const GET_SUCCESS = 'GET_SUCCESS';
export const GET_TREATMENTS = 'GET_TREATMENTS';

export function getUrlStudies(url) {
  return { type: 'POST_URL', payload: url };
}

export function getPatient(id) {
  return function (dispatch) {
    // return axios.get(`/recipes/?id=${id}`)
    //     .then(res => dispatch({ type: GET_PATIENT, payload: res.data }))
    //     .catch(error => {
    //         if (error.response.status === 404) return alert(error.response.data.msg)
    //         alert(error.message)
    //     })
  };
}

export function postPatient(patient) {
  return async function (dispatch) {
    try {
      const patientWithId = (await axios.post('/patients', patient)).data;
      return dispatch({ type: POST_PATIENT, payload: patientWithId });
    } catch (error) {
      if (error.response.status === 404) return alert(error.response.data.msg);
      alert(error.message);
    }
  };
}

export function getPatientDni(dni) {
  return { type: GET_PATIENT_DNI, payload: dni };
}

//export function getPatientDni(dni) {
// return async function (dispatch) { //Forma de buscar en el back
//   try {
//     const patient = (
//       await axios.get(`/patients?document=${dni}`)
//     ).data;
//     dispatch({ type: GET_PATIENT_DNI, payload: patient });
//   } catch (error) {
//     if (error.response.status === 404) return alert(error.response.data.msg);
//     alert(error.message);
//   }
// };
//}

export function getPatientName(name) {
  return { type: GET_PATIENT_NAME, payload: name };
}

export function getPatientDni2(dni) {
  return async function (dispatch) {
    try {
      const patient = (await axios.get(`/patients?document=${dni}`)).data;
      console.log(patient);
      dispatch({ type: GET_PATIENT_DNI2, payload: patient });
    } catch (error) {
      if (error.response.status === 404) return alert(error.response.data.msg);
      alert(error.message);
    }
  };
}

export function getAllPatients() {
  return function (dispatch) {
    return axios
      .get(`/patients`)
      .then(res => dispatch({ type: GET_ALL_PATIENTS, payload: res.data }))
      .catch(error => {
        if (error.response.status === 404)
          return alert(error.response.data.msg);
        alert(error.message);
      });
  };
}

export function getAllBudgets() {
  return function (dispatch) {
    return axios
      .get(`/Budgets`)
      .then(res => dispatch({ type: GET_BUDGETS, payload: res.data }))
      .catch(error => {
        if (error.response.status === 404)
          return alert(error.response.data.msg);
        alert(error.message);
      });
  };
}

export function getBudgetsDni(dni) {
  return { type: GET_BUDGETS_DNI, payload: dni };
}

export function getBudgetsName(name) {
  return { type: GET_BUDGETS_NAME, payload: name };
}

export function orderBudgetsByHigherPrice() {
  return { type: ORDER_BUDGETS_BY_PRICE_ASC };
}

export function orderBudgetsByLowerPrice() {
  return { type: ORDER_BUDGETS_BY_PRICE_DES };
}

export function orderBudgetsByRecentDate() {
  return { type: ORDER_BUDGETS_BY_DATE_ASC };
}

export function orderBudgetsByOlderDate() {
  return { type: ORDER_BUDGETS_BY_DATE_DES };
}

export function orderBudgetsByNameAsc() {
  return { type: ORDER_BUDGETS_BY_NAME_ASC };
}

export function orderBudgetsByNameDes() {
  return { type: ORDER_BUDGETS_BY_NAME_DES };
}

export function filterPendingBudgets() {
  return { type: FILTER_BUDGETS_BY_PENDING };
}

export function filterCompletedBudgets() {
  return { type: FILTER_BUDGETS_BY_COMPLETED };
}

export function postBudget(budget) {
  return async function (dispatch) {
    try {
      const { patientFullName, patientDocument, ...restOfBudget } = budget;
      const budgetWithID = (await axios.post('/Budgets', restOfBudget)).data;
      const { linkPayment } = (
        await axios.post('/payments/create_preference', budgetWithID)
      ).data;
      await axios.put('/Budgets', { ID: budgetWithID.ID, linkPayment });
      const frontBudget = {
        ...budgetWithID,
        linkPayment,
        patientFullName,
        patientDocument,
      };
      return dispatch({ type: POST_BUDGET, payload: frontBudget });
    } catch (error) {
      if (error.response.status === 404) return alert(error.response.data.msg);
      alert(error.message);
    }
  };
}

export function clear() {
  return {
    type: CLEAR,
  };
}

export function postTurn(payload) {
  return async function () {
    return axios.post(`/turn`, payload).catch(error => {
      if (error.response.status === 404) return alert(error.response.data.msg);
      alert(error.message);
    });
  };
}
export function postStudy(payload) {
  console.log(payload);
  return async function () {
    return axios.post(`/studies`, payload).catch(error => {
      if (error.response.status === 404) return alert(error.response.data.msg);
      alert(error.message);
    });
  };
}

//LOGIN
// export function userDelete(id) {
//   return async function (dispatch) {
//     await fetch('https://back-mode-parfum.herokuapp.com/deleteUser', { // Hay que actualizar el link del axios.
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(id),
//     });
//     dispatch({
//       type: DELETE_USER,
//       payload: id,
//     });
//   };
// }

export function getSuccess(payload) {
  return async function (dispatch) {
    let token2 = JSON.parse(window.localStorage.getItem('loggedToken'));
    try {
      console.log(token2.token);
      console.log(payload);
      const json = await axios.get('/success?payment_id=' + payload, {
        headers: {
          Authorization: `Bearer ${token2.token}`,
        },
      });
      // console.log('json',json)
      return dispatch({
        type: GET_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loginUser(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post('/login', payload);
      console.log(json.data);
      return dispatch({ type: LOGIN_USER, info: json.data });
    } catch (err) {
      console.log(err);
    }
  };
}

// export function logOut() {
//   return { type: LOGOUT_USER };
// }
// export function login() {
//   return { type: LOGIN_USER };
// }

export function postPasswordReset(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post('/passwordReset', payload);
      if (response.data.error) {
        console.log('ESTO ES RESPONSE: ', response.data);
        return Swal.fire({
          icon: 'error',
          title: response.data.error,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Go check your email!',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function postNewPassword(payload) {
  console.log('PAYLOAD: ', payload);
  return async function (dispatch) {
    try {
      const response = await axios.post('/newPassword', payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function authSwitch() {
  return {
    type: AUTH_SWITCH,
  };
}

export function getUsers() {
  return async function (dispatch) {
    const users = await axios.get('/allUsers');
    return dispatch({
      type: GET_USERS,
      payload: users.data,
    });
  };
}

export function getTurns() {}

export function home(selectedHome) {
  return {
    type: ENTER_HOME,
    payload: selectedHome,
  };
}

export function getClinicalHistory(id) {
  return async function (dispatch) {
    return axios
      .get(`/clinicalhistories/search?id=${id}`)
      .then(res => dispatch({ type: GET_CLINICAL_HISTORY, payload: res.data }))
      .catch(error => {
        if (error.response.status === 404)
          return alert(error.response.data.msg);
        alert(error.message);
      });
  };
}

export function getEvolutions(patientID) {
  return async dispatch => {
    try {
      const evolution = (await axios.get(`/evolutions?PatientID=${patientID}`))
        .data;
      return dispatch({ type: GET_EVOLUTIONS, payload: evolution });
    } catch (error) {
      if (error.response.status === 404) return alert(error.response.data.msg);
      alert(error.message);
    }
  };
}

export function postEvolution(evolution) {
  return async function (dispatch) {
    try {
      const evolutionWithID = (await axios.post('/evolutions', evolution)).data;
      toast.success('Evolution created sucesfully');
      return dispatch({
        type: POST_EVOLUTION,
        payload: evolutionWithID.Evolution,
      });
    } catch (error) {
      return toast.error('Error adding evolution');
      // if (error.response.status === 404) return alert(error.response.data.msg);
      // alert(error.message);
    }
  };
}

export function getStudies(patientID) {
  return async dispatch => {
    try {
      const study = (await axios.get(`/studies/search?id=${patientID}`)).data;
      return dispatch({ type: GET_STUDIES, payload: study });
    } catch (error) {
      if (error.response.status === 404) return alert(error.response.data.msg);
      alert(error.message);
    }
  };
}

export function postClinicalHistory(payload) {
  return async function () {
    try {
      return await axios.post('/clinicalhistories', payload);
    } catch (error) {
      console.log(error);
    }
  };
}

export function postClinic(clinic) {
  return async function () {
    try {
      return await axios.post('/Clinics', clinic);
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTreatments() {
  return async function (dispatch) {
    try {
      const treatments = (await axios.get('/treatments')).data;
      return dispatch({ type: GET_TREATMENTS, payload: treatments });
    } catch (e) {
      console.log(e);
      alert(e.response.data.error);
    }
  };
}

export function getMedics() {
  return async function (dispatch) {
    try {
      const medics = (await axios.get('/medics')).data;
      return dispatch({ type: GET_MEDICS, payload: medics });
    } catch (e) {
      console.log(e);
      alert(e.response.data.error);
    }
  };
}

export function getTooth() {
  return async function (dispatch) {
    try {
      const tooth = (await axios.get('/tooth')).data;
      return dispatch({ type: GET_TOOTH, payload: tooth });
    } catch (e) {
      console.log(e);
      alert(e.response.data.error);
    }
  };
}

export function updatePatient(ID, infoPatient, infoUser) {
  return async function (dispatch) {
    return axios
      .put(`/patients/${ID}`, {
        ID: ID,
        infoUser: infoUser,
        infoPatient: infoPatient,
      })
      .then(res => dispatch({ type: UPDATE_PATIENT, payload: res.data }))
      .catch(error => {
        if (error.response.status === 404)
          return alert(error.response.data.msg);
        alert(error.message);
      });
  };
}

export function postMedicLogin({ infoUser, infoMedic, ClinicID }) {
  return async function (dispatch) {
    try {
      const medics = (
        await axios.post('/medics', { infoUser, infoMedic, ClinicID })
      ).data;
      return dispatch({ type: POST_MEDIC_LOGIN, payload: medics });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPatientLogin({ infoUser, infoPatient }) {
  return async function (dispatch) {
    try {
      const patient = (await axios.post('/patients', { infoUser, infoPatient }))
        .data;
      return dispatch({ type: POST_PATIENT_LOGIN, payload: patient });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postCLinic(clinic) {
  return async function (dispatch) {
    try {
      await axios.post('/Clinics', clinic);
      return dispatch({ type: POST_CLINIC, payload: clinic });
    } catch (error) {
      console.log(error);
    }
  };
}
const clinicWithID = (await axios.post('/Clinics', clinic)).data;
export function getTurns() {
  return async function (dispatch) {
    try {
      const turns = (await axios.get('/turns')).data;
      return dispatch({ type: GET_TURNS, payload: turns });
    } catch (err) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };
}

export function postTurn(payload) {
  return async function () {
    return axios.post(`/turns`, payload).catch(error => {
      if (error.response.status === 404) return alert(error.response.data.msg);
      alert(error.message);
    });
  };
}

// ERROR: YA EXISTIA!!!
// export function postTurn(payload) {
//   return async function (dispatch) {
//     try {
//       const turn = (await axios.post('/turns', payload)).data;
//       return dispatch({ type: POST_TURN, payload: turn });

//       //payload:
//       //   {
//       //     "date": "2022-06-06",
//       //     "time": 9,
//       //     "duration": 1,
//       //     "description": "NEW TURN",
//       //     "PatientID": 1,
//       //     "MedicID": 1
//       // }
//     } catch (error) {
//       console.log(error);
//       if (error.response.status === 404) return alert(error.response.data.msg);
//     }
//   };
// }

export function getInfoClinic() {
  // (officeHours, turnStandardDuration)
  return async function (dispatch) {
    try {
      const clinics = (await axios.get('/Clinics')).data;
      return dispatch({ type: GET_INFO_CLINIC, payload: clinics });
    } catch (e) {
      console.log(e);
      alert(e.response.data.error);
    }
  };
}

export function deleteTurn(id) {
  return {
    type: DELETE_TURN,
    payload: id,
  };
}
export function updateMedic(infoMedic, infoUser, ClinicID, ID) {
  return async function (dispatch) {
    try {
      const medics = (
        await axios.put(`/medics/${ID}`, { infoUser, infoMedic, ClinicID })
      ).data;
      return dispatch({ type: UPDATE_MEDIC_INFO, payload: medics });
    } catch (error) {
      console.error(error);
    }
  };
}
