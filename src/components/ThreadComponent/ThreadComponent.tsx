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
import { chatbubble, chatbubbleOutline, ellipsisHorizontal, heart, heartOutline, shareOutline } from "ionicons/icons";
import React, { useState } from "react";
import { timeSince } from "../../utils/helper";
import { useHistory } from "react-router";
import { likeThread } from "../../utils/api";

interface ThreadComponentProps {
  data: any;
  userInfo: any;
}
function ThreadComponent(props: ThreadComponentProps) {
    const history = useHistory();
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const likeThreadHandler=()=>{
      if(!props.data.likes.includes(props.userInfo._id)){
        likeThread(props.data._id,props.userInfo.token).then((res)=>{
          if(res.data.data=='liked'){
            setIsLiked(true);
          } else{
            setIsLiked(false);
          }
        }).catch((err)=>{
          console.log(err);
          
        })
      }
    }

    useIonViewDidEnter(()=>{
      if(props.data.likes.includes(props.userInfo._id)){
        setIsLiked(true);
      }
    })

  return (
    <IonGrid onClick={()=>{
        history.push(`/thread/${props.data._id}`)
    }} style={{borderBottom:'1px solid lightgrey'}}>
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
          <IonIcon color={!isLiked ? "primary": "danger"} icon={!isLiked ? heartOutline : heart} onClick={(e)=>{
            e.stopPropagation();
            likeThreadHandler()
          }}></IonIcon>
        </IonCol>
        <IonCol size='2'>
          <IonIcon color="primary" icon={chatbubbleOutline}></IonIcon>
        </IonCol>
        <IonCol size='2'>
          <IonIcon color="primary" icon={shareOutline}></IonIcon>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default ThreadComponent;
