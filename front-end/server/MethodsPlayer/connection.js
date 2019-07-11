const Rooms = require('../models/rooms')
const User = require('../models/users')
const auto = require('google-autocomplete');

exports.connected = function(socket, data){
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
			socket.join(room.long)
			socket.broadcast.to(room.long).emit('player-joined', {
				room, playerData
			});
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

exports.startGame = (socket, io, data) => {
	io.to(data.long).emit('start-game');
}

exports.submitAnswer = (socket, data) =>{
	socket.to(data.room.long).emit('player-answer', data)
}


exports.submitQuestion = (socket, io, data) => {
	const query = data.question.toLowerCase()
	auto.getQuerySuggestions(query, function(err, rawSuggestions) {
		if (err ) return console.log('error',err,'error')
		validateSuggestions(rawSuggestions).then((suggestions) => {
			console.log('resolved')
			for (var i = 0; i < suggestions.length; i++){
				suggestions[i].answer = cleanAnswer(suggestions[i].suggestion)
				suggestions[i].hint = createHint(suggestions[i].answer)
			}
			const dataToSend = {
				question: query,
				answers: suggestions,
			}
			socket.to(data.room.long).emit('send-hints-to-host', dataToSend);
			//should not broadcast immediately to all clients.  
			//Should wait for host countdown complete
			io.to(data.room.long).emit('answer-input')
		})
	})
	
	function validateSuggestions(suggestions){
		return new Promise((resolve, reject) => {
			var trimmed = []
			for (var i = 0; i < suggestions.length; i++){
				if (suggestions[i].suggestion.indexOf(query) === 0){
					trimmed.push(suggestions[i])
				}
			}
			resolve(trimmed.slice(0,10))
		})
	}

	function cleanAnswer(suggestion){
		let answer = suggestion.replace(query, '')
		if (answer[0] === ' '){
			answer = answer.substring(1);
		}
		answer = answer.replace(/[^\w\s]/gi, '')
		return answer.toLowerCase()
	}

	function createHint(answer){
		let hint = []
		for (var j = 0; j < answer.length; j++){
			if (answer[j] !== ' '){
				hint.push('_')
			} else {
				hint.push(' ')
			}
		}
		return hint
	}
}

