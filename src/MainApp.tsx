import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import ViewMessage from "./pages/ViewMessage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login";
import { person, home, search, notifications, add } from "ionicons/icons";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import EditProfile from "./pages/EditProfile";
import CreateThread from "./pages/CreateThread";
import Notifications from "./pages/Notifications";
import Search from "./pages/Search";

setupIonicReact();

const MainApp: React.FC = () => {
  const location = useLocation();

  // Define an array of routes where you want to hide the bottom tabs
  const hiddenTabRoutes = ["/login","/register","/editprofile","/createthread"];

  // Check if the current route is in the hiddenTabRoutes array
  const isTabHidden = hiddenTabRoutes.includes(location.pathname);
  console.log(location.pathname, isTabHidden);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/" exact={true}>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
        <Route path="/home" exact={true}>
          <Home />
        </Route>
        <Route path="/profile" exact={true}>
          <Profile />
        </Route>
        <Route path="/editprofile" exact={true}>
          <EditProfile />
        </Route>
        <Route path="/search" exact={true}>
          <Search />
        </Route>
        <Route path="/createthread" exact={true}>
          <CreateThread />
        </Route>
        <Route path="/notifications" exact={true}>
          <Notifications />
        </Route>
        <Route path="/thread/:id">
          <ViewMessage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom"  style={!isTabHidden ? {} : {display: 'none'}}>
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
        </IonTabButton>

        <IonTabButton tab="search" href="/search">
          <IonIcon icon={search} />
        </IonTabButton>

        <IonTabButton tab="createthread" href="/createthread">
          <IonIcon icon={add} />
        </IonTabButton>

        <IonTabButton tab="notifications" href="/notifications">
          <IonIcon icon={notifications} />
        </IonTabButton>

        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={person} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainApp;
