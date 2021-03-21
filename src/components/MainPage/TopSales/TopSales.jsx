import React, {useContext} from 'react';
import { FetchError, Preloader } from '../../../common';
import Context from '../../../contexts/Context';
import CatalogElements from '../../Catalog/CatalogElements/CatalogElements';

export default function TopSales() {

  const [, topItems] = useContext(Context);

  return (
    <section className="top-sales">
			<h2 className="text-center">Хиты продаж!</h2>
      {(topItems.data.length === 0) ? Preloader() : <CatalogElements items={topItems.data} />}
      {topItems.hasError && FetchError(`Ошибка загрузки данных (хиты продаж): ${topItems.hasError.message}`)}
		</section>
  )
}
