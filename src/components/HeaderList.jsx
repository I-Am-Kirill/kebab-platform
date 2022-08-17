import React from 'react';

export default function HeaderList() {
  return (
    <section>
      <p>Доступные продукты:</p>
      <div>
        {/* здесь мы мапим базу данных и создаем карточки :) */}
        <div className='box'>
          <img src='https://www.delivery-club.ru/naturmort/62177a188acfd_480x300.jpg?resize=fill&width=960&height=960&gravity=ce&out=webp' />
          <h1 className='box-title'>не вкусная еда</h1>
          <p className='box-description'>еда не вкусная но вы ее купите </p>
          <button className='btn'></button>
          {/* кнопку (добавить в корзину) видет только юзер */}
          <button className='btn'></button>
        </div>
      </div>
    </section>
  );
}
