import { Camera, CameraResultType } from '@capacitor/camera';
import { IonBackButton, IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './ScanAndSort.css';
import CameraIcon from '../assets/camera.png';
import { chatbox, homeSharp, camera } from 'ionicons/icons';

const ScanAndSort: React.FC = () => {
    const [image, setImage] = useState<any>(null);
    const [originalWidth, setOriginalWidth] = useState<number>(0);
    const [originalHeight, setOriginalHeight] = useState<number>(0);
    const [result, setResult] = useState<any>(null);
    const [category, setCategory] = useState('');

    const getCategory = (item: string) => {
        switch (item.toLowerCase()) {
            case 'plastic':
            case 'cans':
            case 'tins':
            case 'metal_trays_plates_pans':
            case 'cardboard':
            case 'styrofoam container':
            case 'envelope':
            case 'paper':
            case 'carton':
                return 'blue';
            case 'organics':
                return 'green';
            case 'general':
                return 'black';
            default:
                return 'other';
       }
    };

    const takePic = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64
            });

            const img = `data:image/jpeg;base64,${image.base64String}`;
            setImage(img);

            // Create an HTML image element to get the original width and height
            const tempImage = new Image();
            tempImage.src = img;
            tempImage.onload = () => {
                setOriginalWidth(tempImage.width);
                setOriginalHeight(tempImage.height);
            };

            const formData = new FormData();
            formData.append('image', image.base64String);
            //formData.append('test', "True");

            const requestOptions = {
                method: 'POST',
                body: formData
            };
            const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const serverUrl = 'http://ec2-54-166-194-21.compute-1.amazonaws.com:8080/wasteClassify';
            const response = await fetch(corsProxyUrl + serverUrl, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const data = await response.json();
                const data_array = data.split(",")
                const data_object = {
                    xmin: data_array[0],
                    ymin: data_array[1],
                    xmax: data_array[2],
                    ymax: data_array[3],
                    class: data_array[4],
                    score: data_array[5],
                }
                setResult(data_object);
            }
        } catch (error) {
            console.error('Error:', error);
        }        
    };

    const newWidth = 416;
    const newHeight = 416;
    const xScale = newWidth / originalWidth;
    const yScale = newHeight / originalHeight;


    useEffect(() => {
        if (result) {
            const cat = getCategory(result.class);
            setCategory(cat)
        }
    }, [result]);
    
    useEffect(() => {
        console.log('Original Width:', originalWidth);
        console.log('Original Height:', originalHeight);
        console.log('Predicted outcome:', result);
        console.log('Category:', category);
    }, [originalWidth, originalHeight, result, category]);

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
                        {category != 'other' ? (             
                        <div
                            style={{
                                position: 'absolute',
                                top: `${result['ymin']*yScale}px`,
                                left: `${result['xmin']*xScale}px`,
                                width: `${(result['xmax'] - result['xmin'])*xScale}px`,
                                height: `${(result['ymax'] - result['ymin'])*yScale}px`,
                                border: `5px solid ${category}`,
                                boxSizing: 'border-box',
                            }}><p 
                                style={{
                                    color: `${category}`,
                                    fontWeight: 'bold' 
                                }}
                            >{category.toUpperCase()} BIN</p>
                        </div> ) : <h2 style={{
                                        textShadow: '2px 2px #eb3474'}}>
                                    <b>Ask chatbot for dispose method.</b></h2>
                        }  
                    </div>                  
                ):<div></div>}
            </IonContent> 
            <IonFooter>
                <IonToolbar className="ion-text-center">
                    <IonButton routerLink='../wastewise/chatbot' fill='clear' shape='round'>
                        <IonIcon icon={chatbox} slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton routerLink='../' fill='clear' shape='round' size='large'>
                        <IonIcon icon={homeSharp} slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton color={'warning'} fill='clear' shape='round'>
                        <IonIcon icon={camera} slot="icon-only"></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default ScanAndSort;