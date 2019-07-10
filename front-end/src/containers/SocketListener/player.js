import openSocket from 'socket.io-client';
var socket;

function subscribeToPlayerEvents(self) {
	//decalre the socket
	socket = openSocket('http://localhost:9000');
	//notify that it is a player joining.
	// socket.emit('player-connected', {short: 'ABCD'})
	socket.on('player-joined-room-successfully', successJoiningRoom.bind(this, self))
	socket.on('error-joining-room-no-host', errorJoiningRoom.bind(this, self))
	socket.on('error-joining-room', errorJoiningRoom.bind(this, self))
	socket.on('example-listener', successJoiningRoom.bind(this, self))
}

function roomFull(self){
	
}

function hostQuit(self){
	
}

function successJoiningRoom(self, data){

	console.log('successJoiningRoom', data, self)
	const localData = {
		name: data.playerData.name,
		id: data.playerData.id,
		room: data.room.short
	}
	window.localStorage.quiz = JSON.stringify(localData)
	self.props.playerSetSelf(data)
	self.props.push('/p/waiting-start')
}

function errorJoiningRoom(self, data){
	console.log('error joining room')
}

function startRound(self){
	
}

function gameEnd(){
	//clear local storage
}

function joinRoom(data){
	const prevId = window.localStorage.quiz ? JSON.parse(window.localStorage.quiz).id : false
	data.prevId = prevId
	socket.emit('player-connected', data)
}

function sendName(data){
	const payload = {
		id: socket.id,
		room: data.room,
		name: data.name
	}
	window.localStorage.quiz = JSON.stringify(payload)
	emit(false, {
		action: 'player-set-name',
		payload: payload
	})
}


function emit(self, data){
	if (self){
		data.payload.room = self.props.room 
	} else if(!data.payload.room){
		return console.warn(`emitting ${data.action}, no room, must attach this manually`)

	}
	console.log(data)
	socket.emit(data.action, data.payload)
}

export { 
	joinRoom, 
	subscribeToPlayerEvents
};