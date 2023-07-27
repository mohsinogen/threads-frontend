import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getThreadById } from "../utils/api";
import ThreadComponent from "../components/ThreadComponent/ThreadComponent";
import AuthContext from "../context/AuthContext";

function ThreadPage() {
  const [data, setData] = useState<any>();

  const { user } = useContext(AuthContext);

  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    console.log(params);

    if (user) {
      getThreadById(params.id, user.token)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
        <IonTitle>Thread</IonTitle>
      </IonToolbar>
      <IonContent>
        {data && user && (
          <ThreadComponent shouldOpen={false} loggedInUser={user} data={data} />
        )}
      </IonContent>
    </IonPage>
  );
}

export default ThreadPage;
