import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setAuthState }) {
  const navigate = useNavigate();
  let nav = {};
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    latitude: nav.latitude,
    longitude: nav.longitude,
  });
  const changeHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (response.ok) {
      const data = await response.json();
      setAuthState(data);
      // navigate('/');
      console.log(data);
    }
  };

  useEffect(async () => {
    // let nav = {};
    const pos = await window.navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log({ latitude, longitude });
      nav = { latitude, longitude };
      // start(nav);
    });
  }, []);

  return (
    <div className="body-registration">
      <section className="section-registration-2">
        <h1 className="registration-title">Login</h1>
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" onChange={changeHandler} value={inputs.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="password" onChange={changeHandler} value={inputs.password} className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-registration">Login</button>
        </form>
      </section>
    </div>
  );
}
