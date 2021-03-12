import Banner from './components/Banner/Banner.jsx';
import Catalog from './components/MainPage/Catalog/Catalog.jsx';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import TopSales from './components/MainPage/TopSales/TopSales.jsx';

/*
? - Так, я так понял, что хэдер, футер и баннер - это вообще на каждой странице... глянь ещё раз тз и макеты, и,  вероятно, следует поменять логику отрисовки компонентов

- Далее сразу же навигацию по статичным страицам (и чтобы сама навигация была живая). И только потом бэкенд, данные, пропсы, мапы...

- С пропсами всегда проптайпс и дефолт пропс

1) Спросить у Эдгара про то, что скидал IMG в Public
2) Опять-таки - можно ли самому ковырять индекс в паблике... Ну пока так сделаю
3) Со скриптом внизу ХТМЛ-индекса пока не понял что делать. Позже поизучаю
*/

function WebStore() {
  return (
    <>
      <Header />
      <MainPage>
        <Banner />
        <TopSales />
        <Catalog />
      </MainPage>
      <Footer />
    </>
  );
}

export default WebStore;
