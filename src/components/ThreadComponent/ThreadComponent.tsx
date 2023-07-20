import {
  IonAvatar,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { chatbubble, chatbubbleOutline, ellipsisHorizontal, heartOutline, shareOutline } from "ionicons/icons";
import React from "react";
import { timeSince } from "../../utils/helper";

interface ThreadComponentProps {
  data: any;
}
function ThreadComponent(props: ThreadComponentProps) {
  return (
    <IonGrid style={{borderBottom:'1px solid lightgrey'}}>
      <IonRow>
        <IonCol className="flex-centered">
          <IonAvatar style={{ width: "2rem", height: "2rem" }}>
            <img alt="profile img" src={props.data.author.profile} />
          </IonAvatar>
        </IonCol>
        <IonCol className="d-flex" style={{ alignItems: "center" }} size="7">
          <IonLabel>{props.data.author.name}</IonLabel>
        </IonCol>
        <IonCol className="flex-centered">
          <IonLabel>{timeSince(props.data.createdAt)}</IonLabel>
        </IonCol>
        <IonCol className="flex-centered">
          <IonIcon color="primary" icon={ellipsisHorizontal}></IonIcon>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>{props.data.content}</IonCol>
      </IonRow>
      <IonRow className="ion-padding-top">
        <IonCol size='2'>
          <IonIcon size="large" color="primary" icon={heartOutline}></IonIcon>
        </IonCol>
        <IonCol size='2'>
          <IonIcon size="large" color="primary" icon={chatbubbleOutline}></IonIcon>
        </IonCol>
        <IonCol size='2'>
          <IonIcon size="large" color="primary" icon={shareOutline}></IonIcon>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default ThreadComponent;
