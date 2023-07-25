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
import React from "react";
import ThreadComponent from "../ThreadComponent/ThreadComponent";

function ThreadList({
  threads,
  onScroll,
  shouldScroll,
  userInfo
}: {
  threads: any[];
  onScroll: () => void;
  shouldScroll: boolean;
  userInfo: any
}) {
  if (threads.length < 1) {
    return (
      <IonGrid class="flex-centered">
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
          <ThreadComponent userInfo={userInfo} key={index} data={item} />
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
