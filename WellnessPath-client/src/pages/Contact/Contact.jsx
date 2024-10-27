import React from 'react'
import { assets } from '../../components/assets'
import './Contact.scss'

const Contact = () => {
  return (
    <div>
      <div className="bg-image6"></div>
      <div className='contact'>Contact US</div>
      <div className='contact__container'>
        <div className='contact__img-container'>
          <img className='contact__img' src={assets.hero} alt="" />
        </div>
        <div className='contact__para-container'>
          <p className='contact__para-title'>We are Here to Help!</p>
          <p>At Wellness Path, we value your feedback and are committed to providing you with the best support possible. 
            Whether you have questions, concerns, or suggestions, we want to hear from you!</p>
            <p className='contact__para-title contact__para-title2'>Contact Information</p>
            <p className='contact__para-title'>Phone:</p>
            <p>For immediate assistance, please call us at: <strong>(123) 456-7890</strong></p>
            <p className='contact__para-title'>Email:</p>
            <p>For inquiries, you can reach us at:</p>
            <strong>support@wellnesspath.com</strong>
            <p className='contact__para-title'>Office Hours:</p>
            <p>Monday - Sunday: 10:00 AM - 8:00 PM (EST)</p>
            <div>
              <p className='contact__para-title'>Address</p>
              <p>Wellness Path</p>
              <p>123 Wellness Lane</p>
              <p>Health City, ON 12345</p>
              <p>Canada.</p>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Contact