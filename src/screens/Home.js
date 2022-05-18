import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'

const windowWidth = Dimensions.get("window").width;

function Home({ navigation }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [completed, setCompleted] = useState(true)

  useEffect(() => {
    dispatch({ type: 'SET_SOLVED', payload: false })
  }, []);

  function onPressPlay(difficulty) {
    if (name === '') {
      setCompleted(false)
    }
    else {
      navigation.navigate('Board', {
        name: name,
        difficulty: difficulty
      })
      setCompleted(true)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME TO SUDOKU GAME!</Text>
      {!completed && (<Text style={styles.alert}>Please Type Your Name First!</Text>)}

      <Image
        style={styles.logo}
        source={require('../../assets/icon.png')}
      />

      <Text style={styles.text}>Enter Your Name:</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={setName}
        placeholder="name...."
      />

      <Text style={styles.text}>Select Difficulty:</Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[styles.button4, { backgroundColor: "#28a745" }]}
          onPress={() => onPressPlay('easy')}
        >
          <Text style={{ fontSize: windowWidth / 18, color: 'white' }}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button4, { backgroundColor: "#343a40", marginLeft: windowWidth / 24, }]}
          onPress={() => onPressPlay('medium')}
        >
          <Text style={{ fontSize: windowWidth / 18, color: 'white' }}>Medium</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[styles.button4, { backgroundColor: "#dc3545" }]}
          onPress={() => onPressPlay('hard')}
        >
          <Text style={{ fontSize: windowWidth / 18, color: 'white' }}>Hard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button4, { backgroundColor: "#007bff", marginLeft: windowWidth / 24, }]}
          onPress={() => onPressPlay('random')}
        >
          <Text style={{ fontSize: windowWidth / 18, color: 'white' }}>Random</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: windowWidth / 3,
    height: windowWidth / 3,
    marginBottom: windowWidth / 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    textAlign: 'center',
    fontSize: windowWidth / 10,
    marginBottom: windowWidth / 15,
    fontWeight: 'bold'
  },
  text: {
    textAlign: 'center',
    fontSize: windowWidth / 15,
    marginBottom: windowWidth / 30,
  },
  inputBox: {
    textAlign: 'center',
    fontSize: windowWidth / 14,
    width: windowWidth / 2,
    height: windowWidth / 8,
    borderWidth: 1,
    marginBottom: windowWidth / 15
  },
  inputDifficulty: {
    height: windowWidth / 8,
    width: windowWidth / 2,
    fontSize: windowWidth / 14,
  },
  alert: {
    backgroundColor: '#F08080',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
    fontSize: windowWidth / 15,
    marginBottom: windowWidth / 30
  },
  button4: {
    marginBottom: windowWidth / 24,
    width: windowWidth / 3 + 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#841584",
    padding: windowWidth / 28,
    borderRadius: 15,
    flexDirection: "row"
  },
});

export default Home