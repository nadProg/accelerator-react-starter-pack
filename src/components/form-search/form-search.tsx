import classNames from 'classnames';
import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Direction, KeyCode } from '../../constants/common';
import { AppRoute } from '../../constants/endpoints';
import { SEARCH_LIST_LENGTH } from '../../constants/search';
import { useDebounce } from '../../hooks/use-debounce';
import { getGuitarsSimilarToName } from '../../store/guitars/guitars-api-actions';
import { getFoundGuitarsData } from '../../store/guitars/guitars-selectors';
import { getChangeArrayIndex } from '../../utils/common';
import { sortByNameLike } from '../../utils/guitar';
import styles from './form-search.module.css';

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

  const fetchSimilarGuitarDebounced = useDebounce((value: string) =>
    dispatch(getGuitarsSimilarToName(value)),
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.target;
    setCurrentIndex(null);
    setInputValue(value);
    fetchSimilarGuitarDebounced(value);
  };

  const handleFormSearchClick: MouseEventHandler = (evt) => {
    evt.stopPropagation();
  };

  const handleFormSearchKeydown: KeyboardEventHandler = (evt) => {
    switch (evt.code) {
      case KeyCode.ArrowDown:
        setCurrentIndex(getChangeArrayIndex(foundGuitars, Direction.Increase));
        break;
      case KeyCode.ArrowUp:
        setCurrentIndex(getChangeArrayIndex(foundGuitars, Direction.Decrease));
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

  const sortedGuitars = useMemo(
    () =>
      foundGuitars ? sortByNameLike(foundGuitars, inputValue) : foundGuitars,
    [foundGuitars],
  );

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
          tabIndex={-1}
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
          className={classNames(
            'form-search__select-list',
            styles.FormSearch_selectList,
          )}
          ref={listRef}
          tabIndex={-1}
        >
          {sortedGuitars?.map((guitar, index) => (
            <li
              key={guitar.id}
              ref={(node) => (itemsRef.current[index] = node)}
              className={classNames(
                'form-search__select-item',
                styles.FormSearch_selectItem,
                {
                  [styles.FormSearch_selectItem__active]:
                    currentIndex === index,
                },
              )}
              onClick={handleItemLinkClick}
            >
              <NavLink
                to={AppRoute.Card(guitar.id)}
                className={styles.FormSearch_link}
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
