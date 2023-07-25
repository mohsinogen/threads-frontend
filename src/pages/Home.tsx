import React, { useEffect } from 'react';
import MessageListItem from '../components/MessageListItem';
import { useState } from 'react';
import { Message, getMessages } from '../data/messages';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  RefresherEventDetail,
} from '@ionic/react';
import './Home.css';
import { add, call, home, notifications, person, search } from 'ionicons/icons';
import { getThreads } from '../utils/api';
import ThreadComponent from '../components/ThreadComponent/ThreadComponent';
import ThreadList from '../components/ThreadList/ThreadList';

const Home: React.FC = () => {

  const [threads, setThreads] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [userInfo, setUserInfo] = useState<any>({})

 useEffect(()=>{
  const data = localStorage.getItem('userInfo');
      if (data) {
        const parsedData = JSON.parse(data);
          setUserInfo(parsedData);
          getThreadList(parsedData.token, 1)
      }
  
 },[])

  const getThreadList=(token:string,page:number,callback=()=>{/*  */})=>{
    getThreads(token,page).then((res) => {
      console.log(res.data.data.data);
      setTotalPages(res.data.data.totalPages)
      if(page==1){
        setThreads(res.data.data.data);
      }else{
        setThreads([...threads,...res.data.data.data])
      }
      callback();
    }).catch((error) => {
      callback()
      console.log(error);
    });
  }

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        
        <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
          setPage(1);
          getThreadList(userInfo.token,1,()=>{
            event.detail.complete();
          });
        }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <ThreadList userInfo={userInfo} shouldScroll={page < totalPages} threads={threads} onScroll={()=>{
          setPage(page+1);
          getThreadList(userInfo.token,page+1);
        }} />
      </IonContent>

     
    </IonPage>
  );
};

export default Home;
