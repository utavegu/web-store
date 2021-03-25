import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import noPhoto from '../../../../img/noimage2.png';

export default function CatalogItem({item}) {
  const checkImage = ({target}) => {
    target.src = noPhoto;
  }

	return (
		<div className="col-4">
			<div className="card catalog-item-card">
        <div className="card-img-wrapper">
				<img 
          className="card-img-top img-fluid"
          src={item.images[0]}
          onError={(evt) => checkImage(evt)}
          alt={item.title}
        />
        </div>
				<div className="card-body">
					<p className="card-text">{item.title}</p>
					<p className="card-text">{item.price}</p>
          <Link to={`/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</Link>
				</div>
			</div>
		</div>
	)
}
