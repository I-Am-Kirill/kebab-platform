import React from 'react';
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
    <div className="body-registration">
      <section className="section-registration">
        {' '}
        <h1 className="registration-title">Registration</h1>
        <h2 className="registration-description">Кто вы?</h2>
        <div className="registration-links-container">
          <div className="registration-link-right-container">
            <Link className="registration-link-right" to="/regUser">Пользователь</Link>
          </div>
          <div className="registration-link-left-container">
            <Link className="registration-link-left" to="/regWoker">Курьер</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
