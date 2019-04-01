import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      value: '',
      currentRoom: ''
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

  handleChange(e) {
      e.preventDefault();
      let newChatRoom = e.target.value
      this.setState({value: newChatRoom});
  }

  createRoom(e) {
      e.preventDefault();
      let newRoomName = this.state.value;
      this.roomsRef.push({
          name: newRoomName
      })
      this.setState({value: ''});
  }



  render() {
    return (
      <div className="room-list">
        <ul className="chat-room-list">
          <li className="chat-title">Chat Rooms:</li>
        {
          this.state.rooms.map((room,index) =>
               <li key={index} className="room-number" value={room.key} onClick={() => this.props.updateRoom(room)}>{room.name}</li>
          )
        }
        </ul>
        <form className="chat-form" onSubmit={(e) => this.createRoom(e)}>
            <div>
                <label>
                    <div>Add Chat Room: </div>
                    <div>
                        <input type="text" value={this.state.value} placeholder="Chat Room Name" onChange={(e) => this.handleChange(e)} />
                        <input className="submit-button" type="submit" value="Add" />
                    </div>
                </label>
            </div>
        </form>
      </div>
    );
  }
}
export default RoomList;