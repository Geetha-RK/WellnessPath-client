import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Doctors from './pages/Doctors/Doctors'
import Login from './pages/Login/Login'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import MyProfile from './pages/MyProfile/MyProfile'
import MyAppointments from './pages/MyAppoinments/MyAppointments'
import Appointment from './pages/Appointment/Appointment'
import Navbar from './components/Navbar'
import './App.scss';

function App() {


  return (
        <>
      {/* <div className='wrapperClass'> */}
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:specialization' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointments/:docId' element={<Appointment />} />        
      </Routes>
      {/* </div> */}
      </>
    
  )
}

export default App
