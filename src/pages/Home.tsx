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
} from '@ionic/react';
import './Home.css';
import { add, home, notifications, person, search } from 'ionicons/icons';
import { getThreads } from '../utils/api';
import ThreadComponent from '../components/ThreadComponent/ThreadComponent';

const Home: React.FC = () => {

  const [threads, setThreads] = useState<any[]>(
    [
      {
          "_id": "64b5426df4ab79d54046c6e1",
          "author": {
              "following": [],
              "followers": [],
              "_id": "64b512f21fc55cc0c341c459",
              "name": "mohsin ansari",
              "email": "mohsinogen@gmail.com",
              "isAdmin": false,
              "profile": "https://firebasestorage.googleapis.com/v0/b/my-bucket-a9016.appspot.com/o/threads%2Fprofile%2Fuser.png?alt=media&token=422128ad-8d58-4baa-b064-dd680c2a2de7",
              "createdAt": "2023-07-17T10:07:46.014Z",
              "updatedAt": "2023-07-17T10:07:46.014Z",
              "__v": 0,
              "bio": "this is an example bio"
          },
          "content": "Hello everyone this is my threads clone welcome here enjoy! ;-)",
          "likes": [],
          "parentThread": null,
          "createdAt": "2023-07-17T13:30:21.853Z",
          "updatedAt": "2023-07-17T13:30:21.853Z",
          "__v": 0
      },
      {
          "_id": "64b54274f4ab79d54046c6e5",
          "author": {
              "following": [],
              "followers": [],
              "_id": "64b512f21fc55cc0c341c459",
              "name": "mohsin ansari",
              "email": "mohsinogen@gmail.com",
              "isAdmin": false,
              "profile": "https://firebasestorage.googleapis.com/v0/b/my-bucket-a9016.appspot.com/o/threads%2Fprofile%2Fuser.png?alt=media&token=422128ad-8d58-4baa-b064-dd680c2a2de7",
              "createdAt": "2023-07-17T10:07:46.014Z",
              "updatedAt": "2023-07-17T10:07:46.014Z",
              "__v": 0,
              "bio": "this is an example bio"
          },
          "content": "Hello everyone this is my threads clone welcome here enjoy! ;-)",
          "likes": [],
          "parentThread": null,
          "createdAt": "2023-07-17T13:30:28.591Z",
          "updatedAt": "2023-07-17T13:30:28.591Z",
          "__v": 0
      },
      {
          "_id": "64b5428af4ab79d54046c6e9",
          "author": {
              "following": [],
              "followers": [],
              "_id": "64b512f21fc55cc0c341c459",
              "name": "mohsin ansari",
              "email": "mohsinogen@gmail.com",
              "isAdmin": false,
              "profile": "https://firebasestorage.googleapis.com/v0/b/my-bucket-a9016.appspot.com/o/threads%2Fprofile%2Fuser.png?alt=media&token=422128ad-8d58-4baa-b064-dd680c2a2de7",
              "createdAt": "2023-07-17T10:07:46.014Z",
              "updatedAt": "2023-07-17T10:07:46.014Z",
              "__v": 0,
              "bio": "this is an example bio"
          },
          "content": "Hello everyone this is my threads clone welcome here enjoy! ;-)",
          "likes": [],
          "parentThread": {
              "_id": "64b54274f4ab79d54046c6e5",
              "author": {
                  "following": [],
                  "followers": [],
                  "_id": "64b512f21fc55cc0c341c459",
                  "name": "mohsin ansari",
                  "email": "mohsinogen@gmail.com",
                  "isAdmin": false,
                  "profile": "https://firebasestorage.googleapis.com/v0/b/my-bucket-a9016.appspot.com/o/threads%2Fprofile%2Fuser.png?alt=media&token=422128ad-8d58-4baa-b064-dd680c2a2de7",
                  "createdAt": "2023-07-17T10:07:46.014Z",
                  "updatedAt": "2023-07-17T10:07:46.014Z",
                  "__v": 0,
                  "bio": "this is an example bio"
              },
              "content": "Hello everyone this is my threads clone welcome here enjoy! ;-)",
              "likes": [],
              "parentThread": null,
              "createdAt": "2023-07-17T13:30:28.591Z",
              "updatedAt": "2023-07-17T13:30:28.591Z",
              "__v": 0
          },
          "createdAt": "2023-07-17T13:30:50.328Z",
          "updatedAt": "2023-07-17T13:30:50.328Z",
          "__v": 0
      },
      {
          "_id": "64b5428bf4ab79d54046c6ed",
          "author": {
              "following": [],
              "followers": [],
              "_id": "64b512f21fc55cc0c341c459",
              "name": "mohsin ansari",
              "email": "mohsinogen@gmail.com",
              "isAdmin": false,
              "profile": "https://firebasestorage.googleapis.com/v0/b/my-bucket-a9016.appspot.com/o/threads%2Fprofile%2Fuser.png?alt=media&token=422128ad-8d58-4baa-b064-dd680c2a2de7",
              "createdAt": "2023-07-17T10:07:46.014Z",
              "updatedAt": "2023-07-17T10:07:46.014Z",
              "__v": 0,
              "bio": "this is an example bio"
          },
          "content": "Hello everyone this is my threads clone welcome here enjoy! ;-)",
          "likes": [],
          "parentThread": {
              "_id": "64b54274f4ab79d54046c6e5",
              "author": {
                  "following": [],
                  "followers": [],
                  "_id": "64b512f21fc55cc0c341c459",
                  "name": "mohsin ansari",
                  "email": "mohsinogen@gmail.com",
                  "isAdmin": false,
                  "profile": "https://firebasestorage.googleapis.com/v0/b/my-bucket-a9016.appspot.com/o/threads%2Fprofile%2Fuser.png?alt=media&token=422128ad-8d58-4baa-b064-dd680c2a2de7",
                  "createdAt": "2023-07-17T10:07:46.014Z",
                  "updatedAt": "2023-07-17T10:07:46.014Z",
                  "__v": 0,
                  "bio": "this is an example bio"
              },
              "content": "Hello everyone this is my threads clone welcome here enjoy! ;-)",
              "likes": [],
              "parentThread": null,
              "createdAt": "2023-07-17T13:30:28.591Z",
              "updatedAt": "2023-07-17T13:30:28.591Z",
              "__v": 0
          },
          "createdAt": "2023-07-17T13:30:51.770Z",
          "updatedAt": "2023-07-17T13:30:51.770Z",
          "__v": 0
      }
  ]
  );
  const [userInfo, setUserInfo] = useState<any>({})

 useEffect(()=>{
  const data = localStorage.getItem('userInfo');
      if (data) {
        const parsedData = JSON.parse(data);
          setUserInfo(parsedData);
         /*  getThreads(parsedData.token).then((res) => {
            console.log(res.data.data);
            setThreads(res.data.data.data);
          }).catch((error) => {
            console.log(error);
        
          }); */
      }
  
 },[])

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Threads</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {threads.map(m => <ThreadComponent key={m._id} data={m} />)}
        </IonList>
      </IonContent>

     
    </IonPage>
  );
};

export default Home;
