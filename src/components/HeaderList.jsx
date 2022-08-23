import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HeaderList({ order, authState }) {
  const [cart, setCart] = useState(order || []);

  // useEffect(() => {
  //   fetch('/api/all/orders')
  //     .then((res) => res.json())
  //     .then((data) => setCart(data));
  // }, []);
  // console.log(order);
  cart.sort((a, b) => a.distance - b.distance);
  // cart.map((el) => (console.log(el.distance)));
  return (
    <>
      <div className="section-header" />
      <section className="section">
        <h2 className="section-title">Доступные продукты:</h2>
        <div className="content">
          {cart.map((el) => (
            <div className="box">
              <img className="box-img" src={el.img} alt={el.name} />
              <h1 className="box-title">{el.name}</h1>
              {authState
                ? (
                  <>
                    <div className="box-price-div">
                      <div className="box-price-div-inner"><p className="box-price">{el.discont}</p></div>
                      <div className="box-price-div-inner">
                        <p className="box-distance">
                          {Math.floor(el.distance / 100) / 10 }
                          {' '}
                          km.
                        </p>
                      </div>
                    </div>
                    <button type="button" className="btn btn-left"><Link className="btn-link" to={`/details/${el.id}`}>подробнее</Link></button>
                  </>
                ) : (
                  <div className="box-price-div">
                    <div className="box-price-div-inner"><p className="box-price">{el.discont}</p></div>
                    <div className="box-price-div-inner">
                      <p className="box-distance">
                        {Math.floor(el.distance / 100) / 10 }
                        {' '}
                        km.
                      </p>
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
