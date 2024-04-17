import { Camera, CameraResultType } from '@capacitor/camera';
import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './ScanAndSort.css';
import CameraIcon from '../assets/camera.png';

const ScanAndSort: React.FC = () => {
    const [image, setImage] = useState<any>(null);
    const [result, setResult] = useState<any>(null);
    const [category, setCategory] = useState('');
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
        console.log(data);
        console.log('Predicted outcome:', result);

        const getCategory = (item: string) => {
            switch (item.toLowerCase()) {
                case 'plastic':
                    return 'blue';
                case 'apple':
                    return 'green';
                case 'trash':
                    return 'black';
                default:
                    return 'other';
           }
        };
        
        if (result) {
            const cat = getCategory(result['item']);
            setCategory(cat)
        }
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
                {result ? (    
                    <div id='image-div'>
                        <img src={image} alt='Captured Image' />                  
                        <div
                            style={{
                                position: 'absolute',
                                top: `${result['ymin']}px`,
                                left: `${result['xmin']}px`,
                                width: `${result['xmax'] - result['xmin']}px`,
                                height: `${result['ymax'] - result['ymin']}px`,
                                border: `5px solid ${category}`,
                                boxSizing: 'border-box',
                            }}><p 
                                style={{
                                    color: `${category}`,
                                    fontWeight: 'bold' 
                                }}
                            >{category.toUpperCase()} BIN</p>
                        </div>   
                    </div>                  
                ):<div></div>}
            </IonContent> 
        </IonPage>
    );
};

export default ScanAndSort;