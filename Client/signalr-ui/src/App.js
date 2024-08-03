import './App.css';
import { WaitingForm } from './components/WaitingForm'
import { Chat } from './components/Chat'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { useState } from 'react';

function App() {
  const [connection, setConnection] = useState(null);
  const [chatRoom, setChatroom] = useState("");
  const [messages, setMessages] = useState([]);

  const joinChat = async ({userName, chatRoom}) => {
    var connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5295/chat")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveMessage", (userName, message) => {
      setMessages((messages) => [...messages, { userName, message }]);
    });

    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatRoom });

      setConnection(connection);
      setChatroom(chatRoom);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = (message) => {
    connection.invoke("SendMessage", message);
  };

  const closeChat = async () => {
    await connection.stop();
    setConnection(null);
  };

  return (
    <div className="main">
      {connection ? <Chat messages={messages} chatRoom={chatRoom} closeChat={closeChat} sendMessage={sendMessage} /> : <WaitingForm joinChat={joinChat} /> }
    </div>
  );
}

export default App;
