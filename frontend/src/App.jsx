import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Signup from './authPage/Signup';
import DisplayDoctors from './pages/DisplayDoctors';
import MiniNavbar from './components/MiniNavbar';
import './App.css'
import AddDoctors from './pages/AddDoctors';
import DetailsForm from './pages/DetailsForm';
import Home from './pages/Home';
import DeleteDoctor from './pages/DeleteDoctor';
import Login from './authPage/Login';
import useAuthContext from './hooks/useAuthContext';
import FilterComponent from './components/Filters';

export default function App() {
  const {user}= useAuthContext();
  const [errors, setErrors] = useState('');
  const [showMiniNav,SetShowMiniNav] = useState(false)
  const [doctorData, setDoctorData] = useState({
    userType: '',
    gender: '',
    firstName: '',
    lastName: '',
    designation: '',
    email: '',
    phone:'',
    DOB:'',
    doctor_type:'',
    status:'',
    
  })

  return (
  
      <>
        <BrowserRouter>
        <Navbar showMiniNav={showMiniNav} SetShowMiniNav={SetShowMiniNav} />
        {showMiniNav && <MiniNavbar /> }
        <Routes>
  
          <Route path="/" element={ <Home />} /> 
            <Route path="/signup" element={!user? <Signup /> : <Navigate to="/"/>} />
            <Route path="/login" element={!user? <Login />: <Navigate to="/"/>} />
          <Route path='/docs' element={user? <DisplayDoctors /> : <Navigate to="/login"/>}/>
          <Route path='/addDoctor' element={user? <AddDoctors doctorData={doctorData} setDoctorData={setDoctorData} errors={errors} setErrors={setErrors}  /> : <Navigate to="/login"/> }/>
          <Route path='/nextForm' element={user? <DetailsForm doctorData={doctorData} setDoctorData={setDoctorData} errors={errors} setErrors={setErrors} />: <Navigate to="/login"/>}/>
          <Route path='/deleteDoctor' element={user? <DeleteDoctor />: <Navigate to="/login"/>}/>
          <Route path="/filters" element={ <FilterComponent/>} /> 
          {/* <Route path='/patient' element={user? <DeleteDoctor />: <Navigate to="/login"/>}/>
          <Route path='/helpcenter' element={user? <DeleteDoctor />: <Navigate to="/login"/>}/>
       */}
            
        </Routes>
        </BrowserRouter>
      
      </>
    
  )
}
