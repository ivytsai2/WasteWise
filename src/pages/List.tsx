import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import FetchData from '../components/FetchData';
import Items from '../assets/waste_items.json'

const List: React.FC = () => {
    const packageId =  "76ea33f1-31f0-42ea-a295-385fb4d94ea9";
    const datastore_resource_id = '274fde37-233c-485d-bc68-8177f0793412';
    const id = 'waste-wizard-lookup-table'
    const url=`/api/3/action/package_show?id=${id}`;
    const urlTest = 'https://randomuser.me/api?results=10'
    const urlDataCSV = 'dataset/76ea33f1-31f0-42ea-a295-385fb4d94ea9/resource/19df17bb-c259-4402-9dbf-e88f96154793/download/2023-12-11-waste-wizard-data-in-towaste-app-for-open-data.xlsx'
    const urlData = '/dataset/76ea33f1-31f0-42ea-a295-385fb4d94ea9/resource/274fde37-233c-485d-bc68-8177f0793412/download/2023-11-27-waste-wizard-data-from-towaste-app.json'
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
            </IonPage>
        );
    };
};

export default List;