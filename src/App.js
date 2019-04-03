import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCoNKn1fefpZ8Yw0Ee7ob2NNtemIgOsT8s",
  authDomain: "bloc-chat-react-f44c9.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-f44c9.firebaseio.com",
  projectId: "bloc-chat-react-f44c9",
  storageBucket: "",
  messagingSenderId: "434006141483"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      activeRoomId: '',
      user: ''
    }
  }

  updateRoom(roomId) {
    if (roomId === '') {
      this.setState({activeRoomId: '', activeRoom: ''})
    } else {
      this.setState({activeRoomId: roomId.key, activeRoom: roomId.name});
    }
  }

setUser(currentUser) {
  this.setState({user: currentUser});
}

  render() {
    return (
      <div className="App">
       <nav className="room-navigation">
        <header className="App-header">
          <h1>Bloc Chat</h1>
        </header>
        <div className="logIn">
        <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user} />
        </div>
        <RoomList firebase={firebase}
        updateRoom={this.updateRoom.bind(this)}
        activeRoomId={this.state.activeRoomId}
        activeRoom={this.state.activeRoom} />
       </nav>
        <section className="message-list">
          <MessageList firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeRoomId={this.state.activeRoomId} 
            user={this.state.user} />
        </section>

      </div>
    );
  }
}
export default App;