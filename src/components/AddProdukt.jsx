import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import mapgl from '@2gis';
import { load } from '@2gis/mapgl';

export default function AddProdukt() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHAndler = (e) => {
    e.preventDefault();
    fetch('/api/v1/entries', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(navigate('/'));
  };
  async function navi() {
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

  return (

    <section className="section">
      <button className="btn btn-primary" onClick={navi}>navigate to</button>
      <div id="containerMap" />
      <form method="post" onSubmit={submitHAndler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={inputHandler}
            value={data.name || ''}
          />
          <div id="emailHelp" className="form-text">
            Укажи наименование заказа
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            onChange={inputHandler}
            value={data.location || ''}
          />
          <div id="emailHelp" className="form-text">
            Укажи адрес
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            status
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            onChange={inputHandler}
            value={data.status || 'available'}
          />
          <div id="emailHelp" className="form-text">
            Укажи статус
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={inputHandler}
            value={data.description || ''}
          />
          <div id="emailHelp" className="form-text">
            Что входит в заказ?
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="img" className="form-label">
            img
          </label>
          <input
            type="file"
            className="form-control"
            id="img"
            onChange={inputHandler}
            value={data.img || ''}
          />
          <div id="emailHelp" className="form-text">
            Загрузи фотографию
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            onChange={inputHandler}
            value={data.price || ''}
          />
          <div id="emailHelp" className="form-text">
            Укажи цену без скидки
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="discont" className="form-label">
            discont
          </label>
          <input
            type="text"
            className="form-control"
            id="discont"
            onChange={inputHandler}
            value={data.discont || ''}
          />
          <div id="emailHelp" className="form-text">
            Укажи размер скидки в %
          </div>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Подтверждаю, что все введено верно
          </label>
        </div>
        <button
          onChange={inputHandler}
          type="submit"
          className="btn btn-primary"
        >
          Разместить пост
        </button>
      </form>
    </section>
  );
}
