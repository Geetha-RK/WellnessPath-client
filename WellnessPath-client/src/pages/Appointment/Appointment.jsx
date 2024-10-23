import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../components/assets';
import './Appointment.scss';

const Appointment = () => {
  const { docId } = useParams();
  const { getDoctorById, selectedDoctor, loading, error } = useContext(AppContext);
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const [docSlots, setDocSlots] = useState([]);
   const [selectedDate, setSelectedDate] = useState(null); 

  useEffect(() => {
    const fetchDoctor = async () => {
      if (docId) {
        await getDoctorById(docId);
      }
    };

    fetchDoctor();
  }, [docId]);

  useEffect(() => {
    if(selectedDoctor){
      setDocSlots(generateWeeklySlots());
    }
  }, [selectedDoctor]);
 

  const generateWeeklySlots = () => {
    const slots = [];
    const startHour = 10; // 10:00 AM
    const endHour = 21; // 8:00 PM
  
    for (let i = 0; i < 14; i++) {
      const currentDaySlots = [];
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      currentDate.setHours(startHour, 0, 0, 0);
  
      while (currentDate.getHours() < endHour) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        currentDaySlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      slots.push(currentDaySlots);
    }
  
    return slots;
  };
  
  useEffect(()=>{
    console.log(docSlots);
  },[docSlots])
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedDoctor) return <p>No doctor found.</p>;

  const handleDateSelect = (index) => {
    setSelectedDate(index);
  };

  // Get the selected day's slots
  const selectedDaySlots = selectedDate !== null ? docSlots[selectedDate] : [];

  return (
    <>
      <div className='bg-image3'></div>
      <p className='appointments__heading'>Book your Appointment with</p>
      <div className='appointments'> 
        <div className='appointments__img-container'>
          <img className='appointments__img' src={selectedDoctor.image} alt={`${selectedDoctor.first_name} image`} />
        </div>
        <div className='appointments__details-container'>
          <p className='appointments__docname'>
            {`Dr. ${selectedDoctor.first_name} ${selectedDoctor.last_name}`} 
            <img className='appointments__icon1' src={assets.verifiedicon} alt="verifiedicon" />
          </p>
          <div className='appointments__details'>
            <p><span className='appointments__span'>Qualification: </span>{selectedDoctor.qualification}</p>
            <p><span className='appointments__span'>Speciality: </span>{selectedDoctor.specialization}</p>
            <p><span className='appointments__span'>Years of Experience: </span>{selectedDoctor.experience_years} years</p>
            <div>
              <p className='appointments__abouttitle'>About 
                <img className='appointments__abouticon' src={assets.info_icon} alt="" />
              </p>
              <p className='appointments__about'>{selectedDoctor.about}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='availability'>
        <p className='availability__title'>Available Slots:</p>
        <div className='availability__booking-wrapper'>
        <div className='availability__booking-date'>
          {docSlots.length > 0 ? (
            docSlots.map((daySlots, index) => {
              const currentDate = daySlots[0].datetime;
              return (
                <div key={index} className='availability__slot'onClick={() => handleDateSelect(index)}>
                  <p>{daysOfWeek[currentDate.getDay()]}  </p>
                  <p>{currentDate.getDate()}</p>
                  
                </div>
                
              );
            })
          ) : (
            <p>No available time slots.</p>
          )}
        </div>
        </div>


        {selectedDate !== null && (
    <>
      {/* <p className='availability__title'>
        Available Slots for {daysOfWeek[docSlots[selectedDate][0].datetime.getDay()]} {docSlots[selectedDate][0].datetime.getDate()}:
      </p> */}
      <div className='availability__booking-wrapper'>
        <div className='availability__booking-date'>
          {selectedDaySlots.length > 0 ? (
            selectedDaySlots.map((slot, slotIndex) => (
              <div key={slotIndex} className='availability__slot'>
                <p>{slot.time}</p>
              </div>
            ))
          ) : (
            <p>No available time slots for this date.</p>
          )}
        </div>
      </div>
    </>
  )}
      </div>

      {/* {selectedDate !== null && (
        <div className='selected-slots'>
          <h3>Available Slots for {daysOfWeek[docSlots[selectedDate][0].datetime.getDay()]} {docSlots[selectedDate][0].datetime.getDate()}:</h3>
          <div className='seleted-slots__box'>
            {selectedDaySlots.length > 0 ? (
              selectedDaySlots.map((slot, slotIndex) => (
                <p className='selected-slots__time' key={slotIndex}>{slot.time}</p>
              ))
            ) : (
              <p>No available time slots for this date.</p>
            )}
          </div>
        </div>
      )} */}

     
            
    </>
  );
}

export default Appointment;
