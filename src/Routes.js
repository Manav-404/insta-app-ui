import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Authentication from "./components/Authentication/Authentication";
import PrivateRoutes from "./PrivateRoutes";
import Home from "./components/Home/Home";
import CreateProfile from "./components/Profile/create/CreateProfile";
import Profile from "./components/Profile/Profile";
import ProfileView from "./components/Profile/view/ProfileView";
import PostCreate from "./components/Post/create/PostCreate";
import Search from "./components/Profile/search/Search";
import ViewComment from "./components/Comment/ViewComment";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/authenticate" component={Authentication} />
        <PrivateRoutes exact path="/home" component={Home} />
        <PrivateRoutes exact path="/profile" component={Profile} />
        <PrivateRoutes exact path="/profile/create" component={CreateProfile} />
        <PrivateRoutes exact path="/profile/view/:id" component={ProfileView} />
        <PrivateRoutes exact path="/profile/search/:key" component={Search} />
        <PrivateRoutes exact path="/posts/create" component={PostCreate} />
        <PrivateRoutes
          exact
          path="/posts/comments/:postId"
          component={ViewComment}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
