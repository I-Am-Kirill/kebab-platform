import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddProdukt from './AddProdukt';
import Header from './Header';
import HeaderList from './HeaderList';
import ProduktDetails from './ProduktDetails';
import Registration from './Registration';
import RegistrationWoker from './RegistrationWoker';
import RegistrationUser from './RegistrationUser';
import Login from './Login';
import List from './List';
import Basket from './Basket';
import UpdateProdukt from './UpdateProdukt';

function App({
  order, orderid, entries, entry, userSession, basketid, listid,
}) {
  const [authState, setAuthState] = useState(userSession || null);
  // const [userState, setUserState] = useState(userSession || null);
  // console.log(authState);
  return (
    <>
      <Header authState={authState} setAuthState={setAuthState} />
      <div className="bg-dk-green pad-t-2 pad-s-1 pad-b-8 mar-b-16 c-white">
        <div className="max-w-700 center">
          <Routes>
            <Route path="/" element={<HeaderList order={order} authState={authState} />} />
            <Route path="/details/:id" element={<ProduktDetails authState={authState} setAuthState={setAuthState} orderid={orderid} />} />
            <Route path="/addProdukt" element={<AddProdukt authState={authState} setAuthState={setAuthState} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/regWoker" element={<RegistrationWoker authState={authState} setAuthState={setAuthState} />} />
            <Route path="/regUser" element={<RegistrationUser authState={authState} setAuthState={setAuthState} />} />
            <Route path="/login" element={<Login authState={authState} setAuthState={setAuthState} />} />
            <Route path="/basket/:id" element={<Basket basketid={basketid} />} />
            <Route path="/list/:id" element={<List listid={listid} />} />
            <Route path="/update/:id" element={<UpdateProdukt authState={authState} setAuthState={setAuthState} orderid={orderid} />} />
          </Routes>
        </div>

      </div>
    </>

  );
}

export default App;
