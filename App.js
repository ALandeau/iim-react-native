import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux';

import textReducer from './Reducer'
import HomeScreen from './pages/home'
import InfoScreen from "./pages/info";

const MainNavigator = createStackNavigator (
    {
      Home: {screen: HomeScreen},
      Info: {screen: InfoScreen}
    });

const store = createStore(textReducer);

let Navigation = createAppContainer(MainNavigator);
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
}

