const Rooms = require('../models/rooms')

exports.connected = function(socket){
	// unique room codes 

	// function createCode(){
	// 	var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
	// 	var text = '';
	// 	for (var i = 0; i < 4; i++){
 //    		text += possible.charAt(Math.floor(Math.random() * possible.length));
	// 	}
	// 	return text;
	// }
	// function createUniqueRoomId(){
	// 	let room = createCode()
	// 	Rooms.findOne({short: room}, function(err, result){
	// 		if (result) return createUniqueRoomId()
	// 		storeRoom(room)
	// 	})
	// }
	// function storeRoom(room){
	// 	Rooms.create({short: room, long: socket.id}, ()=> {
	// 		socket.emit('host-room-code-generated', room)
	// 	})
	// }
	// createUniqueRoomId()

	//generic room code

	const code = 'ABCD'

	function checkRoom(){
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
			console.log('host connected', room)
			socket.emit('host-room-generated', room)
		})
	}

	checkRoom()
	// Rooms.find({}, (err, rooms) => {
	// 	console.log('All rooms', rooms)
	// 	checkRoom()
	// })
	
}