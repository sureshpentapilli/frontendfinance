import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [creditRequired, setCreditRequired] = useState(false);
  const [auditedFinancials, setAuditedFinancials] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tradeLicense, setTradeLicense] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('organizationName', organizationName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('tradeLicense', tradeLicense);
    formData.append('creditRequired', creditRequired);

    if (creditRequired && auditedFinancials) {
      formData.append('auditedFinancials', auditedFinancials);
    }

    try {
      const response = await axios.post('https://backendcheck-hlpb.onrender.com/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Registration successful. Awaiting approval.');
    } catch (err) {
      setError(err.response?.data || 'Error registering user.');
    }
  };

  return (
    <div className="register-page">
      <div className="container mt-2">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="shadow-lg p-4 register-card animate__animated animate__fadeInLeft">
              <h2 className="text-center mb-4">USER REGISTRATION</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>
                    Full Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                   
                    required
                  />
                </div>
                <div className="mb-3">

                  
                  <label>
                    Organization Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>
                    Email <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>
                    Password <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>
                    Trade License <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setTradeLicense(e.target.files[0])}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={creditRequired}
                    onChange={(e) => setCreditRequired(e.target.checked)}
                  />
                  <label className="form-check-label">Credit Required</label>
                </div>
                {creditRequired && (
                  <div className="mb-3">
                    <label>
                      Audited Financials <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setAuditedFinancials(e.target.files[0])}
                      required
                    />
                  </div>
                )}
                <button type="submit" className="btn btn-primary w-100">
                  REGISTER
                </button>
              </form>
              <div className="text-center mt-3">
                Already have an account?{' '}
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-block">
            <div className="animate__animated animate__fadeInRight animationimage">
              <img style={{height:"300px"}}
                src="./images/registeranimation.gif"
                alt="Register Illustration"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
