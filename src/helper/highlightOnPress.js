function highlightOnPress(row, column) {
  let awalRow = Math.floor(row / 3) * 3
  let awalCol = Math.floor(column / 3) * 3
  let array = []
  for (let i = awalRow; i < awalRow + 3; i++) {
    for (let j = awalCol; j < awalCol + 3; j++) {
      array.push([i, j])
    }
  }
  for (let i = 0; i < 9; i++) {
    array.push([row, i])
    array.push([i, column])
  }
  return array
}

export default highlightOnPress