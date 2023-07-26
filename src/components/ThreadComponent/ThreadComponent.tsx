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
import { useHistory } from "react-router";
import { likeThread } from "../../utils/api";

interface ThreadComponentProps {
  data: any;
  loggedInUser: any;
  shouldOpen?: boolean;
}
function ThreadComponent({
  data,
  loggedInUser,
  shouldOpen = true,
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
      onClick={(e) => {
        e.stopPropagation();
        if (shouldOpen) {
          history.push(`/thread/${data._id}`);
        }
      }}
      style={{ borderBottom: "1px solid lightgrey" }}
    >
      <IonRow>
        <IonCol className="flex-centered">
          <IonAvatar
            onClick={(e) => {
              if (!shouldOpen) {
                e.stopPropagation();
                history.push(`/userprofile/${data.author.email}`);
              }
            }}
            style={{ width: "2rem", height: "2rem" }}
          >
            <img alt="profile img" src={data.author.profile} />
          </IonAvatar>
        </IonCol>
        <IonCol className="d-flex" style={{ alignItems: "center" }} size="7">
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
        <IonCol className="flex-centered">
          <IonLabel>{timeSince(data.createdAt)}</IonLabel>
        </IonCol>
        <IonCol className="flex-centered">
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
          <IonIcon color="primary" icon={chatbubbleOutline}></IonIcon>
        </IonCol>
        <IonCol size="2">
          <IonIcon color="primary" icon={shareOutline}></IonIcon>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default ThreadComponent;
