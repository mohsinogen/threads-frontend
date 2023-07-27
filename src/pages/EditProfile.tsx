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
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { updateUserProfile, uploadFile } from "../utils/api";
import { URL } from "../utils/constants";
import AuthContext from "../context/AuthContext";

function EditProfile() {
  const history = useHistory();

  const { user } = useContext(AuthContext);

  const [updatedInfo, setUpdatedInfo] = useState<{
    name: string | null | undefined;
    email: string;
    bio: string | null | undefined;
    link: string | null | undefined;
    profile: string;
  }>({ bio: "", email: "", link: "", name: "", profile: "" });

  const [present] = useIonToast();

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 500,
      position: "bottom",
      mode: "ios",
    });
  };

  useIonViewWillEnter(async () => {
    if (user) {
      setUpdatedInfo({
        bio: user.bio,
        email: user.email,
        link: user.link,
        name: user.name,
        profile: user.profile,
      });
    }
  });

  const updateProfileHandler = () => {
    if (["", null, undefined].includes(updatedInfo.name)) {
      presentToast("Name can't be blank");
      return;
    } else if (
      updatedInfo.link &&
      !/^(ftp|http|https):\/\/[^ "]+$/.test(updatedInfo.link)
    ) {
      presentToast("Please enter a valid link");
      return;
    }
    if (updatedInfo.bio && updatedInfo.bio?.length > 50) {
      presentToast("Please write a short bio");
      return;
    } else {
      setTimeout(() => {
        updateUserProfile({ ...updatedInfo, token: user?.token })
          .then((res) => {
            localStorage.setItem("userInfo", JSON.stringify(res.data.data));
            history.goBack();
          })
          .catch((error) => {
            console.log(error);
          });
      }, 2000);
    }
  };

  function openFile() {
    document.getElementById("file-input")?.click();
  }

  const imageHandler = async (e: any) => {
    try {
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
    }
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
        <IonTitle>Edit profile</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={updateProfileHandler}>Done</IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <div style={{ height: "0px", width: "0px", overflow: "hidden" }}>
          <input
            onChange={(e) => imageHandler(e)}
            type="file"
            id="file-input"
          />
        </div>
        <IonCard mode="ios">
          <IonCardContent>
            <IonRow>
              <IonCol size="9">
                <IonItem>
                  <IonInput
                    label="Name"
                    labelPlacement="stacked"
                    placeholder="Enter text"
                    value={updatedInfo.name}
                    onIonInput={(e) => {
                      setUpdatedInfo({ ...updatedInfo, name: e.detail.value });
                    }}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="3">
                <IonAvatar onClick={openFile}>
                  <img alt="profile img" src={updatedInfo.profile} />
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
                    value={updatedInfo.bio}
                    onIonInput={(e) => {
                      setUpdatedInfo({ ...updatedInfo, bio: e.detail.value });
                    }}
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
                    value={user?.link}
                    onIonInput={(e) => {
                      setUpdatedInfo({ ...updatedInfo, link: e.detail.value });
                    }}
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
