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

  async function deleteHandler(e) {
    e.preventDefault();
    const ftch = await fetch(`/del/${orderState[0].id}`, {
      method: 'DELETE',
    });
    if (ftch.ok) {
      setOrderState((prev) => prev.filter((el) => el.id !== (orderState[0].id) * 1));
    }
    navigate('/');
  }
  const updateHandler = (e) => {
    e.preventDefault();
    navigate(`/update/${orderState[0].id}`);
  };

  function toBasket(e) {
    console.log(user);
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

  // async function navi() {
  //   console.log(orderState);
  //   let nav = {};
  //   // const pos = await window.navigator.geolocation.getCurrentPosition((position) => {
  //   //   const { latitude, longitude } = position.coords;
  //   //   console.log({ latitude, longitude });
  //   //   nav = { latitude, longitude };
  //   //   start(nav);
  //   // });
  // }

  async function navi() {
    const mapglAPI = await load();
    const map = new mapglAPI.Map('containerMap', {
      center: [orderState[0].lon, orderState[0].lat],
      zoom: 13,
      key: '07916d49-e084-453b-956c-bcb324ed1487',
    });
    const marker = new mapglAPI.Marker(map, {
      coordinates: [orderState[0].lon, orderState[0].lat],
    });
  }

  // const map = new mapgl.Map('containerMap', {
  //   key: '07916d49-e084-453b-956c-bcb324ed1487',
  //   center: [55.31878, 25.23584],
  //   zoom: 13,
  // });

  //   const { id } = useParams();
  return (
    <div className="body-registration">
      <section className="details-section">
        {orderState.map((el) => (
          <>
            <div>
              <img className="img-details" src={el.img} alt={el.name} />
            </div>
            <div className="container-details">
              <h1 className="details-title">{el.name}</h1>
              <p className="details-description">{el.description}</p>
            </div>
            <div>
              <p className="details-price">{el.price}</p>
              <p className="details-disprice">{el.discont}</p>
            </div>
          </>
        ))}
        <div id="containerMap" />
        {!authState.isworker
          ? (
            <>
              <button className="details-btn-1 btn" type="button" onClick={navi} href="">Показать на карте</button>
              <button className="btn details-btn-2" type="button" onClick={toBasket}>В корзину</button>
            </>
          ) : (
            <>
              <button className="btn details-btn-3" type="button" onClick={deleteHandler}>удалить</button>
              <button className="btn details-btn-4" type="button" onClick={updateHandler}>Редактировать</button>
            </>
          )}
      </section>
    </div>
  );
}
