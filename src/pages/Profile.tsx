import { IonButton, IonButtons, IonContent, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { globeOutline, menu } from 'ionicons/icons'
import React from 'react'

function Profile() {
    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonIcon slot="icon-only" icon={globeOutline}></IonIcon>
                </IonButtons>

                <IonButtons slot="end">
                    <IonIcon slot="icon-only" icon={menu}></IonIcon>
                </IonButtons>
            </IonToolbar>
            <IonContent>

            </IonContent>
        </IonPage>
    )
}

export default Profile