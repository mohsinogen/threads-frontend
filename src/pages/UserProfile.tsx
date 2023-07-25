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
  import React, { useContext, useEffect, useState } from "react";
  import { useHistory, useParams } from "react-router";
  import ThreadList from "../components/ThreadList/ThreadList";
  import { getThreadsByUser, getUserByEmail } from "../utils/api";
  import { Browser } from "@capacitor/browser";
  import AuthContext from "../context/AuthContext";
  import User from "../models/user.model";
  
  function UserProfile() {
    const history = useHistory();
  
    const [currTab, setCurrTab] = useState<string>("threads");
  
    const { user, logout } = useContext(AuthContext);
  
    useEffect(() => {
      if (user) {
        getThreadListByUser(user.token, page, user._id)
      } else {
        history.goBack();
      }
    }, [user]);
  
  
    const [present] = useIonActionSheet();
  
    const presentSheet = () => {
      present({
        mode: "ios",
        buttons: [
          {
            text: "Logout",
            role: "destructive",
            data: {
              action: "cancel",
            },
            handler: () => {
              logout();
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
  
    const openBioLink = async () => {
      if (user) {
        await Browser.open({ url: user.link });
      }
    };
  
    return (
      <IonPage>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon slot="icon-only" icon={globeOutline}></IonIcon>
          </IonButtons>
  
          {user?._id == user?._id && (<IonButtons slot="end">
            <IonIcon
              onClick={presentSheet}
              slot="icon-only"
              icon={menu}
            ></IonIcon>
          </IonButtons>)}
        </IonToolbar>
        <IonContent>
          <IonCol>
            <div className="ion-padding-horizontal ion-padding-top">
              <IonRow>
                <IonCol size="9">
                  <IonRow>
                    <h1>{user?.name}</h1>
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
                      {user?.email?.split("@")[0]}
                      <IonBadge mode="ios" color="medium">
                        threads.net
                      </IonBadge>
                    </IonCol>
                  </IonRow>
                </IonCol>
                <IonCol size="3">
                  <IonAvatar>
                    <img alt="profile img" src={user?.profile} />
                  </IonAvatar>
                </IonCol>
              </IonRow>
              {user?.bio && (
                <IonRow>
                  <IonCol size="6">
                    <p>{user?.bio}</p>
                  </IonCol>
                </IonRow>
              )}
              {user?.link && (
                <IonRow>
                  <IonCol>
                    <IonText
                      onClick={openBioLink}
                      className="d-flex"
                      style={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      color={"secondary"}
                    >
                      <IonIcon color="secondary" icon={linkOutline} />
                      {user.link.length > 40
                        ? user.link.slice(8, 40) + "..."
                        : user.link.slice(8)}
                    </IonText>
                  </IonCol>
                </IonRow>
              )}
              <IonRow>
                <IonCol>
                  <strong>{user?.followers?.length} followers</strong>
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
            {/* {currTab == "threads" && (
              <ThreadList
                userInfo={user}
                onScroll={() => {
                  if (user && user) {
                    setPage(page + 1);
                    getThreadListByUser(user.token, page + 1, user._id);
                  }
                }}
                shouldScroll={page < totalPages}
                threads={threads}
              />
            )} */}
          </IonCol>
        </IonContent>
      </IonPage>
    );
  }
  
  export default UserProfile;
  