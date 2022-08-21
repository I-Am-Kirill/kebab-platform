import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeaderList({ order }) {
  const [cart, setCart] = useState(order);
  return (
    <section className="section">
      <h2 className="section-title">Доступные продукты:</h2>
      <div className="content">
        {cart.map((el) => (
          <div className="box">
              <img className="box-img" src={el.img} alt={el.name} />
              <h1 className="box-title"><Link className="box-title" to={`/details/${el.id}`}>{el.name}</Link></h1>
              <p className="box-price">{el.price}</p>
              <button type="button" className="btn btn-left">подробнее</button>
          </div>
        ))}
      </div>
    </section>
  );
}
