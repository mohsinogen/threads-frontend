import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";

function EditProfile() {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState<any>({});

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
        <IonTitle>Edit profile</IonTitle>
        <IonButtons slot="end">
          <IonButton>Done</IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <IonCard mode="ios">
          <IonCardContent>
            <IonRow>
              <IonCol size="9">
                <IonItem>
                  <IonInput
                    label="Name"
                    labelPlacement="stacked"
                    placeholder="Enter text"
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="3">
                <IonAvatar>
                  <img alt="profile img" src={userInfo.profile} />
                </IonAvatar>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="ion-no-padding">
                <IonItem>
                  <IonInput
                    label="Bio"
                    labelPlacement="stacked"
                    placeholder="Write a bio"
                    value={userInfo.bio}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="ion-no-padding">
                <IonItem>
                  <IonInput
                    label="Link"
                    labelPlacement="stacked"
                    placeholder="+ Add link"
                    value={userInfo.link}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default EditProfile;
