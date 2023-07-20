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
    IonText,
  } from "@ionic/react";
  import { home } from "ionicons/icons";
  import React, { useContext, useEffect, useState } from "react";
  import TextButton from "../components/TextButton/TextButton";
  import TextInput from "../components/TextInput/TextInput";
  import { login, register } from "../utils/api";
  import { useHistory } from "react-router";
  
  function Register() {
  
    const [name, setName] = useState<string | undefined | null>('');
    const [email, setEmail] = useState<string | undefined | null>('');
    const [password, setPassword] = useState<string | undefined | null>('');
    const [confirmPassword, setConfirmPassword] = useState<string | undefined | null>('');
    const [loading, setLoading] = useState<boolean>(false);

    const history = useHistory();

    const registerHandler = () => {
  
      if(name && email && password){
        register(name, email, password).then((res) => {
            console.log(res.data.data);
            localStorage.setItem('userInfo', JSON.stringify(res.data.data))
            history.push('/home')
      
          }).catch((error) => {
            console.log(error);
      
          });
      }
  
    }
  
    useEffect(()=>{
      const userInfo = localStorage.getItem('userInfo');
      if(userInfo){
        history.push('/home')
      }
    },[])
  
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonRow>
            <h3>{"Welcome, Let's register"}</h3>
          </IonRow>
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="6" sizeLg="4">
              <TextInput
                placeholder="Name"
                value={name?name:''}
                onChange={(e) => {
                    setName(e.detail.value)
                }}
                type="text"
              />
                <br />
              <TextInput
                placeholder="Email"
                value={email?email:''}
                onChange={(e) => {
                    setEmail(e.detail.value)
                }}
                type="text"
              />
                <br />
                <TextInput
                placeholder="Password"
                value={password?password:''}
                onChange={(e) => {
                    setPassword(e.detail.value)
                }}
                type="password"
              />
                <br />
                <TextInput
                placeholder="Confirm Password"
                value={confirmPassword?confirmPassword:''}
                onChange={(e) => {
                  setConfirmPassword(e.detail.value)
                }}
                type="password"
              />
                <br />
                <TextButton text="Register" clickHandler={registerHandler} />
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonRow>
          <IonText color="primary">
            <h4>Already a User? <IonText onClick={()=>{
              history.push('/login')
            }} color={'secondary'}>Login</IonText> here</h4>
          </IonText>
        </IonRow>
        </IonContent>
  
  
      </IonPage>
    );
  }
  
  export default Register;
  