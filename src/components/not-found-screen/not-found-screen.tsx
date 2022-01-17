import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import InfoScreen from '../info-screen/info-screen';

function NotFoundScreen(): JSX.Element {
  return (
    <InfoScreen>
      <h1>Данная страница не существует</h1>
      <p>
        <NavLink to={AppRoute.Root()}>
          Перейти на главную
        </NavLink>
      </p>
    </InfoScreen>
  );
}

export default NotFoundScreen;
