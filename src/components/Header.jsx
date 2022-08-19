import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
      <nav className="clearfix mar-b-1 nav">
        <div>
          <img src="https://img2.freepng.ru/20180401/fqq/kisspng-logo-small-business-handshake-marketing-joint-5ac09c4a29ec66.8818838615225723621717.jpg" alt="logo" />
        </div>
        <div>
        <h1>deliveri-cebab</h1>
        </div>
        <div>
          <ul className="no-bullets no-margin no-padding right">
            <li className="pipe-separate t-light-green left"><Link to="/">home</Link></li>
            {!authState
              ? (
                <>
            <li className="pipe-separate t-light-green left"><Link to="/registration">Registration</Link></li>
            <li className="pipe-separate t-light-green left"><Link to="/login">Login</Link></li>
            </>
              ) : (
                <li className="pipe-separate t-light-green left">
                  <a onClick={logoutHandler} href="">logout</a>
                </li>
              )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
