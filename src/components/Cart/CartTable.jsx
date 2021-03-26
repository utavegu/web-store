import React, {useContext} from 'react';
import Context from '../../contexts/Context';
import TableRow from './TableRow';
import { getCartData, setCartData } from '../../common';

export default function CartTable() {

  const {productList, setProductList} = useContext(Context);

  const handleRemove = orderNumber => {
    setProductList(prevList => prevList.filter((_, currentId) => currentId !== orderNumber));
    setCartData(productList.filter((_, currentId) => currentId !== orderNumber));
  }

  let total;
  (getCartData() !== null)
  ?
  total = productList
    .map(elem => elem.price * elem.quantity)
    .reduce((sum, elem) => sum + elem, 0)
  :
  total = 0;

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {
            productList 
            &&
            productList.map((item, id) => <TableRow 
              onRemove={handleRemove}
              key={id}
              orderNumber={id}
              {...item}
            />)
          }
          <tr>
            <td colSpan="5" className="text-right">Общая стоимость</td>
            <td>{total} руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
