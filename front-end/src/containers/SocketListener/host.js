import openSocket from 'socket.io-client';
var socket;

function subscribeToHostEvents(self) {
	socket = openSocket('http://localhost:9000');
	socket.emit('host-connected')
	socket.on('host-room-generated', roomGenerated.bind(this,self))
	socket.on('player-joined', playerJoined.bind(this, self))
	socket.on('player-set-name', setPlayerName.bind(this, self))
	socket.on('player-left', playerLeft.bind(this,self))
	// socket.on('host-room-code-generated', successJoiningRoom.bind(this, self))
}

function roomFull(self){
	
}

function hostQuit(self){
	
}

function playerLeft(self, data){
	self.props.playerLeft(data)
}

function roomGenerated(self, data){
	self.props.hostSetRoom(data)
}

function playerJoined(self, data){
	// here we need to establish the state of the game and send the user to the correct page when they rejoin
	
	data.gameState = self.props.gameState
	console.log('in', data)
	socket.emit('host-sending-game-state', data)
	self.props.playerJoined(data.playerData)
}

function setPlayerName(self, data){
	self.props.setPlayerName(data)
}

function gameEnd(){
	// clear local storage
}



function errorJoiningRoom(){

}

function startRound(self){
	
}

function joinRoom(data, self){
	
}


export { 
	subscribeToHostEvents
};