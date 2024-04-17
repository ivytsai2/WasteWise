import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Chatbot: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButton slot='start' color={'success'}>
                        <IonBackButton>
                        </IonBackButton>
                    </IonButton>
                    <IonTitle>WasteWise</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h1>Chatbot</h1>
            </IonContent>
        </IonPage>
    );
};

export default Chatbot;