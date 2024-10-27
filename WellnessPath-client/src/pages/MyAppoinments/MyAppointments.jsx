import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./MyAppointments.scss";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const patientId = 1;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/appointments/my-appointment/${patientId}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const handleCancel = async (appointmentId) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/appointments/cancel/${appointmentId}`
      );
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );
      alert("Appointment successfully cancelled");
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <>
      {/* <div className='scrollContainer'> */}
      <div className="bg-parent5"></div>
      <div className="my-appointments">
        {appointments.length > 0 ? (
          <ul className="my-appointments__list">
            {appointments.map((appointment, index) => (
              <li key={index} className="my-appointments__item">
                <img
                  src={appointment.image}
                  alt="Doctor"
                  className="my-appointments__image"
                />
                <div className="my-appointments__container">
                  <div>
                    <p className="my-appointments__doctor-name">
                      Doctor: {appointment.doctor_name}
                    </p>
                    <p className="my-appointments__specialization">
                      Specialization: {appointment.specialization}
                    </p>
                    <p className="my-appointments__date">
                      Date: {appointment.appointment_date}
                    </p>
                    <p
                      className={`my-appointments__status my-appointments__status--${appointment.status.toLowerCase()}`}
                    >
                      Status: {appointment.status}
                    </p>
                  </div>
                  <button
                    className="my-appointments__cancel"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default MyAppointments;
