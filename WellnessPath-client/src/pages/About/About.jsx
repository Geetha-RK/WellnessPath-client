import React from 'react'
import { assets } from '../../components/assets.js';
import './About.scss'
const About = () => {
  return (
    <>
    <div className="bg-image6"></div>
    <div className='about'>
      <div className='about__title'>
        <p>About Us</p>
      </div>
      <div className='about__container'>
        <img className='about__img' src={assets.docteam2} alt="doctor-team2" />
        <div className='about__para-container'>
          <p className='about__para-p1'>Welcome to Wellness Path!</p>
          <p>At Wellness Path, we are dedicated to transforming the way healthcare is delivered by providing a comprehensive web application that streamlines hospital operations. Our primary focus is on enhancing patient management, 
            simplifying appointment scheduling, and improving access to health information.</p>
            <p className='about__para-p1'>Our Mission</p>
            <p>Our mission is to enhance efficiency in healthcare settings by creating a centralized platform that manages essential patient data seamlessly. We understand the challenges faced by hospitals in handling patient information and scheduling appointments, which often lead to errors and delays in patient care. 
              Wellness Path addresses these issues head-on by integrating critical functionalities into a user-friendly interface.</p>
            <p className='about__para-p1'>The Problem Space</p>
            <p>In today’s fast-paced healthcare environment, hospitals often struggle with fragmented systems that hinder effective patient care. Manual processes can result in inaccuracies, inefficiencies, and a lack of timely information. Wellness Path is designed 
              to tackle these challenges by providing an all-in-one solution that simplifies operations for both healthcare providers and patients.</p>
            <p className='about__para-p1'>Our Users</p>
            <p>The primary users of Wellness Path are patients. Our platform empowers patients by offering features that enhance their healthcare experience:</p>
            <ol>
              <li className='about__list'>
              <strong>Schedule and Cancel Appointments:</strong> Easily manage your appointments with our intuitive scheduling system.
              </li>
              <li className='about__list'>
              <strong>Choose Doctors by Specialty:</strong> Browse and select doctors based on their areas of expertise to find the right care for your needs.
              </li>
              <li className='about__list'>
              <strong>Health Reports Access:</strong> While our current version does not incorporate patient reports, we prioritize the future inclusion of features that will allow patients to access and view their health records securely.
              </li>
            </ol>
            <p className='about__para-p1'>
            Our Commitment to Security
            </p>
            <p>
            We prioritize your privacy and security. Wellness Path is built with robust security measures to ensure that all patient data is handled with the utmost care and in compliance with HIPAA regulations. 
            We are committed to protecting your information and providing a secure environment for your healthcare needs.
            </p>
            <p className='about__para-p1'>Join Us on the Wellness Journey</p>
            <p>At Wellness Path, we believe that every patient deserves efficient and effective healthcare management. Our goal is to empower you with the tools needed to take control of your health journey. 
              Thank you for choosing Wellness Path as your trusted partner in healthcare.</p>
                    </div>
      </div>
    </div>
    </>
  )
}

export default About