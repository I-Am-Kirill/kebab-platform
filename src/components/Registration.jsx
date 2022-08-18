import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Registration() {
  // let navigate = useNavigate()
  // const submitWalker =  (e) => {
  //   e.preventDefault();
  //   navigate('/regWoker');
  // };
  // const submitUser =  (e) => {
  //   e.preventDefault();
  //   navigate('/regUser');
  // };
  return (
    <div>Registration</div>
    ,
    <div>
      <Link to='/regWoker'>Курьер</Link>
      <Link to='/regUser'>Пользователь</Link>
    </div>
  );
};