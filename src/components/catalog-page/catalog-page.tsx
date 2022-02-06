import { useEffect, useState } from 'react';
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
import GuitarCard from '../guitar-card/guitar-card';
import { Guitar } from '../../types/guitar';
import ModalAddCartItem from '../modal-add-cart-item/modal-add-cart-item';

function CatalogPage(): JSX.Element {
  const [isModalAddCartOpen, setIsModalAddCartOpen] = useState(false);
  const [currentGuitar, setCurrentGuitar] = useState<Guitar | null>(null);

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
      <ModalAddCartItem
        isActive={isModalAddCartOpen}
        onClose={() => setIsModalAddCartOpen(false)}
        product={currentGuitar}
      />

      {catalogGuitars.map((guitar) => (
        <GuitarCard key={guitar.id} guitar={guitar} onAddCartItem={() => {
          setCurrentGuitar(guitar);
          setIsModalAddCartOpen(true);
        }}
        />
      ))}
    </>
  );
}

export default CatalogPage;
