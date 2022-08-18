import React, { useState } from 'react';

export default function HeaderList({ order }) {
  const [cart, setCart] = useState(order || []);
    return (
    <section className="section">
      <p>Доступные продукты:</p>
      <div className="content">
        {cart.map((el) => (
          <div className="box">
            <img src={el.img} alt={el.name} />
            <h1 className="box-title">{el.name}</h1>
            <p className="box-description">{el.price}</p>
            <button className="btn">подробнее</button>
          </div>
        ))}
      </div>
    </section>
  );
}
