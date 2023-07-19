import { IonButton } from "@ionic/react";
import React, { useContext, useRef } from "react";
import "./TextButton.css";



const TextButton = ({clickHandler, text}:{clickHandler:()=> void,text:string}) => {
  return (
    <IonButton
      className="buttonStyle"
      expand="block"
      onClick={() => {
        clickHandler();
      }}
    >
      {text}
    </IonButton>
  );
};

export default TextButton;
