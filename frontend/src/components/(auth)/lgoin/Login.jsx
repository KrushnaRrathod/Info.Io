import { useState } from 'react';
import './login.css';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {actionCreators} from "../../state/index.js"

const Login = () => {

  const dispatch = useDispatch()

  const [user, setUser] = useState({
    email: "",
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
      const response = await axios.post("http://localhost:8000/api/v1/user/login", user);
      console.log(response.data);
      console.log(response.data.data.email);
      dispatch(actionCreators.loginUser(response.data.data.user.firstName))
      dispatch(actionCreators.loginUser(response.data.data.user.lastName))
      dispatch(actionCreators.loginUser(response.data.data.user.email))
      dispatch(actionCreators.loginUser(response.data.data.user.phoneNumber))
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('firstName', JSON.stringify(response.data.data.user.firstName));
      sessionStorage.setItem('lastName', JSON.stringify(response.data.data.user.lastName));
      sessionStorage.setItem('email', JSON.stringify(response.data.data.user.email));
      sessionStorage.setItem('phoneNumber', JSON.stringify(response.data.data.user.phoneNumber));
      if(response.data.statusCode === 200){
        window.location.href = '/'
      }
    } catch (error) {
      console.log("Invalid username or password", error);
    }
  };

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h1 className='welcome'>Welcome to Info.Io</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name='email'
          value={user.email}
          placeholder="name@example.com"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name='password' // Ensure the name attribute matches the state property
          placeholder="Enter your Password"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <p><Link style={{ textDecoration: "none" }} to="/register">Don&apos;t have an Account?</Link></p>
      <button type='submit' className='btn btn-primary'>Login</button>
    </form>
  );
};

export default Login;
