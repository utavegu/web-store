import React from 'react'
import TableRow from './TableRow';

export default function Cart() {
	/* В принципе можно разбить на 2 компонента, но пока не вижу смысла */
  const getCartData = () => JSON.parse(localStorage.getItem('cart'));

  const basketGoods = getCartData();
  
  console.log(basketGoods);

  return (
		<>

		  <section className="cart">
				<h2 className="text-center">Корзина</h2>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Название</th>
							<th scope="col">Размер</th>
							<th scope="col">Кол-во</th>
							<th scope="col">Стоимость</th>
							<th scope="col">Итого</th>
							<th scope="col">Действия</th>
						</tr>
					</thead>
					<tbody>
						<TableRow {...basketGoods}/>
						<tr>
							<td colSpan="5" className="text-right">Общая стоимость</td>
							<td>Сумма всех "Итого"</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section className="order">
				<h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{maxWidth: 30+'rem', margin: '0 auto'}}>
					<form className="card-body">
						<div className="form-group">
							<label htmlFor="phone">Телефон</label>
							<input className="form-control" id="phone" placeholder="Ваш телефон" />
						</div>
						<div className="form-group">
							<label htmlFor="address">Адрес доставки</label>
							<input className="form-control" id="address" placeholder="Адрес доставки" />
						</div>
						<div className="form-group form-check">
							<input type="checkbox" className="form-check-input" id="agreement" />
							<label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
						</div>
						<button type="submit" className="btn btn-outline-secondary">Оформить</button>
					</form>
				</div>
			</section> 

		</>
  )
}
