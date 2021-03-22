import React, { useState } from 'react'
import Context from '../contexts/Context';

export default function PostsProvider(props) {

  const [query, setQuery] = useState("");
  const [urlParams, setUrlParams] = useState({
    category: 0,
    query: '',
    offset: 0,
  })

  const allData = {
    query, setQuery,
    urlParams, setUrlParams,
  };

  return (
    <Context.Provider value={allData}>
      {props.children}
    </Context.Provider>
  )
}