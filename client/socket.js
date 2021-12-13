import io from 'socket.io-client';
import store from './store';
import { setUserId, setRoomName, createSession, joinSession, partnerJoined, partnerLikeOrDislike } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  // socket.on("new-message", (message) => {
  //   store.dispatch(gotNewMessageFromServer(message));
  // });

  socket.on('createSession', (sessionState) => {
    store.dispatch(createSession(sessionState));
  });
  socket.on('roomName', (roomName) => {
    store.dispatch(setRoomName(roomName));
  });

  socket.on('init', (userId) => {
    store.dispatch(setUserId(userId));
  });

  socket.on('joinSession', ({ sessionState, partnerId }) => {
    store.dispatch(joinSession(sessionState, partnerId));
  });

  socket.on('sessionNonexist', () => window.alert('Invalid Room Code'));

  socket.on('sessionFull', () => window.alert('Session is full or in progress'));

  socket.on('partnerJoined', (partnerId) => {
    store.dispatch(partnerJoined(partnerId));
  });

  socket.on('partnerLikeOrDislike', (likeOrDislike) => {
    store.dispatch(partnerLikeOrDislike(likeOrDislike));
  });
});

export default socket;
