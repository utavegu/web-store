import React from 'react'

export default function TopSales() {
  return (
    <section className="top-sales">
			<h2 className="text-center">Хиты продаж!</h2>
			
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
			<div className="row">
				<div className="col-4">
					<div className="card">
						<img src="https://cdn-images.farfetch-contents.com/12/93/06/52/12930652_13567910_1000.jpg"
								className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
						<div className="card-body">
							<p className="card-text">Босоножки 'MYER'</p>
							<p className="card-text">34 000 руб.</p>
							<a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
						</div>
					</div>
				</div>
				<div className="col-4">
					<div className="card">
						<img src="https://cdn-images.farfetch-contents.com/12/94/66/72/12946672_13518465_1000.jpg"
								className="card-img-top img-fluid" alt="Босоножки 'Keira'" />
						<div className="card-body">
							<p className="card-text">Босоножки 'Keira'</p>
							<p className="card-text">7 600 руб.</p>
							<a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
						</div>
					</div>
				</div>
				<div className="col-4">
					<div className="card">
						<img src="https://cdn-images.farfetch-contents.com/12/99/04/32/12990432_13705715_1000.jpg"
								className="card-img-top img-fluid" alt="Супергеройские кеды" />
						<div className="card-body">
							<p className="card-text">Супергеройские кеды</p>
							<p className="card-text">1 400 руб.</p>
							<a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
						</div>
					</div>
				</div>
		  </div>
		
		</section>
  )
}
