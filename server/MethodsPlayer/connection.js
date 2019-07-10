const Rooms = require('../models/rooms')
const User = require('../models/users')
const auto = require('google-autocomplete');

exports.connected = function(socket, data){
	console.log('player connected', data)
	Rooms.findOne({short: data.room}, (err, room) => {
		if (err) {
			//unknown error joining room
			return socket.emit('error-joining-room')
		}
		if (room) {	

			const playerData = {
				id: socket.id, 
				prevId: data.prevId,
				name: data.name
			}
			//join room
			socket.join(room.long)
			console.log('player connecting', {room, playerData})
			//send player joined message to host
			socket.broadcast.to(room.long).emit('player-joined', {
				room, playerData
			});
			//return room data to player			
			// socket.emit('player-joined-room-successfully', {
			// 	room, playerData
			// })
		} else {
			//there is no host connected.  Come back later
			return socket.emit('error-joining-room-no-host')
		}

	})
}

exports.setName = (socket, data) => {
	data.id = socket.id
	socket.broadcast.to(data.room.long).emit('player-set-name', data);
}

exports.startGame = (socket, data) => {
	data.id = socket.id
	socket.broadcast.to(data.room.long).emit('start-game', data);
}

exports.submittedQuestion = (socket, data) => {
	const query = data.query.toLowerCase()
	const room = data.room.long
	auto.getQuerySuggestions(query, function(err, rawSuggestions) {
		if (err ) return console.log('error',err,'error')
		var suggestions = rawSuggestions.slice(0,10)
		for (var i = 0; i < suggestions.length; i++){
			let answer = suggestions[i].suggestion.replace(query, '')
			let hint = []
			for (var j = 0; j < answer.length; j++){
				if (answer[j] !== ' '){
					hint.push('_')
				} else {
					hint.push(' ')
				}
			}
			suggestions[i].hint = hint
			suggestions[i].answer = answer.toLowerCase()
		}
		socket.to(data.room.long).emit('question-received', suggestions);
	})
}
