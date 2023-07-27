import {
  IonAvatar,
  IonBackButton,
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
import { useHistory, useParams } from "react-router-dom";
import ThreadList from "../components/ThreadList/ThreadList";
import {
  followUnfollowUser,
  getThreadsByUser,
  getUserByEmail,
} from "../utils/api";
import { Browser } from "@capacitor/browser";
import AuthContext from "../context/AuthContext";
import User from "../models/user.model";
import ProfileCard from "../components/ProfileCard/ProfileCard";

function UserProfile() {
  const { userEmail } = useParams<{ userEmail: string }>();

  const history = useHistory();

  const [currTab, setCurrTab] = useState<string>("threads");

  const { user, logout } = useContext(AuthContext);

  const [userProfileData, setUserProfileData] = useState<User | null>(null);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  useEffect(() => {
    if (user && userEmail) {
      getProfileData(userEmail, user.token);
    } else {
      history.goBack();
    }
  }, [user, isFollowed]);

  const [present] = useIonActionSheet();

  const getProfileData = async (email: string, token: string) => {
    try {
      const response = await getUserByEmail(email, token);

      console.log("profile data", response.data[0]);

      setUserProfileData(response.data[0]);

      if (response.data[0] && user) {
        if (response.data[0].followers.includes(user._id)) {
          setIsFollowed(true);
        }
        getThreadListByUser(user.token, 1, response.data[0]?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        console.log("setting", res.data.data);
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

  

  const followUnfollowHandler = () => {
    if (userProfileData && user) {
      followUnfollowUser(userProfileData._id, user.token)
        .then((res) => {
          console.log("follow response", res.data.data);

          if (res.data.data == "followed") {
            setIsFollowed(true);
          } else {
            setIsFollowed(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>

        <IonButtons slot="start">
          <IonIcon slot="icon-only" icon={globeOutline}></IonIcon>
        </IonButtons>

        {user?._id == userProfileData?._id && (
          <IonButtons slot="end">
            <IonIcon
              onClick={presentSheet}
              slot="icon-only"
              icon={menu}
            ></IonIcon>
          </IonButtons>
        )}
      </IonToolbar>
      <IonContent>
        <IonCol>
          
          <ProfileCard followUnfollowHandler={followUnfollowHandler} userProfile={userProfileData} />

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
                if (userProfileData && user) {
                  setPage(page + 1);
                  getThreadListByUser(
                    user.token,
                    page + 1,
                    userProfileData._id
                  );
                }
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

export default UserProfile;
