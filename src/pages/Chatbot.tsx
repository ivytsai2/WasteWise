import { IonBackButton, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

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
                <IonList>
                    {messages.map((message, index) => (
                        <IonItem key={index}>
                            <IonLabel>{message}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
                <IonItem>
                    <IonInput
                        value={inputMessage}
                        placeholder="Type your message here..."
                        onIonChange={(e) => setInputMessage(e.detail.value!)} // Update inputMessage state on change
                    ></IonInput>
                    <IonButton onClick={handleSubmit}>Send</IonButton> {/* Button to submit message */}
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Chatbot;
