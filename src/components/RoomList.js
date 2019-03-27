import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount () {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room )});
    });
  }

  render() {
    return (
      <div className="room-list">
        <ul className="chat-room-list">
          <li className="chat-title">Chat Rooms:</li>
        {
          this.state.rooms.map((room,index) =>
               <li key={index} className="room-number" value={room.key}>{room.name}</li>
          )
        }
        </ul>
      </div>
    );
  }
}
export default RoomList;
