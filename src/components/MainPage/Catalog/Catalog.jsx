import React from 'react'
import CatalogCategories from './CatalogCategories/CatalogCategories'
import CatalogElements from './CatalogElements/CatalogElements'
import CatalogLoadMore from './CatalogLoadMore/CatalogLoadMore'

function CatalogSearch() {
  return (
    <form className="catalog-search-form form-inline">
      <input className="form-control" placeholder="Поиск" />
    </form>
  )
}

export default function Catalog(props) {
  let isCatalog;
  try {
    isCatalog = props.match.path;
  } catch (error) {
    // Лучшее, до чего я додумался =)
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {/* ЕСЛИ ГРУЗИТСЯ */}
      {/*
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      */}

      {/* ЕСЛИ ПОДГРУЗИЛСЯ */}
      {isCatalog && <CatalogSearch />}
      <CatalogCategories />
      <CatalogElements />
      <CatalogLoadMore />
      
    </section>
  )
}
