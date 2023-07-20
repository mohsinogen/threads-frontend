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
import { updateUserProfile } from "../utils/api";

function EditProfile() {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState<any>({});
  const [updatedInfo, setUpdatedInfo] = useState<{
    name: string | null | undefined,
    email: string,
    bio: string | null | undefined,
    link: string | null | undefined,
    profile: string,
  }>({bio:'',email:'',link:'', name:'',profile:''});
  
  const [present] = useIonToast();

  const presentToast = (message:string) => {
    present({
      message: message,
      duration: 500,
      position: 'bottom',
      mode:'ios'
    });
  };
  
  useIonViewWillEnter(async () => {
    console.log("virew will enter");

    const data = localStorage.getItem("userInfo");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserInfo(parsedData);
      setUpdatedInfo({bio: parsedData.bio, email: parsedData.email, link: parsedData.link, name: parsedData.name,profile:parsedData.profile})
    }
  });
  
  const updateProfileHandler = () =>{

    if(['',null,undefined].includes(updatedInfo.name)){
      presentToast('Name can\'t be blank');
      return;
    } else if (updatedInfo.link && !/^(ftp|http|https):\/\/[^ "]+$/.test(updatedInfo.link)){
      presentToast('Please enter a valid link');
      return;
    } if(updatedInfo.bio && updatedInfo.bio?.length > 50){
      presentToast('Please write a short bio');
      return;
    } else{
      updateUserProfile({...updatedInfo, token: userInfo.token}).then((res)=>{
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        history.goBack();
      }).catch((error)=>{
        console.log(error);
        
      })
    }
  }

  const openFilePicker=()=>{
   /*  FileOpener.open({}).then((res)=>{
      console.log(res);
    }) */
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
                    onIonChange={(e)=>{
                      setUpdatedInfo({...updatedInfo, name:e.detail.value})
                    }}
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
                    value={updatedInfo.bio}
                    onIonChange={(e)=>{
                      setUpdatedInfo({...updatedInfo, bio:e.detail.value})
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
                    onIonChange={(e)=>{                      
                      setUpdatedInfo({...updatedInfo, link:e.detail.value})
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
