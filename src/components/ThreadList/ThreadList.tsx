import {
  IonAvatar,
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useContext } from "react";
import ThreadComponent from "../ThreadComponent/ThreadComponent";
import AuthContext from "../../context/AuthContext";

function ThreadList({
  threads,
  onScroll,
  shouldScroll,
}: {
  threads: any[];
  onScroll: () => void;
  shouldScroll: boolean;
}) {

  const {user} = useContext(AuthContext);

  if (threads.length < 1) {
    console.log('threads length', threads.length);
    
    return (
      <IonGrid class="flex-centered" style={{height:'100%'}}>
          <IonRow  className="ion-padding">
        <IonCol >
          <IonText>No Threads to show</IonText>
        </IonCol>
      </IonRow>
      </IonGrid>
    );
  }
  return (
    <>
      <IonList>
        {threads.map((item, index) => (
          <ThreadComponent loggedInUser={user} key={index} data={item} />
        ))}
      </IonList>
      {shouldScroll && (
        <IonInfiniteScroll
          onIonInfinite={() => {
            onScroll();
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      )}
    </>
  );
}

export default ThreadList;
