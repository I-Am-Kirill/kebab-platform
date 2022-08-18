import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration({ setAuthState }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    tel: '',
    address: '',
    password: ''
  });
  const changeHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/regUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (response.ok) {
      const data = await response.json();
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
          <label htmlFor="exampleInputEmail1">Адрес</label>
          <input type="address" name="address" onChange={changeHandler} value={inputs.address} className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Enter address" />
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
