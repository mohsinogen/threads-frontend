import { IonButton } from "@ionic/react";
import React, { useContext, useRef } from "react";
import "./TextButton.css";

interface TextButtonProps {
  clickHandler: () => void;
}

const TextButton = (props: TextButtonProps) => {
  return (
    <IonButton
      className="buttonStyle"
      expand="block"
      onClick={() => {
        props.clickHandler();
      }}
    >
      Login
    </IonButton>
  );
};

export default TextButton;
