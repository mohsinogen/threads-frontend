import { IonInput, IonItem } from "@ionic/react";
import React from "react";
import './TextInput.css'
function TextInput() {
  return (
    <>
      <IonItem>
        <IonInput
          className="inputStyle"
          value={"hello"}
          placeholder="Username"
          type="text"
        />
      </IonItem>
    </>
  );
}

export default TextInput;
