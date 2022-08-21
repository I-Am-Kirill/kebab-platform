import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistrationWoker({ setAuthState }) {
  const navigate = useNavigate();
  let nav = {};
  let late = 0;
  let lone = 0;
  useEffect(async () => {
    // let nav = {};
    const pos = await window.navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log({ latitude, longitude });
      nav = { latitude, longitude };
      // const a = nav.latitude;
      // const b = nav.longitude;
      // return (a, b);
      console.log('44 registrationWoker,jsx', nav.latitude, nav.longitude);
      // start(nav);
    });
  }, []);
  console.log('45 registrationWoker,jsx', nav.latitude, nav.longitude);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    tel: '',
    password: '',
    isworker: true,
    // lat: nav.latitude,
    // lon: nav.longitude,
  });
  // console.log(getAB);
  console.log(inputs);
  const changeHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      lat: nav.latitude,
      lon: nav.longitude,
    }));
  };
  late = nav.latitude;
  lone = nav.longitude;
  console.log('38', late, lone);
  const submitHandler = async (e) => {
    e.preventDefault();
    inputs.lat = nav.latitude;
    inputs.lon = nav.longitude;
    console.log('43', inputs);
    const response = await fetch('/regWoker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      setAuthState(data);
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Имя</label>
          <input type="text" name="name" onChange={changeHandler} value={inputs.name} className="form-control" id="exampleInputPassword1" placeholder="Name" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input type="email" name="email" onChange={changeHandler} value={inputs.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Телефон</label>
          <input type="tel" name="tel" onChange={changeHandler} value={inputs.tel} className="form-control" id="exampleInputTel" aria-describedby="telHelp" placeholder="Enter tel" />
          <small id="emailHelp" className="form-text text-muted" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name="password" onChange={changeHandler} value={inputs.password} className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
