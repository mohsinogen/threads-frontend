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
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { createThread } from "../utils/api";
import AuthContext from "../context/AuthContext";

function CreateThread() {

  const {user} = useContext(AuthContext);

  const history = useHistory();

  const [threads, setThreads] = useState<{content:string,parentThread:string | null}>({content:'', parentThread: null});

  const createThreadHandler=()=>{
    createThread({...threads, token: user?.token}).then((res)=>{
      history.goBack();
    }).catch((err)=>{
      console.log('Failed to create thread', err);
      
    })
  }

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
                <img alt="profile img" src={user?.profile} />
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
                <IonLabel>{user?.email?.split('@')[0]}</IonLabel>
              </IonRow>
              <IonRow className="ion-no-padding">
                <IonTextarea
                  autoGrow={true}
                  maxlength={150}
                  counter={true}
                  placeholder="Start a thread..."
                  autofocus={true}
                  mode="ios"
                  value={threads.content}
                  onIonInput={(e)=>{
                    if(e.target.value){
                      setThreads({...threads,content:e.target.value})
                    }
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
            <IonButton onClick={createThreadHandler} disabled={threads.content==''} color={"secondary"}>Post</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default CreateThread;
