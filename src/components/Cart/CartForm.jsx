import React, {useState} from 'react';

export default function CartForm({onSend: handleSend}) {

  let [form, setForm] = useState({
    phone: '',
    address: '',
    agreement: false,
  });
  
  const handleChange = ({target}) => {
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm(prevForm => ({...prevForm, [name]: value}));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    handleSend(form);
    setForm({
      phone: '',
      address: '',
      agreement: false,
    })
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{maxWidth: 30+'rem', margin: '0 auto'}}>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input 
              onChange={handleChange}
              value={form.phone}
              name="phone"
              className="form-control"
              id="phone"
              placeholder="Ваш телефон"
              pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              onChange={handleChange}
              value={form.address}
              name="address"
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
              required
            />
          </div>
          <div className="form-group form-check">
            <input
              onChange={handleChange}
              checked={form.agreement}
              name="agreement"
              type="checkbox"
              className="form-check-input"
              id="agreement"
              required
            />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button type="submit" className="btn btn-outline-secondary">Оформить</button>
        </form>
      </div>
    </section> 
  )
}
