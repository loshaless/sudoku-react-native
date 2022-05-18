const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
const encodeParams = (params) =>
  Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

export function setLoading(payload) {
  return { type: 'SET_LOADING', payload }
}

export function fetchBoard(difficulty) {
  return (dispatch) => {
    dispatch(setLoading(true))
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(response => response.json())
      .then(data => {
        dispatch(setLoading(false))
        return dispatch({ type: 'FETCH_BOARD', payload: data });
      });
  }
}

export function fetchSolution(board) {
  return (dispatch) => {
    // dispatch(setLoading(true))
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(board),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        // dispatch(setLoading(false))
        return dispatch({ type: 'FETCH_SOLUTION_BOARD', payload: response.solution });
      })
      .catch(console.warn)
  }
}

export function validation(board) {
  return (dispatch) => {
    dispatch(setLoading(true))
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(board),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response.status, "di validattion");
        if (response.status === "solved") {
          dispatch(setLoading(false))
          return dispatch({ type: 'SET_SOLVED', payload: true });
        }
        else {
          dispatch(setLoading(false))
          return dispatch({ type: 'SET_SOLVED', payload: false });
        }
      })
      .catch(console.warn)
  }
}