const initialState = {
  boards: [],
  solutionBoards: [],
  solved: false,
  loading: false,
  changed: false,
  score: [
    {
      name: 'hansel',
      difficulty: 'easy',
      time: 20,
    },
    {
      name: 'tes',
      difficulty: 'hard',
      time: 5,
    },
  ]
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_BOARD':
      return { ...state, boards: action.payload }
    case 'FETCH_SOLUTION_BOARD':
      return { ...state, solutionBoards: action.payload }
    case 'SET_SOLVED':
      return { ...state, solved: action.payload, changed: !state.changed }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'ADD_SCORE':
      console.log(action.payload);
      return { ...state, score: [...state.score, action.payload] }
    default:
      return state
  }
}

export default reducer