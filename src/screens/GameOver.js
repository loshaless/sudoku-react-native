import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native'

const windowWidth = Dimensions.get("window").width

function GameOver({ route, navigation }) {
  const { name, difficulty } = route.params;

  function onPressPlay() {
    navigation.replace('Board', {
      name: name,
      difficulty: difficulty
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sorry, {name}. Game Over!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onPressPlay}
      >
        <Text style={{ fontSize: windowWidth / 15, color: 'white' }}>Try Again!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: windowWidth / 10,
    marginBottom: windowWidth / 20
  },
  button: {
    marginTop: windowWidth / 20,
    alignItems: "center",
    backgroundColor: "#28a745",
    padding: windowWidth / 28,
    borderRadius: 15
  },
});

export default GameOver