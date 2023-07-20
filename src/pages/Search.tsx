import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

function Search() {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle size="large" style={{fontWeight:'bold'}}>Toolbar</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar mode="ios" animated={true}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
}

export default Search;
