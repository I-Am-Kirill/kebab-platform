import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const submitWalker = async (e) => {
    e.preventDefault();
    useNavigate('/api/regWoker');
  };
  const submitUser = async (e) => {
    e.preventDefault();
    useNavigate('/api/regUser');
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
