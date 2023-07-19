import { IonAvatar, IonCol, IonItem, IonLabel, IonRow } from '@ionic/react'
import React from 'react'

interface ThreadComponentProps {
    data: any
}
function ThreadComponent(props: ThreadComponentProps) {
    return (
        <IonItem>
            <IonRow>
                <IonCol size='1'>
                    <IonAvatar style={{width:'2rem', height:'2rem'}}>
                        <img alt="profile img" src={props.data.author.profile} />
                    </IonAvatar>
                </IonCol>
                <IonCol size='6'>
                    <IonLabel>
                        {props.data.author.name}
                    </IonLabel>
                </IonCol>
            </IonRow>
        </IonItem>
    )
}

export default ThreadComponent