const Message = require('../db/models/message');
const Channel = require('../db/models/channel');

const { initializeSession } = require('./session');

const makeId = (length) => {
  let result = '';
  let characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = (io) => {
  const state = {};
  const clientRooms = {};

  io.on('connection', (client) => {
    console.log(client.id, ' has made a persistent connection to the server!');

    client.on('newSession', handleNewSession);
    client.on('joinSession', handleJoinSession);
    client.on('likeDislike', handleLikeDislike);

    async function handleNewSession() {
      let roomName = makeId(4);
      clientRooms[client.id] = roomName;
      client.emit('roomName', roomName);

      state[roomName] = await initializeSession();
      /* clientRooms = {client1: '7Ub4',
                        client2: '7Ub4'}
               state = { 7Ub4: {
                          sessionMovies: [movie, movie, movie,...]
                          client1Choices: [true, true, false, ...],
                          client2Choices: [false, true, true, ...]
                        }}
      */
      client.join(roomName);
      client.number = 1;
      client.emit('init', 1);
      client.emit('createSession', { sessionMovies: state[roomName].sessionMovies, partnerChoices: [] });
    }

    async function handleJoinSession(sessionCode) {
      const room = io.sockets.adapter.rooms[sessionCode];
      let allUsers;

      if (room) {
        allUsers = room.sockets;
      }
      let numOfClients;
      if (allUsers) {
        numOfClients = Object.keys(allUsers).length;
      }

      if (numOfClients == undefined) {
        client.emit('sessionNonexist');
        return;
      } else if (numOfClients > 1) {
        client.emit('sessionFull');
        return;
      }

      clientRooms[client.id] = sessionCode;

      client.join(sessionCode);
      client.number = 2;
      client.emit('roomName', sessionCode);
      client.emit('init', 2);
      await client.emit('joinSession', {
        sessionState: { sessionMovies: state[sessionCode].sessionMovies, partnerChoices: [] },
        partnerId: Object.keys(room.sockets)[0],
      });
      client.to(sessionCode).emit('partnerJoined', client.id);
    }

    function handleLikeDislike(clientId, likeOrDislike, roomCode) {
      state[roomCode][`client${clientId}Choices`].push(likeOrDislike);
      client.to(roomCode).emit('partnerLikeOrDislike', likeOrDislike);
      stateCheck(roomCode);
    }

    function stateCheck(roomCode) {
      let room = state[roomCode];
      if (room.client1Choices.length == 10 && room.client2Choices.length == 10) {
        let matchedMovies = getMatchedMovies(roomCode);
        state[roomCode] = null;
        io.in(roomCode).emit('endSession', matchedMovies);
      }
    }

    function getMatchedMovies(roomCode) {
      let room = state[roomCode];
      let matchedMovies = [];
      for (let i = 0; i < room.client1Choices.length; i++) {
        if (room.client1Choices[i] == room.client2Choices[i]) {
          matchedMovies.push(room.sessionMovies[i]);
        }
      }

      return matchedMovies;
    }
  });
};
