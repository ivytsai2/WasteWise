import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonMenu, IonRoute, IonRouterOutlet, IonItem, IonGrid, IonRow, IonCol } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {homeOutline, logInOutline, newspaperOutline, personCircleOutline} from 'ionicons/icons'
import Intro from '../components/Intro';
import Menu from '../assets/menu.png'
import './Home.css';
import { Preferences } from '@capacitor/preferences';
import { Redirect, Route } from 'react-router';
import Recycle from './Recycle';
import List from './List';

const Home: React.FC = () => {
  const INTRO_KEY = 'intro-seen';
  const [introSeen, setIntroSeen] = useState(true);
  const paths = [
    {name: 'Home', url: '/wastewise/list', icon: homeOutline},
    {name: 'Recycle', url: '/wastewise/recycle', icon: newspaperOutline}
  ]

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY});
      console.log('checkStorage ~ seen:', seen)
      setIntroSeen(seen.value === 'true');
    }
    checkStorage();
  }, [])
  const finishIntro = async() => {
    setIntroSeen(true);
    Preferences.set({key: INTRO_KEY, value: 'true'});
  }
  const watchIntroAgain = async() => {
    setIntroSeen(false);
    Preferences.remove({key: INTRO_KEY});
  }

  return (
    <>
    {!introSeen ? (
        <Intro onFinish={finishIntro}></Intro>
    ): (
      <IonPage>
        <IonContent>
          <IonToolbar id='menu' color={'success'}>
            <IonTitle>
              <img src={Menu} alt='Menu Logo'/>
              Welcome to WasteWise!</IonTitle>
          </IonToolbar>
          Hello Users!!!
          <IonButton onClick={watchIntroAgain} fill='clear' size='small' color={'medium'} 
            type='submit' expand='block' className='ion-margin-top'>
            Watch intro again
            <IonIcon icon={logInOutline} slot='end'></IonIcon>
          </IonButton>
        </IonContent>
      </IonPage>
    )}
    </>
  );
};

export default Home;
