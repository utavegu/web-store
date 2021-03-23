import React from 'react';
import { Link } from 'react-router-dom';

export default function TableRow(props) {
  const linkToProduct = `/catalog/${props.id}`

  return (
    <tr>
      <th scope="row">1</th>
      <td><Link to={linkToProduct}>{props.name}</Link></td>
      <td>{props.size}</td>
      <td>{props.quantity}</td>
      <td>{props.price} руб.</td>
      <td>Стоимость*Количество</td>
      <td><button className="btn btn-outline-danger btn-sm">Удалить</button></td>
    </tr>
  )
}
