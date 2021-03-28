import React from 'react';
import { Link } from 'react-router-dom';
import { checkImage } from '../../../../common';
import PropTypes from 'prop-types';

function CatalogItem({item}) {
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

CatalogItem.propTypes = {
  item: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  })
};

export default CatalogItem;
