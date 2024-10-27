import React from 'react'
import { specialityData } from '../assets'
import { Link } from 'react-router-dom'
import './Speciality.scss'

const Speciality = () => {
  return (
    <div id='speciality' className='speciality '>
      <h2 className='speciality__heading'>Find Doctor by Speciality</h2>
      <div className='speciality__item'>
        {specialityData.map((item,index)=>
          <Link onClick={()=>scrollTo(0,0)} className='speciality__link' key={index} to={`/doctors/${item.speciality}`}>
              <img className='speciality__img' src={item.image} alt={`${item.speciality} image`} />
              <p className='speciality__itemname'>{item.speciality}</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Speciality