const Rooms = require('../models/rooms')

exports.connected = function(socket){
	// unique room codes 
	function createCode(){
		var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
		var text = '';
		for (var i = 0; i < 4; i++){
    		text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
	function createUniqueRoomId(){
		let room = createCode()
		Rooms.findOne({short: room}, function(err, result){
			if (result) return createUniqueRoomId()
			storeRoom(room)
		})
	}
	function storeRoom(room){
		Rooms.create({short: room, long: socket.id}, (err, roomToSend)=> {
			socket.emit('host-room-generated', roomToSend)
		})
	}
	

	//generic room code
	const code = 'ABCD'
	function createDevRoom(){
		Rooms.findOne({short: code}, function(err, result){
			if (result) return deleteRooms()
			createRoom()
		})
	}

	function deleteRooms(){
		Rooms.remove({}, () => {
			createRoom()
		})
	}

	function createRoom(){
		Rooms.create({short: code, long: socket.id}, (err, room)=> {
			console.log('generated, ', room)
			socket.emit('host-room-generated', room)
		})
	}


	createUniqueRoomId()
	// createDevRoom()
	// Rooms.find({}, (err, rooms) => {
	// 	console.log('All rooms', rooms)
	// 	checkRoom()
	// })
	
}

exports.sendLeaveRoomInstruction = (socket, io, data) => {
	io.to(data.playerData.id).emit('host-send-player-leave-room', data.room)
}

exports.sendGameState = (socket, io, data) => {
	// data.socket.join(data.room.long)

	console.log(data.socket, data.room.long)
	io.to(data.playerData.id).emit('player-joined-room-successfully', data)
}

exports.endGame = (socket, io, data) => {
	socket.broadcast.to(data.long).emit('end-game')
}

exports.sendQuestionInput = (socket, io, data) => {
	console.log('send question', data)
	socket.broadcast.to(data.room.long).emit('waiting')
	io.to(data.player.id).emit('question-input')
}

exports.sendPlayerWaiting = (socket, io, data) => {
	console.log('sending waiting', data.long)
	socket.broadcast.to(data.long).emit('waiting')
}

exports.sendAnswerInput = ( socket, io, data) => {
	socket.broadcast.to(data.long).emit('answer-input')
}

exports.sendLikes = ( socket, io, data) => {
	
	socket.broadcast.to(data.room.long).emit('host-sending-likes', data)	
	socket.to(data.player.id).emit('waiting')
}
