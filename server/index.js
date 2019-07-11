//app setup
const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const auto = require('google-autocomplete');
//set up environment variables
require('dotenv').config({path: '.env'})
var PORT = process.env.PORT || 9000
//set up cross origin policy and serve build folder of create react app. (this will only be used when we merge server and front end)
app.use(cors())
app.use(express.static(path.resolve(__dirname, '..', 'build')));
// so we can access body of post requests
app.use( bodyParser.json());       
app.use(bodyParser.urlencoded({     
  extended: true
}))

// set up database connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB.?')
});
mongoose.connection.on('connected', function() {
    console.info('Successfully connected to the database')
});

//models and methods
const Rooms = require('./models/rooms')
const User = require('./models/users')
const Player = require('./MethodsPlayer/connection')
const Host = require('./MethodsHost/connection')

// send all uncaught routes to build directory
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

io.on('connection', function(socket){
	console.log('socket connected')
	//set up listeners for all sockets  
	//All listeners to be prefixed with 'host-' or 'player-'
	socket.on('host-connected', Host.connected.bind(this, socket))
	socket.on('host-sending-game-state', Host.sendGameState.bind(this, socket, io))
	socket.on('host-send-question-input', Host.sendQuestionInput.bind(this, socket, io))
	socket.on('player-connected', Player.connected.bind(this, socket))
  	socket.on('host-send-answer-input', Host.sendAnswerInput.bind(this, socket, io))
  	socket.on('host-end-game', Host.endGame.bind(this, socket, io))
  	socket.on('player-start-game', Player.startGame.bind(this, socket, io))
  	socket.on('player-submit-question', Player.submitQuestion.bind(this, socket, io))
  	socket.on('disconnect', disconnect.bind(this, socket));
  	socket.on('player-send-answer', Player.submitAnswer.bind(this, socket))
});



function disconnect(socket){
	// Rooms.remove({})
	Rooms.findOne({long: socket.id}, (err, room) => {
		//if it is a host leaving then delete room from database
		if (room) return room.remove()
		else {
			const rooms = Object.keys(socket.adapter.rooms)
			for (var i = 0; i < rooms.length; i++){
				if (rooms[i] !== socket.id){
					socket.broadcast.to(rooms[i]).emit('player-left', {id: socket.id});
				}
			}
			console.log('disconnecting', room)
		}
		// otherwise handle player leaving logic
	})
}

http.listen(PORT, function(err){
	if (err){
		console.log(err)
		return
	} else {
		console.log('listening one', PORT);
	}
});



function test(){
	const query = 'what in the world'
	auto.getQuerySuggestions(query, function(err, rawSuggestions) {
		if (err ) return console.log('error',err,'error')
		validateSuggestions(rawSuggestions, query).then((suggestions) => {
			console.log('resolved')
			for (var i = 0; i < suggestions.length; i++){
				suggestions[i].answer = cleanAnswer(suggestions[i].suggestion, query)
				suggestions[i].hint = createHint(suggestions[i].answer)
			}

			console.log(suggestions)
		})
		
	})
}

function validateSuggestions(suggestions, query){
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

function cleanAnswer(suggestion, query){
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



test()

