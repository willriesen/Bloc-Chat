import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDGEmgqNhOufABZ0CWJDgok_WTDkn0KX_Q",
  authDomain: "bloc-chat-a9c9b.firebaseapp.com",
  databaseURL: "https://bloc-chat-a9c9b.firebaseio.com",
  projectId: "bloc-chat-a9c9b",
  storageBucket: "",
  messagingSenderId: "92411543631"
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bloc Chat</h1>
        </header>
        <RoomList firebase={firebase}
        updateRoom={this.updateRoom.bind(this)}
        activeRoomId={this.state.activeRoomId}
        activeRoom={this.state.activeRoom} />

        <section className="message-list">
          <MessageList firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeRoomId={this.state.activeRoomId} />
        </section>

      </div>
    );
  }
}
export default App;