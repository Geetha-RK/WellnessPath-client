import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../components/assets';
import './Appointment.scss';

const Appointment = () => {
  const {docId} = useParams();
  const { getDoctorById, selectedDoctor, loading, error } = useContext(AppContext);

  const [docSlots,setDocSlots] = useState([]);
  const [slotIndex,setSlotIndex] = useState(0);
  const [slotTime,setSlotTime] = useState('');

  useEffect(()=>{
    if(docId){
      getDoctorById(docId);
    }
  },[docId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const getAvailableSlots = async() =>{
    setDocSlots([]);
    //getting ucrrent date
    let today = new Date()
    for(let i = 0;i<7;i++){
      let currentDate = new Date(today);
      currentDate.set
    }
  }
  useEffect(()=>{
    getAvailableSlots();
  },[docInfo]);

  return (
    <>
      <div className='bg-image3'></div>
          <p className='appointments__heading'> Book your Appointment with</p>
        <div className='appointments'> 
          <div className='appointments__img-container'>
            <img className='appointments__img' src={selectedDoctor.image} alt={`${selectedDoctor.first_name} image`} />
          </div>
          <div className='appointments__details-container'>
            <p className='appointments__docname'>{`Dr. ${selectedDoctor.first_name} ${selectedDoctor.last_name}`} 
              <img className='appointments__icon1' src={assets.verifiedicon} alt="verifiedicon" />
            </p>
            <div className='appointments__details'>
              <p><span className='appointments__span'>Qualification : </span>{selectedDoctor.qualification}</p>
              <p><span className='appointments__span'>Speciality: </span> {selectedDoctor.specialization}</p>
              <p><span className='appointments__span'>Years of Experience : </span>{selectedDoctor.experience_years} years</p>
              <div>
                <p className='appointments__abouttitle'>About 
                    <img className='appointments__abouticon' src={assets.info_icon} alt="" />
                </p>
                <p className='appointments__about'>{selectedDoctor.about}</p>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default Appointment