import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Message, getMessages } from "../data/messages";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  RefresherEventDetail,
  useIonRouter,
} from "@ionic/react";
import "./Home.css";
import { add, call, home, notifications, person, search } from "ionicons/icons";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {

  const [threads, setThreads] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const { user } = useAuth();

  const router = useIonRouter();

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>


      </IonContent>
    </IonPage>
  );
};

export default Home;
