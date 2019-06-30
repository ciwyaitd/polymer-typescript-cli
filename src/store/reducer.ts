import { handleActions, Action } from 'redux-actions'
import { ActionsTypes } from 'common/constants'
import storage from 'lib/localStorage'

type Todo = Types.TodoItem
type Todos = Todo[]

const initialState: Todos = []

export default handleActions<Todos, Todo>(
    {
        [ActionsTypes.GET_TODO]: (
            state: Todos,
            action: Action<Todo>
        ): Todos => {
            return [...storage.get<Todos>('todo', [])]
        },
        [ActionsTypes.ADD_TODO]: (
            state: Todos,
            action: Action<Todo>
        ): Todos => {
            return [
                {
                    id:
                        state.reduce(
                            (maxId, todo) => Math.max(todo.id as number, maxId),
                            -1
                        ) + 1,
                    completed: action.payload.completed,
                    title: action.payload.title
                },
                ...state
            ]
        },
        [ActionsTypes.DELETE_TODO]: (
            state: Todos,
            action: Action<Todo>
        ): Todos => {
            return state.filter(v => v.id !== action.payload.id)
        },
        [ActionsTypes.EDIT_TODO]: (
            state: Todos,
            action: Action<Todo>
        ): Todos => {
            return state.map(todo => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        title: action.payload.title
                    }
                }
                return todo
            })
        },
        [ActionsTypes.TOGGLE_TODO]: (
            state: Todos,
            action: Action<Todo>
        ): Todos => {
            return state.map(todo => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        completed: !action.payload.completed
                    }
                }
                return todo
            })
        },
        [ActionsTypes.TOGGLE_ALL_TODO]: (
            state: Todos,
            action: Action<Todo>
        ): Todos => {
            const areAllCompleted = state.every(todo => todo.completed)
            return state.map(todo => {
                return {
                    ...todo,
                    completed: !areAllCompleted
                }
            })
        },
        [ActionsTypes.CLEAR_COMPLETED]: (
            state: Todos,
            action: Action<Todo>
        ): Todos => {
            return state.filter(todo => todo.completed === false)
        }
    },
    initialState
)
