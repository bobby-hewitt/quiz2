import openSocket from 'socket.io-client';
var socket;

function subscribeToPlayerEvents(self) {
	//decalre the socket
	// socket = openSocket('http://localhost:9000');
	socket = openSocket('https://whatpeoplesearch.herokuapp.com');
	//notify that it is a player joining.
	// socket.emit('player-connected', {short: 'ABCD'})
	socket.on('player-joined-room-successfully', successJoiningRoom.bind(this, self))
	socket.on('error-joining-room-no-host', errorJoiningRoom.bind(this, self))
	socket.on('error-joining-room', errorJoiningRoom.bind(this, self))
	socket.on('waiting', waiting.bind(this, self))
	socket.on('question-input', questionInput.bind(this, self))
	socket.on('answer-input', answerInput.bind(this, self))
	socket.on('end-game', endGame.bind(this, self))
	socket.on('player-error-not-enough-suggestions', errorWithQuestion.bind(this, self))
}

function roomFull(self){
	
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
	self.props.setLoading(true)
}

function sendAnswer(self, data){
	console.log('sending answer', data)
	socket.emit('player-send-answer', data)
	self.props.setLoading(true)
}

function hostQuit(self){
	
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
}

function startRound(self){
	
}

function startGame(room){
	console.log(room)
	socket.emit('player-start-game', room)
}

function gameEnd(){
	//clear local storage
}

function joinRoom(self, data){
	const prevId = window.localStorage.quiz ? JSON.parse(window.localStorage.quiz).id : false
	data.prevId = prevId
	socket.emit('player-connected', data)
	self.props.setLoading(true)
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
	startGame,
	joinRoom, 
	sendQuestion,
	sendAnswer,
	subscribeToPlayerEvents
};