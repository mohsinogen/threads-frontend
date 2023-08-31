import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import Home from "./pages/Home";
import {
  AuthProvider,
  AuthenticatedRoute,
  useAuth,
} from "./context/AuthContext";
import MainLayout from "./MainLayout";


setupIonicReact();

const AuthLayout: React.FC = () => {
  const { initialized } = useAuth();


  if (!initialized) <></>;

  return (
    <>
      <IonApp>
        <IonReactRouter>
          <MainLayout />
        </IonReactRouter>
      </IonApp>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
};

export default App;
