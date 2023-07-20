import {
  IonInputCustomEvent,
  TextFieldTypes,
  InputChangeEventDetail,
} from "@ionic/core";
import { IonInput, IonItem } from "@ionic/react";
import React from "react";
import "./TextInput.css";
function TextInput({
  placeholder,
  value,
  type,
  onChange,
  disabled
}: {
  placeholder: string;
  value: string | number;
  type: TextFieldTypes;
  onChange: (e: IonInputCustomEvent<InputChangeEventDetail>) => void;
  disabled?:boolean
}) {
  return (
        <IonInput
        fill="outline"
          className="inputStyle"
          value={value}
          placeholder={placeholder}
          type={type}
          onIonInput={(e) => {
            onChange(e);
          }}
        />
  );
}

export default TextInput;
