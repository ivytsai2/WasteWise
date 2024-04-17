import { Camera, CameraResultType } from '@capacitor/camera';
import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './ScanAndSort.css';
import CameraIcon from '../assets/camera.png';

const ScanAndSort: React.FC = () => {
    const [image, setImage] = useState<any>(null);
    const [result, setResult] = useState<any>(null);
    //const [boundingBoxes, setBoundingBoxes] = useState(null);
    const takePic = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64
        });

        const img = `data:image/jpeg;base64,${image.base64String}`;
        setImage(img);

        const formData = new FormData();
        formData.append('image', image.base64String);

        const requestOptions = {
            method: 'POST',
            body: formData
        };
        const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const serverUrl = 'http://ec2-18-233-100-133.compute-1.amazonaws.com:8080/wasteClassify';
        const response = await fetch(corsProxyUrl + serverUrl, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const data = await response.json();
        setResult(data);
        console.log('Predicted outcome:', result);
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
            <IonContent className="ion-text-center" class='background-img'>
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
                <div id='image-div'>
                    <img src={image} alt='Captured Image' />
                    {result && (                      
                        <div 
                            style={{
                                position: 'absolute',
                                top: `18px`,
                                left: `68px`,
                                width: `255px`,
                                height: `340px`,
                                border: '2px solid red',
                                boxSizing: 'border-box',
                            }}>
                        </div>                       
                    )}
                </div>
                {result && (<div>{result['item']}</div>)}
                
            </IonContent>
        </IonPage>
    );
};

export default ScanAndSort;