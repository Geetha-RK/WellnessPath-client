import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../components/assets";
import "./Appointment.scss";
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { getDoctorById, selectedDoctor, loading, error } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({}); // Use an object to map dates to booked times

  useEffect(() => {
    const fetchDoctorAndSlots = async () => {
      if (docId) {
        await getDoctorById(docId);
        await fetchBookedSlots(); 
      }
    };

    fetchDoctorAndSlots();
  }, [docId]);

  const fetchBookedSlots = async () => {
    const today = new Date();
    const newBookedSlots = {};

    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];

      try {
        const response = await axios.get(`http://localhost:8080/api/appointments/${docId}/${dateString}`);
        newBookedSlots[dateString] = response.data; // Store booked times for each date
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    }
    setBookedSlots(newBookedSlots);
  };

  const generateWeeklySlots = () => {
    const slots = [];
    const startHour = 10; // 10:00 AM
    const endHour = 21; // 8:00 PM

    for (let i = 0; i < 14; i++) {
      const currentDaySlots = [];
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      currentDate.setHours(startHour, 0, 0, 0);
      const dateString = currentDate.toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

      while (currentDate.getHours() < endHour) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }).replace('AM', 'a.m.').replace('PM', 'p.m.');

        const isBooked = bookedSlots[dateString]?.includes(formattedTime) || false; // Check if this time is booked for the current date
        currentDaySlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          isBooked: isBooked
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(currentDaySlots);
    }

    return slots;
  };

  useEffect(() => {
    if (selectedDoctor) {
      setDocSlots(generateWeeklySlots());
    }
  }, [selectedDoctor, bookedSlots]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedDoctor) return <p>No doctor found.</p>;

  const handleDateSelect = (index) => {
    setSelectedDate(index);
    setSelectedTime(null);
  };

  const handleTimeSelect = (timeSlot) => {
    // Check if the slot is booked before allowing selection
    const selectedSlot = docSlots[selectedDate]?.find(slot => slot.time === timeSlot);
    if (selectedSlot && !selectedSlot.isBooked) {
      setSelectedTime(timeSlot);
    }
  };
  

  const handleSubmitAppointment = async () => {
    if (selectedDate !== null && selectedTime) {
      const selectedDay = new Date(docSlots[selectedDate][0].datetime);
      const [timePart, modifier] = selectedTime.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);
  
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
  
      selectedDay.setHours(hours, minutes);
  
      // Check if the selected time is already booked
      const dateString = selectedDay.toISOString().split('T')[0];
      if (bookedSlots[dateString]?.includes(selectedTime)) {
        alert("This time slot is already booked. Please choose another time.");
        return; // Prevent further execution
      }
  
      const appointmentData = {
        patientId: 1, // Replace with actual patient ID
        doctorId: docId,
        dateTime: selectedDay.toISOString(),
      };
  
      try {
        const response = await axios.post('http://localhost:8080/api/appointments/', appointmentData);
        if (response.status === 201) {
          alert("Appointment booked successfully!");
          await fetchBookedSlots(); // Refresh booked slots after booking
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
        alert("Error booking appointment: " + (error.response?.data?.message || "Please try again."));
      }
    } else {
      alert("Please select both a date and a time.");
    }
  };
  

  const selectedDaySlots = selectedDate !== null ? docSlots[selectedDate] : [];

  return (
    <>
      <div className="bg-image3"></div>
      <p className="appointments__heading">Book your Appointment with</p>
      <div className="appointments">
        <div className="appointments__img-container">
          <img
            className="appointments__img"
            src={selectedDoctor.image}
            alt={`${selectedDoctor.first_name} image`}
          />
        </div>
        <div className="appointments__details-container">
          <p className="appointments__docname">
            {`Dr. ${selectedDoctor.first_name} ${selectedDoctor.last_name}`}
            <img
              className="appointments__icon1"
              src={assets.verifiedicon}
              alt="verifiedicon"
            />
          </p>
          <div className="appointments__details">
            <p>
              <span className="appointments__span">Qualification: </span>
              {selectedDoctor.qualification}
            </p>
            <p>
              <span className="appointments__span">Speciality: </span>
              {selectedDoctor.specialization}
            </p>
            <p>
              <span className="appointments__span">Years of Experience: </span>
              {selectedDoctor.experience_years} years
            </p>
            <div>
              <p className="appointments__abouttitle">
                About
                <img
                  className="appointments__abouticon"
                  src={assets.info_icon}
                  alt=""
                />
              </p>
              <p className="appointments__about">{selectedDoctor.about}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="availability">
        <p className="availability__title">Available Slots:</p>
        <div className="availability__booking-wrapper">
          <div className="availability__booking-date">
            {docSlots.length > 0 ? (
              docSlots.map((daySlots, index) => {
                const currentDate = daySlots[0].datetime;
                const isSelected = selectedDate === index;
                return (
                  <div
                    key={index}
                    className={`availability__slot ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDateSelect(index)}
                  >
                    <p>{daysOfWeek[currentDate.getDay()]}</p>
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
          <div className="availability__booking-wrapper">
            <div className="availability__booking-date">
              {selectedDaySlots.length > 0 ? (
                selectedDaySlots.map((slot, slotIndex) => (
                  <div 
                    key={slotIndex}
                    onClick={() => handleTimeSelect(slot.time)} 
                    className={`availability__slot availability__timeslots ${slot.isBooked ? 'disabled' : ''} ${selectedTime?.trim() === slot.time.trim() ? 'selected' : ''}`}
                    style={{ pointerEvents: slot.isBooked ? 'none' : 'auto', opacity: slot.isBooked ? 0.5 : 1 }}
                  >
                    <p>{slot.time}</p>
                  </div>
                )) 
              ) : (
                <p>No available time slots for this date.</p>
              )}
            </div>

          </div>
        )}
      </div>
        <div className="appointment">
      <button className="appointment__button" onClick={handleSubmitAppointment}>Book Appointment</button>
      </div>
    </>
  );
};

export default Appointment;
