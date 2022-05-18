import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'
import { DataTable } from 'react-native-paper';
import { StatusBar } from 'react-native';

const windowWidth = Dimensions.get("window").width

function Finish({ route, navigation }) {
  const dispatch = useDispatch()
  const score = useSelector(state => state.score)
  const { name, difficulty, time } = route.params;
  let data = {
    name: name,
    difficulty: difficulty,
    time: time,
  }

  useEffect(() => {
    dispatch({ type: 'ADD_SCORE', payload: data })
  }, [dispatch]);

  function onPressPlay() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title >Difficulty</DataTable.Title>
            <DataTable.Title >Times Left (s)</DataTable.Title>
          </DataTable.Header>
          {score.map((data, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell>{data.name}</DataTable.Cell>
                <DataTable.Cell >{data.difficulty}</DataTable.Cell>
                <DataTable.Cell >{data.time}</DataTable.Cell>
              </DataTable.Row>
            )
          })}
        </DataTable>
      </ScrollView>

      <Text style={styles.title}>{name} finish the game in {time} s in {difficulty} mode!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onPressPlay}
      >
        <Text style={{ fontSize: windowWidth / 20, color: 'white' }}>START NEW GAME!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: windowWidth / 15,
    marginBottom: windowWidth / 20,
    marginTop: windowWidth / 20,
    width: windowWidth / 1.1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#28a745",
    padding: windowWidth / 28,
    borderRadius: 15,
    marginBottom: windowWidth / 15
  },
  table: {
    width: windowWidth / 1.1,
  },

  scrollView: {
    marginTop: StatusBar.currentHeight + windowWidth / 10,
    backgroundColor: '#90EE90',
    marginHorizontal: 20,
    height: 50,
    width: windowWidth / 1.1,
  },
  text: {
    fontSize: 42,
  },
});

export default Finish