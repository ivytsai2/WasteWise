import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonMenu, IonRoute, IonRouterOutlet, IonItem, IonGrid, IonRow, IonCol, IonCard, IonCardContent, useIonRouter, IonCardHeader, IonCardTitle, IonFooter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {homeOutline, logInOutline, newspaperOutline, personCircleOutline} from 'ionicons/icons'
import Intro from '../components/Intro';
import Menu from '../assets/menu.png';
import RecycleIcon from '../assets/recycle.png';
import CompostIcon from '../assets/compost.png';
import GarbageIcon from '../assets/garbage.png';
import YardIcon from '../assets/yard.png';
import SortIcon from '../assets/sort.png';
import ChatbotIcon from '../assets/chatbot.png';
import MapIcon from '../assets/map.png';
import ScheduleIcon from '../assets/schedule.png';
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
  const router = useIonRouter();

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY});
      console.log('checkStorage ~ seen:', seen)
      setIntroSeen(seen.value === 'true');
    }
    checkStorage();
  }, []);
  const finishIntro = async() => {
    setIntroSeen(true);
    Preferences.set({key: INTRO_KEY, value: 'true'});
  };
  const watchIntroAgain = async() => {
    setIntroSeen(false);
    Preferences.remove({key: INTRO_KEY});
  };
  const toSort = (event: any) => {
    event.preventDefault();
    router.push('/wastewise/scan&sort', 'forward');
  };
  const toSchedule = (event: any) => {
    event.preventDefault();
    router.push('/wastewise/collection-schedule', 'forward');
  };
  const toMap = (event: any) => {
    event.preventDefault();
    router.push('/wastewise/drop-off-location', 'forward');
  };
  const toChatbot = (event: any) => {
    event.preventDefault();
    router.push('/wastewise/chatbot', 'forward');
  };

  return (
    <>
    {!introSeen ? (
        <Intro onFinish={finishIntro}></Intro>
    ): (
      <IonPage>
        <IonContent>
          <IonToolbar id='menu' color={'success'}>
            <IonGrid>
              <IonRow>
                <IonCol size='2'></IonCol>
                <IonCol size='10' id='spanCol'>
                  <br />
                  <br />
                  <br />
                  <IonTitle>Welcome to WasteWise!</IonTitle>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
          <img id='menuicon' src={Menu} alt='Menu Logo'/>
          <br />
          <br />
          <IonGrid>
            <IonRow>
              <IonCol class='ion-text-center'>
                <IonButton routerLink='/wastewise/recycle' type='button' 
                  shape='round' color='fill' id='recycleBtn'>
                  <img src={RecycleIcon} alt='Recycle Icon'/>
                </IonButton>
                <br />
                Recycle
              </IonCol>
              <IonCol class='ion-text-center'>
                <IonButton routerLink='/wastewise/compost' type='button' 
                  shape='round' color='fill' id='compostBtn'>
                  <img src={CompostIcon} alt='Compost Icon'/>
                </IonButton>
                <br />
                Compost
              </IonCol>
              <IonCol class='ion-text-center'>
                <IonButton routerLink='/wastewise/garbage' type='button' 
                  shape='round' color='fill' id='garbageBtn'>
                  <img src={GarbageIcon} alt='Garbage Icon'/>
                </IonButton>
                <br />
                Garbage
              </IonCol>
              <IonCol class='ion-text-center'>
                <IonButton routerLink='/wastewise/yard' type='button' 
                  shape='round' color='fill' id='yardBtn'>
                  <img src={YardIcon} alt='Yard Icon'/>
                </IonButton>
                <br />
                Yard
              </IonCol>
            </IonRow>
          </IonGrid>
          <br />
          <br />
          <br />
          <IonGrid>
            <IonRow>
              <IonCol class='ion-text-center feature-card'>
                <IonCard onClick={toSort}>
                  <IonCardHeader>
                    <img src={SortIcon} alt='Sort Icon'/>
                    <IonCardTitle>Scan and Sort</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
              <IonCol class='ion-text-center feature-card'>
                <IonCard onClick={toSchedule}>
                  <IonCardHeader>
                    <img src={ScheduleIcon} alt='Schedule Icon'/>
                    <IonCardTitle>Collection Schedule</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class='ion-text-center feature-card'>
                <IonCard onClick={toMap}>
                  <IonCardHeader>
                    <img src={MapIcon} alt='Map Icon'/>
                    <IonCardTitle>Drop-off Depots</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
              <IonCol class='ion-text-center feature-card'>
                <IonCard onClick={toChatbot}>
                  <IonCardHeader>
                    <img src={ChatbotIcon} alt='Chatbot Icon'/>
                    <IonCardTitle>Chatbot</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class='description-card'>
                <IonCard>
                  <IonCardContent>
                  The City’s annual spring cleanup of parks and other public spaces returns April 19 to 22.  For more information and to register, visit:
                  <br />
                  <a href='https://www.toronto.ca/clean-toronto-together'>https://www.toronto.ca/clean-toronto-together</a>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonButton onClick={watchIntroAgain} fill='clear' size='small' color={'medium'} 
            type='submit' expand='block' className='ion-margin-top'>
            Watch intro again
            <IonIcon icon={logInOutline} slot='end'></IonIcon>
          </IonButton>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonTitle>Footer</IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    )}
    </>
  );
};

export default Home;
