import React, { useContext, useEffect } from 'react';
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
import AuthContext from '../context/AuthContext';

const Home: React.FC = () => {

  const { user } = useContext(AuthContext);

  const [threads, setThreads] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [page, setPage] = useState<number>(1)

 useEffect(()=>{  
      if (user) {
          getThreadList(user.token, 1)
      }
  
 },[user])

  const getThreadList=(token:string,page:number,callback=()=>{/*  */})=>{
    getThreads(token,page).then((res) => {
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

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        
        <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
          setPage(1);
          if(user){
            getThreadList(user.token,1,()=>{
              event.detail.complete();
            });
          }
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

        <ThreadList shouldScroll={page < totalPages} threads={threads} onScroll={()=>{
          if(user){
            setPage(page+1);
          getThreadList(user?.token,page+1);
          }
        }} />
      </IonContent>

     
    </IonPage>
  );
};

export default Home;
