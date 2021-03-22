import React, { useState, useContext, useRef } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import Context from '../../contexts/Context';

export default function Header() {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const {setQuery, setUrlParams} = useContext(Context);
  const searchForm = useRef(null);
  const searchField = useRef(null);

  const moveQueryToCatalog = () => {
    setQuery(searchText);
    setUrlParams({offset: 0, category: 0, query: searchText});
    setSearchText("");
    history.push("/catalog");
  } 

  const handleChange = ({ target }) => {
    setSearchText(target.value.trim());
  }

  const handleSearchIcon = () => {
    searchForm.current.classList.toggle("invisible");
    searchField.current.focus();
    if (searchText) {
      moveQueryToCatalog();
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchText) {
      moveQueryToCatalog();
    }
    searchForm.current.classList.add("invisible")
  }

  return (
		<header className="container">
			<div className="row">
				<div className="col">
					<nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink to="/" className="navbar-brand" exact>
              <img src="./img/header-logo.png" alt="Bosa Noga" />
            </NavLink>
						<div className="collapase navbar-collapse" id="navbarMain">
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
							<div>
								<div className="header-controls-pics">
									<div onClick={handleSearchIcon} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                  <NavLink to="/cart" className="nav-link">
                    <div className="header-controls-pic header-controls-cart">
                      <div className="header-controls-cart-full">1</div>
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </NavLink>
								</div>
									<form onSubmit={handleSubmit} ref={searchForm} data-id="search-form" className="header-controls-search-form form-inline invisible">
										<input onChange={handleChange} value={searchText} ref={searchField} className="form-control" placeholder="Поиск" />
									</form>
							</div>
						</div>
					</nav>
				</div>
			</div>
    </header>
  )
}
