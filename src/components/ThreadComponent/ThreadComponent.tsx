import {
  IonAvatar,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  chatbubble,
  chatbubbleOutline,
  ellipsisHorizontal,
  heart,
  heartOutline,
  shareOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { timeSince } from "../../utils/helper";
import { useHistory } from "react-router-dom";
import { likeThread } from "../../utils/api";
import "./ThreadComponent.css";
import Thread from "../../models/thread.model";
import User from "../../models/user.model";
interface ThreadComponentProps {
  data: Thread;
  loggedInUser: User;
  shouldOpen?: boolean;
  className?: string;
}
function ThreadComponent({
  data,
  loggedInUser,
  shouldOpen = true,
  className,
}: ThreadComponentProps) {
  const history = useHistory();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const likeThreadHandler = () => {
    likeThread(data._id, loggedInUser.token)
      .then((res) => {
        if (res.data.data == "liked") {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (data.likes.includes(loggedInUser._id)) {
      setIsLiked(true);
    }
  }, []);

  return (
  
      <IonGrid
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          if (shouldOpen) {
            history.push(`/thread/${data._id}`);
          }
        }}
      >
        <IonRow>
          <IonCol size="2">
            {/* <div className="line"></div> */}
            <IonAvatar
              onClick={(e) => {
                if (!shouldOpen) {
                  e.stopPropagation();
                  history.push(`/userprofile/${data.author.email}`);
                }
              }}
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <img alt="profile img" src={data.author.profile} />
            </IonAvatar>
          </IonCol>
          <IonCol size="10">
            <IonRow>
              <IonCol size="7">
                <IonLabel
                  onClick={(e) => {
                    if (!shouldOpen) {
                      e.stopPropagation();
                      history.push(`/userprofile/${data.author.email}`);
                    }
                  }}
                >
                  {data.author.name}
                </IonLabel>
              </IonCol>
              <IonCol size="3" className="flex-centered">
                <IonLabel>{timeSince(data.createdAt)}</IonLabel>
              </IonCol>
              <IonCol size="2" className="flex-centered">
                <IonIcon color="primary" icon={ellipsisHorizontal}></IonIcon>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>{data.content}</IonCol>
            </IonRow>

            <IonRow className="ion-padding-top">
              <IonCol size="2">
                <IonIcon
                  color={!isLiked ? "primary" : "danger"}
                  icon={!isLiked ? heartOutline : heart}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isUpdating) {
                      setIsLiked(!isLiked);
                    }
                    likeThreadHandler();
                  }}
                ></IonIcon>
              </IonCol>
              <IonCol size="2">
                <IonIcon
                  color="primary"
                  icon={chatbubbleOutline}
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/createthread`, { data });
                  }}
                ></IonIcon>
              </IonCol>
              <IonCol size="2">
                <IonIcon color="primary" icon={shareOutline}></IonIcon>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
  );
}

export default ThreadComponent;
