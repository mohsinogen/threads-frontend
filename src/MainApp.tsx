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

setupIonicReact();

const MainApp: React.FC = () => {
  const location = useLocation();

  // Define an array of routes where you want to hide the bottom tabs
  const hiddenTabRoutes = ["/login"];

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
        <Route path="/home" exact={true}>
          <Home />
        </Route>
        <Route path="/thread/:id">
          <ViewMessage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom"  style={!isTabHidden ? {} : {display: 'none'}}>
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
        </IonTabButton>

        <IonTabButton tab="radio" href="/radio">
          <IonIcon icon={search} />
        </IonTabButton>

        <IonTabButton tab="add" href="/add">
          <IonIcon icon={add} />
        </IonTabButton>

        <IonTabButton tab="library" href="/library">
          <IonIcon icon={notifications} />
        </IonTabButton>

        <IonTabButton tab="search" href="/search">
          <IonIcon icon={person} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainApp;
