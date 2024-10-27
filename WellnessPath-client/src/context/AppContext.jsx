import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [token,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'): false);

    // const [userData, setUserData] = useState(false)

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
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // const loadUserProfileData = async() => {
    //     try {
    //         const {data} = await axios.get()
    //     } catch (error) {
    //         console.error(error);
    //         toast.error(error.message);
    //     }
    // }
    return (

        <AppContext.Provider value={{ doctors,loading,error,selectedDoctor, getDoctorById, token,setToken  }}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider