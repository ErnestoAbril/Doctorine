import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LandingPage from './landingPage';
import Home from './dentist/home';
import RegisterPatient from './dentist/home/navbar/register patient/';
import Calendar from './dentist/home/calendar';
import Budget from './dentist/home/budget';
import PatientHome from './patient/home';
import SearchComponent from './dentist/home/SearchComponent/SearchComponent';
import PatientDetails from './sharedComponents/PatientDetails/PatientDetails';
////LOGIN
import SignUp from './Components/SignUp/SignUp.jsx';
//import SignIn from './Components/SignIn/SignIn.jsx';
import PasswordReset from './Components/PasswordReset/PasswordReset.jsx';
import NewPassword from './Components/NewPassword/NewPassword';
import ClinicalHistory from './dentist/home/navbar/detail/clinic-history/get';
import RegisterDoctor from './dentist/home/navbar/RegisterDoctor/RegisterDoctor';

function App() {
  console.log('renderice app');
  const homeToShow = useSelector(state => state.homeToShow);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* RUTAS LOGIN */}
        {/* <Route path="/" element={<SignIn />} /> */}
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/newPassword" element={<NewPassword />} />
        {homeToShow === 'medic' ? (
          <Route path="/home" element={<Home />}>
            <Route path="/home/" element={<SearchComponent />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="budget" element={<Budget />} />
            <Route path="register" element={<RegisterPatient />} />
            <Route path="/home/:patientID" element={<PatientDetails />} />
            <Route path="clinical-history/:id" element={<ClinicalHistory />} />
            <Route path="Doctor" element={<RegisterDoctor />} />
          </Route>
        ) : (
          <Route path="/home" element={<PatientHome />} />
        )}
      </Routes>
    </div>
  );
}

// path Home: del odontologo

export default App;
