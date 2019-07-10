const Rooms = require('../models/rooms')
const User = require('../models/users')


exports.connected = function(socket, data){
	console.log('player connected', data.short)
	Rooms.findOne({short: data.short}, (err, room) => {
		if (err) {
			//unknown error joining room
			return socket.emit('error-joining-room')
		}
		if (room) {	
			//join room
			socket.join(room.long)
			//send player joined message to host
			socket.broadcast.to(room.long).emit('player-joined', {id: socket.id});
			//return room data to player			
			socket.emit('player-joined-room', room)
				
		
		} else {
			//there is no host connected.  Come back later
			return socket.emit('error-joining-room-no-host')
		}

	})
}

exports.setName = (socket, data) => {
	console.log('setting name')
	console.log(socket.id)
	console.log(data)
	data.id = socket.id
	socket.broadcast.to(data.room.long).emit('player-set-name', data);

}