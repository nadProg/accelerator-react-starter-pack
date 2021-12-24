import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogGuitars } from '../../store/guitars/guitars-api-actions';
import {
  getCatalogGuitarsData,
  getCatalogGuitarsStatus
} from '../../store/guitars/guitars-selectors';
import {
  isFetchError,
  isFetchIdle,
  isFetchNotReady
} from '../../utils/fetched-data';
import InfoScreen from '../info-screen/info-screen';
import Loader from '../loader/loader';
import ProductCard from '../product-card/product-card';

function CatalogPage(): JSX.Element {
  const catalogGuitars = useSelector(getCatalogGuitarsData);
  const catalogGuitarsStatus = useSelector(getCatalogGuitarsStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetchIdle(catalogGuitarsStatus)) {
      dispatch(getCatalogGuitars());
    }
  }, [catalogGuitarsStatus]);

  if (isFetchNotReady(catalogGuitarsStatus)) {
    return (
      <Loader />
    );
  }

  if (isFetchError(catalogGuitarsStatus) || !catalogGuitars) {
    return (
      <InfoScreen>
        <div data-testid="catalog-error-message">
          <h2>Ошибка загрузки!</h2>
          <p>Не удалось загрузить каталог</p>
        </div>
      </InfoScreen>
    );
  }

  return (
    <>
      {catalogGuitars.map((guitar) => (
        <ProductCard key={guitar.id} product={guitar} />
      ))}
    </>
  );
}

export default CatalogPage;
