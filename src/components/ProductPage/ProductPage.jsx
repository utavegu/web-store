import React, { useState, useEffect } from 'react';
import { FetchError, Preloader } from '../../common';
import ProductPageItem from './ProductPageItem';

export default function ProductPage({match, history}) {  
  const itemUrl = `http://localhost:7070/api/items/${match.params.id}`;

  const [item, setItem] = useState(null);
  const [itemError, setItemError] = useState(null);

  useEffect(
		() => {
			const fetchData = async () => {
				try {
					const response = await fetch(itemUrl);
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					const data = await response.json();
					setItem(data);
					setItemError(null);
				} 
				catch (e) {
					setItemError(e);
					console.dir(e.message);
				} 
			};
			fetchData();
		},
		[itemUrl]
	);

  return (
    <>
      {(!item) ? Preloader() : <ProductPageItem item={item} history={history}/>}
      {itemError && FetchError(`Ошибка загрузки данных: ${itemError.message}`)}
    </>
  )
}
