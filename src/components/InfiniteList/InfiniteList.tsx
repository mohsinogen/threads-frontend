import {
  IonAvatar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import React, { Fragment, ReactNode } from "react";
//ev.target.complete()
//event.detail.complete();
function InfiniteList({
  onScroll,
  onRefresh,
  childComponent,
  shouldScroll=true
}: {
  onScroll?: (ev: any) => void;
  onRefresh?: (ev: any) => void;
  childComponent: ReactNode;
  shouldScroll: boolean
}) {
  return (
    <>
      {onRefresh && (
        <IonRefresher slot="fixed" onIonRefresh={(ev) => onRefresh(ev)}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      )}
      <IonList>
        {childComponent}
      </IonList>
      {(onScroll && shouldScroll) && (
        <IonInfiniteScroll onIonInfinite={(ev) => onScroll(ev)}>
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      )}
    </>
  );
}

export default InfiniteList;
