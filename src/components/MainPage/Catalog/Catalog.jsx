import React from 'react'
import CatalogCategories from './CatalogCategories/CatalogCategories'
import CatalogElements from './CatalogElements/CatalogElements'
import CatalogLoadMore from './CatalogLoadMore/CatalogLoadMore'

export default function Catalog() {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {/* ЕСЛИ ГРУЗИТСЯ */}
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* ЕСЛИ ПОДГРУЗИЛСЯ */}
      {/*
      <CatalogCategories />
      <CatalogElements />
      <CatalogLoadMore />
      */}
    </section>
  )
}
