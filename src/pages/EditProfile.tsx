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
import React, { useState } from "react";
import { useHistory } from "react-router";
import { updateUserProfile, uploadFile } from "../utils/api";
import { URL } from "../utils/constants";

function EditProfile() {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState<any>({});
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
    console.log("virew will enter");

    const data = localStorage.getItem("userInfo");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserInfo(parsedData);
      setUpdatedInfo({
        bio: parsedData.bio,
        email: parsedData.email,
        link: parsedData.link,
        name: parsedData.name,
        profile: parsedData.profile,
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
        updateUserProfile({ ...updatedInfo, token: userInfo.token })
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

  const imageHandler=async(e:any)=>{
    try {
     
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)

      uploadFile(formData, userInfo.token).then((res)=>{
        setUpdatedInfo({...updatedInfo,profile:URL+res.data?.slice(1)})
      });
      
    } catch (error) {
      console.log(error);
    }
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
        <IonTitle>Edit profile</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={updateProfileHandler}>Done</IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <div style={{ height: "0px", width: "0px", overflow: "hidden" }}>
          <input onChange={(e)=> imageHandler(e)} type="file" id="file-input" />
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
                    value={userInfo.link}
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
