import React, { useContext, useState } from 'react';
import Logo from '../../assets/olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (!value.trim()) {
      setUsernameError('Please enter a username');
    } else {
      setUsernameError('');
    }
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

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (value.length !== 10 || isNaN(value)) {
      setPhoneError('Please enter a valid 10-digit phone number');
    } else {
      setPhoneError('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    setUsernameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    if (!username.trim()) {
      setUsernameError('Please enter a username');
      isValid = false;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);

      await updateProfile(user, { displayName: username });
      console.log('User profile updated with display name:', username);
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        username,
        email,
        phone,
      });

      console.log('User data added to Firestore');
      navigate('/login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('This email is already in use. Please try a different email.');
      } else {
        console.error('Error signing up:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        
        <form onSubmit={handleSubmit} noValidate> 
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            id="username"
            name="name"
          />
          {usernameError && <p className="error">{usernameError}</p>}
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="text"
            value={email}
            onChange={handleEmailChange}
            id="email"
            name="email"
          />
          {emailError && <p className="error">{emailError}</p>}
          <br />

          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            id="phone"
            name="phone"
          />
          {phoneError && <p className="error">{phoneError}</p>}
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
            name="password"
          />
          {passwordError && <p className="error">{passwordError}</p>}
          <br />
          <br />
          
          <button type="submit" disabled={loading}>Signup</button>
          {loading && <p className="loading">Signing up, please wait...</p>}
        </form>
        
        {/* Add the message here */}
        <p>If you already have an account, please <a href="/login">login</a>.</p>
      </div>
    </div>
  );
}
