import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function TableRow(props) {
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

TableRow.propTypes = {
  onRemove: PropTypes.func.isRequired,
  orderNumber: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
};

export default TableRow;