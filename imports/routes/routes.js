import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Switch, Route, withRouter, Redirect } from "react-router";
import createHistory from "history/createBrowserHistory";

import Signup from "../ui/Signup";
import Link from "../ui/Link";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";
const history = createHistory();
const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];
let isUnauthenticatedPage = true;
let isAuthenticatedPage = false;
const onEnterPublicPage = Component => {
  if (Meteor.userId()) {
    history.replace("/links");
  } else {
    return <Component />;
  }
};
const onEnterPrivatePage = Component => {
  if (!Meteor.userId()) {
    history.replace("/");
  } else {
    return <Component />;
  }
};

export const onAuthChange = isAuthenticated => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  console.log("pathname: ", history.location.pathname);
  if (isUnauthenticatedPage && isAuthenticated) {
    history.push("/links");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push("/");
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => onEnterPublicPage(Login)} />
      <Route exact path="/signup" render={() => onEnterPublicPage(Signup)} />
      <Route exact path="/links" render={() => onEnterPrivatePage(Link)} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
