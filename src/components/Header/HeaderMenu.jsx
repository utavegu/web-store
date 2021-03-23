import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HeaderMenu() {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item" activeclassname="nav-item active">
        <NavLink to="/" className="nav-link" exact>Главная</NavLink>
      </li>
      <li className="nav-item" activeclassname="nav-item active">
        <NavLink to="/catalog" className="nav-link">Каталог</NavLink>
      </li>
      <li className="nav-item" activeclassname="nav-item active">
        <NavLink to="/about" className="nav-link">О магазине</NavLink>
      </li>
      <li className="nav-item" activeclassname="nav-item active">
        <NavLink to="/contacts" className="nav-link">Контакты</NavLink>
      </li>
    </ul>
  )
}
