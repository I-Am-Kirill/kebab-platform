import React, { useState } from 'react';

export default function List({ listid }) {
  const [card, setdata] = useState(listid);
  return (
    <>
      <h1>Заказы для подтверждения</h1>
      <section className="section">
        <h2 className="section-title">Корзина:</h2>
        <div className="content">
          {card.map((el) => (
            <div className="box">
              <img className="box-img" src={el.img} alt={el.name} />
              <h1 className="box-title">{el.name}</h1>
              <p className="box-price">{el.price}</p>
            </div>
          ))}
        </div>
        <button className="btn">Подтвердить доставку</button>
      </section>
    </>
  );
}
