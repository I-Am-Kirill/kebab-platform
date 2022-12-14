import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProdukt({ authState, setAuthState }) {
  const [data, setData] = useState({ wokerId: authState.id });
  // const [data, setData] = useState({});
  // console.log(data);
  // console.log(authState);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHAndler = (e) => {
    e.preventDefault();
    fetch('/addProdukt', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(navigate('/'));
  };
  return (
    <div className="body-registration-1">
      <section className="section-registration-4">
        <h1 className="registration-title">Add Product</h1>
        <form className="form" method="post" onSubmit={submitHAndler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" onChange={inputHandler} value={data?.name || ''} />
            <div id="emailHelp" className="form-text">Укажи наименование заказа</div>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input type="text" className="form-control" name="location" onChange={inputHandler} value={data?.location || ''} />
            <div id="emailHelp" className="form-text">Укажи адрес</div>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">status</label>
            <input type="text" className="form-control" name="location" value={data?.status || 'available'} />
            <div id="emailHelp" className="form-text">Укажи статус</div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">description</label>
            <input type="text" className="form-control" name="description" onChange={inputHandler} value={data?.description || ''} />
            <div id="emailHelp" className="form-text">Что входит в заказ?</div>
          </div>
          <div className="mb-3">
            <label htmlFor="img" className="form-label">img</label>
            <input type="text" className="form-control" name="img" onChange={inputHandler} value={data?.img || ''} />
            <div id="emailHelp" className="form-text">Загрузи фотографию</div>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">price</label>
            <input type="text" className="form-control" name="price" onChange={inputHandler} value={data?.price || ''} />
            <div id="emailHelp" className="form-text">Укажи цену без скидки</div>
          </div>
          <div className="mb-3">
            <label htmlFor="discont" className="form-label">discont</label>
            <input type="text" className="form-control" name="discont" onChange={inputHandler} value={data?.discont || ''} />
            <div id="emailHelp" className="form-text">Укажи размер скидки в %</div>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Подтверждаю, что все введено верно</label>
          </div>
          <button onChange={inputHandler} type="submit" className="btn btn-registration-4">Разместить пост</button>
        </form>
      </section>
    </div>
  );
}
