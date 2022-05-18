import React from 'react';
import { Provider } from 'react-redux'
import store from './src/stores'
import { Provider as PaperProvider } from 'react-native-paper';

import Home from './src/screens/Home'
import Board from './src/screens/Board'
import Finish from './src/screens/Finish'
import GameOver from './src/screens/GameOver'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Board" component={Board} />
            <Stack.Screen name="Finish" component={Finish} />
            <Stack.Screen name="GameOver" component={GameOver} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
