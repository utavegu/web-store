import React, {useContext} from 'react';
import { getCartData } from '../../common';
import CartTable from './CartTable';
import CartForm from './CartForm';
import Context from '../../contexts/Context';

export default function Cart() {
  const {setProductList} = useContext(Context);
  const ORDER_LINK = "http://localhost:7070/api/order";
  const items = getCartData();
  let itemsForSend;
  if (items) {
    itemsForSend = items.map(item => new Object({
      id: item.id, 
      price: item.price, 
      count: item.quantity,
  }))
  }
  
  const handleSend = (data) => {
    const body = {
      owner: {
        phone: data.phone.trim(),
        address: data.address.trim(),
      },
      items: itemsForSend,
    };

    console.log(body);

    fetch(ORDER_LINK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setProductList([]);
    localStorage.removeItem('cart');

    // "Не забудьте показать пользователю loader и сообщение об успехе."
    // Прикрутка лоадера и ошибки
    // Показ сообщения об успешной отправке и редирект на главную через 3 секунды
    // В последнюю очередь регулярку на телефон - пока будет мешать отладке. Да и вообще в ТЗ про него базара нет
  }

  return (
		<>
		  <CartTable />
      <CartForm onSend={handleSend} />
		</>
  )
}
