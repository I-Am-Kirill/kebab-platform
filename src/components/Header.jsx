import React from 'react';
import { Link } from 'react-router-dom';
import Registration from './Registration'

export default function Header() {
  const submitWalker = (e) => {
    e.preventDefault();
    useNavigate('/api/registration');
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
            <li className="pipe-separate t-light-green left"><Link to="/registration">login</Link></li>
            <li className="pipe-separate t-light-green left"><Link to="/login">login</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
