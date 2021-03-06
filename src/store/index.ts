import { createStore, combineReducers } from 'redux'
import { teamReducer } from './team'
import { transitionReducer } from './transition'
import { wordsReducer } from './words'

const rootReducer = combineReducers({
  teams: teamReducer,
  transition: transitionReducer,
  words: wordsReducer
})
type AppState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export { store, AppState }
