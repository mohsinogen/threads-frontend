import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonViewWillEnter,
} from "@ionic/react";
import { globeOutline, linkOutline, menu } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ThreadList from "../components/ThreadList/ThreadList";
import { getThreadsByUser } from "../utils/api";
import { Browser } from '@capacitor/browser';

function Profile() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<any>({});
  const [currTab, setCurrTab] = useState<string>("threads");
  useIonViewWillEnter(async () => {
    console.log("virew will enter");

    const data = localStorage.getItem("userInfo");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserInfo(parsedData);
      getThreadListByUser(parsedData.token, 1, parsedData._id);
    }
  });

  const [present] = useIonActionSheet();

  const presentSheet = () => {
    present({
      mode:'ios',
      buttons: [
        {
          text: "Logout",
          role: "destructive",
          data: {
            action: "cancel",
          },
          handler: () => {
            localStorage.removeItem("userInfo");
            history.push("/login");
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
  };

  const [threads, setThreads] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const getThreadListByUser = (
    token: string,
    page: number,
    userId: string,
    callback = () => {
      /*  */
    }
  ) => {
    getThreadsByUser(token, page, userId)
      .then((res) => {
        console.log(res.data.data.data);
        setTotalPages(res.data.data.totalPages);
        if (page == 1) {
          setThreads(res.data.data.data);
        } else {
          setThreads([...threads, ...res.data.data.data]);
        }
        callback();
      })
      .catch((error) => {
        callback();
        console.log(error);
      });
  };

  const openBioLink = async() =>{
    await Browser.open({ url: userInfo.link });
  }

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonIcon slot="icon-only" icon={globeOutline}></IonIcon>
        </IonButtons>

        <IonButtons slot="end">
          <IonIcon
            onClick={presentSheet}
            slot="icon-only"
            icon={menu}
          ></IonIcon>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <IonCol>
          <div className="ion-padding-horizontal ion-padding-top">
            <IonRow>
              <IonCol size="9">
                <IonRow>
                  <h1>{userInfo.name}</h1>
                </IonRow>
                <IonRow>
                  <IonCol
                    size="9"
                    className="d-flex"
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {userInfo?.email?.split("@")[0]}
                    <IonBadge mode="ios" color="medium">
                      test.net
                    </IonBadge>
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol size="3">
                <IonAvatar>
                  <img alt="profile img" src={userInfo.profile} />
                </IonAvatar>
              </IonCol>
            </IonRow>
            {userInfo.bio && (
              <IonRow>
                <IonCol size="6">
                  <p>{userInfo.bio}</p>
                </IonCol>
              </IonRow>
            )}
            {userInfo.link && (
              <IonRow>
                <IonCol>
                  <IonText onClick={openBioLink} className="d-flex" style={{alignItems:'center',justifyContent:'flex-start'}} color={"secondary"}>
                    <IonIcon color="secondary" icon={linkOutline} />
                    {userInfo.link.length > 40 ? userInfo.link.slice(8,40)+"...":userInfo.link.slice(8)}
                  </IonText>
                </IonCol>
              </IonRow>
            )}
            <IonRow>
              <IonCol>
                <strong>{userInfo?.followers?.length} followers</strong>
              </IonCol>
            </IonRow>

            <IonRow className="ion-no-padding ion-padding-top">
              <IonCol size="6">
                <IonButton
                  mode="ios"
                  size="small"
                  expand="block"
                  fill="outline"
                  onClick={() => {
                    history.push("/editprofile");
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
          </div>

          <IonSegment
            onIonChange={(ev: CustomEvent) => {
              setCurrTab(ev.detail.value);
            }}
            value={currTab}
          >
            <IonSegmentButton value="threads">
              <IonLabel>Threads</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="replies">
              <IonLabel>Replies</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {currTab == "threads" && (
            <ThreadList
              onScroll={() => {
                setPage(page + 1);
                getThreadListByUser(userInfo.token, page + 1, userInfo._id);
              }}
              shouldScroll={page < totalPages}
              threads={threads}
            />
          )}
        </IonCol>
      </IonContent>
    </IonPage>
  );
}

export default Profile;
