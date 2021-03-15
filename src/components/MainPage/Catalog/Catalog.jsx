import React, {useContext} from 'react'
import CatalogCategories from './CatalogCategories/CatalogCategories'
import CatalogElements from './CatalogElements/CatalogElements'
import CatalogLoadMore from './CatalogLoadMore/CatalogLoadMore'
import Context from '../../../contexts/Context';

function CatalogSearch() {
  return (
    <form className="catalog-search-form form-inline">
      <input className="form-control" placeholder="Поиск" />
    </form>
  )
}

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

export default function Catalog(props) {
  const [allItems] = useContext(Context);

  let isCatalog;
  try {
    isCatalog = props.match.path;
  } catch (error) {
    // Лучшее, до чего я додумался =)
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {isCatalog && <CatalogSearch />}
      <CatalogCategories />
      {(allItems.data.length === 0) ? <Preloader /> : <CatalogElements items={allItems.data} />}
      {allItems.hasError && <div style={{color: "red", backgroundColor: "yellow", textAlign: "center", padding: 30, margin: 30, fontSize: 26, fontWeight: "bold"}}>Ошибка загрузки данных: {allItems.hasError.message}</div>}
      {/* ВОТ ЭТУ БАТАРЕЮ НЕПЛОХО БЫ В УТИЛ УПИХАТЬ. КАК И ССЫЛКИ, ЕСЛИ С ЕНВ НЕ РАЗБЕРЕШЬСЯ */}
      <CatalogLoadMore />
      
    </section>
  )
}
