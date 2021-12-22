import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/constants';
import InfoScreen from '../info-screen/info-screen';

function NotFoundPage(): JSX.Element {
  return (
    <InfoScreen>
      <h1>This page does not exist</h1>
      <p>
        <NavLink to={AppRoute.Root()} style={{color: 'inherit', textDecoration: 'none'}}>
          Go to main page
        </NavLink>
      </p>
    </InfoScreen>
  );
}

export default NotFoundPage;
