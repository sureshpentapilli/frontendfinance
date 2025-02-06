import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register.css'; // Reuse the same CSS as the Register page

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backendfinance-ofpv.onrender.com/auth/login', { email, password });
      localStorage.setItem('userToken', response.data.token);
      alert('Login successful');
      navigate('/dashboard/neworder'); // Navigate to dashboard
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('Your registration is not approved by the admin.');
      } else {
        setError('Invalid credentials.');
      }
    }
  };

  return (
    <div className="register-page">
      <div className="container mt-2">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="shadow-lg p-4 register-card animate__animated animate__fadeInLeft">
              <h2 className="text-center mb-4">USER LOGIN</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>
                    Email <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // style={{color:"white"}}

                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label>
                    Password <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      // style={{color:"white"}}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ border: 'none', background: 'transparent' }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  LOGIN
                </button>
              </form>
              <div className="text-center mt-3">
                Don't have an account?{' '}
                <Link to="/register" className="text-decoration-none">
                  Register
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-block">
            <div className="animate__animated animate__fadeInRight animationimage">
              <img
                src="./images/registeranimation.gif"
                style={{ height: '300px' }}
                alt="Login Illustration"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
