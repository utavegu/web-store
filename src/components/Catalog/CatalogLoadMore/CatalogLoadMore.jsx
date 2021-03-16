import React from 'react'
import useJsonFetch from '../../../hooks/useJsonFetch'

export default function CatalogLoadMore() {

  // console.log(useJsonFetch("http://localhost:7070/api/items?offset=6"));

  const handleClick = () => {
    
  }


  return (
		<div className="text-center">
    	<button onClick={handleClick} className="btn btn-outline-primary">Загрузить ещё</button>
    </div>
  )
}
