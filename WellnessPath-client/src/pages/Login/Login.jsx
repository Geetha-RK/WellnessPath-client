import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    try {
      console.log("Preparing to submit:", { 
        state, 
        email, 
        password, 
        firstname, 
        lastname, 
        phone 
      });
      const url = state === 'Sign Up' ? '/api/auth/signup' : '/api/auth/login';
      const data = state === 'Sign Up'
        ? { first_name: firstname, last_name: lastname, phone_number: phone, email, password }
        : { email, password };

        console.log("Sending request to:", url, "with data:", data);
        
        const response = await axios.post(`http://localhost:8080${url}`, data);
        // Handle successful response (e.g., redirect or store token)
      console.log(response.data);
      // Here, you might want to save the token and redirect the user
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
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
          />
        </div>
        
        <div className='loginform__field'>
          <label className='loginform__label' htmlFor='password'>Password</label>
          <input
            className='loginform__input'
            id='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button className='loginform__button' type='submit'>{state === 'Sign Up' ? 'Sign Up' : 'Login'}</button>

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
  );
};

export default Login;
