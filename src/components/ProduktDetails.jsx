import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

export default function ProduktDetails({ orderid }) {
  const [orderState, setOrderState] = useState([orderid]);
//   const { id } = useParams();
  return (
      <section>
        {orderState.map((el) => (
          <>
            <div>
              <img src={el.img} alt={el.name} />
            </div>
            <div>
              <h1>{el.name}</h1>
              <p>{el.description}</p>
              <p>{el.status}</p>
            </div>
            <div>
              <p>{el.price}</p>
              <p>{el.discont}</p>
            </div>
          </>
        ))}
        <div>
          <button>В корзину</button>
        </div>
        <div>
          <button>удалить</button>
          <button>редактировать</button>
        </div>
      </section>
  );
}
