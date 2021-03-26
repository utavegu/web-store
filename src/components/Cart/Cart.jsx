import React from 'react';
import { getCartData } from '../../common';
import CartTable from './CartTable';
import CartForm from './CartForm';

export default function Cart() {

  const ORDER_LINK = "http://localhost:7070/api/order";

  const items = getCartData();
  console.log(items);
  // Так, соберись, что за тупка-то... >_<
  // itemsForSend = items.map(item => {{id: item.id, price: item.price, }})

  const handleSend = (data) => {
    const body = {
      owner: {
        phone: data.phone.trim(),
        address: data.address.trim(),
      },
      items: [{
        id: 1,
        price: 34000,
        count: 1,
      }]
      // items: getCartData(),
    };

    console.log(body);

    fetch(ORDER_LINK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Очистка полей формы
    // Очистка корзины
    // "После успешного оформления заказа все данные корзины должны быть вычищены из state и из localStorage."
    // "Не забудьте показать пользователю loader и сообщение об успехе."
    // Прикрутка лоадера и ошибки
    // Показ сообщения об успешной отправке и редирект на главную через 3 секунды
  }

  return (
		<>
		  <CartTable />
      <CartForm onSend={handleSend} />
		</>
  )
}
