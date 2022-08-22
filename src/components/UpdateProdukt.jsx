import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateProdukt({ authState, setAuthState, orderid }) {
  const [data, setData] = useState({});
  let {id} = useParams()
  const navigate = useNavigate();
  const inputHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect (() => {
    fetch(`/api/item/${id}`)
    .then(res => res.json())
    .then(dat => setData(dat));
  }, []);
  console.log(data)

  const updateHandler = (e) => {
    e.preventDefault();
    fetch(`/update/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    navigate(`/details/${id}`)
  };
  const cancelHandler = ( e ) => {
    e.preventDefault();
    navigate('/')
  }
  return (
    <section className="section">
      <form method="post" onSubmit={updateHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" onChange={inputHandler} value={data.name} />
          <div id="emailHelp" className="form-text">Укажи наименование заказа</div>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" className="form-control" name="location" onChange={inputHandler} value={data.location} />
          <div id="emailHelp" className="form-text">Укажи адрес</div>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">status</label>
          <input type="text" className="form-control" name="location" value={data.status || 'available'} />
          <div id="emailHelp" className="form-text">Укажи статус</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">description</label>
          <input type="text" className="form-control" name="description" onChange={inputHandler} value={data.description} />
          <div id="emailHelp" className="form-text">Что входит в заказ?</div>
        </div>
        <div className="mb-3">
          <label htmlFor="img" className="form-label">img</label>
          <input type="text" className="form-control" name="img" onChange={inputHandler} value={data.img } />
          <div id="emailHelp" className="form-text">Загрузи фотографию</div>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">price</label>
          <input type="text" className="form-control" name="price" onChange={inputHandler} value={data.price} />
          <div id="emailHelp" className="form-text">Укажи цену без скидки</div>
        </div>
        <div className="mb-3">
          <label htmlFor="discont" className="form-label">discont</label>
          <input type="text" className="form-control" name="discont" onChange={inputHandler} value={data.discont } />
          <div id="emailHelp" className="form-text">Укажи размер скидки в %</div>
        </div>
        <button onChange={inputHandler} type="submit" className="btn btn-primary">Редактировать</button>
        <button onChange={cancelHandler} type="submit" className="btn btn-primary">Отменить</button>
      </form>
    </section>
  );
}