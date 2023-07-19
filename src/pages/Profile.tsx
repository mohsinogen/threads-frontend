import { IonAvatar, IonBadge, IonButton, IonButtons, IonCol, IonContent, IonIcon, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react'
import { globeOutline, menu } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'

function Profile() {

    const [userInfo, setUserInfo] = useState<any>({})
    useEffect(() => {
        const data = localStorage.getItem('userInfo');
        if (data) {
            setUserInfo(JSON.parse(data))
        }
    }, [])

    const [present] = useIonActionSheet();


    const presentSheet = () => {
        present({
            buttons: [
                {
                    text: 'Logout',
                    role: 'destructive',
                    data: {
                        action: 'cancel',
                    },
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    data: {
                        action: 'cancel',
                    },
                },
            ],
        })
    }

    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonIcon slot="icon-only" icon={globeOutline}></IonIcon>
                </IonButtons>

                <IonButtons slot="end">
                    <IonIcon onClick={presentSheet} slot="icon-only" icon={menu}></IonIcon>
                </IonButtons>
            </IonToolbar>
            <IonContent>
                <IonCol>
                    <div className="ion-padding-horizontal ion-padding-top">
                        <IonRow>
                            <IonCol size='9'>
                                <IonRow>
                                    <h1>Test User</h1>
                                </IonRow>
                                <IonRow>
                                    <IonCol size='8' className='d-flex' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                        username{" "}<IonBadge mode='ios' color="medium">test.net</IonBadge>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size='3'>
                                <IonAvatar>
                                    <img alt="profile img" src={userInfo.profile} />
                                </IonAvatar>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='6'>
                                <p>This is an example bio to test bio in this app</p>
                            </IonCol>
                        </IonRow>
                        <strong>{userInfo?.followers?.length} followers</strong>
                        <IonRow className='ion-no-padding ion-padding-top'>
                            <IonCol size='6'>
                                <IonButton mode='ios' size='small' expand='block' fill="outline">Edit profile</IonButton>
                            </IonCol>
                            <IonCol size='6'>
                                <IonButton mode='ios' size='small' expand='block' fill="outline">Share profile</IonButton>
                            </IonCol>
                        </IonRow>
                    </div>

                    <IonSegment value="default">
                        <IonSegmentButton value="default">
                            <IonLabel>Threads</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="segment">
                            <IonLabel>Replies</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonCol>
            </IonContent>
        </IonPage>
    )
}

export default Profile