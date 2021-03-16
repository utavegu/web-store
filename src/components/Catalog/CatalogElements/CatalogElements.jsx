import React from 'react'
import CatalogItem from './CatalogItem/CatalogItem'

export default function CatalogElements({items}) {
	return (
		<div className="row">
      {items.map(item => <CatalogItem key={item.id} item={item} />)}
    </div>
	)
}
