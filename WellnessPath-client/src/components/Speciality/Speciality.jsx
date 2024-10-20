import React from 'react'
import { specialityData } from '../assets'
import { Link } from 'react-router-dom'
import './Speciality.scss'
const Speciality = () => {
  return (
    <div id='speciality' className='speciality '>
      <h2 className='speciality__heading'>Find Doctor by Speciality</h2>
      {/* <p className='speciality__para'>"Unlock access to expert medical professionals across specialties, guiding you towards the best care for your individual health needs</p> */}
      <div className='speciality__item'>
        {specialityData.map((item,index)=>
          <Link onClick={()=>scrollTo(0,0)} className='speciality__link' key={index} to={`/doctor/${item.speciality}`}>
              <img className='speciality__img' src={item.image} alt={`${item.speciality} image`} />
              <p>{item.speciality}</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Speciality