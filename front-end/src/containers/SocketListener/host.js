import openSocket from 'socket.io-client';
var socket;

function subscribeToHostEvents(self) {
	if (self.props.dev){
		socket = openSocket('http://localhost:9000');
	} else {
		socket = openSocket('https://whatpeoplesearch.herokuapp.com');
	}
	
	
	socket.emit('host-connected')
	socket.on('host-room-generated', roomGenerated.bind(this,self))
	socket.on('player-joined', playerJoined.bind(this, self))
	socket.on('player-set-name', setPlayerName.bind(this, self))
	socket.on('player-left', playerLeft.bind(this,self))
	socket.on('start-game', startGame.bind(this, self))
	socket.on('restart-game', restartGame.bind(this, self))
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

	
	var audio = new Audio(require('assets/sounds/bounce.wav'));
	audio.play()
	self.props.playerAnswerReceived(data)
	if (allPlayersHaveAnswered(players)){
		self.props.sounds.timer.pause()
		self.props.sounds.timer.currentTime = 0;
		self.props.setGameState('waiting')
		
		self.props.setViewResponses(true)
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
	self.props.sounds.typing.pause()
	self.props.setGameState('waiting')
	self.props.push('/host/question')
	setTimeout(() => {
		self.props.setScreenLoadingState('in')
	})
	
	self.props.showHints(data)
}

function endCountdown(self, data){
	self.props.sounds.timer.pause()
	self.props.setGameState('waiting')
	socket.emit('send-player-waiting', data)
	
		self.props.setViewResponses(true)
	
	
}

function startGame(self, data){
	console.log('starting game', self, data)
	self.props.sounds.typing.pause()
	// self.props.sounds.bounce.play()
	socket.emit('send-player-waiting', self.props.hostRoom)
	self.props.setScreenLoadingState('out')
	self.props.sounds.start.play()
	setTimeout(() => {
		self.props.setScreenLoadingState('in')
		// self.props.sounds.typing.play()
		self.props.setGameState('question-entry')
		self.props.push('/host/instructions')
	}, self.props.dev ? 0 : 3500)
}

function resetAllPlayers(self){
	var players = Object.assign([], self.props.players)
	for (var i = 0; i < players.length; i++){
		players[i].score = 0
		players[i].answer = false
		players[i].hasSubmitted = false
	}
	self.props.updatePlayers(players)
	self.props.setRound(1)
	self.props.nextQuestion(0)
	self.props.setViewResponses(false)

}

function restartGame(self, data){
	
	self.props.sounds.typing.pause()
	// self.props.sounds.bounce.play()
	socket.emit('send-player-waiting', self.props.hostRoom)
	self.props.setScreenLoadingState('out')
	self.props.setGameState('waiting')
	self.props.sounds.start.play()
	resetAllPlayers(self)
	setTimeout(() => {
		self.props.setScreenLoadingState('in')
		// self.props.sounds.typing.play()
		// self.props.setGameState('question-entry')
		self.props.push('/host/question-input')
		sendQuestionInput(self)
	}, self.props.dev ? 0 : 3500)
}

function endGame(self){
	var audio = new Audio(require('assets/sounds/end.wav'));
	audio.play()
	self.props.setGameState('end')
	self.props.push('/host/end')
	socket.emit('host-end-game', self.props.room)
}

function sendQuestionInput(self){
	self.props.sounds.typing.play()
	//this function should push to host holding screen
	self.props.setGameState('question-entry')
	const player = self.props.players[self.props.questionIndex ]
	const data = {
		player, 
		room: self.props.hostRoom
	}
	
	socket.emit('host-send-question-input' , data)
	self.props.push('/host/question-input')
	self.props.setScreenLoadingState('in')
}

function playerLeft(self, data){
	self.props.playerLeft(data)
}

function roomGenerated(self, data){
	console.log('room generated', data)
	self.props.hostSetRoom(data)
}



const avatars = [
	'https://media.giphy.com/media/9PgvV8ale90lQwfQTZ/giphy.gif',
	'https://media.giphy.com/media/JSueytO5O29yM/giphy.gif',
	'https://media.giphy.com/media/1d7F9xyq6j7C1ojbC5/giphy.gif',
	'https://media.giphy.com/media/2A75RyXVzzSI2bx4Gj/giphy.gif',
	'https://media.giphy.com/media/BY0I4J5rnxd8k/giphy.gif',
	'https://media.giphy.com/media/xTiTnoieCQLmBcZbvq/giphy.gif',
	'https://media.giphy.com/media/3rhPlyX2NtNHG/giphy.gif',
	'https://media.giphy.com/media/3i7zenReaUuI0/giphy.gif',
	'https://media.giphy.com/media/GhNXUOpdNz65q/giphy.gif',
	'https://media.giphy.com/media/l0HlW453pQmbFiPkY/giphy.gif',
	'https://media.giphy.com/media/lqqgO1obaMaWWnIjan/giphy.gif',
	'https://media.giphy.com/media/JrwVklLkeHhtTXnkfR/giphy.gif',
	'https://media.giphy.com/media/w6VPNx52r60E0K0OCm/giphy.gif',
	'https://media.giphy.com/media/TGv0G4bP9pIr3RXmZ5/giphy.gif',
	'https://media.giphy.com/media/8mwyRelmazRrt1uPxZ/giphy.gif',
	'https://media.giphy.com/media/33zX3zllJBGY8/giphy.gif',
	'https://media.giphy.com/media/GWx7HFtKBAV3O/giphy.gif',
	'https://media.giphy.com/media/SA4PLXhPWdWDe/giphy.gif',
	'https://media.giphy.com/media/yiZKgdA1FvFe/giphy.gif',
	'https://media.giphy.com/media/3o6ZtgMYOwdlKviWQw/giphy.gif',
	'https://media.giphy.com/media/3o7btVVQNCCtgf0uXe/giphy.gif',
	'https://media.giphy.com/media/26Ff7HyH9n400tmta/giphy.gif',
	'https://media.giphy.com/media/2eaxgABoIjFcc/giphy.gif',
	'https://media.giphy.com/media/29s9fNQFkfLfXmGk7U/giphy.gif',
	'https://media.giphy.com/media/2Y8rcThF12v0JBwK50/giphy.gif',
	'https://media.giphy.com/media/wZtxwyGdLV838qwYNt/giphy.gif',
	'https://media.giphy.com/media/kfAzHqnteXVF6/giphy.gif',

]

function createNewPlayerObj(self, data){
	var newPlayers = Object.assign([], self.props.players)
	  data.isConnected = true
	  var disconnectedPlayerFound = false 
	  for (var i = 0; i < newPlayers.length; i++ ){
	    if (data.name === newPlayers[i].name && !newPlayers[i].isConnected){
	        console.log('reconnecting existing player')
	        newPlayers[i].id = data.id
	        newPlayers[i].isConnected = true
	        disconnectedPlayerFound = true
	        return {
	        	joinState: 'rejoin',
	  			players: newPlayers
	  		}
	    } 

	  }
	  if (!disconnectedPlayerFound && self.props.gameState === 'welcome'){
	    console.log('creating new player')
	    data.score = 0
	    data.image = avatars[Math.floor(Math.random() * avatars.length)]
	    newPlayers.push(data)
	    return {
	    	joinState: 'new',
	  		players: newPlayers
	  	}
	  } else {
	  	return {
	  		joinState: false,
	  		players: newPlayers
	  	}
	  } 
	  
}

function getRejoinGameState(self, data){
	if (self.props.gameState === 'question-entry' ){
		for (var i = 0; i < self.props.players.length; i++){
			if (data.playerData.id === self.props.players[i].id){
				if (i === self.props.questionIndex) {
					data.gameState = 'question-entry'
				} else {
					data.gameState = 'waiting'
				}
			}
		}
	} else if (self.props.gameState === 'answer-entry'){
		for (var i = 0; i < self.props.players.length; i++){
			if (data.playerData.id === self.props.players[i].id){
				if (self.props.players[i].answer) {
					data.gameState = 'waiting'
				} else {
					data.gameState = 'answer-entry'
				}
			}
		}
	} else {
		data.gameState = self.props.gameState
	}
	return data
}



function playerJoined(self, data){
	// here we need to establish the state of the game and send the user to the correct page when they rejoin
	var { joinState, players } = createNewPlayerObj(self, data.playerData)
	//update players
	self.props.updatePlayers(players)
	if (joinState === 'rejoin'){
		data = getRejoinGameState(self, data)
		self.props.sounds.bounce.play()
		console.log('player rejoined')
		console.log(data)

		socket.emit('host-sending-game-state', data)
	} else if (joinState === 'new'){
		data.gameState = 'welcome'
		self.props.sounds.bounce.play()

		console.log('new player joined')
		console.log(data)
		socket.emit('host-sending-game-state', data)
	} else {
		socket.emit('host-send-leave-room-instruction', data)
	}
	
	


	
}

function setPlayerName(self, data){
	self.props.setPlayerName(data)
}

function sendAnswerInput(self, data){
	self.props.sounds.typing.pause()
	self.props.sounds.timer.play()
	self.props.sounds.timer.loop = true
	self.props.setGameState('answer-entry')
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
	endCountdown,
	endGame,
	sendAnswerInput,
	sendQuestionInput,
	subscribeToHostEvents
};