import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
  useIonToast,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import TextButton from "../components/TextButton/TextButton";
import TextInput from "../components/TextInput/TextInput";
import { useHistory } from "react-router";
import AuthContext from "../context/AuthContext";

function Login() {

  const [email, setEmail] = useState<string | undefined | null>("");
  const [password, setPassword] = useState<string | undefined | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {login, user} = useContext(AuthContext);
 
  const history = useHistory();

  const [present] = useIonToast();

  const presentToast = (message:string) => {
    present({
      message: message,
      duration: 500,
      position: 'bottom',
      mode:'ios'
    });
  };

  const loginHandler = () => {
   if(email && password){
    login(email, password)
    .then((res) => {
      history.push("/home");
    })
    .catch((error) => {
      console.log(error);
      presentToast(error.response.data.message?error.response.data.message:error.message)
    });
   }
  };

  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  }, []);

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
                value={email? email:''}
                onChange={(e) => {
                  setEmail(e.detail.value)
                }}
                type="text"
              />
              <br />
              <TextInput
                placeholder="Password"
                value={password? password:''}
                onChange={(e) => {
                  setPassword(e.detail.value)
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
                  history.push("/register");
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
