import React from "react";
import { add, home, notifications, person, search } from "ionicons/icons";
import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { AuthenticatedRoute } from "./context/AuthContext";
import { Redirect, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import EditProfile from "./pages/EditProfile";

function MainLayout() {
  const location = useLocation();

  const hiddenTabRoutes = [
    "/login",
    "/register",
    "/editprofile",
    "/createthread",
    "/thread",
    "/editprofile"
  ];

  // Check if the current route is in the hiddenTabRoutes array
  const isTabHidden = hiddenTabRoutes.includes(location.pathname);
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthenticatedRoute>
          <Route exact path="/home" component={Home} />
        </AuthenticatedRoute>
          <Route exact path="/editprofile" component={EditProfile} />
        <AuthenticatedRoute>
          <Route exact path="/profile" component={Profile} />
        </AuthenticatedRoute>
        
      </IonRouterOutlet>

      <IonTabBar slot="bottom" style={!isTabHidden ? {} : { display: "none" }}>
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
}

export default MainLayout;
