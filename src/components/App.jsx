import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import HeaderList from './HeaderList';
import Registration from './Registration';
import RegistrationWoker from './RegistrationWoker';
import RegistrationUser from './RegistrationUser';
import Login from './Login';

const [authState, setAuthState] = useState(userSession || null);
// function App({ entries, entry, userSession }) {
function App({ order }) {
  // const [authState, setAuthState] = useState(userSession || null);
  return (
    <>
      {/* <Header authState={authState} setAuthState={setAuthState} /> */}
      <Header />
      <div className="bg-dk-green pad-t-2 pad-s-1 pad-b-8 mar-b-16 c-white">
        <div className="max-w-700 center">
          <Routes>
            <Route path="/" element={<HeaderList order={order} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/regWoker" element={<RegistrationWoker />} />
            <Route path="/regUser" element={<RegistrationUser />} />
            <Route path="/login" element={<Login />} />
            </Routes>
        </div>

      </div>
    </>

  );
}

export default App;
