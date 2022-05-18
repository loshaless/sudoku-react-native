import React, { useEffect, useState } from 'react'
import { fetchBoard, fetchSolution, validation } from '../stores/action'
import { useDispatch, useSelector } from 'react-redux'
import {
  Alert, Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'

import highlightOnPress from '../helper/highlightOnPress'

const windowWidth = Dimensions.get("window").width;

function Board({ route, navigation }) {
  const dispatch = useDispatch()
  const { board } = useSelector(state => state.boards)
  const solved = useSelector(state => state.solved)
  const changed = useSelector(state => state.changed)
  const solutionBoards = useSelector(state => state.solutionBoards)

  const loading = useSelector(state => state.loading)
  const [newBoard, setNewBoard] = useState([])
  const [highlight, setHighlight] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [loadCheck, setLoadCheck] = useState(false)
  const { name, difficulty } = route.params;
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, []);

  let countDown = 0
  useEffect(() => {
    if (seconds > 0) {
      countDown = setTimeout(() => setSeconds(seconds - 1), 1000);
    }
    else if (seconds === 0) {
      navigation.replace('GameOver', {
        name: name,
        difficulty: difficulty
      })
    }
    return function () {
      clearTimeout(countDown)
    }
  }, [seconds]);

  useEffect(() => {
    if (solved && !loading) {
      setLoadCheck(false)
      dispatch({ type: 'SET_SOLVED', payload: false })
      navigation.replace('Finish', {
        name: name,
        difficulty: difficulty,
        time: seconds
      })
    }
    else if (!solved && loadCheck) {
      setModalVisible(true)
    }
  }, [changed]);

  useEffect(() => {
    if (seconds === '') {
      setSeconds(605)
    }
    if (board) {
      setNewBoard(board)
      dispatch(fetchSolution({ board: board }))
    }
  }, [board]);

  function handleInputChange(text, indexRow, indexCol) {
    let hardCopy = JSON.parse(JSON.stringify(newBoard))
    hardCopy[indexRow][indexCol] = +text
    setNewBoard(hardCopy)
  }

  function handlePressBox(indexRow, indexCol) {
    setHighlight(JSON.stringify(highlightOnPress(indexRow, indexCol)))
  }

  function handleValidate() {
    dispatch(validation({ board: newBoard }))
    setLoadCheck(true)
  }

  function handleAutoSolve() {
    setNewBoard(solutionBoards)
  }

  function handleGiveUp() {
    navigation.replace('Home')
  }

  function handleNewGame() {
    setSeconds('')
    dispatch(fetchBoard(difficulty))
  }

  function handleOnUnEdit() {
    setHighlight('')
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.loading}
          source={{
            uri: 'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif',
          }}
        />
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.timer}>Times left <Text style={{ fontWeight: 'bold' }}>{seconds}</Text> seconds</Text>
        {(newBoard) && newBoard.map((row, indexRow) => {
          return (
            <View style={{ flexDirection: "row" }} key={indexRow}>
              {row.map((col, indexCol) => {
                return (
                  <TextInput
                    style={[
                      styles.box,
                      board[indexRow][indexCol] && styles.boxInit,
                      ((indexRow >= 3 && indexRow <= 5 && (indexCol < 3 || indexCol > 5) || (indexCol >= 3 && indexCol <= 5 && (indexRow < 3 || indexRow > 5)))) ? styles.yellowBox : styles.blueBox,
                      highlight.includes(`${indexRow},${indexCol}`) && styles.greenBox
                    ]}
                    key={indexCol}
                    value={!col ? "" : col.toString()}
                    editable={!board[indexRow][indexCol] ? true : false}
                    onChangeText={(text) => (text != "0") && handleInputChange(text, indexRow, indexCol)}
                    keyboardType="number-pad"
                    maxLength={1}
                    onFocus={() => handlePressBox(indexRow, indexCol)}
                    onEndEditing={() => handleOnUnEdit()}
                  />
                )
              })}
            </View>)
        })}

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={[styles.button4, { backgroundColor: "#28a745" }]}
            onPress={handleValidate}
          >
            <Text style={{ fontSize: windowWidth / 18, color: 'white' }}>Validate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button4, { backgroundColor: "#343a40", marginLeft: windowWidth / 24, }]}
            onPress={handleAutoSolve}
          >
            <Text style={{ fontSize: windowWidth / 18, color: 'white' }}>Auto Solve</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.button4, { backgroundColor: "#dc3545" }]}
            onPress={handleGiveUp}
          >
            <Text style={{ fontSize: windowWidth / 18, color: 'white' }}>Give Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button4, { backgroundColor: "#007bff", marginLeft: windowWidth / 24, }]}
            onPress={handleNewGame}
          >
            <Text style={{ fontSize: windowWidth / 18, color: 'white' }}>New Game</Text>
          </TouchableOpacity>
        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Please check your answer again!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Ok, let me try again!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    width: windowWidth / 3,
    height: windowWidth / 3,
  },
  timer: {
    fontSize: windowWidth / 14,
    marginBottom: windowWidth / 24,
    fontStyle: 'italic',
  },
  title: {
    fontSize: windowWidth / 10,
    marginBottom: windowWidth / 24
  },
  button4: {
    marginTop: windowWidth / 24,
    width: windowWidth / 3 + 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#841584",
    padding: windowWidth / 28,
    borderRadius: 15,
    flexDirection: "row"
  },
  box: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#444444',
    fontSize: windowWidth / 14,
  },
  boxInit: {
    fontWeight: "bold",
    fontStyle: 'normal',
    color: 'black',
  },
  greenBox: {
    backgroundColor: '#90EE90'
  },
  yellowBox: {
    backgroundColor: '#FFF8DC',
  },
  blueBox: {
    backgroundColor: '#87CEEB',
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ffc107",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: windowWidth / 14,
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Board