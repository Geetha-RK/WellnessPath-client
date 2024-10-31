import React from 'react'
import { assets } from '../assets.js';
import './Footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer__img-container'>
            <img className='footer__img' src={assets.logo_mobile} alt="mobile-logo" />
        </div>
        <div className='footer__para-container'><strong>Get in Touch</strong>
            <p>+1 (123) 456-7890 </p>
            <p>support@wellnesspath.com</p>
        </div>
    </div>
  )
}

export default Footer