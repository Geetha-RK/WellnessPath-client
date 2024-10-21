import React, { useEffect,useState,useContext } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import './Doctors.scss';
const Doctors = () => {
  const { specialization } = useParams();
  const navigate = useNavigate();
  const { doctors, loading, error } = useContext(AppContext);
  const [filterDoc,setFilterDoc] = useState(doctors);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    const applyFilter = () => {
      if(specialization){
        setFilterDoc(doctors.filter(doc => doc.specialization === specialization ))
      }else{
        setFilterDoc(doctors)
      }
    }

    useEffect(()=>{
      applyFilter();
    },[doctors,specialization])

  return (
          <>
          <div className='bg-image'></div>
        <p className='doctors__header'>Find your perfect Doctor based on Specialization</p>
    <div className='doctors__container1'>
        <div className='doctors__category'>
          <p onClick={()=> specialization === 'General-Physician' ? navigate('/doctors'): navigate('/doctors/General-Physician')}className="doctors__para">General Physician</p>
          <p onClick={()=> specialization === 'Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')}className='doctors__para'>Gynecologist</p>
          <p onClick={()=> specialization === 'Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist')}className='doctors__para'>Dermatologist</p>
          <p onClick={()=> specialization === 'Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatrician')}className='doctors__para'>Pediatricians</p>
          <p onClick={()=> specialization === 'Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist')}className='doctors__para'>Neurologist</p>
          <p onClick={()=> specialization === 'Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist')}className='doctors__para'>Gastroenterologist</p>
        </div>
        <div className='doctors__container2'>
          {
            filterDoc.map((item,index)=>(
              <div onClick={()=>navigate(`/appointments/${item.doctor_id}`)} className='topdoctors__box doctors__box2' key={index}>
                  <img className='topdoctors__doctorimg doctors__img' src={item.image} alt="doc-image" />
                  <div className='topdoctors__container2'>
                      <div className='topdoctors__text'>
                          <p className='topdoctors__greenbox'></p><p>Available</p>
                      </div>
                      <p className='topdoctors__name '>{`Dr. ${item.first_name} ${item.last_name}`}</p>
                      <p className='topdoctors__speciality'>{item.specialization}</p>
                  </div>
              </div>

          ))
          }
        </div>
    </div>
    
    </>
  )
}

export default Doctors