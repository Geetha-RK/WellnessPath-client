import React, { useContext } from 'react';
import './TopDoctors.scss';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();

    const { doctors, loading, error } = useContext(AppContext);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    function scrollLeft() {
        const container = document.querySelector('.topdoctors__container');
        container.scrollBy({
            top: 0,
            left: -300, 
            behavior: 'smooth'
        });
    }
    
    function scrollRight() {
        const container = document.querySelector('.topdoctors__container');
        container.scrollBy({
            top: 0,
            left: 300, 
            behavior: 'smooth'
        });
    }

   
  return (
    <div className='topdoctors'>
        <h2 className='topdoctors__heading'>Top Doctors</h2>
        <div className='topdoctors__navigation'>
        <button class="topdoctors__arrow left" onClick="scrollLeft()">&#9664;</button>
        <div className='topdoctors__container'>
            {doctors.slice(0,10).map((item,index)=>(
                <div onClick={()=>navigate(`/appointments/${item.doctor_id}`)} className='topdoctors__box' key={index}>
                    <img className='topdoctors__doctorimg' src={`${import.meta.env.VITE_API_URL}${item.image}`} alt="doc-image" />
                    <div className='topdoctors__container2'>
                        <div className='topdoctors__text'>
                            <p className='topdoctors__greenbox'></p><p>Available</p>
                        </div>
                        <p className='topdoctors__name '>{`Dr. ${item.first_name} ${item.last_name}`}</p>
                        <p className='topdoctors__speciality'>{item.specialization}</p>
                    </div>
                </div>

            ))}
        
        </div>
        <button class="topdoctors__arrow right" onClick="scrollRight()">&#9654;</button>
        </div>
    </div>
  )
}

export default TopDoctors