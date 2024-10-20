import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './TopDoctors.scss'
const TopDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const doctorList = async () => {
            setLoading(true); 
            try{
                const response = await axios.get('http://localhost:8080/api/doctors');
                setDoctors(response.data);
                console.log(response.data);
            }catch(error){
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false); 
              }
        }
        doctorList();
    },[]);

    function scrollLeft() {
        const container = document.querySelector('.topdoctors__container');
        container.scrollBy({
            top: 0,
            left: -300, // Adjust the value to control scroll distance
            behavior: 'smooth'
        });
    }
    
    function scrollRight() {
        const container = document.querySelector('.topdoctors__container');
        container.scrollBy({
            top: 0,
            left: 300, // Adjust the value to control scroll distance
            behavior: 'smooth'
        });
    }

    if (loading) return <div>Loading...</div>; // Loading state
    if (error) return <div>Error: {error}</div>; //error state
  return (
    <div className='topdoctors'>
        <h2 className='topdoctors__heading'>Top Doctors</h2>
        <div className='topdoctors__navigation'>
        <button class="topdoctors__arrow left" onclick="scrollLeft()">&#9664;</button>
        <div className='topdoctors__container'>
            {doctors.slice(0,10).map((item,index)=>(
                <div className='topdoctors__box' key={index}>
                    <img className='topdoctors__doctorimg' src={item.image} alt="doc-image" />
                    <div>
                        <div>
                        <p></p><p>Available</p>
                        </div>
                         <p>{`Dr. ${item.first_name} ${item.last_name}`}</p>

                    </div>
                    <p>{item.specialization}</p>
                </div>

            ))}
        
        </div>
        <button class="topdoctors__arrow right" onclick="scrollRight()">&#9654;</button>
        </div>
    </div>
  )
}

export default TopDoctors