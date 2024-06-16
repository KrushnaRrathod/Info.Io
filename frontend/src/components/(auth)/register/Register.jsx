import { useState } from 'react';
import './register.css';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/register", user);
      // history.push(`/${user.post}dashboard`)
      console.log(response.data);
      console.log(response.data.data.email);
      window.location.href="/login"
    } catch (error) {
      console.log(error.response.data.message);
    }
  };


  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1 className='register-info'>Register for Info.Io</h1>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          placeholder="Enter your Firstname"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          placeholder="Enter your Lastname"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="name@example.com"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">Phone No.</label>
        <input
          type="number"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your Phonenumber"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your Password"
        />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default Register;
