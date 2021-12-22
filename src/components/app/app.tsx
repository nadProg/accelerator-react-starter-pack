import { Switch, Route, Redirect } from 'react-router-dom';
import { AppRoute } from '../../constants/constants';
import Layout from '../layout/layout';
import CatalogPage from '../catalog-page/catalog-page';

function App(): JSX.Element {
  return (
    <Layout>
      <Switch>
        <Route path={AppRoute.Root()} exact>
          <Redirect to={AppRoute.CatalogPage(1)}/>
        </Route>
        <Route path={AppRoute.Catalog()} exact>
          <Redirect to={AppRoute.CatalogPage(1)}/>
        </Route>
        <Route path={AppRoute.CatalogPage()} exact>
          <CatalogPage />
        </Route>
        <Route path={AppRoute.Card()} exact>
          <p>Card page to be defined</p>
        </Route>
        <Route path={AppRoute.Basket()} exact>
          <Redirect to={AppRoute.NotFound()} />
        </Route>
        <Route>
          <Redirect to={AppRoute.NotFound()} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
