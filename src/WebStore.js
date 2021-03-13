import Banner from './components/Banner/Banner.jsx';
import Catalog from './components/MainPage/Catalog/Catalog.jsx';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import AboutPage from './components/AboutPage/AboutPage.jsx'
import ContactsPage from './components/ContactsPage/ContactsPage.jsx'
import Wrapper from './components/Wrapper/Wrapper.jsx';
import Page404 from './components/Page404/Page404.jsx';
import Cart from './components/Cart/Cart.jsx';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

/*
- Бэкенд (обязательно всё красиво делай - с трайкэтчаси и всеми возможными вариантами развития событий), данные, пропсы, мапы...

- С пропсами всегда проптайпс и дефолт пропс

- Определи в каком компоненте должны находиться данные. Но файд дата всё равно оставь, так как это понадобится для портфолио. Ну и РАЗНЫЕ лоадеры(прелоадеры?) на этом же этапе прикрутишь

- Хиты продаж - это тот же массив данных, что и для каталога, но с тру в булевом поле, которое говорит о том, что товар - хит продаж

1) Спросить у Эдгара про то, что скидал IMG в Public
2) Опять-таки - можно ли самому ковырять индекс в паблике... Ну пока так сделаю
3) Со скриптом внизу ХТМЛ-индекса пока не понял что делать. Позже поизучаю
4) Условный рендеринг в каталоге
*/

function WebStore() {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Banner />
        <Switch>
          <Route path="/catalog" component={Catalog} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contacts" component={ContactsPage} />
          <Route path="/cart" component={Cart} />
          <Route path="/" exact component={MainPage} />
          <Route path="*" component={Page404} />
        </Switch>
      </Wrapper>
      <Footer />
    </Router>
  );
}

export default WebStore;
