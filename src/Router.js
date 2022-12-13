import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import useAuth from "./hooks/useAuth";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AllGalleriesPage from "./pages/AllGalleriesPage";
import MyGalleriesPare from "./pages/MyGalleriesPare";
import CreateNewGalleryPage from "./pages/CreateNewGalleryPage";
import Logout from "./pages/Logout";
import SingleGallery from "./pages/SingleGallery";

const AuthRoute = ({ children, ...rest }) => {
  console.log("ovde sam")
  const { user } = useAuth();

  return (
    <Route {...rest}>{user.name ? children : <Redirect to="/login" />}</Route>
  );
};

const GuestRoute = ({ children, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route {...rest}>{user.name ? <Redirect to="/login" /> : children}</Route>
  );
};

export default function Router() {

  return (
    <Switch>
      <GuestRoute path ="/login">
        <LoginPage />
      </GuestRoute>
      <GuestRoute path="/register">
        <RegisterPage />
      </GuestRoute>
      <AuthRoute path="/my-galleries/:user_id">
        <MyGalleriesPare />
      </AuthRoute>
      <AuthRoute path="/create">
        <CreateNewGalleryPage />
      </AuthRoute>
      <AuthRoute path="/logout">
        <Logout />
      </AuthRoute>
      <AuthRoute path="/gallery/:galley_id">
        <SingleGallery />
      </AuthRoute>
      <Route path="/">
        <AllGalleriesPage />
      </Route>
     
    </Switch>
  );
}