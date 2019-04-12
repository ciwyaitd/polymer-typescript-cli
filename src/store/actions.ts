import { createAction } from 'redux-actions'
import { ActionsTypes } from 'common/constants'

type Todo = Types.TodoItem
type Todos = Todo[]

const getTodo = createAction<void>(ActionsTypes.GET_TODO, () => {})
const addTodo = createAction<Todo, string>(
    ActionsTypes.ADD_TODO,
    (title: string) => ({
        title,
        completed: false
    })
)
const editTodo = createAction<Todo, Todo, string>(
    ActionsTypes.EDIT_TODO,
    (todo: Todo, newTitle: string) => ({
        ...todo,
        title: newTitle
    })
)
const deleteTodo = createAction<Todo, Todo>(
    ActionsTypes.DELETE_TODO,
    (todo: Todo) => todo
)
const toggleTodo = createAction<Todo, Todo>(
    ActionsTypes.TOGGLE_TODO,
    (todo: Todo) => todo
)
const toggleAllTodo = createAction<void>(ActionsTypes.TOGGLE_ALL_TODO, () => {})
const clearCompleted = createAction<void>(
    ActionsTypes.CLEAR_COMPLETED,
    () => {}
)

export {
    getTodo,
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodo,
    toggleAllTodo,
    clearCompleted
}
