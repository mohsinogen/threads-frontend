import React, { useEffect, useRef, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { useAuth } from "../context/AuthContext";
import UserData from "../models/user.model";
import { FIREBASE_DB, FIREBASE_STORAGE } from "../config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const EditProfile: React.FC = () => {
  const router = useIonRouter();
  const { userData,updateUserData } = useAuth();

  const [updatedInfo, setUpdatedInfo] = useState<UserData>({
    email: "",
    followers: [],
    following: [],
    name: "",
    uid: "",
    bio: "",
    link: "",
    profile: "",
  });
  const fileInput = useRef<HTMLInputElement>(null);

  const uploadProfilePic = async (file: File) => {
    const extension = file["name"].substring(file["name"].lastIndexOf(".") + 1);
    if (extension && ["jpg", "jpeg", "png"]) {
      const storageRef = ref(
        FIREBASE_STORAGE,
        `profile/${userData?.uid}/${file?.name}`
      );
      await uploadBytes(storageRef, file!);
      const url = await getDownloadURL(storageRef);
      setUpdatedInfo({ ...updatedInfo, profile: url });
    }
  };

  const updateUserProfile=()=>{
    if(updatedInfo.name){
        const docRef = doc(FIREBASE_DB, `users/${userData?.uid}`);
        console.log(updatedInfo);
        
        updateDoc(docRef, { ...updatedInfo});
        updateUserData(updatedInfo);
        router.goBack();
    }
  }

  useEffect(()=>{
    if(userData){
        setUpdatedInfo(userData);
    }
  },[userData])

  return (
    <IonPage>
      <IonContent>
        {" "}
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonIcon
                onClick={() => {
                  router.goBack();
                }}
                slot="icon-only"
                icon={close}
              ></IonIcon>
            </IonButtons>
            <IonTitle>Edit profile</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={updateUserProfile}
              >
                Done
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div style={{ height: "0px", width: "0px", overflow: "hidden" }}>
          <input
            type="file"
            ref={fileInput}
            hidden
            onChange={(e) => uploadProfilePic(e.target.files![0])}
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
                      setUpdatedInfo({
                        ...updatedInfo,
                        name: e.detail.value ? e.detail.value : "",
                      });
                    }}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="3">
                <IonAvatar onClick={() => fileInput.current?.click()}>
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
                      setUpdatedInfo({
                        ...updatedInfo,
                        bio: e.detail.value ? e.detail.value : "",
                      });
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
                    value={userData?.link}
                    onIonInput={(e) => {
                      setUpdatedInfo({
                        ...updatedInfo,
                        link: e.detail.value ? e.detail.value : "",
                      });
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
};

export default EditProfile;
