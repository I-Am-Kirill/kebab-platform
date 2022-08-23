import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Basket({ basketid }) {
  const [card, setdata] = useState(basketid || []);
  const flag = true;
  // const [data, setData] = useState(basketid);
  const { id } = useParams();
  // console.log(data);

  useEffect(() => {
    fetch(`/api/all/basket/${id}`)
      .then((res) => res.json())
      .then((result) => setdata(result));
  }, []);

  console.log(card);
  function toList(e) {
    e.preventDefault();

    fetch('/toList', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(card),
    });

    fetch(`/toBasket/delete/${id}`, {
      method: 'DELETE',
    });
  }

  return (
    <section className="section">
      <h2 className="section-title">Корзина:</h2>
      {(card.length !== 0)
        ? (
          <>
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
          </>
        ) : (
          <h1>Корзина пуста</h1>
        )}
    </section>
  );
}
