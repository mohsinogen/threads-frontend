import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";

function CreateThread() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<any>({});
  const [threads, setThreads] = useState<[{content:string,parentThread:string | null}]>([{content:'', parentThread: null}]);

  useIonViewWillEnter(async () => {
    console.log("virew will enter");

    const data = localStorage.getItem("userInfo");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserInfo(parsedData);
    }
  });


  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonIcon
            onClick={() => {
              history.goBack();
            }}
            slot="icon-only"
            icon={close}
          ></IonIcon>
        </IonButtons>
        <IonTitle>New Thread</IonTitle>
      </IonToolbar>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol
              size="2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IonAvatar style={{ width: "2.5rem", height: "2.5rem" }}>
                <img alt="profile img" src={userInfo.profile} />
              </IonAvatar>
              <br />
              <div
                style={{
                  background: "lightgrey",
                  width: "3px",
                  height: "100%",
                }}
              ></div>
            </IonCol>
            <IonCol>
              <IonRow>
                <IonLabel>{userInfo.email?.split('@')[0]}</IonLabel>
              </IonRow>
              <IonRow className="ion-no-padding">
                <IonTextarea
                  autoGrow={true}
                  maxlength={150}
                  counter={true}
                  placeholder="Start a thread..."
                  autofocus={true}
                  mode="ios"
                  value={threads[0].content}
                  onIonInput={(e)=>{
                    setThreads([...threads,])
                  }}
                ></IonTextarea>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar color={"light"}>
          <IonButtons slot="end">
            <IonButton color={"secondary"}>Post</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default CreateThread;
