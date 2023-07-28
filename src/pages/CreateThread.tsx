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
import Thread from "../models/thread.model";
import { LocationState } from "history";

interface NewThread {
  content: string;
  image?: string;
  parentThread: Thread | null;
}

function CreateThread() {
  const { user } = useContext(AuthContext);

  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const state = location.state as
    | {
        data: Thread;
      }
    | undefined;

  const [threads, setThreads] = useState<NewThread[]>([
    { content: "", image: "", parentThread: null },
  ]);
  const [pageTitle, setPageTitle] = useState<string>("New Thread");

  const createThreadHandler = async () => {
    if (user) {
      try {
        threads.map(async (item) => {
          const body: { content: string; parentThread: null | string } = {
            content: item.content,
            parentThread: null,
          };
          if (item.parentThread) {
            body.parentThread = item.parentThread._id;
          }
          const response = await createThread(body, user.token);
        });

        history.goBack();
      } catch (error) {
        console.log(error);
        
      }
    }
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

  useIonViewWillEnter(() => {
    if (state?.data != null || state?.data != undefined) {
      setThreads([{ content: "", image: "", parentThread: state.data }]);
      setPageTitle("Reply");
    }
  });

  const handleInputChange = (
    index: number,
    field: keyof NewThread,
    value: string
  ) => {
    const updatedThreads = threads.map((thread, i) =>
      i === index ? { ...thread, [field]: value } : thread
    );
    setThreads(updatedThreads);
  };

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
        <IonTitle>{pageTitle}</IonTitle>
      </IonToolbar>
      <IonContent>
        <div style={{ height: "0px", width: "0px", overflow: "hidden" }}>
          <input
            onChange={(e) => imageHandler(e)}
            type="file"
            id="file-input"
          />
        </div>
        {user &&
          threads.map((item, i) => (
            <IonGrid key={i}>
              {item.parentThread && (
                <IonRow>
                  <IonCol size="2">
                    <div className="line"></div>
                    <IonAvatar style={{ width: "2.5rem", height: "2.5rem" }}>
                      <img
                        alt="profile img"
                        src={item.parentThread.author?.profile}
                      />
                    </IonAvatar>
                  </IonCol>
                  <IonCol>
                    <IonRow>
                      <IonLabel>
                        {item.parentThread?.author?.email?.split("@")[0]}
                      </IonLabel>
                    </IonRow>
                    <IonRow className="ion-no-padding">
                      <IonTextarea
                        autoGrow={true}
                        maxlength={150}
                        placeholder="Start a thread..."
                        autofocus={true}
                        mode="ios"
                        value={item.parentThread?.content}
                        readonly={true}
                      ></IonTextarea>
                    </IonRow>
                  </IonCol>
                </IonRow>
              )}
              <IonRow>
                <IonCol size="2">
                  {i != threads.length - 1 && <div className="line"></div>}
                  <IonAvatar style={{ width: "2.5rem", height: "2.5rem" }}>
                    <img alt="profile img" src={user?.profile} />
                  </IonAvatar>
                </IonCol>
                <IonCol>
                  <IonRow>
                    <IonLabel>{user.email?.split("@")[0]}</IonLabel>
                  </IonRow>
                  <IonRow className="ion-no-padding">
                    <IonTextarea
                      autoGrow={true}
                      maxlength={150}
                      placeholder="Start a thread..."
                      autofocus={true}
                      mode="ios"
                      value={item.content}
                      readonly={false}
                      onIonInput={(e) => {
                        handleInputChange(
                          i,
                          "content",
                          e.target.value ? e.target.value : ""
                        );
                      }}
                    ></IonTextarea>
                  </IonRow>
                  <IonRow className="ion-no-padding">
                    <IonIcon size="large" icon={attachOutline}></IonIcon>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonGrid>
          ))}
      </IonContent>
      <IonFooter>
        <IonToolbar color={"light"}>
          <IonButtons slot="end">
            <IonButton
              onClick={createThreadHandler}
              disabled={threads.some((item) => item.content === "") || isLoading}
              color={"secondary"}
            >
              Post
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default CreateThread;
