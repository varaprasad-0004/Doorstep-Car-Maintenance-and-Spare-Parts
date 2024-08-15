import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './lifecss.css';

function OTPValidation() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(60);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    let interval;
    if (showModal) {
      interval = setInterval(() => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showModal]);

  const handleGenerateOTP = () => {
    if (!email) {
      setEmailError('Please enter your email.');
      return;
    }
    
    setShowModal(true);
    axios.post('http://localhost:5005/send-otp', { email })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  

  const handleVerifyOTP = () => {
    if (!otp) {
      alert('Please enter the OTP.');
      return;
    }
    
    axios.post('http://localhost:5005/verify-otp', { email, otp })
      .then(response => {
        console.log(response.data);
        alert("Successfully Verified");
        window.location.href = '/spares';
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Incorrect OTP");
      });
  };

  const handleResendOTP = () => {
    setTimer(60);
    axios.post('http://localhost:5005/send-otp', { email })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleClose =() => {
    setShowModal(false);
    window.location.href = '/random'
  }
  

  return (
    <div>
      <div className="vertical-line">
        <h2 style={{color: 'white', fontWeight: 'bold', paddingTop: '30px', fontFamily: 'serif'}}>GMAIL OTP </h2>
        <h2 style={{color: 'white', fontWeight: 'bold', fontFamily: 'serif'}}>Generation and</h2>
        <h2 style={{color: 'white', fontWeight: 'bold', fontFamily: 'serif'}}>Validation</h2>
      </div>
      <div className='row athadu'>
      <i className="fa-solid fa-shield-halved" style={{fontSize:'45px', color: 'rgb(164, 82, 242)'}}></i>
      <h4 style={{marginTop: '15px'}}>Enter your Email</h4>
        <div className='col-md-12'>
          <input
            className='moon'
            placeholder='Enter your email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br></br>{emailError && <p style={{ color: 'red' }}>{emailError}</p>}<br></br>
          <button className='fire' onClick={handleGenerateOTP}>Generate OTP</button>
        </div>
      </div>

      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content" style={{ backgroundColor: '#ffffff' }}>
      <div>
        <h5 style={{fontWeight: 'bold', textAlign: 'center'}}>OTP Verification</h5>
      </div><hr></hr>
      <div className="modal-body">
        <h6 style={{ color: 'green', fontWeight: 'bold', backgroundColor: '#cdffcd', padding: '15px' }}>We've sent a Verification code to your email - {email}</h6>
              <input
                className='moon'
                placeholder='Enter the OTP'
                type='text'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              {timer > 0 ? (
                <p>Resend OTP in {timer} seconds</p>
              ) : (
                <p style={{ cursor: 'pointer' }} onClick={handleResendOTP}>Resend OTP</p>
              )}
              <button className='fire' onClick={handleVerifyOTP}>Verify OTP</button>
            </div><span onClick={handleClose} style={{cursor:'pointer'}}>Cancel</span>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
    </div>
  );
}

export default OTPValidation;