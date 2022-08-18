import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddProdukt from './AddProdukt';
import Header from './Header';
import HeaderList from './HeaderList';
import ProduktDetails from './ProduktDetails';

// function App({ entries, entry, userSession }) {
function App({ order, orderid }) {
  // const [authState, setAuthState] = useState(userSession || null);
  return (
    <>
      {/* <Header authState={authState} setAuthState={setAuthState} /> */}
      <Header />
      <div className="bg-dk-green pad-t-2 pad-s-1 pad-b-8 mar-b-16 c-white">
        <div className="max-w-700 center">
          <Routes>
            <Route path="/" element={<HeaderList order={order} />} />
            <Route path="/details/:id" element={<ProduktDetails orderid={orderid} />} />
            <Route path="/addProdukt" element={<AddProdukt/>} />
          </Routes>
        </div>

      </div>
    </>

  );
}

export default App;
