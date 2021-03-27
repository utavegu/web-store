import React, {useState, useEffect} from 'react';
import { FetchError, Preloader } from '../../../common';
import CatalogElements from '../../Catalog/CatalogElements/CatalogElements';

export default function TopSales() {
  const [topSales, setTopSales] = useState(null);
  const [topSalesError, setTopSalesError] = useState(null);

  const TOP_SALES_LINK = "http://localhost:7070/api/top-sales";

  useEffect(
		() => {
			const fetchData = async () => {
				try {
					const response = await fetch(TOP_SALES_LINK);
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					const data = await response.json();
					setTopSales(data);
					setTopSalesError(null);
				} 
				catch (e) {
					setTopSalesError(e);
					console.dir(e.message);
				} 
			};
			fetchData();
		},
		[TOP_SALES_LINK]
	);

  return (
    <section className="top-sales">
      {(!topSales) ? Preloader() : (
        (!topSales.length) 
        ? 
        <></>
        : 
        <>
          <h2 className="text-center">Хиты продаж!</h2>
          <CatalogElements items={topSales} />
        </>
      )}
      {topSalesError && FetchError(`Ошибка загрузки данных (хиты продаж): ${topSalesError.message}`)}
		</section>
  )
}
