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
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { home } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import TextButton from "../components/TextButton/TextButton";
import TextInput from "../components/TextInput/TextInput";
import { login, register } from "../utils/api";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/FirebaseConfig";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";

function Register() {

  const defaultProfileImg = 'https://firebasestorage.googleapis.com/v0/b/threads-ionic.appspot.com/o/profile%2Fuser.png?alt=media&token=de97f193-1fd9-4780-8e46-e937d637c946';

  const history = useHistory()

  const [name, setName] = useState<string | undefined | null>('');
  const [email, setEmail] = useState<string | undefined | null>('');
  const [password, setPassword] = useState<string | undefined | null>('');
  const [confirmPassword, setConfirmPassword] = useState<string | undefined | null>('');

  const [show, hide] = useIonLoading()
  const [present] = useIonToast();

  const router = useIonRouter();

  const { user } = useAuth();

  const registerHandler = async () => {

    if(name && email && password){
      await show();
      try {
        const user = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        console.log(user);

        const newUser = {
          uid: user.user.uid,
          email: user.user.email,
          profile: defaultProfileImg,
          name: name,
          bio: '',
          link: '',
          following: [],
          followers: [],
        }
        
        const ref = doc(FIREBASE_DB, `users/${user.user.uid}`);
        setDoc(ref, { ...newUser });

      } catch (error) {
        if (error instanceof FirebaseError) {
          present({
            header: 'Registration failed',
            message: error.message,
            buttons: ['OK'],
          });
        }
      } finally {
        await hide();
      }
    }

  }

  useEffect(() => {
    if (user) {
      router.push('/home', 'forward', 'replace');
    }
  }, [user]);

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
