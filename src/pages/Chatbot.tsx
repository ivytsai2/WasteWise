import { IonBackButton, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    const handleSubmit = () => {
        if (inputMessage.trim() !== '') { // Check if input message is not empty
            // Add user input message to the messages state
            setMessages([...messages, `You: ${inputMessage}`]);
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
                        onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit(); }} // Submit message on Enter key press
                    ></IonInput>
                    <IonButton onClick={handleSubmit}>Send</IonButton> {/* Button to submit message */}
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Chatbot;
