import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogPage from '../catalog-page/catalog-page';
import CatalogSort from '../catalog-sort/catalog-sort';

function CatalogScreen(): JSX.Element {
  return (
    <>
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <a className="link" href="./main.html">
            Главная
          </a>
        </li>
        <li className="breadcrumbs__item">
          <a className="link">Каталог</a>
        </li>
      </ul>
      <div className="catalog">
        <CatalogFilter />
        <CatalogSort />
        <div
          className="cards catalog__cards"
          style={{ position: 'relative', minWidth: '100%', minHeight: '100%' }}
        >
          <CatalogPage />
        </div>
        <div className="pagination page-content__pagination">
          <ul className="pagination__list">
            <li className="pagination__page pagination__page--active">
              <a className="link pagination__page-link" href="1">
                1
              </a>
            </li>
            <li className="pagination__page">
              <a className="link pagination__page-link" href="2">
                2
              </a>
            </li>
            <li className="pagination__page">
              <a className="link pagination__page-link" href="3">
                3
              </a>
            </li>
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" href="2">
                Далее
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default CatalogScreen;
