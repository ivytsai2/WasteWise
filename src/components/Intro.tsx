import { IonButton, IonText} from '@ionic/react';
import React from 'react';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import 'swiper/css';
import './Intro.css'
import WasteWiseLogo from '../assets/logo.png'
import Features from '../assets/features.png'

interface ContainerProps { 
  onFinish: () => void;
}

const SwiperButtonNext = ({ children}: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>
}

const Intro: React.FC<ContainerProps> = ({onFinish}) => {
  return <Swiper>
    <SwiperSlide>
      <img src={WasteWiseLogo} alt='WasteWise Logo'/>
      <IonText>
        <h1 id='appName'>WasteWise</h1>
      </IonText>
      <SwiperButtonNext>Start</SwiperButtonNext>
    </SwiperSlide>
    <SwiperSlide id='discription'>
      <IonText>
        <h3>This is a smart waste sorting app that simplfies task 
          and reduces confusion for households in Toronto City.
        </h3>
      </IonText>
      <img src={Features} alt='WasteWise Features'/>
      <IonButton onClick={() => onFinish()}>Finish</IonButton>
    </SwiperSlide>
  </Swiper>;
};

export default Intro;
