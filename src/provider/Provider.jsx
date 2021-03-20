import React from 'react'
import useJsonFetch from '../hooks/useJsonFetch.jsx'
import Context from '../contexts/Context';

export default function PostsProvider(props) {

  /*
  Использование
  const [, topItems] = useContext(Context);
  И лучше не массивом, а объектом. Хотя, если он будет только для корзины - это не важно
  */

  const ALL_ITEMS_LINK = "http://localhost:7070/api/items";
  const TOP_SALES_LINK = "http://localhost:7070/api/top-sales";
  const CATALOG_CATEGORIES_LINK = "http://localhost:7070/api/categories";
  
	const allItems = useJsonFetch(ALL_ITEMS_LINK);
  const topItems = useJsonFetch(TOP_SALES_LINK);
  const categories = useJsonFetch(CATALOG_CATEGORIES_LINK);


  const allData = [allItems, topItems, categories];

  return (
    <Context.Provider value={allData}>
      {props.children}
    </Context.Provider>
  )
}