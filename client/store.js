import axios from 'axios';
import {createStore, applyMiddleware} from 'redux';
import ThunkMiddleware from 'redux-thunk';

////// Action Types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER'; 

///// Action Creators
const gotMessagesFromServer = (messages) => ({type: GOT_MESSAGES_FROM_SERVER, messages})
const writeMessage = (inputContent) => ({type: WRITE_MESSAGE, newMessageEntry: inputContent})

export const fetchMessagesFromServer = () => {
    return async (dispatch) => {
        const {data: messages} = await axios.get('/api/messages');
        dispatch(gotMessagesFromServer(messages));
    }
}


const initialState = {
    messages: [],
    newMessageEntry: ''
  };

const reducer = (state = inititalState, action) => {
    switch(action.type) {
        case GOT_MESSAGES_FROM_SERVER :
            return {...state, messages: action.messages}
        default : 
            return state;
    }
}

const store = createStore(reducer, applyMiddleware(ThunkMiddleware));
export default store;