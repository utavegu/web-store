import React, { useState } from 'react'
import { getCartData } from '../common';
import Context from '../contexts/Context';

export default function PostsProvider(props) {

  const [query, setQuery] = useState("");

  const [urlParams, setUrlParams] = useState({
    category: 0,
    query: '',
    offset: 0,
  })

  const [productList, setProductList] = useState(getCartData());

  
  const allData = {
    query, setQuery,
    urlParams, setUrlParams,
    productList, setProductList,
  };

  return (
    <Context.Provider value={allData}>
      {props.children}
    </Context.Provider>
  )
}