import React from 'react'
import Header from '../../components/Header'
import { assets } from '../../components/assets'
import './Home.scss'
import Speciality from '../../components/Speciality/Speciality'

const Home = () => {
  return (
    <div>
      <div className='scrollContainer'>
      <div className='bg-parent'>
                {/* <img src={assets.abstract} alt="" /> */}
            </div>
            
            <div className='homecontent'>
                <section >
                   <p className='homecontent__para'>Leading the way to <br /> better medicine</p>
                   <p className='homecontent__para-tag'>Your health journey made easy with seamless appointment scheduling</p>
                   <a href="#speciality">
                      <button className='homecontent__button'>Book an Appointment</button>
                   </a>
                   
               </section>
               <section className='homecontent__img'>
                <img src="femalehero" alt="" />
               </section>
              <Speciality />
            </div>
            </div>
        
    </div>
  )
}

export default Home