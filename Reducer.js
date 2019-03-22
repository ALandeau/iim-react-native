import { AsyncStorage } from 'react-native';

const textReducer = (state = {text: ""}, action) => {
    switch (action.type) {
        case 'TEXT':
            return {...state, text: action.payload};
        case 'SAVE_GAME':
            AsyncStorage.setItem('nameGame', action.payload);
            return {...state, nameGame: action.payload};
        default:
            return state
    }
};

export default textReducer;
