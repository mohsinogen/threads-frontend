import React from "react";
import {
  IonActionSheet,
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useAuth } from "../context/AuthContext";
import { globeOutline, linkOutline } from "ionicons/icons";
import { Browser } from "@capacitor/browser";

const Profile: React.FC = () => {
  const { userData, logout } = useAuth();

  const openBioLink = async (url: string) => {
    await Browser.open({ url });
  };

  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonActionSheet
          mode="ios"
          trigger="open-action-sheet"
          buttons={[
            {
              text: "Logout",
              role: "destructive",
              handler: () => {
                logout();
              },
            },
            {
              text: "Cancel",
              role: "cancel",
            },
          ]}
        ></IonActionSheet>
              <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonIcon slot="icon-only" icon={globeOutline}></IonIcon>
            </IonButtons>
            <IonButtons slot="end">
              <IonMenuButton
                id="open-action-sheet"
                autoHide={false}
              ></IonMenuButton>
            </IonButtons>
            <IonTitle size="large">{userData?.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="9">
              <IonRow>
                {userData ? (
                  <h1>{userData.name}</h1>
                ) : (
                  <IonSkeletonText animated={true} style={{ width: "80%" }} />
                )}
              </IonRow>
              {userData ? (
                <IonRow className="ion-align-items-center">
                  <IonCol className="ion-no-padding">
                    <h4 className="ion-no-margin">{userData.email.split("@")[0]}</h4>
                  </IonCol>
                  <IonCol className="ion-no-padding">
                    <IonBadge mode="ios" color="medium">
                      threads.net
                    </IonBadge>
                  </IonCol>
                </IonRow>
              ):(<IonSkeletonText animated={true} style={{ width: "80%" }} />)}
            </IonCol>
            <IonCol size="3">
              <IonAvatar>
                {userData ? (
                  <img alt="profile img" src={userData.profile} />
                ) : (
                  <IonSkeletonText animated={true} />
                )}
              </IonAvatar>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              {userData ? (
                <p className="ion-no-margin">{userData.bio}</p>
              ) : (
                <IonSkeletonText animated={true} />
              )}
            </IonCol>
          </IonRow>

          <IonRow>
            {userData && userData.link !== undefined && userData.link != "" && (
              <IonCol>
                {userData ? (
                  <IonText
                    onClick={() => {
                      if (userData.link != undefined) {
                        openBioLink(userData.link);
                      }
                    }}
                    className="d-flex"
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                    color={"secondary"}
                  >
                    <IonIcon color="secondary" icon={linkOutline} style={{marginRight: '5px'}} />
                    {userData.link.length > 40
                      ? userData.link.slice(8, 40) + "..."
                      : userData.link.slice(8)}
                  </IonText>
                ) : (
                  <IonSkeletonText animated={true} />
                )}
              </IonCol>
            )}
          </IonRow>

          <IonRow>
            <IonCol>
              {userData ? (
                <strong>{userData.followers.length} followers</strong>
              ) : (
                <IonSkeletonText animated={true} />
              )}
            </IonCol>
          </IonRow>

          {userData && (
            <IonRow className="ion-no-padding ion-padding-top">
              <IonCol size="6">
                <IonButton
                  mode="ios"
                  size="small"
                  expand="block"
                  fill="outline"
                  onClick={() => {
                    router.push("/editprofile");
                  }}
                >
                  Edit profile
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  mode="ios"
                  size="small"
                  expand="block"
                  fill="outline"
                >
                  Share profile
                </IonButton>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
