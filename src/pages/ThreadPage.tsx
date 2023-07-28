import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getThreadById } from "../utils/api";
import ThreadComponent from "../components/ThreadComponent/ThreadComponent";
import AuthContext from "../context/AuthContext";
import "./ThreadPage.css";
import { arrowUp, refresh } from "ionicons/icons";
function ThreadPage() {
  const [parentThread, setParentThread] = useState<any>();
  const [thread, setThread] = useState<any>();
  const [showParent, setShowParent] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    console.log(params);

    if (user) {
      getThreadById(params.id, user.token)
        .then(async (res) => {
          setThread(res.data);
          console.log(res.data.parentThread);

          if (res.data.parentThread !== "" && res.data.parentThread !== null) {
            const parentThread = await getThreadById(
              res.data.parentThread,
              user.token
            );
            setParentThread(parentThread.data);
          }
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
        {(!showParent && thread?.parentThread!=null) && (
          <div className="flex-centered">
            <IonButton
            onClick={() => setShowParent(true)}
            className="ion-no-padding"
            style={{ width: "40px", height: "40px", textAlign:"center" }}
            shape="round"
          >
            <IonIcon size="large" slot="icon-only" icon={arrowUp}></IonIcon>
          </IonButton>
          </div>
        )}

        {user && (
          <>
            {parentThread && showParent && (
              <ThreadComponent
                shouldOpen={false}
                loggedInUser={user}
                data={parentThread}
              />
            )}
            {thread && (
              <ThreadComponent
                shouldOpen={false}
                loggedInUser={user}
                data={thread}
              />
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ThreadPage;
