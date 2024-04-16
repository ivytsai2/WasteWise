import { Camera, CameraResultType } from '@capacitor/camera';
import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';

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
            <IonContent className="ion-padding">
                <h1>Scan and Sort</h1>
                <IonButton expand='full' onClick={takePic}>
                    Take Picture
                </IonButton>
                <img src={image} alt='' />
            </IonContent>
        </IonPage>
    );
};

export default ScanAndSort;