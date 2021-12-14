import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import socket from './socket';

////// Action Types
const SET_USER_ID = 'SET_USER_ID';
const SET_ROOM_NAME = 'SET_ROOM_NAME';
const CREATE_SESSION = 'CREATE_SESSION';
const JOIN_SESSION = 'JOIN_SESSION';
const PARTNER_JOINED = 'PARTNER_JOINED';
const PARTNER_LIKE_OR_DISLIKE = 'PARTNER_LIKE_OR_DISLIKE';
const END_SESSION = 'END_SESSION';
const CLEAR_STATE = 'CLEAR_STATE';

///// Action Creators
export const setUserId = (userId) => ({
  type: SET_USER_ID,
  userId,
});
export const setRoomName = (roomName) => ({
  type: SET_ROOM_NAME,
  roomName,
});
export const createSession = (sessionState) => ({
  type: CREATE_SESSION,
  sessionState,
});
export const joinSession = (sessionState, partnerId) => ({ type: JOIN_SESSION, sessionState, partnerId });
export const partnerJoined = (partnerId) => ({ type: PARTNER_JOINED, partnerId });
export const partnerLikeOrDislike = (likeOrDislike) => ({
  type: PARTNER_LIKE_OR_DISLIKE,
  likeOrDislike,
});
export const endSession = (matchedMovies) => ({
  type: END_SESSION,
  matchedMovies,
});
export const clearState = () => ({
  type: CLEAR_STATE,
});

const initialState = {
  sessionState: null,
  userId: null,
  roomName: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.userId, partner: null };
    case SET_ROOM_NAME:
      return { ...state, roomName: action.roomName };
    case CREATE_SESSION:
      return { ...state, sessionState: action.sessionState };
    case JOIN_SESSION:
      return { ...state, sessionState: action.sessionState, partner: action.partnerId };
    case PARTNER_JOINED:
      return { ...state, partner: action.partnerId };
    case PARTNER_LIKE_OR_DISLIKE: {
      let newPartnerChoices = [...state.sessionState.partnerChoices];
      newPartnerChoices.push(action.likeOrDislike);
      let stateCopy = { ...state };
      stateCopy.sessionState.partnerChoices = newPartnerChoices;
      return stateCopy;
    }
    case END_SESSION:
      return { ...state, matchedMovies: action.matchedMovies };
    case CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));

const store = createStore(reducer, middleware);

export default store;
