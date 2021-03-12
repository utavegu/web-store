import React from 'react'

/* ПРОПТАЙПС! ДЕФОЛТ ПРОПС! */

export default function Main(props) {
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
