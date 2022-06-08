import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './AddBudget.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTreatments,
  getAllPatients,
  postBudget,
} from '../../../redux/actions';
import Treatment from '../Treatment/Treatment';

export function AddBudget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const treatments = useSelector(state => state.treatments);
  const filledTreatments = !!treatments.length;
  const patients = useSelector(state => state.allPatients);
  const filledPatients = !!patients.length;
  const [data, setData] = useState({
    treatments: [],
    discount: null,
    totalPrice: 0,
    patient: {},
  });
  const [treatmentSelected, setTreatmentSelected] = useState({
    quantity: 1,
    treatment: {},
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!filledPatients) dispatch(getAllPatients());
    if (!filledTreatments) dispatch(getTreatments());
  }, []);

  const validate = () => {
    const errors = {};
    if (
      data.treatments.length === 0 &&
      Object.keys(treatmentSelected.treatment).length === 0
    ) {
      errors.treatments = 'A Treatment is required for the budget';
    }
    if (Object.keys(data.patient).length === 0) {
      errors.patient = 'A Patient is required for the budget';
    }
    return errors;
  };

  const handleSelectPatient = e => {
    const { name, value } = e.target;
    if (Object.keys(data.patient).length > 0) {
      alert('You have already selected a patient');
    } else {
      const patient = patients.find(p => p.Patient.ID === value * 1);
      setData({
        ...data,
        [name]: patient,
      });
    }
  };

  const handleDeletePatient = () => {
    setData({
      ...data,
      patient: {},
    });
  };

  const handleSelectTreatment = e => {
    const treatment = treatments.find(t => t.ID === e.target.value);
    const { ClinicID, ...restOfTreatment } = treatment;
    setTreatmentSelected({
      ...treatmentSelected,
      treatment: restOfTreatment,
    });
  };

  const handleMinus = ID => {
    let i = null;
    let newSubTotal = 0;
    let modTreatments = data.treatments.map((t, index) => {
      if (t.ID === ID) {
        if (t.quantity === 1) {
          i = index;
          newSubTotal = t.price;
          t = 'delete me';
        } else {
          t.quantity -= 1;
          t.subTotalPrice -= t.price;
          newSubTotal = t.price;
        }
      }
      return t;
    });
    if (i !== null) {
      console.log(newSubTotal);
      modTreatments = modTreatments.filter(
        (t, index) => index !== i && t !== 'delete me'
      );
    }
    setData({
      ...data,
      totalPrice: data.totalPrice - newSubTotal,
      treatments: modTreatments,
    });
  };
  const handlePlus = ID => {
    let newSubTotal = 0;
    const modTreatments = data.treatments.map(t => {
      if (t.ID === ID) {
        t.quantity += 1;
        t.subTotalPrice += t.price;
        newSubTotal = t.price;
      }
      return t;
    });
    setData({
      ...data,
      totalPrice: data.totalPrice + newSubTotal,
      treatments: modTreatments,
    });
  };

  const handleQuantity = e => {
    setErrors(validate());
    setTreatmentSelected({
      ...treatmentSelected,
      quantity: e.target.value * 1,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
    setErrors(validate());
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      console.log(e.target);
      e.target[2].selectedIndex = 0;
      console.log(e.target[3]);

      const subTotalPrice =
        treatmentSelected.quantity * treatmentSelected.treatment.price;
      const treatmentReady = {
        ...treatmentSelected.treatment,
        quantity: treatmentSelected.quantity,
        subTotalPrice,
      };
      setData({
        ...data,
        totalPrice: data.totalPrice + subTotalPrice,
        treatments: [...data.treatments, treatmentReady],
      });
    } else {
      alert(
        'Please select a patient and select a treatment before adding it to the budget'
      );
    }
    console.log(data);
  };

  const handleSent = () => {
    setErrors(validate());
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      console.log('Hurra');

      const { patient, totalPrice, ...restOfData } = data;
      console.log(patient);
      const patientID = patient.Patient.ID;
      const patientDocument = patient.document;
      const patientFullName = patient.fullName;
      const jsonTreatments = JSON.stringify(restOfData.treatments);
      const readyBudget = {
        patientID,
        patientDocument,
        totalPrice: totalPrice + '',
        patientFullName,
        ...restOfData,
        treatments: jsonTreatments,
      };
      console.log(readyBudget);
      dispatch(postBudget(readyBudget));
      navigate('/home/budget');
    } else {
      alert('Please complete the budget before creating it');
    }
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label}>Select Patient</label>
        <select
          name="patient"
          onChange={handleSelectPatient}
          className={s.casillas}
        >
          <option hidden value="">
            Select a Patient
          </option>
          {filledPatients ? (
            patients.map(p => (
              <option key={p.ID} value={p.Patient.ID} className={s.casillas}>
                {p.fullName}
              </option>
            ))
          ) : (
            <h3>Loading Patients...</h3>
          )}
        </select>
        {errors.patient && <p className={s.err}>{errors.patient}</p>}

        {Object.keys(data.patient).length > 0 && (
          <div>
            <h4>Selected Patient</h4>
            <button onClick={handleDeletePatient}>❌</button>
            <h3>{data.patient.fullName}</h3>
          </div>
        )}

        <label className={s.label}>Treatments</label>
        <select
          name="treatmentSelected"
          onChange={handleSelectTreatment}
          className={s.casillas}
        >
          <option hidden value="">
            Select Treatment
          </option>
          {filledTreatments ? (
            treatments.map(t => (
              <option key={t.ID} value={t.ID} className={s.casillas}>
                {t.description}
              </option>
            ))
          ) : (
            <h3>Loading Treaments...</h3>
          )}
        </select>
        {errors.treatments && <p className={s.err}>{errors.treatments}</p>}
        <label className={s.label}>Quantity</label>
        <input
          type="number"
          name="quantity"
          onChange={handleQuantity}
          value={treatmentSelected.quantity}
          className={s.casillas}
          min="1"
        />
        <input
          type="submit"
          value="Add treatment to Budget"
          className={s.btn}
        />
      </form>
      <div className={s.summary_container}>
        <h3>Budget Summary</h3>
        {Object.keys(data.patient).length > 0 && (
          <div className={s.patient_details}>
            <p>
              Patient Name: <span>{data.patient.name}</span>
            </p>
            <p>
              Patient LastName: <span>{data.patient.lastName}</span>
            </p>
            <p>
              Patient Age: <span>{data.patient.age}</span>
            </p>
            <p>
              Patient Document: <span>{data.patient.document}</span>
            </p>
            <p>
              Patient Cellphone: <span>{data.patient.cellphone}</span>
            </p>
            <p>
              Patient Medical Service:
              <span> {data.patient.Patient.medicalService}</span>
            </p>
          </div>
        )}
        <div className={s.list}>
          <div className={s.name_container}>
            <h4>Treatment</h4>
            <h4>Price</h4>
            <h4>Quantity</h4>
            <h4>Sub-Total</h4>
          </div>
          {console.log('test')}
          {console.log(data)}
          {data.treatments.length > 0 ? (
            data.treatments.map(t => (
              <Treatment
                key={t.ID}
                ID={t.ID}
                description={t.description}
                price={t.price}
                quantity={t.quantity}
                subTotalPrice={t.subTotalPrice}
                handleMinus={handleMinus}
                handlePlus={handlePlus}
              />
            ))
          ) : (
            <h3>No treatments added</h3>
          )}
        </div>
        <div className={s.totalPrice}>
          <h3>
            Total Price <span>{data.totalPrice}</span>
          </h3>
        </div>
        <div>
          <button onClick={handleSent}>Create Budget</button>
        </div>
      </div>
    </div>
  );
}
