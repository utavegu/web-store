import React, {useState, useContext} from 'react';
import { FetchError, getCartData, Preloader } from '../../common';
import CartTable from './CartTable';
import CartForm from './CartForm';
import Context from '../../contexts/Context';
import { useHistory } from 'react-router';

export default function Cart() {
  const {setProductList} = useContext(Context);
  const [sendError, setSendError] = useState(null);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const history = useHistory();

  const ORDER_LINK = "http://localhost:7070/api/order";
  const items = getCartData();
  let itemsForSend;
  if (items) {
    itemsForSend = items.map(item => ({
      id: item.id, 
      price: item.price, 
      count: item.quantity,
    }))
  }
    
  const handleSend = async (data) => {
    const body = {
      owner: {
        phone: data.phone.trim(),
        address: data.address.trim(),
      },
      items: itemsForSend,
    };

    try {
      setSendLoading(true);
      const response = await fetch(ORDER_LINK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        localStorage.removeItem('cart');
        setProductList([]);
        setSendSuccess(true);
        setTimeout(() => history.push('/'), 3000);
      };
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setSendError(error);
      console.dir(error);
    } finally {
      setSendLoading(false);
    }
  }

  return (
		<>
		  <CartTable />
      <CartForm onSend={handleSend} />
      {sendLoading && Preloader()}
      {sendError && FetchError(`Заказ не отправлен!`)}
      {sendSuccess && FetchError(`Заказ успешно отправлен!`)}
		</>
  )
}
