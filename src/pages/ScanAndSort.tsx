import { Camera, CameraResultType } from '@capacitor/camera';
import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './ScanAndSort.css';
import CameraIcon from '../assets/camera.png';

const ScanAndSort: React.FC = () => {
    const [image, setImage] = useState<any>(null);
    const takePic = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64
        });

        const img = `data:image/jpeg;base64,${image.base64String}`;
        setImage(img);
    };
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
            <IonContent className="ion-padding ion-text-center" class='background-img'>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <IonButton fill='clear' onClick={takePic}>
                    <img src={CameraIcon} alt='Camera Icon'/>
                </IonButton>
                <br />
                <br />
                <h1><b>Sort yout waste item</b></h1>
                <img src={image} alt='' />
            </IonContent>
        </IonPage>
    );
};

export default ScanAndSort;