import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { home } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import TextButton from "../components/TextButton/TextButton";
import TextInput from "../components/TextInput/TextInput";
import { login } from "../utils/api";
import { useHistory } from "react-router";

function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();
  const loginHandler = () => {

    login('mohsinogen@gmail.com', '123456').then((res) => {
      console.log(res.data.data);
      localStorage.setItem('userInfo', JSON.stringify(res.data.data))
      history.push('/home')

    }).catch((error) => {
      console.log(error);

    });

  }

  useEffect(()=>{
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo){
      history.push('/home')
    }
  },[])

  return (
    <IonPage>
      <IonContent className="ion-justify-content-center">
        <IonRow>
          <h3>{"Welcome, Let's sign you in"}</h3>
        </IonRow>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" sizeLg="4">
              <TextInput />
              <br />
              <TextInput />
              <br />
              <TextButton clickHandler={loginHandler} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>


    </IonPage>
  );
}

export default Login;
