import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import InfoScreen from '../info-screen/info-screen';

function NotFoundScreen(): JSX.Element {
  return (
    <InfoScreen>
      <h1>This page does not exist</h1>
      <p>
        <NavLink to={AppRoute.Root()}>
          Go to main page
        </NavLink>
      </p>
    </InfoScreen>
  );
}

export default NotFoundScreen;
