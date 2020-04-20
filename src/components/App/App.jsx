import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../../routes/routes";
import Navigation from "../Navigation/Navigation";

const App = () => (
  <div>
    <Navigation />
    <Suspense fallback={<h2>Loading...</h2>}>
      <Switch>
        <Route
          path={routes.HOME_PAGE.path}
          exact
          component={routes.HOME_PAGE.component}
        />
        <Route
          path={routes.MOVIES_DETAILS_PAGE.path}
          component={routes.MOVIES_DETAILS_PAGE.component}
        />
        <Route
          path={routes.MOVIES_PAGE.path}
          component={routes.MOVIES_PAGE.component}
        />
        <Redirect to={routes.HOME_PAGE.path} />
      </Switch>
    </Suspense>
  </div>
);

export default App;
