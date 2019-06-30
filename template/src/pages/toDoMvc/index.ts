/**
 * ToDoMvc
 * @author "hejinmin" <b84866466@gmail.com>
 * @date 2019-04-05 21-57-56
 * @since 0.0.1
 */

'use strict'

import { PolymerElement } from '@polymer/polymer/polymer-element'
import { DeclarativeEventListeners } from '@polymer/decorators/lib/declarative-event-listeners'
import {
    customElement,
    property,
    observe,
    computed,
    listen
} from '@polymer/decorators'
import html from 'utils/html'
import view from './template.html'
import store from 'store'
import { addTodo, getTodo } from 'store/actions'
import { TodosFilter } from 'common/constants'

@customElement('to-do-mvc')
export default class ToDoMvc extends store(
    DeclarativeEventListeners(PolymerElement)
) {
    constructor() {
        super()
    }

    public connectedCallback() {
        super.connectedCallback()
        this.dispatch(getTodo())
    }

    @property({ type: String })
    public filter = TodosFilter.All

    @property({ type: Array, statePath: 'todos' })
    public todos!: Types.TodoItem[]

    @listen('add-todo', 'todomvc')
    public addTodo(e: Event) {
        this.dispatch(addTodo((e as CustomEvent).detail.value))
    }

    @listen('set-filter', 'todomvc')
    public setFilter(e: Event) {
        this.filter = (e as CustomEvent).detail.value
    }

    @computed('todos', 'filter')
    public get todosByFilter() {
        return (this.todos || []).filter(v => {
            if (this.filter === TodosFilter.All) return true
            if (this.filter === TodosFilter.Active) return !v.completed
            return v.completed
        })
    }

    static get template() {
        return html(view)
    }
}
