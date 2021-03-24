import React from 'react';
import { Link } from 'react-router-dom';

export default function TableRow(props) {
  const linkToProduct = `/catalog/${props.id}`
  // Так, тут наверное обджект асссайн нужно сделать, ибо изменяю пропсы... хотя не изменяю же.. Не, теперь вот изменяю... Спроси у Макса про эту концепцию, как он её понимает.

  return (
    <tr>
      <th scope="row">{props.orderNumber + 1}</th>
      <td><Link to={linkToProduct}>{props.name}</Link></td>
      <td>{props.size}</td>
      <td>{props.quantity}</td>
      <td>{props.price} руб.</td>
      <td>{props.price * props.quantity} руб.</td>
      <td><button className="btn btn-outline-danger btn-sm">Удалить</button></td>
    </tr>
  )
}
