import { IonBackButton, IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Bot from '../images/bot.png'
import './Chatbot.css'
import {arrowRedoSharp, camera, homeSharp, chatbox} from 'ionicons/icons'

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [chating, setChating] = useState<boolean>(false)

    const handleSubmit = async () => {
        if (inputMessage.trim() !== '') { // Check if input message is not empty
            // Add user input message to the messages state
            setMessages(prevMessages => [...prevMessages, `You: ${inputMessage}`]);

            const formData = new FormData();
            formData.append('user_text', inputMessage);

            const requestOptions = {
                method: 'POST',
                body: formData
            };
            const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const serverUrl = 'http://ec2-54-166-194-21.compute-1.amazonaws.com:8080/chatbot';
            const response = await fetch(corsProxyUrl + serverUrl, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const data = await response.json();
                // Add bot's reply to the messages state
                setMessages(prevMessages => [...prevMessages, `Bot: ${data}`]);
            }

            // Clear the input field
            setInputMessage('');
        }
    };

    const startChat = async () => {
        setChating(true)
    }

    useEffect(() => {
        setInputMessage('');
    }, [messages]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButton slot='start' color={'success'}>
                        <IonBackButton>
                        </IonBackButton>
                    </IonButton>
                    <IonTitle>Chat with WasteWise</IonTitle>
                </IonToolbar>
            </IonHeader>
            {!chating ? 
            (<IonContent className="ion-text-center ion-padding chatbot">
                <br/>
                <br/>
                <h1><b>How can we assist with your recycling queries today?</b></h1>
                <p>Welcome to WasteWise, your smart sorting assistant.
                    Unsure about where to toss your takeaway coffee cup or pizza box?
                    Just ask away!
                </p>
                <br/>
                <br/>
                <img src={Bot} alt='Bot Image'/>
                <IonButton color={'light'} onClick={startChat}>Get Sorting Help</IonButton>
            </IonContent>):(
            <IonContent className="ion-padding chatbot">
                <IonList lines="none" className='msg-window'>
                    {messages.map((message, index) => {
                        const isUserMessage = message.startsWith('You: ');
                        const messageClass = isUserMessage ? 'user-msg' : 'bot-msg';
                        return (
                            <IonItem key={index} className='msg-boxes'>
                                <IonCard className={messageClass}
                                ><IonCardContent>{message}</IonCardContent></IonCard>
                            </IonItem>
                        );
                    })}
                </IonList>
                <IonItem lines='none' className='input-box'>
                    <IonInput value={inputMessage}
                        placeholder="Ask me about waste sorting..."
                        onIonChange={(e) => setInputMessage(e.detail.value!)} // Update inputMessage state on change
                    > 
                        <IonButton fill='clear' slot="end" color='dark' onClick={handleSubmit}>
                            <IonIcon slot="icon-only" icon={arrowRedoSharp}></IonIcon>
                        </IonButton>
                    </IonInput>
                </IonItem>
            </IonContent>
        )}
            <IonFooter>
                <IonToolbar className="ion-text-center">
                    <IonButton color={'warning'} fill='clear' shape='round'>
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

export default Chatbot;
