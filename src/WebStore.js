import Banner from './components/Banner/Banner.jsx';
import Catalog from './components/Catalog/Catalog.jsx';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import AboutPage from './components/AboutPage/AboutPage.jsx'
import ContactsPage from './components/ContactsPage/ContactsPage.jsx'
import Wrapper from './components/Wrapper/Wrapper.jsx';
import Page404 from './components/Page404/Page404.jsx';
import Cart from './components/Cart/Cart.jsx';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Provider from './provider/Provider';

/*

- Короче те компоненты, что без подкатегорий - высовывай наружу, а тем, что с категориями - одну папку на всех
А дальше уже начались сложные задачи... давай решать их по одной:
- Реализовать поиск
- Заказ отдельного товара. Сначала по кнопке заказать, далее действия в корзине

НУ И ГДЕ-ТО ТУТ НАДО БУДЕТ ПОЧИСТИТЬ КОД, СДАТЬ НА ПЕРВУЮ ПРОВЕРКУ И ЗАДАТЬ ВОПРОСЫ ПО ТЕМ МЕСТАМ, ГДЕ НЕ ПОЛУЧИЛОСЬ

- Бэкенд (обязательно всё красиво делай - с трайкэтчаси и всеми возможными вариантами развития событий), данные, пропсы, мапы...

- С пропсами всегда проптайпс и дефолт пропс

- Определи в каком компоненте должны находиться данные. Разные лоадеры(прелоадеры?) на этом же этапе прикрутишь

- Хиты продаж - это тот же массив данных, что и для каталога, но с тру в булевом поле, которое говорит о том, что товар - хит продаж

- Помни про задачи внутри каталог-айтема

- Так, давай-ка вспоминай, как енв-переменные создавать... шестая глава (в провайдере задействовать)

- Походу надо навести порядок в структуре компонентов 

- Не забывай в нетворк поглядывать в процессе работы

1) Спросить у Эдгара про то, что скидал IMG в Public
2) Опять-таки - можно ли самому ковырять индекс в паблике... Ну пока так сделаю
3) Со скриптом внизу ХТМЛ-индекса пока не понял что делать. Позже поизучаю
4) Условный рендеринг в каталоге
5) Как передать пропсы в компонент, если там уже роутовские дела типа матч и локейшн?
6) Один контекст и провайдер на всё приложение
7) Со структурой нахерачил. Сначала хотел цсс-модули, но расхотел. И вложенность папок мне кажется сомнительным решением.
*/

function WebStore() {
  return (
    <Provider>
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
    </Provider>
  );
}

export default WebStore;
