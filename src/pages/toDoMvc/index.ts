/**
 * ToDoMvc
 * @author "ejinmin" <b84866466@gmail.com>
 * @date 2019-04-05 21-57-56
 * @since 0.0.1
 */

'use strict'

import { PolymerElement } from '@polymer/polymer'
import { PolymerInit } from '@polymer/polymer/interfaces.d'
import { customElement, property, observe, computed } from '@polymer/decorators'
import html from 'utils/html'
import view from './template.html'
import store from 'store'

@customElement('to-do-mvc')
export default class ToDoMvc extends store(PolymerElement) {
    constructor() {
        super()
    }

    // public connectedCallback() {
    //     super.connectedCallback()
    // }

    @property({ type: Array, statePath: 'todos' })
    private todos

    private addTodo() {
        console.dir(this)
        console.log('todo')
    }

    static get template() {
        return html(view)
    }
}
