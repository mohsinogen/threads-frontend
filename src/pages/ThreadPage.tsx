import { IonBackButton, IonButtons, IonContent, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getThreadById } from '../utils/api';
import ThreadComponent from '../components/ThreadComponent/ThreadComponent';

function ThreadPage() {
  const [userInfo, setUserInfo] = useState<any>({});
  const [data, setData] = useState<any>();

  const params = useParams<{id:string}>();

  useIonViewWillEnter(()=>{
    console.log(params);
    
    const data = localStorage.getItem("userInfo");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserInfo(parsedData);
      getThreadById(params.id,parsedData.token).then((res)=>{
        setData(res.data);
      }).catch((err)=>{
        console.log(err);
        
      });
    }
  })

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref='/home'></IonBackButton>
        </IonButtons>
        <IonTitle>Thread</IonTitle>
      </IonToolbar>
        <IonContent>
        {data && <ThreadComponent userInfo={userInfo} data={data} />}
        </IonContent>
    </IonPage>
  )
}

export default ThreadPage