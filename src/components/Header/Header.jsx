import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderControls from './HeaderControls';
import HeaderMenu from './HeaderMenu';

export default function Header() {
  return (
		<header className="container">
			<div className="row">
				<div className="col">
					<nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink to="/" className="navbar-brand" exact>
              <img src="./img/header-logo.png" alt="Bosa Noga" />
            </NavLink>
						<div className="collapase navbar-collapse" id="navbarMain">
							<HeaderMenu />
							<HeaderControls />
						</div>
					</nav>
				</div>
			</div>
    </header>
  )
}
