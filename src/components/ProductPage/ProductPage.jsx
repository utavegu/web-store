import React from 'react'

/*
ЗАКАЗ ТОВАРА
2) При загрузке показывается лоадер (ну это, я так полагаю, когда буду ссылку ниже грузить)
3) Для загрузки полной информации о товаре нужно сделать GET http://localhost:7070/api/items/:id, где id - это id товара
4) Слева выводится картинка (в ответе может быть несколько картинок - вы берёте первую)
5) Сбоку выводится табличка с данными (все необходимые данные перечислены). Других - не нужно. Если каких-то в приходящем товаре не будет, то просто оставляете поле пустым.
6) Размеры - выводятся все доступные размеры (у которых флаг available равен true). По умолчанию ни один размер не выбран. После выбора он становится выделенным, как на скриншоте. Важно: кнопка "В корзину" активируется только тогда, когда есть размеры в наличии и выбран конкретный размер. Размер можно выбрать только один.
7) Количество - от 1 до 10.
8) Если ни одного размера не доступно, блок Количество и кнопка "В корзину" не отображаются.
9) После нажатия на кнопку "В корзину" пользователь перемещается в страницу корзины /cart.html.
*/

export default function ProductPage({match}) {
  /* 
  Так, вот надо, чтобы при заходе на эту страницу логотип не отваливался...
  */

  console.log(match.params.id );

  return (
		<section className="catalog-item">
			<h2 className="text-center">Босоножки 'MYER'</h2>
			<div className="row">
					<div className="col-5">
						<img src="https://cdn-images.farfetch-contents.com/12/93/06/52/12930652_13567910_1000.jpg"
									className="img-fluid" alt="" />
					</div>
					<div className="col-7">
						<table className="table table-bordered">
							<tbody>
								<tr>
									<td>Артикул</td>
									<td>1000046</td>
								</tr>
								<tr>
									<td>Производитель</td>
									<td>PAUL ANDREW</td>
								</tr>
								<tr>
									<td>Цвет</td>
									<td>Чёрный</td>
								</tr>
								<tr>
									<td>Материалы</td>
									<td>Кожа</td>
								</tr>
								<tr>
									<td>Сезон</td>
									<td>Лето</td>
								</tr>
								<tr>
									<td>Повод</td>
									<td>Прогулка</td>
								</tr>
							</tbody>
						</table>
							<div className="text-center">
								<p>Размеры в наличии: 
									<span className="catalog-item-size selected">18 US</span>
									<span className="catalog-item-size">20 US</span>
								</p>
								<p>Количество:
									<span className="btn-group btn-group-sm pl-2">
										<button className="btn btn-secondary">-</button>
										<span className="btn btn-outline-primary">1</span>
										<button className="btn btn-secondary">+</button>
									</span>
								</p>
							</div>
							<button className="btn btn-danger btn-block btn-lg">В корзину</button>
					</div>
			</div>
		</section>
  )
}
