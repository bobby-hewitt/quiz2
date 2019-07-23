import openSocket from 'socket.io-client';
import ReactGA from 'react-ga';
var socket;

function subscribeToPlayerEvents(self) {
	//decalre the socket
	if (self.props.dev){
		socket = openSocket('http://localhost:9000');
	} else {
		socket = openSocket('https://whatpeoplesearch.herokuapp.com');
	}

	ReactGA.initialize('UA-144165883-1');
	ReactGA.pageview('player');
	//notify that it is a player joining.
	// socket.emit('player-connected', {short: 'ABCD'})
	socket.on('host-send-player-leave-room', errorJoiningRoom.bind(this, self))
	socket.on('player-joined-room-successfully', successJoiningRoom.bind(this, self))
	socket.on('error-joining-room-no-host', errorJoiningRoom.bind(this, self))
	socket.on('error-joining-room', errorJoiningRoom.bind(this, self))
	socket.on('waiting', waiting.bind(this, self))
	socket.on('question-input', questionInput.bind(this, self))
	socket.on('answer-input', answerInput.bind(this, self))
	socket.on('end-game', endGame.bind(this, self))
	socket.on('player-error-not-enough-suggestions', errorWithQuestion.bind(this, self))
	socket.on('host-sending-likes', getLikes.bind(this, self))
	socket.on('host-disconnected', hostDisconnected.bind(this, self))
}

function hostDisconnected(self){
	self.props.push('/p/host-disconnected')
}



function roomFull(self){
	
}

function getLikes(self, data){
	
	self.props.push('/p/likes')
	self.props.setLikes(data.player)
	
}

function errorWithQuestion(self){
	//need to message the error.
	console.log('error')
	self.props.setLoading(false)
	self.props.push('/p/question-input-error')
}

function endGame(self){
	self.props.setLoading(false)
	self.props.push('/p/end')
}

function waiting(self){
	self.props.push('/p/waiting')
}

function questionInput(self){
	self.props.setLoading(false)
	self.props.push('/p/question-input')
}
function answerInput(self){
	self.props.setLoading(false)
	self.props.push('/p/answer-input')
}

function sendQuestion(self, data){
	socket.emit('player-submit-question', data)
	self.props.push('/p/waiting')
}

function sendAnswer(self, data){
	console.log('sending answer', data)
	socket.emit('player-send-answer', data)
	self.props.push('/p/waiting')
}

function hostQuit(self){
	
}

function sendLike(data){
	socket.emit('player-send-like', data)
}

function successJoiningRoom(self, data){

	
	const localData = {
		name: data.playerData.name,
		id: data.playerData.id,
		room: data.room.short
	}
	window.localStorage.quiz = JSON.stringify(localData)
	self.props.playerSetSelf(data)
	self.props.setLoading(false)
	switch(data.gameState){
		case 'welcome':
			return self.props.push('/p/waiting-start')
		case 'question-entry':
			return self.props.push('/p/question-input')
		case 'answer-entry':
			return self.props.push('/p/answer-input')
		case 'waiting':
			return self.props.push('/p/waiting')
		case 'end':
			return self.props.push('/p/end')
		default:
			return
	}
	
}

function errorJoiningRoom(self, data){
	console.log('error joining room')
	if (data && data.long){
		console.log('socket leaving room')
		self.props.setLoading(false)
		self.props.push('/p')
		socket.emit('leave-room', data.long)
	} else {
		self.props.setLoading(false)
		self.props.push('/p')
	}
}

function startRound(self){
	
}

function startGame(room){
	ReactGA.pageview('start game');
	socket.emit('player-start-game', room)
}

function restartGame(room){
	ReactGA.pageview('restart game');
	socket.emit('player-restart-game', room)
}

function gameEnd(){
	//clear local storage
}

function joinRoom(self, data){
	const prevId = window.localStorage.quiz ? JSON.parse(window.localStorage.quiz).id : false
	data.prevId = prevId
	socket.emit('player-connected', data)
	self.props.push('/p/waiting')
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
		data.payload.room = self.props.playerRoom 
	} else if(!data.payload.room){
		return console.warn(`emitting ${data.action}, no room, must attach this manually`)

	}
	console.log(data)
	socket.emit(data.action, data.payload)
}

export { 
	sendLike,
	startGame,
	joinRoom, 
	restartGame,
	sendQuestion,
	sendAnswer,
	subscribeToPlayerEvents
};