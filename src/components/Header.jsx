import React from 'react';
import { Link } from 'react-router-dom';
// import Registration from './Registration'

export default function Header() {
  const submitWalker = (e) => {
    e.preventDefault();
    useNavigate('/api/registration');
  };
  return (
    <header>
      <div>
        <img className="header-logo" src="https://img2.freepng.ru/20180401/fqq/kisspng-logo-small-business-handshake-marketing-joint-5ac09c4a29ec66.8818838615225723621717.jpg" alt="logo" />
      </div>
      <h1 className="header-title">Deliveri-cebab</h1>
      <h3 className="header-link"><Link className="header-link" to="/">Home</Link></h3>
    </header>
  );
}
