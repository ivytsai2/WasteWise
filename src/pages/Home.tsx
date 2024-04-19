import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonMenu, IonRoute, IonRouterOutlet, IonItem, IonGrid, IonRow, IonCol, IonCard, IonCardContent, useIonRouter, IonCardHeader, IonCardTitle, IonFooter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {homeOutline, logInOutline, newspaperOutline, personCircleOutline} from 'ionicons/icons'
import Intro from '../components/Intro';
import Menu from '../images/menu.png';
import RecycleIcon from '../images/recycle.png';
import CompostIcon from '../images/compost.png';
import GarbageIcon from '../images/garbage.png';
import YardIcon from '../images/yard.png';
import SortIcon from '../images/sort.png';
import ChatbotIcon from '../images/chatbot.png';
import MapIcon from '../images/map.png';
import ScheduleIcon from '../images/schedule.png';
import './Home.css';
import { Preferences } from '@capacitor/preferences';
import { Redirect, Route } from 'react-router';
import List from './List';
import { Link } from 'react-router-dom';
import {homeSharp, chatbox, camera} from 'ionicons/icons'

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
          <IonGrid>
            <IonRow>
              <IonCol class='ion-text-center'>
                <Link to={{
                  pathname: '/wastewise/recycle',
                  state: {page: 'recycle'}
                }}>
                  <IonButton shape='round' color='fill' id='recycleBtn'>
                    <img src={RecycleIcon} alt='Recycle Icon'/>
                  </IonButton>
                </Link>
                <br />
                Recycle
              </IonCol>
              <IonCol class='ion-text-center'>
                <Link to={{
                  pathname: '/wastewise/compost',
                  state: {page: 'compost'}
                }}>
                  <IonButton shape='round' color='fill' id='compostBtn'>
                    <img src={CompostIcon} alt='Compost Icon'/>
                  </IonButton>
                </Link>
                <br />
                Compost
              </IonCol>
              <IonCol class='ion-text-center'>
                <Link to={{
                  pathname: '/wastewise/garbage',
                  state: {page: 'garbage'}
                }}>
                  <IonButton shape='round' color='fill' id='garbageBtn'>
                    <img src={GarbageIcon} alt='Garbage Icon'/>
                  </IonButton>
                </Link>
                <br />
                Garbage
              </IonCol>
              <IonCol class='ion-text-center'>
                <Link to={{
                  pathname: '/wastewise/yard',
                  state: {page: 'yard'}
                }}>
                  <IonButton shape='round' color='fill' id='yardBtn'>
                    <img src={YardIcon} alt='Yard Icon'/>
                  </IonButton>
                </Link>
                <br />
                Yard
              </IonCol>
            </IonRow>
          </IonGrid>
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
                <IonCard //onClick={toSchedule}
                >
                  <IonCardHeader>
                    <img src={ScheduleIcon} alt='Schedule Icon'/>
                    <IonCardTitle>Collection Schedule</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class='ion-text-center feature-card'>
                <IonCard //onClick={toMap}
                >
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
          <IonToolbar className="ion-text-center">
            <IonButton routerLink='wastewise/chatbot' fill='clear' shape='round'>
              <IonIcon icon={chatbox} slot="icon-only"></IonIcon>
            </IonButton>
            <IonButton fill='clear' color={'warning'} shape='round' size='large'>
              <IonIcon icon={homeSharp} slot="icon-only"></IonIcon>
            </IonButton>
            <IonButton routerLink='wastewise/scan&sort' fill='clear' shape='round'>
              <IonIcon icon={camera} slot="icon-only"></IonIcon>
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    )}
    </>
  );
};

export default Home;
