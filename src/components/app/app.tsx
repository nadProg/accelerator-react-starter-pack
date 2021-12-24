import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../layout/layout';
import CatalogScreen from '../catalog-screen/catalog-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import CardScreen from '../card-screen/card-screen';
import { AppRoute } from '../../constants/endpoints';

function App(): JSX.Element {
  return (
    <Layout>
      <Switch>
        <Route path={AppRoute.Root()} exact>
          <Redirect to={AppRoute.CatalogPage(1)} />
        </Route>
        <Route path={AppRoute.Catalog()} exact>
          <Redirect to={AppRoute.CatalogPage(1)} />
        </Route>
        <Route path={AppRoute.CatalogPage()} exact>
          <CatalogScreen />
        </Route>
        <Route path={AppRoute.Card()} exact>
          <CardScreen />
        </Route>
        <Route path={AppRoute.Basket()} exact>
          <Redirect to={AppRoute.NotFound()} />
        </Route>
        <Route path={AppRoute.NotFound()} exact>
          <NotFoundScreen />
        </Route>
        <Route>
          <Redirect to={AppRoute.NotFound()} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
