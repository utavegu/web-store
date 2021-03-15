import React from 'react'
import useJsonFetch from '../hooks/useJsonFetch.jsx'
import Context from '../contexts/Context';

// Провайдер решил сделать один на все данные, ибо куча обёрток в главном компоненте мне как-то не по душе

export default function PostsProvider(props) {

  const ALL_ITEMS_LINK = "http://localhost:7070/api/items";
  const TOP_SALES_LINK = "http://localhost:7070/api/top-sales";
  
	const allItems = useJsonFetch(ALL_ITEMS_LINK);
  const topItems = useJsonFetch(TOP_SALES_LINK);


  const allData = [allItems, topItems];

  return (
    <Context.Provider value={allData}>
      {props.children}
    </Context.Provider>
  )
}