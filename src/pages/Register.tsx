import { IonBackButton, IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import {checkmarkDoneOutline} from 'ionicons/icons'

const Register: React.FC = () => {
    const router = useIonRouter();
    const doregister = (event: any) => {
        event.preventDefault();
        console.log('doregister');
        router.goBack();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButton slot='start'>
                        <IonBackButton defaultHref='/' color={'success'}>
                        </IonBackButton>
                    </IonButton>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent scrollY={false}>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={doregister}>
                            <IonInput fill='outline' labelPlacement='floating'  
                                label='Email' type='email' placeholder='user@email.com'>
                            </IonInput>
                            <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating'  
                                label='Password' type='password'>
                            </IonInput>
                            <IonButton type='submit' expand='block' className='ion-margin-top'>
                                Create My Accounct
                                <IonIcon icon={checkmarkDoneOutline} slot='end'></IonIcon>
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Register;