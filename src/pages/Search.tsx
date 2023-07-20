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
      <IonContent className="ion-padding">
        <h1 className="ion-text-bold">Search</h1>
          <IonSearchbar mode="ios" animated={true}></IonSearchbar>
      </IonContent>
     
    </IonPage>
  );
}

export default Search;
