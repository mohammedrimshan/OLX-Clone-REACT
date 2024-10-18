import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/olx-logo.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate(); 
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); 

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError('Password should be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
      isValid = false;
    }

    
    if (!isValid) return;

    try {
      setLoading(true); 
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      alert("You have successfully logged in");
      console.log('User logged in:', userCredentials.user);
      navigate('/');
    } catch (error) {
      alert(error.message);
      console.error('Error logging in:', error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin} noValidate>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="text" 
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="error">{emailError}</p>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="error">{passwordError}</p>}
          <br />
          <br />
          <button type="submit" disabled={loading}>Login</button>
          {loading && <p className="loading">Logging in, please wait...</p>} {/* Loader message */}
        </form>
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
