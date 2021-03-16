import React, {useContext} from 'react';
import Context from '../../../contexts/Context';
import CatalogElements from '../../Catalog/CatalogElements/CatalogElements';


// Тебя тоже в утилджээс
function Preloader() {
  return (
    <div className="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default function TopSales() {

  const [, topItems] = useContext(Context);

  return (
    <section className="top-sales">
			<h2 className="text-center">Хиты продаж!</h2>

      
			
      {(topItems.data.length === 0) ? <Preloader /> : <CatalogElements items={topItems.data} />}
      {topItems.hasError && <div style={{color: "red", backgroundColor: "yellow", textAlign: "center", padding: 30, margin: 30, fontSize: 26, fontWeight: "bold"}}>Ошибка загрузки данных (хиты продаж): {topItems.hasError.message}</div>}
      {/* ВОТ ЭТУ БАТАРЕЮ НЕПЛОХО БЫ В УТИЛ УПИХАТЬ. КАК И ССЫЛКИ, ЕСЛИ С ЕНВ НЕ РАЗБЕРЕШЬСЯ */}
		
		</section>
  )
}
