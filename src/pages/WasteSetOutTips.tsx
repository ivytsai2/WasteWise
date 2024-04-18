import { IonBackButton, IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useLocation } from 'react-router';
import './WasteSetOutTips.css'
import { chatbox, homeSharp, camera } from 'ionicons/icons';

const Recycle: React.FC = () => {
    const url = "https://www.toronto.ca/services-payments/recycling-organics-garbage/houses/set-out-tips/"
    const location = useLocation();
    const {page} = (location.state || {page: ''}) as {page: string};

    console.log('At waste set out tips page: ', page)

    const yardWasteSetOutTips = [
        'Yard waste in plastic bags or cardboard boxes will not be collected.',
        'Tie brush and branches in cundles with string no longer than 1.2 m (4 ft), no wider than 0.6 m (2 ft) and no heavier than 20 kg (44 lbs).',
        'Branches cannot exceed 7.5 cm (3 in). Contact a private collections company to collect larger sizes.'
    ]

    const recycleSetOutTips = [
        'Items in the Blue Bin should be loose.',
        'Place excess recycling in a clear bag beside your bin. Excess cardboard shuld be flattened and bundled to a size that would fit an empty Blue Bin and placed beside the bin.'
    ]

    const compostSetOutTips = [
        'Bin must squarely face the street',
        'Place dial/latch in the locked position and the arrow on bin lid pointing to the street.',
        'Do not put yard waste in the Green Bin.',
        'Wash bin regularly with dish soap and water.'
    ]

    const garbageSetOutTips = [
        'Remove any ties/bungee cords before collection',
        'Garbage must fit into your bin with the lid fully closed',
        'Excess garbage must be bagged, tagged and set beside your Garbage Bin. Bags cannot weigh more than 20 kg (44 lbs). Garbage Tags are available for purchase online and at Toronto Shoppers Drug Mart and Canadian Tire locations.'
    ]

    const getUrl = () => {
        switch (page) {
            case 'recycle':
                return url + '?accordion=blue-bin-set-out-tips';
            case 'compost':
                return url + '?accordion=green-bin-set-out-tips';
            case 'garbage':
                return url + '?accordion=garbage-bin-set-out-tips';
            case 'yard':
                return 'https://www.toronto.ca/services-payments/recycling-organics-garbage/houses/yard-waste/';
            default:
                return '';
        }
    }

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
                <h1 className='ion-text-center'><b>
                    {page === 'recycle' ? 'Recycle - Blue Bin' :
                    page === 'compost' ? 'Compost - Green Bin' :
                    page === 'garbage' ? 'Garbage - Black Bin' :
                    page === 'yard' ? 'Yard Waste' :
                    ''}<br/>Set Out Tips
                </b></h1>
                <ul>
                    <li>Place {page === 'yard'? 'items' : 'bin'} curbside as close to the street as possible no later than 7 a.m. the day of collection and no earlier than 8 p.m. the night before collection day.</li>
                    
                    <li>{page === 'yard' ? 'Place items in kraft paper yard waste bags or rigid open-topped containers (between 55 cm - 95 cm in external height, except for blue and grey boxes previously used for recycling).'
                     : 'Leave 0.5 m (2 ft) on each side and 3 m (10 ft) above the bin to allow automated pickup.'}</li>
                    
                    {page === 'recycle' && recycleSetOutTips.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    {page === 'compost' && compostSetOutTips.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    {page === 'garbage' && garbageSetOutTips.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    {page === 'yard' && yardWasteSetOutTips.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <div className='ion-text-center'>
                    <a href={getUrl()}><p className='link-style'>Learn more</p></a>
                </div>
            </IonContent>
            <IonFooter>
                <IonToolbar className="ion-text-center">
                    <IonButton routerLink='../wastewise/chatbot' fill='clear' shape='round'>
                        <IonIcon icon={chatbox} slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton routerLink='../' fill='clear' shape='round' size='large'>
                        <IonIcon icon={homeSharp} slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton routerLink='../wastewise/scan&sort' fill='clear' shape='round'>
                        <IonIcon icon={camera} slot="icon-only"></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Recycle;