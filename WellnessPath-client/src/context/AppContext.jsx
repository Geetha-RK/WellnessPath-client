import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(()=>{
        const doctorList = async () => {
            setLoading(true); 
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`);
                setDoctors(response.data);
            }catch(error){
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false); 
              }
        }
        doctorList();
    },[]);

    const getDoctorById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors/${id}`);
            setSelectedDoctor(response.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <AppContext.Provider value={{ doctors,loading,error,selectedDoctor, getDoctorById  }}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider