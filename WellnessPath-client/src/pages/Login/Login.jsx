import React, { useContext, useEffect, useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const url = state === 'Sign Up' ? '/api/patients/register' : '/api/patients/login';
      const data = state === 'Sign Up'
        ? { first_name: firstname, last_name: lastname, phone_number: phone, email, password }
        : { email, password };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}${url}`, data);
      console.log(response.data);
      // Save the token and reset the form
      if(response.data.success){  //check this condition
        localStorage.setItem('token',response.data.token);
        setToken(response.data.token);
        console.log(response.data.token)
        resetForm();
        toast.success(`${state === 'Sign Up' ? 'Registration' : 'Login'} successful!`);
      }else{
        toast.error(response.data.message)
      }

    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setPhone('');
  };

  return (
    <>
      <form className='loginform' onSubmit={onSubmitHandler}>
        <div className='loginform__container'>
          <p className='loginform__title'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
          <p className='loginform__subtitle'>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book an appointment</p>
          
          {state === 'Sign Up' && (
            <>
              <div className='loginform__field'>
                <label className='loginform__label' htmlFor='firstname'>First Name</label>
                <input
                  className='loginform__input'
                  id='firstname'
                  type='text'
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstname}
                  required
                />
              </div>
              <div className='loginform__field'>
                <label className='loginform__label' htmlFor='lastname'>Last Name</label>
                <input
                  className='loginform__input'
                  id='lastname'
                  type='text'
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastname}
                  required
                />
              </div>
              <div className='loginform__field'>
                <label className='loginform__label' htmlFor='phone'>Phone Number</label>
                <input
                  className='loginform__input'
                  id='phone'
                  type='tel'
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  placeholder='(123) 456-7890'
                  required
                />
              </div>
            </>
          )}
          
          <div className='loginform__field'>
            <label className='loginform__label' htmlFor='email'>Email</label>
            <input
              className='loginform__input'
              id='email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          
          <div className='loginform__field'>
            <label className='loginform__label' htmlFor='password'>Password</label>
            <input
              className='loginform__input'
              id='password'
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button type='button' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button className='loginform__button' type='submit' disabled={loading}>
            {loading ? 'Loading...' : (state === 'Sign Up' ? 'Sign Up' : 'Login')}
          </button>

          <div className='loginform__toggle'>
            {state === 'Sign Up' ? (
              <p>
                Already have an account?{' '}
                <button className='loginform__link' type='button' onClick={() => setState('Login')}>Login Here</button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button className='loginform__link' type='button' onClick={() => setState('Sign Up')}>Sign Up Here</button>
              </p>
            )}
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
