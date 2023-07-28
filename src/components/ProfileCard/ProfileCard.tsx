import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";
import {
  IonRow,
  IonCol,
  IonAvatar,
  IonBadge,
  IonText,
  IonIcon,
  IonButton,
  IonSkeletonText,
} from "@ionic/react";
import User from "../../models/user.model";
import { linkOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { followUnfollowUser } from "../../utils/api";
import { Browser } from "@capacitor/browser";

function ProfileCard({
  userProfile,
  followUnfollowHandler,
}: {
  userProfile: User | null;
  followUnfollowHandler: () => void;
}) {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [isFollowed, setIsFollowed] = useState<boolean>();

  const openBioLink = async (url: string) => {
    await Browser.open({ url });
  };

  return (
    <div className="ion-padding-horizontal ion-padding-top">
      <IonRow>
        <IonCol size="9">
          <IonRow>
            {userProfile ? <h1>{userProfile.name}</h1>: <IonSkeletonText animated={true} style={{width: "80%"}} />}
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
              {userProfile ? <h4>{userProfile.email.split("@")[0]}</h4>: <IonSkeletonText animated={true} style={{width: "80%"}} />}
              <IonBadge mode="ios" color="medium">
                threads.net
              </IonBadge>
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol size="3">
          <IonAvatar>
            {userProfile ? <img alt="profile img" src={userProfile.profile} /> :<IonSkeletonText animated={true} />}
          </IonAvatar>
        </IonCol>
      </IonRow>
     
        <IonRow>
          <IonCol size="6">
          {userProfile ? <p>{userProfile.bio}</p> :<IonSkeletonText animated={true} />}
            
          </IonCol>
        </IonRow>
      
      
        <IonRow>
          {(userProfile && userProfile.link!==undefined) && <IonCol>
            {userProfile ? ( <IonText
              onClick={() => {
                if(userProfile.link!=undefined){
                  openBioLink(userProfile.link)
                }
              }}
              className="d-flex"
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              color={"secondary"}
            >
              <IonIcon color="secondary" icon={linkOutline} />
              {userProfile.link.length > 40
                ? userProfile.link.slice(8, 40) + "..."
                : userProfile.link.slice(8)}
            </IonText>):(<IonSkeletonText animated={true} />)}
           
          </IonCol>}
        </IonRow>
      
      <IonRow>
        <IonCol>
          {userProfile? <strong>{userProfile.followers.length} followers</strong> :<IonSkeletonText animated={true} /> }
        </IonCol>
      </IonRow>

      {(userProfile && user) && (
        <IonRow className="ion-no-padding ion-padding-top">
          {user?._id == userProfile._id ? (
            <>
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
            </>
          ) : (
            <IonCol>
              <IonButton
                mode="ios"
                size="small"
                expand="block"
                fill={
                  userProfile.followers.includes(user._id) ? "outline" : "solid"
                }
                onClick={followUnfollowHandler}
              >
                {userProfile.followers.includes(user._id)
                  ? "Unfollow"
                  : "Follow"}
              </IonButton>
            </IonCol>
          )}
        </IonRow>
      )}
    </div>
  );
}

export default ProfileCard;
