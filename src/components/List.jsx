import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function List({ listid }) {
  const [card, setdata] = useState(listid);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/all/list/${id}`)
      .then((res) => res.json())
      .then((data) => setdata(data));
  }, []);

  function del(e) {
    e.preventDefault();
    fetch(`/toList/delete/${id}`, {
      method: 'DELETE',
    });
  }

  return (
    <>
      <h1>Заказы для подтверждения</h1>
      <section className="section">
        {(card.length !== 0)
          ? (
            <>
              <h2 className="section-title">Список заказов для подтверждения:</h2>
              <div className="content">
                {card.map((el) => (
                  <div className="box">
                    <img className="box-img" src={el.img} alt={el.name} />
                    <h1 className="box-title">{el.name}</h1>
                    <p className="box-price">{el.price}</p>
                  </div>
                ))}
              </div>
              <button type="button" className="btn" onClick={del}>Подтвердить доставку</button>
            </>
          ) : (
            <h1>Заказов для подтверждения нет</h1>
          )}
      </section>
    </>
  );
}
