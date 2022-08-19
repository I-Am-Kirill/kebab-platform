import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Registration from './Registration';

export default function Header({ authState, setAuthState }) {
  const logoutHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/login/logout');
    console.log(response);
    if (response.ok) {
      console.log('response.ok');
      setAuthState(null);
      useNavigate('/');
    }
  };
  return (
    <header>
      <div>
        <img className="header-logo" src="https://img2.freepng.ru/20180401/fqq/kisspng-logo-small-business-handshake-marketing-joint-5ac09c4a29ec66.8818838615225723621717.jpg" alt="logo" />
      </div>
      <div>
        <h1 className="header-title">Deliveri-cebab</h1>
      </div>
      <div className="container-links-header">
        <h3 className="header-link"><Link className="header-link" to="/">Home</Link></h3>
        {!authState
          ? (
            <>
              <h3 className="header-link"><Link className="header-link" to="/registration">Registration</Link></h3>
              <h3 className="header-link"><Link className="header-link" to="/login">Login</Link></h3>
            </>
          ) : (
            <a onClick={logoutHandler} className="header-link" href="">logout</a>

          )}
      </div>

    </header>
  );
}
