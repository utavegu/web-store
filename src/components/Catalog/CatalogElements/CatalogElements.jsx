import React from 'react';
import CatalogItem from './CatalogItem/CatalogItem';
import PropTypes from 'prop-types';

function CatalogElements({items}) {
	return (
		<div className="row">
      {items.map(item => <CatalogItem key={item.id} item={item} />)}
    </div>
	)
}

CatalogElements.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CatalogElements;
