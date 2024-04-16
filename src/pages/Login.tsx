import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';
import {logInOutline, personCircleOutline} from 'ionicons/icons'
import WasteWiseLogo from '../assets/logo.png'
import Intro from '../components/Intro';

const Login: React.FC = () => {
    const [introSeen, setIntroSeen] = useState(false);
    const router = useIonRouter();
    const dologin = (event: any) => {
        event.preventDefault();
        console.log('dologin');
        router.push('/wastewise', 'root');
    };
    const finishIntro = async() => {
        console.log('FIN');
        setIntroSeen(true);
    }

    return (
        <>
        {!introSeen ? (
            <Intro onFinish={finishIntro}></Intro>
        ): (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonTitle>WasteWise</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent scrollY={false}>
                <div className='ion-text-center ion-padding'>
                    <img src={WasteWiseLogo} alt='WasteWise Logo'/>
                </div>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={dologin}>
                            <IonInput fill='outline' labelPlacement='floating'  
                                label='Email' type='email' placeholder='user@email.com'>
                            </IonInput>
                            <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating'  
                                label='Password' type='password'>
                            </IonInput>
                            <IonButton type='submit' expand='block' className='ion-margin-top'>
                                Login
                                <IonIcon icon={logInOutline} slot='end'></IonIcon>
                            </IonButton>
                            <IonButton routerLink='/register' color={'secondary'} type='button' 
                                expand='block' className='ion-margin-top'>
                                Create Accounct
                                <IonIcon icon={personCircleOutline} slot='end'></IonIcon>
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
        )}
        </>
    );
};

export default Login;