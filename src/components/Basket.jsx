import React, { useState } from 'react';

export default function Basket({ basketid }) {
  const [card, setdata] = useState(basketid);
  const flag = true;
  const [data, setData] = useState(basketid);
  console.log(data);

  function toList(e) {
    e.preventDefault();
    fetch('/toList', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  return (
    <section className="section">
      <h2 className="section-title">Корзина:</h2>
      <div className="basket-content">
        {card.map((el) => (
          <div className="basket-box">
            <img className="basket-box-img" src={el.img} alt={el.name} />
            <h1 className="basket-box-title">{el.name}</h1>
            <p className="basket-box-price">{el.price}</p>
            <p className="basket-box-pricedis">{el.discont}</p>
          </div>
        ))}
      </div>
      <button className="btn" onClick={toList}>Оформить заказ</button>
    </section>
  );
}
