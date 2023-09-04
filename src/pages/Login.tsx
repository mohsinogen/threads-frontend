import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import TextButton from "../components/TextButton/TextButton";
import TextInput from "../components/TextInput/TextInput";
import { Redirect, Route, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FIREBASE_AUTH } from "../config/FirebaseConfig";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState<string | undefined | null>("");
  const [password, setPassword] = useState<string | undefined | null>("");

const [show, hide] = useIonLoading()
  const [present] = useIonToast();

  const router = useIonRouter();

  const { user } = useAuth();

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 500,
      position: "bottom",
      mode: "ios",
    });
  };

  const loginHandler = async () => {
    if (email && password) {
      await show();
    try {
      const user = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        presentToast(
         error.message);
      }
    } finally {
      await hide();
    }
    }
  };
  useEffect(() => {
    if (user) {
      router.push('/home', 'forward', 'replace');
    }
  }, [user]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonRow>
          <h3>{"Welcome, Let's sign you in"}</h3>
        </IonRow>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" sizeLg="4">
              <TextInput
                placeholder="Email"
                value={email ? email : ""}
                onChange={(e) => {
                  setEmail(e.detail.value);
                }}
                type="text"
              />
              <br />
              <TextInput
                placeholder="Password"
                value={password ? password : ""}
                onChange={(e) => {
                  setPassword(e.detail.value);
                }}
                type="password"
              />
              <br />
              <TextButton text="Login" clickHandler={loginHandler} />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonRow>
          <IonText color="primary">
            <h4>
              New User?{" "}
              <IonText
                onClick={() => {
                  router.push("/register");
                }}
                color={"secondary"}
              >
                Register
              </IonText>{" "}
              here
            </h4>
          </IonText>
        </IonRow>
      </IonContent>
    </IonPage>
  );
}

export default Login;
