import { IonBackButton, IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import FetchData from '../components/FetchData';
import Items from '../assets/waste_items.json'
import { chatbox, homeSharp, camera } from 'ionicons/icons';

const List: React.FC = () => {
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<any[]>([]);

    //const { data, refetch } = FetchData(urlDataCSV);
    const data = Items as any[];
    const itemNames: any[] = [];
    const categories = new Set<string>();
    data.forEach(item => {
        itemNames.push(item.item);
        categories.add(item.category);
    });
    console.log(itemNames)
    console.log(categories)

    if (!data) {
        return <h1>Loading</h1>;
    } else {
        //console.log(itemNames);
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
                    <IonToolbar  color={'success'}>
                        <IonSearchbar></IonSearchbar>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    Most popular items
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
};

export default List;