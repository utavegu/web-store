import React from 'react'

export default function Wrapper(props) {
  return (
    <main className="container">
			<div className="row">
				<div className="col">
          {props.children}
        </div>
			</div>
    </main>
  )
}
