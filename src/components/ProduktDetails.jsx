import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { load } from '@2gis/mapgl';
// import { useParams } from 'react-router-dom';

export default function ProduktDetails({ authState, setAuthState, orderid }) {
  const navigate = useNavigate();
  const [user, setUserState] = useState(authState);
  const [orderState, setOrderState] = useState([orderid]);
  const [data, setData] = useState({
    img: orderState[0].img,
    name: orderState[0].name,
    description: orderState[0].description,
    price: orderState[0].price,
    discont: orderState[0].discont,
    worker: orderState[0].wokerId,
    user: user.id,
  });

  function toBasket(e) {
    console.log(user)
    console.log(data);
    console.log(orderState);
    e.preventDefault();
    fetch('/toBasket', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  function tutu() { console.log('tutu'); }

  async function navi() {
    console.log('rere');
    let nav = {};
    const pos = await window.navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log({ latitude, longitude });
      nav = { latitude, longitude };
      start(nav);
    });
  }

  async function start(nav) {
    const mapglAPI = await load();
    const map = new mapglAPI.Map('containerMap', {
      center: [nav.longitude, nav.latitude],
      zoom: 13,
      key: '07916d49-e084-453b-956c-bcb324ed1487',
    });
    console.log([nav.latitude, nav.longitude]);
    const marker = new mapglAPI.Marker(map, {
      coordinates: [nav.longitude, nav.latitude],
    });
  }

  // const map = new mapgl.Map('containerMap', {
  //   key: '07916d49-e084-453b-956c-bcb324ed1487',
  //   center: [55.31878, 25.23584],
  //   zoom: 13,
  // });

  //   const { id } = useParams();
  return (
    <section>
      {orderState.map((el) => (
        <>
          <div>
            <img src={el.img} alt={el.name} />
          </div>
          <div>
            <h1>{el.name}</h1>
            <p>{el.description}</p>
            <p>{el.status}</p>
          </div>
          <div>
            <p>{el.price}</p>
            <p>{el.discont}</p>
          </div>
        </>
      ))}
      <div id="containerMap" />
      {/* <div> */}
      {/* </div> */}
      <div>
        <button>удалить</button>
        <button>редактировать</button>
      </div>
      <button type="button" onClick={navi} href="">Login</button>
      <button type="button" onClick={toBasket}>В корзину</button>
    </section>
  );
}
