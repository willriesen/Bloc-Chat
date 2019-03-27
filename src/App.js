import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
            
          </div>
          <RoomList firebase={firebase}
            updateRoom={this.updateRoom.bind(this)}
            activeRoomId={this.state.activeRoomId}
            activeRoom={this.state.activeRoom} />
        </nav>
        <section className="message-list">
          
        </section>

      </div>
    );
  }
}

export default App;