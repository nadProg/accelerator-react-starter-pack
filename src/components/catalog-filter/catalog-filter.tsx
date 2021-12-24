import { ChangeEventHandler, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStatus } from '../../constants/common';
import {
  GuitarTypeValue,
  HumanizedGuitars,
  STRING_COUNT_VALUES
} from '../../constants/guitar';
import {
  AddFilterGuitarType,
  AddFilterStringCount,
  RemoveFilterGuitarType,
  RemoveFilterStringCount,
  SetFilterMaxPrice,
  SetFilterMinPrice
} from '../../store/filter/filter-actions';
import {
  getFilterMaxPrice,
  getFilterMinPrice,
  getFilterPriceLimits,
  getFilterStringCounts,
  getFilterTypes
} from '../../store/filter/filter-selectors';
import { setCatalogGuitarsStatus } from '../../store/guitars/guitars-actions';
import { getAllGuitars } from '../../store/guitars/guitars-api-actions';
import { getAllGuitarsData } from '../../store/guitars/guitars-selectors';
import { GuitarType, StringCountType } from '../../types/guitar';

function CatalogFilter(): JSX.Element {
  const minPrice = useSelector(getFilterMinPrice);
  const maxPrice = useSelector(getFilterMaxPrice);
  const types = useSelector(getFilterTypes);
  const stringCounts = useSelector(getFilterStringCounts);
  const priceLimits = useSelector(getFilterPriceLimits);

  const allGuitars = useSelector(getAllGuitarsData);

  const dispatch = useDispatch();

  const handleMinPriceChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    if (evt.target.value === '') {
      dispatch(SetFilterMinPrice(''));
      return;
    }

    const currentPrice = Number(evt.target.value);

    let newPrice: number;

    if (maxPrice) {
      newPrice = currentPrice > maxPrice ? maxPrice : currentPrice;
    } else {
      newPrice = currentPrice;
    }

    dispatch(SetFilterMinPrice(newPrice));
  };

  const handleMaxPriceChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    if (evt.target.value === '') {
      dispatch(SetFilterMaxPrice(''));
      return;
    }

    const currentPrice = Number(evt.target.value);

    let newPrice: number;

    if (minPrice) {
      newPrice = currentPrice < minPrice ? minPrice : currentPrice;
    } else {
      newPrice = currentPrice;
    }
    dispatch(SetFilterMaxPrice(newPrice));
  };

  const handleTypeChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const guitarType = evt.target.value as GuitarType;
    if (evt.target.checked) {
      dispatch(AddFilterGuitarType(guitarType));
      return;
    }

    dispatch(RemoveFilterGuitarType(guitarType));
  };

  const handleStringCountChange: ChangeEventHandler<HTMLInputElement> = (
    evt,
  ) => {
    const stringCount = Number(evt.target.value) as StringCountType;
    if (evt.target.checked) {
      dispatch(AddFilterStringCount(stringCount));
      return;
    }

    dispatch(RemoveFilterStringCount(stringCount));
  };

  useEffect(() => {
    dispatch(setCatalogGuitarsStatus(FetchStatus.Idle));
  }, [types, minPrice, maxPrice, stringCounts]);

  useEffect(() => {
    if (!allGuitars) {
      dispatch(getAllGuitars());
    }
  }, [allGuitars]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              value={minPrice}
              type="number"
              placeholder={String(priceLimits.min)}
              id="priceMin"
              name="от"
              min={0}
              max={priceLimits.min}
              onChange={handleMinPriceChange}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              value={maxPrice}
              type="number"
              placeholder={String(priceLimits.max)}
              id="priceMax"
              name="до"
              min={0}
              max={priceLimits.max}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {Object.values(GuitarTypeValue).map((guitarType) => (
          <div
            key={guitarType}
            className="form-checkbox catalog-filter__block-item"
          >
            <input
              className="visually-hidden"
              type="checkbox"
              id={guitarType}
              name={guitarType}
              value={guitarType}
              checked={types.includes(guitarType)}
              onChange={handleTypeChange}
            />
            <label htmlFor={guitarType}>{HumanizedGuitars[guitarType]}</label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
          Количество струн
        </legend>
        {STRING_COUNT_VALUES.map((stringCount) => {
          const id = `${stringCount}-strings`;
          return (
            <div key={id} className="form-checkbox catalog-filter__block-item">
              <input
                className="visually-hidden"
                type="checkbox"
                id={id}
                name={id}
                value={stringCount}
                checked={stringCounts.includes(stringCount)}
                onChange={handleStringCountChange}
              />
              <label htmlFor={id}>{stringCount}</label>
            </div>
          );
        })}
      </fieldset>
    </form>
  );
}

export default CatalogFilter;
