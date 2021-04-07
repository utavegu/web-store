import React from 'react';
import { FetchError, Preloader } from '../../../common';
import useJsonFetch from '../../../hooks/useJsonFetch';
import CatalogElements from '../../Catalog/CatalogElements/CatalogElements';

export default function TopSales() {
  const TOP_SALES_LINK = "http://localhost:7070/api/top-sales";
  const {data: items, hasError: error} = useJsonFetch(TOP_SALES_LINK);

  return (
    <section className="top-sales">
      {(!items) ? Preloader() : (
        (!items.length) 
        ? 
        <></>
        : 
        <>
          <h2 className="text-center">Хиты продаж!</h2>
          <CatalogElements items={items} />
        </>
      )}
      {error && FetchError(`Ошибка загрузки данных (хиты продаж): ${error.message}`)}
		</section>
  )
}
