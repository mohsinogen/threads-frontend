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
import { attachOutline, close } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { createThread, uploadFile } from "../utils/api";
import AuthContext from "../context/AuthContext";
import "./CreateThread.css";

function CreateThread() {
  const { user } = useContext(AuthContext);

  const history = useHistory();
  const location = useLocation();

  const [threads, setThreads] = useState<{
    content: string;
    parentThread: string | null;
    image?: string;
  }[]>([]);

  const createThreadHandler = () => {
    createThread({ ...threads, token: user?.token })
      .then((res) => {
        history.goBack();
      })
      .catch((err) => {
        console.log("Failed to create thread", err);
      });
  };

  function openFile() {
    document.getElementById("file-input")?.click();
  }

  const imageHandler = async (e: any) => {
    /* try {
      if (user) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        uploadFile(formData, user.token).then((res) => {
          setUpdatedInfo({ ...updatedInfo, profile: URL + res.data?.slice(1) });
        });
      }
    } catch (error) {
      console.log(error);
    } */
  };

  useIonViewWillEnter(()=>{
    if(location.state!=undefined || location.state!=null){
      setThreads
    }
  })

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
      <IonContent></IonContent>
      {/* <IonContent>
      <div style={{ height: "0px", width: "0px", overflow: "hidden" }}>
          <input
            onChange={(e) => imageHandler(e)}
            type="file"
            id="file-input"
          />
        </div>
        <IonGrid>
          <IonRow>
            <IonCol size="2">
              <div className="line"></div>
              <IonAvatar style={{ width: "2.5rem", height: "2.5rem" }}>
                <img alt="profile img" src={user?.profile} />
              </IonAvatar>
            </IonCol>
            <IonCol>
              <IonRow>
                <IonLabel>{user?.email?.split("@")[0]}</IonLabel>
              </IonRow>
              <IonRow className="ion-no-padding">
                <IonTextarea
                  autoGrow={true}
                  maxlength={150}
                  placeholder="Start a thread..."
                  autofocus={true}
                  mode="ios"
                  value={threads.content}
                  onIonInput={(e) => {
                    if (e.target.value) {
                      setThreads({ ...threads, content: e.target.value });
                    }
                  }}
                ></IonTextarea>
              </IonRow>
              <IonRow className="ion-no-padding">
                <IonIcon size="large" icon={attachOutline}></IonIcon>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar color={"light"}>
          <IonButtons slot="end">
            <IonButton
              onClick={createThreadHandler}
              disabled={threads.content == ""}
              color={"secondary"}
            >
              Post
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter> */}
    </IonPage>
  );
}

export default CreateThread;
