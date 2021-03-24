import React from 'react';
import { Link } from 'react-router-dom';

export default function TableRow(props) {
  const linkToProduct = `/catalog/${props.id}`;
  const {onRemove: handleRemove} = props;

  return (
    <tr>
      <th scope="row">{props.orderNumber + 1}</th>
      <td><Link to={linkToProduct}>{props.name}</Link></td>
      <td>{props.size}</td>
      <td>{props.quantity}</td>
      <td>{props.price} руб.</td>
      <td>{props.price * props.quantity} руб.</td>
      <td><button onClick={() => handleRemove(props.orderNumber)} className="btn btn-outline-danger btn-sm">Удалить</button></td>
    </tr>
  )
}
