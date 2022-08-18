import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProduktDetails({ orderid }) {
  const [orderState, setOrderState] = useState(orderid);
  const { id } = useParams();
  console.log(orderState);
  console.log(orderid);
  return (
    <div>
      <h1>Detail</h1>
      <span>
        {/* {orderState.name} */}
        {' '}
        aka
        {' '}
        {/* {orderState.description} */}
      </span>
    </div>
  );
}
