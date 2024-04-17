import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchData(url: any) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(url)
        .then((response) => {
            setData(response.data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [url]);
    
    const refetch = () => {
        setLoading(true);
        axios.get(url)
        .then((response) => {
            setData(response.data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    return { data, loading, error, refetch};
};

export default FetchData;