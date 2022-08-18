import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const submitWalker =  (e) => {
    e.preventDefault();
    useNavigate('/regWoker');
  };
  const submitUser =  (e) => {
    e.preventDefault();
    useNavigate('/regUser');
  };
  return (
    <div>Registration</div>
    ,
    <div>
      <button type="submit" onSubmit={submitWalker}>Курьер</button>
      <button type="submit" onSubmit={submitUser}>Пользователь</button>
    </div>
  );
};
