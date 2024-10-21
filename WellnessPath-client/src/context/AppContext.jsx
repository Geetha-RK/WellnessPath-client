import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const doctorList = async () => {
            setLoading(true); 
            try{
                const response = await axios.get('http://localhost:8080/api/doctors');
                setDoctors(response.data);
            }catch(error){
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false); 
              }
        }
        doctorList();
    },[]);

    return (

        <AppContext.Provider value={{ doctors,loading,error }}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider