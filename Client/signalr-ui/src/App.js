import './App.css';
import { WaitingForm } from './components/WaitingForm'
import { HubConnectionBuilder } from '@microsoft/signalr'

function App() {
  const joinChat = async (user) => {
    var connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5295/chat")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveMessage", (userName, message) => {
      console.log(userName);
      console.log(message);
    });

    try {
      await connection.start();
      await connection.invoke("JoinChat", user);

      console.log(connection);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main">
      <WaitingForm joinChat={joinChat} />
    </div>
  );
}

export default App;
