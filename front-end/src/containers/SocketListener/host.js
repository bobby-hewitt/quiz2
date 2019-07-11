import openSocket from 'socket.io-client';
var socket;

function subscribeToHostEvents(self) {
	// socket = openSocket('http://localhost:9000');
	socket = openSocket('https://whatpeoplesearch.herokuapp.com');
	socket.emit('host-connected')
	socket.on('host-room-generated', roomGenerated.bind(this,self))
	socket.on('player-joined', playerJoined.bind(this, self))
	socket.on('player-set-name', setPlayerName.bind(this, self))
	socket.on('player-left', playerLeft.bind(this,self))
	socket.on('start-game', startGame.bind(this, self))
	socket.on('send-hints-to-host', showHints.bind(this, self))
	socket.on('player-answer', playerAnswer.bind(this, self))
	// socket.on('host-room-code-generated', successJoiningRoom.bind(this, self))
}

function roomFull(self){
	
}

function hostQuit(self){
	
}

function playerAnswer(self, data){
	const { players } = self.props
	console.log('player answer received', data)
	self.props.playerAnswerReceived(data)
	if (allPlayersHaveAnswered(players)){
		self.props.push('/host/answers')
	}
	
}

function revealScores(self){
	console.log('reveal scores', self)
	var players = Object.assign([], self.props.players)
	var answers = Object.assign([], self.props.question.answers)

	console.log(self.props.players, self.props.question.answers)
	for (var i = 0; i < answers.length; i++){
		var correctAnswer = players.find(p => p.answer === answers[i].answer)
		console.log('correct answer', correctAnswer)
		if (correctAnswer){

			

			answers[i].show = true
		}
	}

	self.props.updateAnswers(answers)
}

function allPlayersHaveAnswered(players){
	var answers = 0;
	for (var i = 0; i < players.length; i++){
		if (players[i].answer){
			answers += 1
		}
	}
	return answers === players.length ? true : false
}

function showHints(self, data){
	self.props.push('/host/question')
	self.props.showHints(data)
}

function startGame(self){
	self.props.push('/host/instructions')
}

function endGame(self){
	self.props.push('/host/end')
	socket.emit('host-end-game', self.props.room)
}

function sendQuestionInput(self){
	//this function should push to host holding screen
	const player = self.props.players[self.props.questionIndex ]
	const data = {
		player, 
		room: self.props.room
	}
	socket.emit('host-send-question-input' , data)
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

function sendAnswerInput(self, data){
	console.log('sending answer input')
	socket.emit('host-send-answer-input', self.props.room)
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
	endGame,
	sendAnswerInput,
	sendQuestionInput,
	subscribeToHostEvents
};