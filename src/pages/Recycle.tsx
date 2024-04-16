import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import BackIcon from '../assets/back.png';
import { caretBack } from 'ionicons/icons';

const Recycle: React.FC = () => {

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
                <h1>Recycle - Blue Bin</h1>
                <ul>
                    <li>Place bins/items at curbside before 7 a.m. the day of collection and no earlier than 8 p.m. the night before.</li>
                    <br/>
                    <li>Leave 0.5 metres of space around and 3 metres above all bins and items set out for collection so that the truck’s automated arms can grab and lift bins.</li>
                    <br/>
                    <li>Put items in the bin loosely.</li>
                    <br/>
                    <li>If you have excess recycling, put it in a clear bag and place it beside your bin.</li>
                    <br/>
                    <li>Excess cardboard should be flattened and bundled to a size that would fit in an empty Blue Bin and placed beside the bin.</li>
                    <br />
                    <li>If you regularly have excess recycling, you need to upsize your bin by submitting a service request or calling 311.</li>
                    <br />
                    <li>Wash bins regularly with dish soap and water.</li>
                </ul>
                <a href='https://www.toronto.ca/services-payments/recycling-organics-garbage/houses/set-out-tips/'>Learn more</a>
            </IonContent>
        </IonPage>
    );
};

export default Recycle;