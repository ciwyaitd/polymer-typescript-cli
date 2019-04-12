import { createStore, combineReducers } from 'redux'
import PolymerRedux from 'polymer-redux'
import todos from './reducer'
import storage from 'lib/localStorage'

const rootReducer = combineReducers({
    todos
})

const store = createStore(rootReducer)

store.subscribe(() => {
    storage.set('todo', store.getState().todos)
})

export default PolymerRedux<{
    todos: Types.TodoItem[]
}>(store)
