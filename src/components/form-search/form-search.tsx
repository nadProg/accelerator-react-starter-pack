import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { ACTIVE_COLOR, KeyCode } from '../../constants/common';
import { AppRoute } from '../../constants/endpoints';
import { SEARCH_LIST_LENGTH } from '../../constants/guitar';
import { getGuitarsSimilarToName } from '../../store/guitars/guitars-api-actions';
import { getFoundGuitarsData } from '../../store/guitars/guitars-selectors';
import { getChangeArrayIndex } from '../../utils/common';

function FormSearch() {
  const history = useHistory();
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const foundGuitars = useSelector(getFoundGuitarsData);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();

  const resetList = () => {
    setIsFocused(false);
    setCurrentIndex(null);
  };

  const handleWindowClick = () => {
    resetList();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleItemLinkClick = () => {
    resetList();
  };

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.target;
    setCurrentIndex(null);
    setInputValue(value);
    dispatch(getGuitarsSimilarToName(value));
  };

  const handleFormSearchClick: MouseEventHandler = (evt) => {
    evt.stopPropagation();
  };

  const handleFormSearchKeydown: KeyboardEventHandler = (evt) => {
    switch (evt.code) {
      case KeyCode.ArrowDown:
        setCurrentIndex(getChangeArrayIndex(foundGuitars, 'increase'));
        break;
      case KeyCode.ArrowUp:
        setCurrentIndex(getChangeArrayIndex(foundGuitars, 'decrease'));
        break;
      case KeyCode.Enter:
        if (
          currentIndex !== null &&
          foundGuitars &&
          foundGuitars[currentIndex]
        ) {
          history.push(AppRoute.Card(foundGuitars[currentIndex].id));
          itemsRef.current[currentIndex]?.focus();
          resetList();
        }
        break;
      default:
        break;
    }
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
  };

  if (listRef.current) {
    if (
      currentIndex !== null &&
      currentIndex + 1 > SEARCH_LIST_LENGTH &&
      itemsRef.current[currentIndex]
    ) {
      listRef.current.scrollTop =
        (itemsRef.current[currentIndex] as HTMLElement).offsetHeight *
        (currentIndex + 1 - SEARCH_LIST_LENGTH);
    } else {
      listRef.current.scrollTop = 0;
    }
  }

  return (
    <div
      className="form-search"
      onKeyDown={handleFormSearchKeydown}
      onClick={handleFormSearchClick}
    >
      <form className="form-search__form" onSubmit={handleFormSubmit}>
        <button
          className="form-search__submit"
          type="submit"
          data-testid="search-submit-button"
        >
          <svg
            className="form-search__icon"
            width="14"
            height="15"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          value={inputValue}
          autoComplete="off"
          placeholder="что вы ищите?"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          data-testid="search-input"
        />
        <label className="visually-hidden" htmlFor="search">
          Поиск
        </label>
      </form>
      {isFocused && foundGuitars && !!foundGuitars.length && (
        <ul
          className="form-search__select-list"
          style={{ zIndex: 1, transition: 'transform 300ms', translate: '' }}
          ref={listRef}
        >
          {foundGuitars?.map((guitar, index) => (
            <li
              key={guitar.id}
              ref={(node) => (itemsRef.current[index] = node)}
              className="form-search__select-item"
              style={{ color: currentIndex === index ? ACTIVE_COLOR : '' }}
              tabIndex={0}
              onClick={handleItemLinkClick}
            >
              <NavLink
                to={AppRoute.Card(guitar.id)}
                style={{ font: 'inherit', color: 'inherit' }}
                data-testid="found-guitar-link"
              >
                {guitar.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FormSearch;
